import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

interface AppSheetProps extends React.ComponentPropsWithRef<typeof Sheet> {
  children: React.ReactNode;
}

export default function AppSheet({ children, ...props }: AppSheetProps) {
  return (
    <Sheet {...props}>
      <SheetContent
        aria-describedby=""
        className="w-4xl md:max-w-2xl xl:max-w-7xl"
      >
        <SheetHeader className="border-b">
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
