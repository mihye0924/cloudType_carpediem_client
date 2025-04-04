export interface DrawerProps {
  children: JSX.Element | JSX.Element[];
  open: boolean;
  onClose?: () => void;
}
