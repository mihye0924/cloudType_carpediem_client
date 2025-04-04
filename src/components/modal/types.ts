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
