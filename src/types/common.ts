export interface AlertProps {
  title?: string;
  children: JSX.Element | JSX.Element[];
  onClose?: () => void;
  onYesButton?: () => void;
  onNoButton?: () => void;
  open: boolean;
}

export interface ButtonProps {
  children: string | JSX.Element | JSX.Element[] | (string | number)[];
  style?: object;
  type?: string;
  large?: boolean;
  medium?: boolean;
  small?: boolean;
  onClick?: () => void;
}

export interface DrawerProps {
  children: JSX.Element | JSX.Element[];
  open: boolean;
  onClose?: () => void;
}

export interface ModalProps {
  title?: string;
  children: JSX.Element | JSX.Element[];
  onClose?: () => void;
  onClick?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  open: boolean;
  nextBtn?: boolean;
  icon?: string;
  style?: object;
  darkMode?: boolean;
  nextTitle?: string;
}

export interface WriteType {
  modal: boolean;
  step: number;
}
