export interface AlertProps {
  title?: string;
  children: JSX.Element | JSX.Element[];
  onClose?: () => void;
  onYesButton?: () => void;
  onNoButton?: () => void;
  open: boolean;
}
