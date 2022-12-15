const fs = require("fs");

const inputs = fs.readFileSync("./input.txt", "utf-8").split(/\n/);

const ADD = "addx";
const CRT_HEIGHT = 6;
const CRT_WIDTH = 40;

const CRT = Array(CRT_HEIGHT)
  .fill()
  .map(() => Array(CRT_WIDTH).fill());

const calculateCRTRender = () => {
  let x = 1;
  let cycle = 0;
  let crtY = 0;
  let crtX = 0;

  const moveCRTPixel = () => {
    crtX++;
    if (crtX === CRT_WIDTH) {
      crtY++;
      crtX = 0;
    }
  };
  const moveCycle = () => cycle++;
  const sumAdd = (val) => (x += Number(val));
  const printPixel = () => {
    if (x - 1 === crtX || x === crtX || x + 1 === crtX) {
      CRT[crtY][crtX] = "#";
    } else {
      CRT[crtY][crtX] = ".";
    }
  };
  inputs.forEach((command) => {
    const [instruction, value] = command.split(" ");
    moveCycle();
    printPixel();
    moveCRTPixel();
    if (instruction === ADD) {
      moveCycle();
      printPixel();
      moveCRTPixel();
      sumAdd(value);
    }
  });
  return CRT.map((line) => line.join("")).join("\n");
};

console.log(`CRT Render:, \n${calculateCRTRender()}`);
