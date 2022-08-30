import React from 'react';
import { createRoot } from 'react-dom/client';

import { Text, Margin } from '@ds.e/react';
import '@ds.e/scss/lib/Text.css';
import '@ds.e/scss/lib/Margin.css';
import '@ds.e/scss/lib/Utilities.css';
import '@ds.e/scss/lib/global.css';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <div>
    <Margin>
      <Text size='xl'>this is some text</Text>
    </Margin>
  </div>
);
