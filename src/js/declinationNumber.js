export default function declinationNumber(number, value) {
  const minutesText = ['минута', 'минуты', 'минут'];
  const hoursText = ['час', 'часа', 'часов'];
  const daysText = ['день', 'дня', 'дней'];

  const absNumber = Math.abs(number) % 100;
  const lastNumber = absNumber % 10;

  switch (value) {
    case 'm':

      if ((absNumber >= 10 && absNumber <= 20) || lastNumber === 0 || lastNumber >= 5 && lastNumber < 10) {
        return `${number} ${minutesText[2]}`;
      }

      if (lastNumber === 1) {
        return `${number} ${minutesText[0]}`;
      }

      if (lastNumber > 1 && lastNumber < 5) {
        return `${number} ${minutesText[1]}`;
      }

      break;
    case 'h':
      if ((absNumber > 10 && absNumber < 20) || lastNumber === 0) {
        return `${number} ${hoursText[2]}`;
      }

      if (lastNumber === 1) {
        return `${number} ${hoursText[0]}`;
      }

      if (lastNumber > 1 && lastNumber < 5) {
        return `${number} ${hoursText[1]}`;
      }

      break;
    case 'd':
      if ((absNumber > 10 && absNumber < 20) || lastNumber === 0) {
        return `${number} ${daysText[2]}`;
      }

      if (lastNumber === 1) {
        return `${number} ${daysText[0]}`;
      }

      if (lastNumber > 1 && lastNumber < 5) {
        return `${number} ${daysText[1]}`;
      }

      break;
    default:
      return number;
  }
}
