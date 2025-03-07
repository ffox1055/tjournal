import {
  SubmitHandler,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
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
import ControlledDatePikcer from '@/components/input/controlled-date-picker';
import ControlledTextArea from '@/components/input/controlled-text-area';
import ControlledInputFile from '@/components/input/controlled-input-file';
import AppSheet from '@/components/app-sheet';
import { SheetClose, SheetFooter } from '@/components/ui/sheet';

const FormInput = () => {
  const flashErr = usePage().props;

  // const { toast } = useToast();
  const { handleSubmit, control, reset } = useFormContext<Schema>();
  const { errors } = useFormState();

  // const image = useWatch({ control, name: 'imagePath' });
  // console.log('image', image);
  console.log('errors:', errors);

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Schema> = (data) => {
    setLoad(true);
    postJournal({
      journalData: data,
      setLoadingState: setLoad,
      toggleDrawer: setOpenDrawer,
    });
  };

  const handleDrawer = () => {
    reset();
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      {/* <Button onClick={() => handleDrawer()}>Open Drawer</Button> */}
      <Button onClick={() => console.log(flashErr)}>Log</Button>
      {/* <AppDrawer open={openDrawer} onOpenChange={setOpenDrawer}>
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tradeDuration">Duration</Label>
              <ControlledTextField<Schema>
                name="tradeDuration"
                id="tradeDuration"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason">Reason</Label>
              <ControlledTextArea<Schema>
                className="col-span-3 resize-none"
                placeholder="Tell your reason for this trade..."
                name="reason"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason">Upload Image</Label>
              <ControlledInputFile<Schema>
                name="image"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tradingDate">Trade Date</Label>
              <ControlledDatePikcer<Schema> name="tradingDate" />
            </div>
          </div>
        </form>
        <DrawerFooter className="items-end border-t">
          <div>
            <DrawerClose className="me-4" asChild>
              <Button variant="outline" onClick={() => handleDrawer()}>
                Cancel
              </Button>
            </DrawerClose>
            <Button onClick={handleSubmit(onSubmit)} disabled={load}>
              {load && <LoaderCircle className="animate-spin" />}
              Save
            </Button>
          </div>
        </DrawerFooter>
      </AppDrawer> */}

      <AppSheet>
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tradeDuration">Duration</Label>
              <ControlledTextField<Schema>
                name="tradeDuration"
                id="tradeDuration"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason">Reason</Label>
              <ControlledTextArea<Schema>
                className="col-span-3 resize-none"
                placeholder="Tell your reason for this trade..."
                name="reason"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason">Upload Image</Label>
              <ControlledInputFile<Schema>
                name="image"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tradingDate">Trade Date</Label>
              <ControlledDatePikcer<Schema> name="tradingDate" />
            </div>
          </div>
        </form>
        <SheetFooter className="items-end border-t">
          <div>
            <SheetClose className="me-4" asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button type="submit">Save changes</Button>
          </div>
        </SheetFooter>
      </AppSheet>
    </>
  );
};

export default FormInput;
