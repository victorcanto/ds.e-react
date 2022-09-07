import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import Select, { SelectProps } from './Select';
import { labelMock, optionsMock } from './mocks';

import '@ds.e/sass/lib/Select.css';

export default {
  title: 'Molecules|Select',
  decorators: [withA11y],
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Common = Template.bind({});
Common.args = {
  options: optionsMock,
} as SelectProps;

export const RenderOption = Template.bind({});
RenderOption.args = {
  options: optionsMock,
  renderOption: ({ getOptionRecommendedProps, option, isSelected }) => (
    <span {...getOptionRecommendedProps()}>
      {option.label} {isSelected ? 'SELECTED' : ''}
    </span>
  ),
} as SelectProps;

export const CustomLabel = Template.bind({});
CustomLabel.args = {
  options: optionsMock,
  label: labelMock,
} as SelectProps;
