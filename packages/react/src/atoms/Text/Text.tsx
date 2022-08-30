import React from 'react';
import { FontSize } from '@ds.e/foundation';

export interface TextProps {
  size?: keyof typeof FontSize;
  children?: React.ReactNode;
}

const Text = ({ size = FontSize.base, children }: TextProps) => {
  const className = `dse-text dse-text-${size}`;

  return <p className={className}>{children}</p>;
};

export default Text;
