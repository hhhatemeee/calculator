import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CalculationType from './CalculationType';

describe('CalculationType Component', () => {
  it('The status of the menu item if it is not available', () => {
    render(<CalculationType isDisabled={true} />);

    const child = screen.queryByTestId('typePoint')
    expect(child).toHaveClass('isDisabled');
  });

  it('The status of the menu item if it is available', () => {
    render(<CalculationType isDisabled={false} />);

    const child = screen.queryByTestId('typePoint')
    expect(child).not.toHaveClass('isDisabled');
  });

  it('The status of the menu item if its calculator is active', () => {
    render(<CalculationType currentType='currency' name='currency' />);

    const child = screen.queryByTestId('typePoint')
    expect(child).toHaveClass('current');
  });
})