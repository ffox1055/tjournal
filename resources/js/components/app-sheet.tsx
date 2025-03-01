import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from './ui/button';

export default function AppSheet({ children }: { children?: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Add New</Button>
      </SheetTrigger>
      <SheetContent className="w-4xl md:max-w-2xl xl:max-w-7xl">{children}</SheetContent>
    </Sheet>
  );
}
