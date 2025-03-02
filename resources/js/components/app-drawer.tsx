import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  // DrawerTrigger,
} from '@/components/ui/drawer';
import * as React from 'react';

// import { Button } from './ui/button';

interface Props {
  children?: React.ReactNode;
  open: boolean; // Ensure open is required to control the drawer
  onOpenChange: (open: boolean) => void; // Function to update the open state
}

export default function AppDrawer({ children, open, onOpenChange }: Props) {
  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
      {/* <DrawerTrigger asChild>
        <Button>Add Journal</Button>
      </DrawerTrigger> */}
      <DrawerContent className="md:max-w-2xl">
        <DrawerHeader className="border-b">
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  );
}
