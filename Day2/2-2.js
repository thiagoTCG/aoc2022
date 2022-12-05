const fs = require("fs");

const matches = fs.readFileSync("./input.txt", "utf-8").trim().split(/\n/);

const cryptoMapping = {
  A: {
    value: 1,
    loses: 2,
    wins: 3,
  },
  B: {
    value: 2,
    loses: 3,
    wins: 1,
  },
  C: {
    value: 3,
    loses: 1,
    wins: 2,
  },
};

function calculateMatchResult(adv, you) {
  if (you === "X") {
    return cryptoMapping[adv].wins + 0;
  }
  if (you === "Y") {
    return cryptoMapping[adv].value + 3;
  }
  return cryptoMapping[adv].loses + 6;
}

function calculateFullResult(matches) {
  return matches.reduce((acc, match) => {
    const [you, adv] = match.trim().split(" ");
    return acc + calculateMatchResult(you, adv);
  }, 0);
}

console.log("matches: ", calculateFullResult(matches));
