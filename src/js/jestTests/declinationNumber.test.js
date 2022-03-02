import declinationNumber from "../declinationNumber";

describe('Declintation Number function tests', () => {
  let MOCK_DATA;

  beforeEach(() => {
    MOCK_DATA = [
      [1, 'm', '1 минута'],
      [2, 'm', '2 минуты'],
      [5, 'm', '5 минут'],
      ['1', 'm', '1 минута'],
      [123, 'm', '123 минуты'],
      [4567, 'h', '4567 часов'],
      [1, 'h', '1 час'],
      ['2', 'h', '2 часа'],
      [1, 'd', '1 день'],
      [145, 'd', '145 дней'],
      ['1382', 'd', '1382 дня'],
    ];
  });

  test('Checking output data', () => {
    MOCK_DATA.forEach((arrayData) => {
      expect(declinationNumber(arrayData[0], arrayData[1])).toBe(arrayData[2]);
    });
  });

  test('Checking output data', () => {
    expect(declinationNumber('test', 'asdasd')).toBe('test');
    expect(declinationNumber('test')).toBe('test');
    expect(declinationNumber(null)).toBeNull();
    expect(declinationNumber()).toBeUndefined();
  });
});