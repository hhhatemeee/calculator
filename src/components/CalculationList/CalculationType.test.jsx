import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CalculationType from './CalculationType';

describe('CalculationType Component', () => {
  it('snapshot', () => {
    const component = render(<CalculationType name='test' />);

    expect(component).toMatchSnapshot();
  })
  it('The status of the menu item if it is not available', () => {
    render(<CalculationType disabledCalc={{ name: 'currency', isDisabled: true }} />);

    const child = screen.queryByTestId('typePoint')
    expect(child).toHaveClass('isDisabled');
  });

  it('The status of the menu item if it is available', () => {
    render(<CalculationType disabledCalc={undefined} />);

    const child = screen.queryByTestId('typePoint')
    expect(child).not.toHaveClass('isDisabled');
  });

  it('The status of the menu item if its calculator is active', () => {
    render(<CalculationType currentType='currency' name='currency' id='1' currentId='1' />);

    const child = screen.queryByTestId('typePoint')
    expect(child).toHaveClass('current');
  });
})