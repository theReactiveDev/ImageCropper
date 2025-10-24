import cn from 'classnames';

import style from './button.module.css';

interface IButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark';
  disabled?: boolean;
}

export const Button = ({
  children,
  className,
  onClick,
  variant = 'light',
  ...restProps
}: IButtonProps) => {
  return (
    <button
      className={cn(style.button, style[variant], className)}
      onClick={onClick}
      type="button"
      {...restProps}
    >
      {children}
    </button>
  );
};
