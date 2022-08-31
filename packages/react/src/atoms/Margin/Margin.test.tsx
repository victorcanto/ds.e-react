import React from 'react';
import { render } from '@testing-library/react';
import Margin from './Margin';

test('snapshot Margin atom', () => {
  const { asFragment } = render(
    <Margin left space='xl'>
      <span>this is some text</span>
    </Margin>
  );
  expect(asFragment()).toMatchSnapshot();
});
