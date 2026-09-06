#!/usr/bin/env python3
"""Mirror the static export in out/ to the deploy FTP account's document root.

Credentials are kept base64-encoded here (see deploy/README.md for why) and
decoded only in memory. Run after `npm run build`:

    python3 deploy/ftp_deploy.py
"""
import base64
import ftplib
import os
import sys

FTP_HOST = "utes2.duckdns.org"
FTP_LOGIN_B64 = "dXRlczI="
FTP_PASSWORD_B64 = "RnlXQkw2b2szajVoNnI="

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOCAL_DIR = os.path.join(ROOT, "out")


def decode(b64):
    return base64.b64decode(b64).decode()


def local_files(local_dir):
    """Yield (relative_posix_path,) for every file under local_dir."""
    for dirpath, _dirnames, filenames in os.walk(local_dir):
        for name in filenames:
            full = os.path.join(dirpath, name)
            rel = os.path.relpath(full, local_dir).replace(os.sep, "/")
            yield rel


def remote_files(ftp, path="/"):
    """Recursively yield every remote file path under path."""
    try:
        entries = list(ftp.mlsd(path))
    except ftplib.error_perm:
        return
    for name, facts in entries:
        if name in (".", ".."):
            continue
        entry_path = f"{path.rstrip('/')}/{name}"
        if facts.get("type") == "dir":
            yield from remote_files(ftp, entry_path)
        else:
            yield entry_path


def ensure_remote_dir(ftp, remote_dir_path):
    parts = [p for p in remote_dir_path.split("/") if p]
    cur = ""
    for part in parts:
        cur += "/" + part
        try:
            ftp.mkd(cur)
        except ftplib.error_perm:
            pass  # already exists


def main():
    if not os.path.isdir(LOCAL_DIR):
        sys.exit(f"error: {LOCAL_DIR} not found — run `npm run build` first")

    login = decode(FTP_LOGIN_B64)
    password = decode(FTP_PASSWORD_B64)

    local = sorted(local_files(LOCAL_DIR))
    print(f"Local files to upload: {len(local)}")

    ftp = ftplib.FTP(FTP_HOST, timeout=30)
    ftp.login(login, password)
    print(f"Connected to {FTP_HOST} as {login}")

    remote_before = set(remote_files(ftp))

    uploaded = 0
    for rel in local:
        remote_path = "/" + rel
        remote_dir = os.path.dirname(remote_path)
        if remote_dir and remote_dir != "/":
            ensure_remote_dir(ftp, remote_dir)
        local_path = os.path.join(LOCAL_DIR, rel)
        with open(local_path, "rb") as f:
            ftp.storbinary(f"STOR {remote_path}", f)
        uploaded += 1
        if uploaded % 25 == 0:
            print(f"  uploaded {uploaded}/{len(local)}")

    print(f"Uploaded {uploaded} files")

    local_set = set(local)
    stale = sorted(p.lstrip("/") for p in remote_before if p.lstrip("/") not in local_set)
    for rel in stale:
        try:
            ftp.delete("/" + rel)
            print(f"  removed stale: {rel}")
        except ftplib.error_perm as e:
            print(f"  could not remove {rel}: {e}")

    ftp.quit()
    print("Done.")


if __name__ == "__main__":
    main()
