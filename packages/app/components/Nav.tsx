'use client';

import { useState } from 'react';
import Link from 'next/link';
import { navItems, NavItem } from '@/lib/data';

const Nav = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <button
        data-collapse-toggle="nav"
        type="button"
        className="cursor-pointer inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="nav"
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <nav
        className={`absolute top-16 left-0 w-full md:relative md:top-0 md:block md:w-auto ${
          isExpanded ? `` : `hidden`
        }`}
        id="nav"
      >
        <ul className="flex flex-col p-4 md:p-0 mt-4 border-b bg-neutral-100 dark:bg-neutral-500 dark:text-white md:bg-transparent md:border-b-0 md:flex-row md:space-x-4 md:mt-0">
          {navItems.map((item: NavItem) => (
            <li key={item.label}>
              <Link
                href={item.path}
                onClick={() => setIsExpanded(false)}
                className="block py-2 pl-3 pr-4 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
