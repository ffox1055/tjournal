import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from './ui/button';

export default function AppDrawer({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button>Add Journal</Button>
            </DrawerTrigger>
            <DrawerContent className="md:max-w-2xl">
                <DrawerHeader className="border-b">
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>
                        This action cannot be undone.
                    </DrawerDescription>
                </DrawerHeader>
                {children}
            </DrawerContent>
        </Drawer>
    );
}
