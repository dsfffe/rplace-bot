export const PALETTE = [
  0x6d001aff,
  0xbe0039ff,
  0xff4500ff,
  0xffa800ff,
  0xffd635ff,
  0xfff8b8ff,
  0x00a368ff,
  0x00cc78ff,
  0x7eed56ff,
  0x00756fff,
  0x009eaaff,
  0x00ccc0ff,
  0x2450a4ff,
  0x3690eaff,
  0x51e9f4ff,
  0x493ac1ff,
  0x6a5cffff,
  0x94b3ffff,
  0x811e9fff,
  0xb44ac0ff,
  0xe4abffff,
  0xde107fff,
  0xff3881ff,
  0xff99aaff,
  0x6d482fff,
  0x9c6926ff,
  0xffb470ff,
  0x000000ff,
  0x515252ff,
  0x898d90ff,
  0xd4d7d9ff,
  0xffffffff,
];
export type RGB = {
  r: number;
  g: number;
  b: number;
  alpha: number;
};

export function hexToRGB(hexColor: number): RGB {
  return {
    alpha: (hexColor >> 0) & 0xff,
    b: (hexColor >> 8) & 0xff,
    g: (hexColor >> 16) & 0xff,
    r: (hexColor >> 24) & 0xff,
  };
}
export function RGBToHtmlColor(rgb: RGB): string {
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.alpha / 255})`;
}
export function RGBToHex({ r, g, b, alpha }: RGB) {
  function t(v: number) {
    return v.toString(16).padStart(2, "0");
  }
  return parseInt(`${t(r)}${t(g)}${t(b)}${t(alpha)}`, 16);
}
