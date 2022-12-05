const fs = require("fs");

const matches = fs.readFileSync("./input.txt", "utf-8").trim().split(/\n/);

const cryptoMapping = {
  A: {
    loses: "Y",
    wins: "Z",
  },
  B: {
    loses: "Z",
    wins: "X",
  },
  C: {
    loses: "X",
    wins: "Y",
  },
  X: 1,
  Y: 2,
  Z: 3,
};

function calculateMatchResult(adv, you) {
  if (cryptoMapping[adv].loses === you) return cryptoMapping[you] + 6;
  if (cryptoMapping[adv].wins === you) return cryptoMapping[you];
  return cryptoMapping[you] + 3;
}

function calculateFullResult(matches) {
  return matches.reduce((acc, match) => {
    const [adv, you] = match.trim().split(" ");
    return acc + calculateMatchResult(adv, you);
  }, 0);
}

console.log("matches: ", calculateFullResult(matches));
