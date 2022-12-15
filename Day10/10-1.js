const fs = require("fs");

const inputs = fs.readFileSync("./input.txt", "utf-8").split(/\n/);

const ADD = "addx";
const NOOP = "noop";
const FIRST_MEASUREMENT = 20;
const LAST_MEASUREMENT = 220;

const calculateStrength = () => {
  let x = 1;
  let cycle = 0;
  let signals = [];
  const moveCycle = () => cycle++;
  const sumAdd = (val) => (x += Number(val));
  const measureSignal = (signalQueueLength) => {
    if (
      cycle == FIRST_MEASUREMENT + 40 * signalQueueLength &&
      cycle <= LAST_MEASUREMENT
    ) {
      signals.push(cycle * x);
    }
  };
  inputs.forEach((command) => {
    const [instruction, value] = command.split(" ");
    const signalQueueLength = signals.length;
    moveCycle();
    measureSignal(signalQueueLength);
    if (instruction === ADD) {
      moveCycle();
      measureSignal(signalQueueLength);
      sumAdd(value);
    }
  });

  return signals.reduce((sum, val) => (sum += val), 0);
};

console.log("SignalsSum: ", calculateStrength());
