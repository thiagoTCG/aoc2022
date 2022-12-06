const fs = require("fs");

const data = fs.readFileSync("./input.txt", "utf-8");

function calculateMarkerPosition(originalString) {
  for (let i = 13; i < originalString.length; i++) {
    let subString = "";
    for (let j = i; j >= i - 13; j--) {
      subString += originalString[j];
    }
    const subset = new Set(subString.split(""));
    if (subset.size === 14) {
      return i + 1;
    }
  }
}

console.log("Marker starts at:", calculateMarkerPosition(data));
