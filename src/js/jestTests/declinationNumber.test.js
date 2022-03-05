import declinationNumber from "../declinationNumber";
import { MOCK_TIME } from "../variables";

describe('Declintation Number function tests', () => {
  let MOCK_DATA;

  beforeEach(() => {
    MOCK_DATA = [
      [1, MOCK_TIME.MINUTE, '1 минута'],
      [2, MOCK_TIME.MINUTE, '2 минуты'],
      [5, MOCK_TIME.MINUTE, '5 минут'],
      ['1', MOCK_TIME.MINUTE, '1 минута'],
      [123, MOCK_TIME.MINUTE, '123 минуты'],
      [4567, MOCK_TIME.HOUR, '4567 часов'],
      [1, MOCK_TIME.HOUR, '1 час'],
      ['2', MOCK_TIME.HOUR, '2 часа'],
      [1, MOCK_TIME.DAY, '1 день'],
      [145, MOCK_TIME.DAY, '145 дней'],
      ['1382', MOCK_TIME.DAY, '1382 дня'],
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