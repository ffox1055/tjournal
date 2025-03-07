import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { Moon, Sun } from 'lucide-react';

export function AppSidebarHeader({
  breadcrumbs = [],
}: {
  breadcrumbs?: BreadcrumbItemType[];
}) {
  const { appearance, updateAppearance } = useAppearance();

  const handleTheme = () =>
    updateAppearance(appearance === 'dark' ? 'light' : 'dark');

  return (
    // <header className="border-sidebar-border/50 sticky flex h-16 shrink-0 items-center justify-between gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1 cursor-pointer" />
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
        <Button variant="ghost" onClick={handleTheme} aria-label="Toggle theme">
          {appearance === 'light' ? <Moon /> : <Sun />}
        </Button>
      </div>
    </header>
  );
}
