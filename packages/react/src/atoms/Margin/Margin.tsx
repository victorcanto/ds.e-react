import React from 'react';
import { Spacing } from '@ds.e/foundation';

export interface MarginProps {
  space?: keyof typeof Spacing;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
  children: React.ReactNode;
}

const Margin = ({
  space = 'xxxs',
  children,
  left,
  right,
  top,
  bottom,
}: MarginProps) => {
  let className = ``;

  switch (true) {
    case left:
      className = `${className} dse-margin-left-${space}`;
      break;
    case right:
      className = `${className} dse-margin-right-${space}`;
      break;
    case top:
      className = `${className} dse-margin-top-${space}`;
      break;
    case bottom:
      className = `${className} dse-margin-bottom-${space}`;
      break;
    default:
      className = `dse-margin-${space}`;
      break;
  }

  return <div className={className}>{children}</div>;
};

export default Margin;
