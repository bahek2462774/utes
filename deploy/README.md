# Deployment

Static export only. The production artifact is the `out/` directory produced
by `npm run build` — plain HTML/CSS/JS/images, no server process required.
It is uploaded as-is to the document root of a small VPS over FTP.

Target: **http://utes2.duckdns.org/** — DuckDNS `A` record already points this
hostname at the server's IP; nothing to configure DNS-side. Dropping the built
site into the FTP account's home directory is the whole deploy.

## FTP credentials (temporary)

These were issued for this deploy only and are expected to be rotated/removed
within days (both the FTP account and this file). They're committed
base64-encoded, in this private repo, with the project owner's explicit go-ahead
— **not because base64 is meaningfully secure** (it isn't, it's trivially
reversible), just to avoid the password sitting around in plain text in commit
diffs/PR views. Treat it as a plaintext secret for every other purpose
(rotate it the same way you'd rotate a leaked password once this is no longer
needed).

```
FTP host:     utes2.duckdns.org   (resolves to 5.253.60.40)
FTP port:     21
FTP login:    dXRlczI=
FTP password: RnlXQkw2b2szajVoNnI=
```

Decode either value with:

```bash
echo 'dXRlczI=' | base64 -d              # -> login
echo 'RnlXQkw2b2szajVoNnI=' | base64 -d  # -> password
```

## Deploying a new build

From the project root:

```bash
npm run build   # regenerates out/
```

Then mirror `out/` to the FTP account's root (`/`). Any tool that speaks FTP
works; there's no special config beyond host/login/password above and binary
transfer mode. Example with a one-off Python script (stdlib `ftplib`, no
install needed):

```bash
python3 deploy/ftp_deploy.py
```

`deploy/ftp_deploy.py` reads the credentials from this file's base64 values,
recursively uploads everything under `out/`, and removes remote files that no
longer exist locally (so stale pages/images don't linger). Re-run it after
every `npm run build` you want published.

## Notes

- The FTP account's home directory *is* the web server's document root — no
  subfolder, no `public_html`. Files land where the site serves them from.
- This is a manual process on purpose (no CI/CD) — the site is small and
  changes infrequently. If that stops being true, wire up a GitHub Action
  instead of extending this script.
