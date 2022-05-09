export function generateCode(opts: { board: number[][] }) {
  return `
  
  t = getEventListeners(pok).click[0].listener; 
dispachC1ickOnSubmit = ()=>t({isTrusted:true})
let destPosition = {x:425 , y :536}

    window.destBoard = ${JSON.stringify(opts.board)};
    
    window.getPixelColor = function getPixelColor(x, y) {
        return board[y * WIDTH + x];
    };
    
    window.setPixelColor = function setPixelColor(setx, sety, setc) {
        x = setx;
        y = sety;
        PEN = setc;
        pok.classList.add("enabled");
         dispachC1ickOnSubmit()
    };
    
    window.getBoardFromXY = function getBoardFromXY(x, y, width, heigh) {
        let board = [];
        for (let i = 0; i < heigh; i++) {
            board[i] = [];
            for (let j = 0; j < width; j++) {
                board[i][j] = getPixelColor(x + j, y + i);
            }
        }
        return board;
    };
    
    window.diffBoards = function diffBoards(source, dest) {
        const diff = [];
        dest.forEach((row, y) => {
            row.forEach((expectedCell, x) => {
                if (expectedCell !== -1 && expectedCell !== source[y][x]) {
                    diff.push({ x, y, expectedCell, currentCell: source[y][x] });
                }
            });
        });
        return diff;
    };
    window.doSingle = function doSingle() {
        const src = getBoardFromXY(
            destPosition.x,
            destPosition.y,
            destBoard[0]?.length || 0,
            destBoard.length
        );
        const diff = diffBoards(src, destBoard);
    
        const randomized = diff[Math.floor(Math.random()*diff.length)];
    
        if (randomized) {
            showDialog(
                \`\${diff.length} differences ramaining<br> setting (\${
                    randomized.x + destPosition.x
                } , \${
                    randomized.y + destPosition.y
                }) to <span style="width:10px;height:10px; border:1px solid #222222;background-color:\${RGBToHtmlColor(
                    rplaceHexToRGB(PALETTE[randomized.expectedCell])
                )};display:inline-block"></span>\`
            );
    
            console.log(\`\${diff.length} differences ramaining\`);
            console.log(
                \`setting (\${randomized.x + destPosition.x} , \${
                    randomized.y + destPosition.y
                }) to \${randomized.expectedCell}\`
            );
    
            setPixelColor(
                randomized.x + destPosition.x,
                randomized.y + destPosition.y,
                randomized.expectedCell
            );
        } else {
            console.log("done");
            showDialog("All Done! protecting...");
        }
    };
    window.RGBToHtmlColor = function RGBToHtmlColor(rgb) {
        return \`rgba(\${rgb.r}, \${rgb.g}, \${rgb.b}, \${rgb.alpha / 255})\`;
    };
    window.rplaceHexToRGB = function rplaceHexToRGB(hexColor) {
        return {
            alpha: (hexColor >> 24) & 0xff,
            b: (hexColor >> 16) & 0xff,
            g: (hexColor >> 8) & 0xff,
            r: (hexColor >> 0) & 0xff,
        };
    };
    window.showDialog = function showDialog(text) {
        const dialog = document.createElement("div");
        dialog.style.position = "fixed";
        dialog.style.top = "10px";
        dialog.style.left = "10px";
        dialog.style.width = "200px";
        dialog.style.background = "rgba(0,0,0,0.8)";
        dialog.style.color = "white";
        dialog.style.fontSize = "14px";
        dialog.style.textAlign = "center";
        dialog.style.padding = "10px";
        dialog.style.borderRadius = "10px";
        dialog.style.boxShadow = "0px 0px 10px black";
        dialog.style.zIndex = "30";
        dialog.innerHTML = text;
        document.body.appendChild(dialog);
        setTimeout(() => {
            document.body.removeChild(dialog);
        }, 8000);
    };
    setInterval(() => !onCooldown && doSingle(), 500);
    doSingle();
    
`;
}
