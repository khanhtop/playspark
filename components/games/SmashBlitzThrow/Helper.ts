export function getPercentage(value: number) {
  return value * 2 - 1;
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function separateDigits(number: number) {
  return number
    .toString()
    .split("")
    .reverse()
    .map((digit) => parseInt(digit, 10));
}

export function getValuePercentage(value: number, min: number, max: number) {
  return (value - min) / (max - min);
}
