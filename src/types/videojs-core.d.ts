// The core build has the same API as the full video.js build, minus the
// HLS/DASH engine, and ships without typings. Reuse the main ones.
declare module "video.js/core.es.js" {
  export { default } from "video.js";
}
