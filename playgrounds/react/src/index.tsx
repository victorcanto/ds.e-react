import React from 'react';
import { createRoot } from 'react-dom/client';

import { Select } from '@ds.e/react';

import '@ds.e/sass/lib/Utilities.css';
import '@ds.e/sass/lib/Text.css';
import '@ds.e/sass/lib/Margin.css';
import '@ds.e/sass/lib/Select.css';
import '@ds.e/sass/lib/global.css';

const options = [
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

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <div style={{ padding: '40px' }}>
    <Select options={options} />
    <p>this is some text</p>
  </div>
);
