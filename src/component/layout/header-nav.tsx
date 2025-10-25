'use client';

import {Button} from '@/component/ui/button';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/component/ui/dropdown-menu';
import {Link, usePathname} from '@/i18n/routing';
import {cn} from '@/lib/utils';
import {ChevronDownIcon} from 'lucide-react';

type NavigationItem = {
  name: string;
  href: '/' | '/guestbook' | '/portfolio' | '/instagram' | '/pokemon';
};

interface HeaderNavProps {
  siteName: string;
  navigationItems: NavigationItem[];
}

export function HeaderNav({siteName, navigationItems}: HeaderNavProps) {
  const pathname = usePathname();

  return (
    <>
      {/* 로고 - 데스크톱에서만 표시 */}
      <div className="m-4 hidden md:flex">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block">{siteName}</span>
        </Link>
      </div>

      {/* 모바일 드롭다운 메뉴 - md 미만에서만 표시 */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="font-bold" asChild>
            <Button variant="ghost" size="sm">
              {siteName}
              <ChevronDownIcon className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {navigationItems.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link href={item.href} className="w-full">
                  {item.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 데스크톱 네비게이션 - md 이상에서만 표시 */}
      <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'transition-colors hover:text-foreground/80',
              pathname === item.href ? 'text-foreground' : 'text-foreground/60',
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </>
  );
}
