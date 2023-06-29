'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { ReactNode, FunctionComponent } from 'react';
import { UrlObject } from 'url';
declare type Url = string | UrlObject;

interface LinkProps {
  children: ReactNode;
  href: Url;
  type?: 'internal' | 'external';
  className?: string;
  currentClassName?: string;
  onClick?: () => null;
  newWindow?: boolean;
}

const Link: FunctionComponent<LinkProps> = ({
  children,
  href,
  type,
  className,
  currentClassName,
  newWindow,
}) => {
  const pathname = usePathname();
  const isCurrent = pathname.includes(href.toString());

  let classes = classNames(className, {
    current: isCurrent,
  });

  if (isCurrent) {
    classes = classNames(classes, currentClassName);
  }

  if (type === 'external') {
    return (
      <a
        className={classes}
        href={href?.toString()}
        target={newWindow ? '_blank' : undefined}
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink
      className={classes}
      href={href.toString()}
      target={newWindow ? '_blank' : undefined}
      rel="noreferrer"
      scroll
    >
      {children}
    </NextLink>
  );
};

export default Link;
