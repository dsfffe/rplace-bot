import { getBoardJSONFromImage } from "./getBoardJSONFromImage.ts";
import { generateCode } from "./generateCode.ts";
const inputPath = Deno.args[0];
const outputPath = Deno.args[1];
const file = await Deno.readFile(inputPath);

const outputBoard = await getBoardJSONFromImage(file);
const outputCode = generateCode({ board: outputBoard });

Deno.writeTextFile(outputPath, outputCode);
