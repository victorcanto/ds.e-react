import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import Margin, { MarginProps } from './Margin';

import { Spacing } from '@ds.e/foundation';

export default {
  title: 'Atoms|Margin',
} as ComponentMeta<typeof Margin>;

const Template: ComponentStory<typeof Margin> = ({ children, ...args }) => (
  <Margin {...args}>{children}</Margin>
);

export const Common = Template.bind({});
Common.args = {
  children: <p>this is some text</p>,
} as MarginProps;

export const CustomDimensions = Template.bind({});
CustomDimensions.args = {
  children: <p>this is some text</p>,
  space: select('Space', Object.values(Spacing), 'xl'),
} as MarginProps;

export const CustomPositions = Template.bind({});
CustomPositions.args = {
  children: <span>this is some text</span>,
  space: select('Space', Object.values(Spacing), 'xxl'),
  left: select('Left', [true, false], false),
  right: select('Right', [true, false], false),
  top: select('Top', [true, false], false),
  bottom: select('Bottom', [true, false], false),
} as MarginProps;
