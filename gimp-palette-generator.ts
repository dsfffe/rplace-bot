import { hexToRGB, PALETTE } from "./utils.ts";

const rgbPalette = PALETTE.map(hexToRGB);
const output = `GIMP Palette
Name: Untitled
Columns: 0
#
${
  rgbPalette
    .map(
      ({ r, g, b }, i) =>
        `${r.toString().padStart(3, " ")} ${
          g
            .toString()
            .padStart(3, " ")
        } ${b.toString().padStart(3, " ")}\t${i}`,
    )
    .join("\n")
}
`;

await Deno.writeTextFile("output.gpl", output);
