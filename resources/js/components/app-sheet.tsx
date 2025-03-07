import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

interface AppSheetProps extends React.ComponentPropsWithRef<typeof Sheet> {
  children: React.ReactNode;
  trigger: React.ReactNode;
  sheetTitle?: string;
  sheetDescription?: string;
}

export default function AppSheet({
  children,
  trigger,
  sheetTitle,
  sheetDescription,
  ...props
}: AppSheetProps) {
  return (
    <Sheet {...props}>
      {trigger}
      <SheetContent className="w-3xl md:max-w-2xl xl:max-w-5xl">
        <SheetHeader className="border-b">
          <SheetTitle>{sheetTitle}</SheetTitle>
          <SheetDescription>{sheetDescription}</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
