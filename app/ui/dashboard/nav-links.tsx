"use client";
import {
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { DarkThemeProvider } from '@/app/ui/themes/dark';
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Fish',
    href: '/dashboard/fish',
    icon: DocumentDuplicateIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-800 p-3 text-sm font-medium text-gray-200 hover:bg-gray-700 hover:text-blue-400 md:flex-none md:justify-start md:p-2 md:px-3 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700',
              {
                'bg-gray-700 text-blue-400 dark:bg-gray-700 dark:text-blue-400': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}