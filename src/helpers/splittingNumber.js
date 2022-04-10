/**
 * Breaks a number into digits
 * @param {number | string} number
 * @param {string} delimiter
 * @returns number in string format
 */
export default function splittingNumber(number, delimiter = ' ') {
  const numberArr = number.toString().split('.');
  let mainNumber = numberArr[0].split('');
  let result = '';
  let mainNumberLength = 0;

  if (numberArr[0].includes('-')) {
    const arr = numberArr[0].split('');

    arr.shift();
    mainNumber = arr;
  }

  mainNumberLength = mainNumber.length;

  if ((typeof number === 'number' || typeof number === 'string')
    && (typeof delimiter === 'string')) {
    mainNumber.forEach((char, i) => {
      if ((mainNumberLength - (i + 1)) % 3 === 0 && i !== mainNumberLength - 1) {
        result += `${char}${delimiter}`;

        return;
      }

      result += char;
    });

    if (numberArr.length > 1) {
      result += `.${numberArr[1]}`;
    }
    return Number(number) >= 0 ? result : `-${result}`;
  }

  console.log('Check type on number or delimiter');
}