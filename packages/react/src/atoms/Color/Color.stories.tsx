import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import Color, { ColorProps } from './Color';

import { Spacing } from '@ds.e/foundation';

import '@ds.e/sass/lib/Utilities.css';

export default {
  title: 'Atoms|Color',
} as ComponentMeta<typeof Color>;

const Template: ComponentStory<typeof Color> = (args) => <Color {...args} />;

export const Common = Template.bind({});
Common.args = {
  hexCode: text('HexCode', 'red'),
} as ColorProps;

export const CustomDimensions = Template.bind({});
CustomDimensions.args = {
  hexCode: text('HexCode', 'red'),
  width: select('Width', Object.values(Spacing), 'xxl'),
  height: select('Height', Object.values(Spacing), 'xxl'),
} as ColorProps;
