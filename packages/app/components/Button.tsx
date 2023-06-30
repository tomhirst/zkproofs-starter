import { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';

import { UrlObject } from 'url';
declare type Url = string | UrlObject;

interface ButtonProps {
  children: ReactNode;
  href?: Url;
  type?: 'submit' | 'button' | 'internal' | 'external';
  className?: string;
  onClick?: () => void;
  loading?: boolean;
  muted?: boolean;
  disabled?: boolean;
  newWindow?: boolean;
  large?: boolean;
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  href,
  type,
  className,
  onClick,
  loading = false,
  muted,
  large,
  disabled,
  newWindow,
}) => {
  const defaultClasses = `rounded w-full ${
    large ? `py-3 px-4 text-sm sm:text-base` : `py-2 px-4 text-xs sm:text-sm`
  } uppercase font-bold hover:opacity-90 flex space-x-2 items-center justify-center whitespace-nowrap disabled:opacity-50`;
  const colorClasses = muted ? 'bg-gray-100 text-gray-900' : 'bg-primary text-white z-10 relative';
  const classes = classNames(defaultClasses, colorClasses, className);

  if (type === 'submit') {
    return (
      <div className="relative">
        <button className={classes} onClick={onClick} type="submit" disabled={disabled}>
          {loading ? 'Loading...' : children}
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <button className={classes} onClick={onClick} type="button" disabled={disabled}>
        {loading ? 'Loading...' : children}
      </button>
    </div>
  );
};

export default Button;
