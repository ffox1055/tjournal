import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { useCallback } from 'react';

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
  const handleClickOutside = useCallback(
    (e: CustomEvent<{ originalEvent: PointerEvent | FocusEvent }>) => {
      const targetNode = document.querySelector('.toaster');

      if (
        e.target &&
        targetNode &&
        targetNode?.contains(e.target as HTMLElement)
      ) {
        e.preventDefault();
      }
    },
    [],
  );

  return (
    <Sheet {...props}>
      {trigger}
      <SheetContent
        className="md:w-2xl md:max-w-3xl"
        onPointerDownOutside={handleClickOutside}
        onInteractOutside={handleClickOutside}
      >
        <SheetHeader className="border-b">
          <SheetTitle>{sheetTitle}</SheetTitle>
          <SheetDescription>{sheetDescription}</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
