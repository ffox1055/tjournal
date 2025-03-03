import { SubmitHandler, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppDrawer from '@/components/app-drawer';
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer';
import ControlledTextField from '@/components/input/controlled-text-field';
import { Schema } from '@/types/journal/schema';
import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { postJournal } from '@/services/journal/mutation';

interface IErr {
  message: string | null;
}

const FormInput = () => {
  const flashErr = usePage().props.err as IErr;

  // const { toast } = useToast();
  const { handleSubmit } = useFormContext<Schema>();

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Schema> = (data) => {
    setLoad(true);
    postJournal(data, setLoad);
  };

  return (
    <>
      <Button onClick={() => setOpenDrawer(true)}>Open Drawer</Button>
      <Button onClick={() => console.log(flashErr)}>Log</Button>
      <AppDrawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <form>
          <div className="grid gap-4 px-6 py-6">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="token">Token</Label>
              <ControlledTextField<Schema>
                name="tokenName"
                id="token"
                placeholder="Token name..."
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="riskRewardRatio">Risk/Reward</Label>
              <ControlledTextField<Schema>
                name="riskRewardRatio"
                id="riskRewardRatio"
                className="col-span-3"
              />
            </div>
          </div>
        </form>
        <DrawerFooter className="items-end border-t">
          <div>
            <DrawerClose className="me-4" asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
            <Button onClick={handleSubmit(onSubmit)} disabled={load}>
              {load && <LoaderCircle className="animate-spin" />}
              Create Journal
            </Button>
          </div>
        </DrawerFooter>
      </AppDrawer>
    </>
  );
};

export default FormInput;
