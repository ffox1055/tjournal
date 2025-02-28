import AppSheet from '@/components/app-sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    SheetClose,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';

const Form = () => {
    return (
        <AppSheet>
            <SheetHeader className="border-b p-6">
                <SheetTitle>Create new journal?</SheetTitle>
                <SheetDescription>Create your journal data</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 px-6 py-6">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="token">Token</Label>
                    <Input
                        id="token"
                        className="col-span-3"
                        placeholder="Token name..."
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="risk_reward_ratio">Risk/Reward</Label>
                    <Input
                        id="risk_reward_ratio"
                        className="col-span-3"
                        placeholder="risk reward..."
                    />
                </div>
            </div>
            <SheetFooter className="items-end border-t p-6">
                <div>
                    <SheetClose className="me-2" asChild>
                        <Button variant="outline">Cancel</Button>
                    </SheetClose>
                    <Button type="submit">Save changes</Button>
                </div>
            </SheetFooter>
        </AppSheet>
    );
};

export default Form;
