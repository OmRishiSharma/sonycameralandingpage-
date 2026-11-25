import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = path.resolve("..", "Camera_exploding_animation_sequence_0cbbea89_1080p-ezgif-split");
const OUT = path.resolve("public", "frames");
fs.mkdirSync(OUT, { recursive: true });

const files = fs
  .readdirSync(SRC)
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  .sort((a, b) => parseInt(a.match(/(\d+)(?!.*\d)/)[1]) - parseInt(b.match(/(\d+)(?!.*\d)/)[1]));

// Remove the stationary bottom-right diamond watermark in 1080p coordinates using
// a Coons 4-edge interpolation + sampled local studio floor grain + 6px edge feather.
const X0 = 1692, Y0 = 852, PW = 96, PH = 96, FEATHER = 10;
const smooth = (t) => {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
};

function cleanWatermark(data, width, height, channels) {
  const px = (x, y, c) => data[(Math.min(height - 1, Math.max(0, y)) * width + Math.min(width - 1, Math.max(0, x))) * channels + c];
  // Smooth 5x9 border sampling along each edge so single tabletop dust specks never streak across the patch
  const edgeH = (cx, y0, dy, c) => {
    let s = 0, n = 0;
    for (let oy = 0; oy < 5; oy++) for (let ox = -4; ox <= 4; ox++) { s += px(cx + ox, y0 + dy * oy, c); n++; }
    return s / n;
  };
  const edgeV = (x0, cy, dx, c) => {
    let s = 0, n = 0;
    for (let ox = 0; ox < 5; ox++) for (let oy = -4; oy <= 4; oy++) { s += px(x0 + dx * ox, cy + oy, c); n++; }
    return s / n;
  };
  const mean5 = (x, y, c) => {
    let s = 0;
    for (let j = -2; j <= 2; j++) for (let i = -2; i <= 2; i++) s += px(x + i, y + j, c);
    return s / 25;
  };

  for (let c = 0; c < Math.min(3, channels); c++) {
    const tl = edgeH(X0 - 1, Y0 - 1, -1, c);
    const tr = edgeH(X0 + PW, Y0 - 1, -1, c);
    const bl = edgeH(X0 - 1, Y0 + PH, 1, c);
    const br = edgeH(X0 + PW, Y0 + PH, 1, c);

    for (let dy = 0; dy < PH; dy++) {
      const v = dy / (PH - 1);
      const left = edgeV(X0 - 1, Y0 + dy, -1, c);
      const right = edgeV(X0 + PW, Y0 + dy, 1, c);

      for (let dx = 0; dx < PW; dx++) {
        const u = dx / (PW - 1);
        const top = edgeH(X0 + dx, Y0 - 1, -1, c);
        const bot = edgeH(X0 + dx, Y0 + PH, 1, c);

        const coons =
          (1 - v) * top +
          v * bot +
          (1 - u) * left +
          u * right -
          ((1 - u) * (1 - v) * tl + u * (1 - v) * tr + (1 - u) * v * bl + u * v * br);

        // Sample subtle tabletop texture from clean region immediately below
        const sx = X0 + dx;
        const sy = Math.min(height - 3, Y0 + PH + 14 + dy);
        const grain = (px(sx, sy, c) - mean5(sx, sy, c)) * 0.65;
        const target = Math.max(0, Math.min(255, coons + grain));

        const edgeDist = Math.min(dx, dy, PW - 1 - dx, PH - 1 - dy);
        const a = smooth(edgeDist / 10);
        const idx = ((Y0 + dy) * width + (X0 + dx)) * channels + c;
        data[idx] = Math.round(data[idx] * (1 - a) + target * a);
      }
    }
  }
}

let i = 0;
for (const f of files) {
  i++;
  const { data, info } = await sharp(path.join(SRC, f)).raw().toBuffer({ resolveWithObject: true });
  cleanWatermark(data, info.width, info.height, info.channels);
  await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .resize({ width: 1440 })
    .webp({ quality: 82 })
    .toFile(path.join(OUT, `frame-${String(i).padStart(4, "0")}.webp`));
}
fs.writeFileSync(path.resolve("public", "frames", "manifest.json"), JSON.stringify({ count: i, width: 1440, height: 810 }));
console.log("Clean frames processed:", i);
