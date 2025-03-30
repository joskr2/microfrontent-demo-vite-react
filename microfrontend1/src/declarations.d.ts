declare module 'shell/components' {
  export * from 'shell/components/Button';
  export * from 'shell/components/Avatar';
  export * from 'shell/components/Alert';
  export * from 'shell/components/Checkbox';
  export * from 'shell/components/Dialog';
  export * from 'shell/components/Divider';
  export * from 'shell/components/Dropdown';
  export * from 'shell/components/Fieldset';
  export * from 'shell/components/Input';
  export * from 'shell/components/Link';
  export * from 'shell/components/Listbox';
  export * from 'shell/components/Select';
  export * from 'shell/components/Table';
  export * from 'shell/components/Text';
  export * from 'shell/components/DescriptionList';
}

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
    ((event: React.SyntheticEvent<Element, Event>) => void) | undefined;
  }

  export const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement | HTMLAnchorElement>>;
}

declare module 'shell/components/Avatar' {
  import type React from 'react';

  export interface AvatarProps {
    src?: string | null;
    square?: boolean;
    initials?: string;
    alt?: string;
    className?: string;
  }

  export interface AvatarButtonProps extends AvatarProps {
    href?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    [key: string]: string | number | boolean | React.ReactNode |
    ((event: React.SyntheticEvent<Element, Event>) => void) | undefined | null;
  }

  export const Avatar: React.FC<AvatarProps & React.ComponentPropsWithoutRef<'span'>>;
  export const AvatarButton: React.ForwardRefExoticComponent<AvatarButtonProps & React.RefAttributes<HTMLButtonElement | HTMLAnchorElement>>;
}

declare module 'shell/components/Alert' {
  import type React from 'react';
  import type { DialogProps as HeadlessDialogProps, DialogTitleProps as HeadlessDialogTitleProps, DescriptionProps as HeadlessDescriptionProps } from '@headlessui/react';

  export interface AlertProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
    className?: string;
    children: React.ReactNode;
  }

  export const Alert: React.FC<AlertProps & Omit<HeadlessDialogProps, 'as' | 'className'>>;
  export const AlertTitle: React.FC<{ className?: string } & Omit<HeadlessDialogTitleProps, 'as' | 'className'>>;
  export const AlertDescription: React.FC<{ className?: string } & Omit<HeadlessDescriptionProps, 'as' | 'className'>>;
}

declare module 'shell/components/Checkbox' {
  import type React from 'react';
  import type { FieldProps as HeadlessFieldProps, CheckboxProps as HeadlessCheckboxProps } from '@headlessui/react';

  export const CheckboxGroup: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const CheckboxField: React.FC<{ className?: string } & Omit<HeadlessFieldProps, 'as' | 'className'>>;
  export const Checkbox: React.FC<{ color?: string; className?: string } & Omit<HeadlessCheckboxProps, 'as' | 'className'>>;
}

declare module 'shell/components/Dialog' {
  import type React from 'react';
  import type { DialogProps as HeadlessDialogProps, DialogTitleProps as HeadlessDialogTitleProps, DescriptionProps as HeadlessDescriptionProps } from '@headlessui/react';

  export interface DialogProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
    className?: string;
    children: React.ReactNode;
  }

  export const Dialog: React.FC<DialogProps & Omit<HeadlessDialogProps, 'as' | 'className'>>;
  export const DialogTitle: React.FC<{ className?: string } & Omit<HeadlessDialogTitleProps, 'as' | 'className'>>;
  export const DialogDescription: React.FC<{ className?: string } & Omit<HeadlessDescriptionProps, 'as' | 'className'>>;
  export const DialogBody: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const DialogActions: React.FC<React.ComponentPropsWithoutRef<'div'>>;
}

declare module 'shell/components/Divider' {
  import type React from 'react';

  export interface DividerProps {
    soft?: boolean;
    className?: string;
  }

  export const Divider: React.FC<DividerProps & React.ComponentPropsWithoutRef<'hr'>>;
}

declare module 'shell/components/Dropdown' {
  import type React from 'react';
  import type { MenuProps as HeadlessMenuProps, MenuButtonProps as HeadlessMenuButtonProps, MenuItemsProps as HeadlessMenuItemsProps, MenuItemProps as HeadlessMenuItemProps, DescriptionProps as HeadlessDescriptionProps } from '@headlessui/react';
  import type { ButtonProps } from 'shell/components/Button';

  export const Dropdown: React.FC<HeadlessMenuProps>;
  export const DropdownButton: React.FC<{ className?: string } & Omit<HeadlessMenuButtonProps<React.ElementType>, 'className'> & Pick<ButtonProps, 'color'>>;
  export const DropdownMenu: React.FC<{ anchor?: string; className?: string } & Omit<HeadlessMenuItemsProps, 'as' | 'className'>>;
  export const DropdownItem: React.FC<{ className?: string } & Omit<HeadlessMenuItemProps<React.ElementType>, 'as' | 'className'>>;
  export const DropdownDescription: React.FC<{ className?: string } & Omit<HeadlessDescriptionProps, 'as' | 'className'>>;
}

declare module 'shell/components/Fieldset' {
  import type React from 'react';
  import type { FieldsetProps as HeadlessFieldsetProps, LegendProps as HeadlessLegendProps, FieldProps as HeadlessFieldProps, LabelProps as HeadlessLabelProps, DescriptionProps as HeadlessDescriptionProps, ErrorMessageProps as HeadlessErrorMessageProps } from '@headlessui/react';

  export const Fieldset: React.FC<{ className?: string } & Omit<HeadlessFieldsetProps, 'as' | 'className'>>;
  export const Legend: React.FC<{ className?: string } & Omit<HeadlessLegendProps, 'as' | 'className'>>;
  export const FieldGroup: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Field: React.FC<{ className?: string } & Omit<HeadlessFieldProps, 'as' | 'className'>>;
  export const Label: React.FC<{ className?: string } & Omit<HeadlessLabelProps, 'as' | 'className'>>;
  export const Description: React.FC<{ className?: string } & Omit<HeadlessDescriptionProps, 'as' | 'className'>>;
  export const ErrorMessage: React.FC<{ className?: string } & Omit<HeadlessErrorMessageProps, 'as' | 'className'>>;
}

declare module 'shell/components/Input' {
  import type React from 'react';
  import type { InputProps as HeadlessInputProps } from '@headlessui/react';

  export interface InputProps {
    className?: string;
    type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url' | 'date' | 'datetime-local' | 'month' | 'time' | 'week';
  }

  export const InputGroup: React.FC<React.ComponentPropsWithoutRef<'span'>>;
  export const Input: React.ForwardRefExoticComponent<InputProps & Omit<HeadlessInputProps, 'as' | 'className'> & React.RefAttributes<HTMLInputElement>>;
}

declare module 'shell/components/Link' {
  import type React from 'react';
  import type { LinkHTMLAttributes } from 'react';

  export interface LinkProps extends LinkHTMLAttributes<HTMLAnchorElement> {
    className?: string;
    children?: React.ReactNode;
  }

  export const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
}

declare module 'shell/components/Listbox' {
  import type React from 'react';
  import type { ListboxProps as HeadlessListboxProps, ListboxButtonProps as HeadlessListboxButtonProps, ListboxOptionsProps as HeadlessListboxOptionsProps, ListboxOptionProps as HeadlessListboxOptionProps, DescriptionProps as HeadlessDescriptionProps } from '@headlessui/react';

  export interface ListboxProps<T> {
    className?: string;
    placeholder?: React.ReactNode;
    autoFocus?: boolean;
    'aria-label'?: string;
    children?: React.ReactNode;
  }

  export function Listbox<T>(props: ListboxProps<T> & Omit<HeadlessListboxProps<T, T>, 'as' | 'multiple'>): JSX.Element;
  export const ListboxButton: React.FC<{ className?: string } & Omit<HeadlessListboxButtonProps, 'as' | 'className'>>;
  export const ListboxOptions: React.FC<{ className?: string } & Omit<HeadlessListboxOptionsProps, 'as' | 'className'>>;
  export const ListboxOption: React.FC<{ className?: string; value: unknown } & Omit<HeadlessListboxOptionProps<React.ElementType>, 'as' | 'className' | 'value'>>;
  export const ListboxDescription: React.FC<React.ComponentPropsWithoutRef<'span'>>;
}

declare module 'shell/components/Select' {
  import type React from 'react';
  import type * as Headless from '@headlessui/react';

  export interface SelectProps {
    className?: string;
    multiple?: boolean;
  }

  export const Select: React.ForwardRefExoticComponent<SelectProps & Omit<Headless.SelectProps, 'as' | 'className'> & React.RefAttributes<HTMLSelectElement>>;
}

declare module 'shell/components/Table' {
  import type React from 'react';

  export interface TableProps {
    bleed?: boolean;
    dense?: boolean;
    grid?: boolean;
    striped?: boolean;
    className?: string;
  }

  export const Table: React.FC<TableProps & React.ComponentPropsWithoutRef<'div'>>;
  export const TableHead: React.FC<React.ComponentPropsWithoutRef<'thead'>>;
  export const TableBody: React.FC<React.ComponentPropsWithoutRef<'tbody'>>;
  export const TableRow: React.FC<{ href?: string; target?: string; title?: string } & React.ComponentPropsWithoutRef<'tr'>>;
  export const TableHeader: React.FC<React.ComponentPropsWithoutRef<'th'>>;
  export const TableCell: React.FC<React.ComponentPropsWithoutRef<'td'>>;
}

declare module 'shell/components/Text' {
  import type React from 'react';

  export interface TextProps {
    className?: string;
    as?: React.ElementType;
  }

  export const Text: React.FC<TextProps & React.ComponentPropsWithoutRef<'p'>>;
}

declare module 'shell/components/DescriptionList' {
  import type React from 'react';

  export const DescriptionList: React.FC<React.ComponentPropsWithoutRef<'dl'>>;
  export const DescriptionTerm: React.FC<React.ComponentPropsWithoutRef<'dt'>>;
  export const DescriptionDetails: React.FC<React.ComponentPropsWithoutRef<'dd'>>;
}
