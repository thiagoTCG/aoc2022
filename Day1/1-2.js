const fs = require("fs");

const input = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split(/\n/)
  .concat(" ");

const calculate = (arr) => {
  let sums = [];
  let sum = 0;
  arr.forEach((val) => {
    if (Boolean(val)) {
      sum = sum + Number(val);
    } else {
      sums.push(sum);
      sum = 0;
    }
  });
  return sums
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, val) => acc + val, 0);
};

console.log(calculate(input));
