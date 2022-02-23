import get from '../get.js';

describe('Get function test', () => {
  let MOCK_OBJ = {};

  beforeEach(() => {
    MOCK_OBJ = {
      name: 'test',
      props: {
        values: 3,
        dependencies: {
          height: '24px',
          text: 'jest test',
          count: [
            { color: 'black' },
            { color: 'blue' },
            {
              mixColor: [
                { color: 'white-blue' },
                { color: 'white-black' },
              ],
            },
          ],
        },
      },
    };
  });

  test('should be defained', () => {
    expect(get()).toBeDefined();
  });

  test('checking for the correctness of the search', () => {
    expect(get(MOCK_OBJ, 'props.values', 0)).toBe(MOCK_OBJ.props.values);
    expect(get(MOCK_OBJ, 'props.dependencies.text', 0)).toBe(MOCK_OBJ.props.dependencies.text);
    expect(get(MOCK_OBJ, 'props.dependencies.count.1.color', 0)).toBe(MOCK_OBJ.props.dependencies.count[1].color);
    expect(get(MOCK_OBJ, 'props.dependencies.count.2.mixColor.1.color', 0)).toBe(MOCK_OBJ.props.dependencies.count[2].mixColor[1].color);
  });

  test('checking for the wrongness of the search', () => {
    expect(get(MOCK_OBJ, 'props.dependencies.heiht', 0)).toBe(0);
  })
});
