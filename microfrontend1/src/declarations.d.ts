declare module 'shell/components/Button' {
  import type React from 'react';

  export interface ButtonProps {
    color?: string;
    outline?: boolean;
    plain?: boolean;
    className?: string;
    children?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    [key: string]: string | number | boolean | React.ReactNode |
    ((event: React.SyntheticEvent) => void) | undefined;
  }

  export const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement | HTMLAnchorElement>>;
}
