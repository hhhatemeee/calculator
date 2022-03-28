import { render, screen, fireEvent } from '@testing-library/react';
import { toMatchDiffSnapshot } from 'snapshot-diff';

import Converter from './Converter';

expect.extend({ toMatchDiffSnapshot });

describe('SwapButton test', () => {
  it('The presence of a button on the screen', () => {
    render(<Converter />);

    const child = screen.queryByTestId('swapBtn');

    expect(child).not.toBeNull();
  });


  it('check the onClick the swapButton', () => {
    const converter = render(<Converter />);
    const child = screen.queryByTestId('swapBtn');

    fireEvent.click(child)
    const converterBeforeClick = render(<Converter />);

    expect(converter).toMatchDiffSnapshot(converterBeforeClick);
  })
});
