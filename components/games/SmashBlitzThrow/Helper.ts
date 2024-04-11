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

export function getValueBetweenByPercent(
  min: number,
  max: number,
  percent: number
) {
  return min + (max - min) * percent;
}

export function setHorizontalGradientToText(
  text: Phaser.GameObjects.Text,
  steps: any[]
) {
  let gradient = text.context.createLinearGradient(0, 0, text.width, 0);

  steps.forEach((element) => {
    gradient.addColorStop(element[0], element[1]);
  });

  text.setFill(gradient);
}
