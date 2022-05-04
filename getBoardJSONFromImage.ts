import {
  CanvasRenderingContext2D,
  createCanvas,
  loadImage,
} from "https://deno.land/x/canvas@v1.4.1/mod.ts";
import diff from "https://esm.sh/color-diff";
import { hexToRGB, PALETTE, RGB, RGBToHex } from "./utils.ts";

const RGB_PALETTE = PALETTE.map(hexToRGB);
const GET_CLOSEST_PALETTE = RGB_PALETTE.map((c) => ({
  R: c.r,
  G: c.g,
  B: c.b,
  A: 1,
}));
const getClosestInPalette = (c: RGB) => {
  const t = diff.closest(
    { R: c.r, G: c.g, B: c.b, A: c.alpha / 255 },
    GET_CLOSEST_PALETTE,
  );
  return {
    r: t.R,
    g: t.G,
    b: t.B,
    alpha: (t.A || 1) * 255,
  };
};
export async function getBoardJSONFromImage(image: Uint8Array) {
  const currentImage: RGB[][] = await extractImagePixels(image);
  const mappedToClosest = currentImage.map((row) =>
    row.map((c) => getClosestInPalette(c))
  );
  const outputBoard = mappedToClosest.map((row) =>
    row.map((c) => PALETTE.indexOf(RGBToHex(c)))
  );
  return outputBoard;
}

async function extractImagePixels(image: Uint8Array) {
  const img = await loadImage(image);
  const canvas = createCanvas(img.width(), img.height());

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  return extractImageDataFromCanvas(ctx, canvas.height, canvas.width);
}

function extractImageDataFromCanvas(
  ctx: CanvasRenderingContext2D,
  height: number,
  width: number,
) {
  function getPixel(x: number, y: number): RGB {
    const data = ctx.getImageData(x, y, 1, 1).data;

    const rgb = { r: data[0], g: data[1], b: data[2], alpha: data[3] };
    return rgb;
  }

  const currentImage: RGB[][] = [];

  for (let i = 0; i < height; i++) {
    currentImage.push([]);

    for (let k = 0; k < width; k++) {
      currentImage[currentImage.length - 1].push(getPixel(k, i));
    }
  }
  return currentImage;
}
