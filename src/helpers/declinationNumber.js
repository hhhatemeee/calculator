export default function declinationNumber(number, arr) {
  const absNumber = Math.abs(number) % 100;
  const lastNumber = absNumber % 10;

  if (Array.isArray(arr)) {
    if ((absNumber >= 10 && absNumber <= 20)
      || lastNumber === 0
      || (lastNumber >= 5 && lastNumber < 10)) {
      return `${number} ${arr[2]}`;
    }

    if (lastNumber === 1) {
      return `${number} ${arr[0]}`;
    }

    if (lastNumber > 1 && lastNumber < 5) {
      return `${number} ${arr[1]}`;
    }
  }

  return number;
}