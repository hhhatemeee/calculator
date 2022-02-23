import splittingNumber from "../splittingNumber.js";

test('test', () => {
  expect(splittingNumber(10000000)).toBeDefined();
});

test('test 2', () => {
  expect(splittingNumber('88888888888888888.123123123')).toBe('88 888 888 888 888 888.123123123');
});
