import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import _ from 'lodash';
import { useEffect, useMemo } from 'react';
// import { toast } from 'sonner';

interface AppLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
  const { toast } = useToast();
  const pageProps = usePage().props;
  const { errors } = pageProps;

  const hasErrors = useMemo(
    () => errors && typeof errors === 'object' && !_.isEmpty(errors),
    [errors],
  );

  useEffect(() => {
    if (hasErrors) {
      const errorMessage = Object.entries(errors)
        .map(([key, value]) => {
          const msg = Array.isArray(value) ? value.join(', ') : String(value);
          return `${key}: ${msg}`;
        })
        .join('\n'); // Join all error messages into a single string

      toast({
        description: errorMessage,
        variant: 'error',
      });
    }
  }, [hasErrors, errors, toast]);
  return (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
      {children}
      {/* <ToasterSonner
        richColors
        position="top-right"
        closeButton={true}
        visibleToasts={Infinity}
      /> */}

      <Toaster />
    </AppLayoutTemplate>
  );
};
