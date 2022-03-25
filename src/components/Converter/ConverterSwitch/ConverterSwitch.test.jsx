import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ConverterSwitch from './ConverterSwitch';

const onChange = jest.fn();

const options = [
  { name: 'CC', value: 'CC' },
  { name: 'FCA', value: 'FCA' },
  { name: 'OE', value: 'OE' },
];

describe('ConverterSwitch Component', () => {
  it('More than one service is available', () => {
    render(<ConverterSwitch
      listLimit={['mock1']}
      onChange={onChange}
      options={options}
    />);

    expect(screen.queryAllByRole("option")).not.toBeNull();
  });

  it('Only one service is available', () => {
    render(<ConverterSwitch
      listLimit={['mock1', 'mock2']}
      onChange={onChange}
      options={options}
    />)

    expect(screen.queryByRole("option")).toBeNull();
  })
});