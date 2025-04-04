export interface ButtonProps {
  children: string | JSX.Element | JSX.Element[] | (string | number)[];
  style?: object;
  type?: string;
  large?: boolean;
  medium?: boolean;
  small?: boolean;
  onClick?: () => void;
}
