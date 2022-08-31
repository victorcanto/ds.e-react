import React from 'react';
import Select from './Select';

import { render, fireEvent } from '@testing-library/react';

const optionsMock = [
  {
    label: 'Strict Black',
    value: 'strict-black',
  },
  {
    label: 'Heavenly Green',
    value: 'heavenly-green',
  },
  {
    label: 'Sweet Pink',
    value: 'pink',
  },
];

const labelMock = 'THIS IS CUSTOM LABEL';

test('should renders all options passed to it', () => {
  const { getAllByRole, getByTestId } = render(
    <Select options={optionsMock} />
  );

  fireEvent.click(getByTestId('DseSelectButton'));

  expect(getAllByRole('menuitemradio')).toHaveLength(optionsMock.length);
});

test('renders options using custom renderOption method if passed as prop', () => {
  const { getAllByTestId, getByTestId } = render(
    <Select
      options={optionsMock}
      renderOption={({ option, getOptionRecommendedProps }) => {
        return (
          <li data-testid='CustomRenderOption' {...getOptionRecommendedProps()}>
            {option.label}
          </li>
        );
      }}
    />
  );

  fireEvent.click(getByTestId('DseSelectButton'));

  expect(getAllByTestId('CustomRenderOption')).toHaveLength(optionsMock.length);
});

test('calls the onOptionSelected prop with the selected option and its index if passed', () => {
  const onOptionSelectedMock = jest.fn();
  const { getAllByRole, getByTestId } = render(
    <Select options={optionsMock} onOptionSelected={onOptionSelectedMock} />
  );

  fireEvent.click(getByTestId('DseSelectButton'));

  fireEvent.click(getAllByRole('menuitemradio')[0]);

  expect(onOptionSelectedMock).toHaveBeenCalledWith(optionsMock[0], 0);
});

test('the button label changes to the selected option label', () => {
  const { getAllByRole, getByTestId } = render(
    <Select options={optionsMock} />
  );

  fireEvent.click(getByTestId('DseSelectButton'));

  fireEvent.click(getAllByRole('menuitemradio')[0]);

  expect(getByTestId('DseSelectButton')).toHaveTextContent(
    optionsMock[0].label
  );
});

test('snapshot of the selected option state', () => {
  const { getAllByRole, getByTestId, asFragment } = render(
    <Select options={optionsMock} />
  );

  fireEvent.click(getByTestId('DseSelectButton'));

  fireEvent.click(getAllByRole('menuitemradio')[0]);

  expect(asFragment()).toMatchSnapshot();
});

test('snapshot of the base state', () => {
  const { asFragment } = render(<Select options={optionsMock} />);

  expect(asFragment()).toMatchSnapshot();
});

test('snapshot of the options menu open state', () => {
  const { getByTestId, asFragment } = render(<Select options={optionsMock} />);

  fireEvent.click(getByTestId('DseSelectButton'));

  expect(asFragment()).toMatchSnapshot();
});

test('can customize select label', () => {
  const { getByText } = render(
    <Select options={optionsMock} label={labelMock} />
  );

  expect(getByText(labelMock)).toBeInTheDocument();
});
