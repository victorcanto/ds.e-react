import React from 'react';
import { render } from '@testing-library/react';
import Color from './Color';

test('snapshot Color atom', () => {
  const { asFragment } = render(<Color hexCode='red' width='xl' height='xl' />);
  expect(asFragment()).toMatchSnapshot();
});
