import {
  SubmitHandler,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import ControlledTextField from '@/components/input/controlled-text-field';
import { defaultValues, Schema } from '@/types/journal/schema';
import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { postJournal } from '@/services/journal/mutation';
import ControlledDatePikcer from '@/components/input/controlled-date-picker';
import ControlledTextArea from '@/components/input/controlled-text-area';
import ControlledInputFile from '@/components/input/controlled-input-file';
import AppSheet from '@/components/app-sheet';
import { SheetClose, SheetFooter, SheetTrigger } from '@/components/ui/sheet';
import ControlledToggleGroup from '@/components/input/controlled-toggle-group';
import { StatusOption } from '../_constants/data';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FormInputSheetProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  journalDetail: Schema | null;
}

const FormInputSheet = ({
  isOpen,
  onOpenChange,
  journalDetail,
}: FormInputSheetProps) => {
  const flashErr = usePage().props;

  const { handleSubmit, control, reset } = useFormContext<Schema>();
  const { errors } = useFormState();
  const variant = useWatch({ control, name: 'variant' });

  // const image = useWatch({ control, name: 'image' });
  // console.log('image', image);
  console.log('errors:', errors);

  const [load, setLoad] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Schema> = (data) => {
    setLoad(true);

    if (variant === 'create') {
      postJournal({
        journalData: data,
        setLoadingState: setLoad,
        toggleFormOpen: onOpenChange,
      });
    } else {
      console.log(data);
    }

    // reset(defaultValues);
  };

  useEffect(() => {
    if (journalDetail) {
      reset(journalDetail);
    } else {
      reset(defaultValues);
    }
  }, [journalDetail, reset]);

  return (
    <>
      <Button onClick={() => console.log(flashErr)}>Log</Button>
      <AppSheet
        onOpenChange={onOpenChange}
        open={isOpen}
        trigger={
          <SheetTrigger asChild>
            <Button>Open</Button>
          </SheetTrigger>
        }
        sheetTitle={`${variant === 'create' ? 'Create' : 'Update'} trade journal`}
        sheetDescription="This action cannot be undone. This will permanently delete your
            account and remove your data from our servers."
      >
        <ScrollArea>
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
                <div className="col-span-3 space-y-2">
                  {variant === 'update' && (
                    <img
                      className="w-full rounded-md object-cover"
                      src={journalDetail?.image as string | undefined}
                      alt="trade-img"
                    />
                  )}
                  <ControlledInputFile<Schema> name="image" />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tradingDate">Trade Date</Label>
                <ControlledDatePikcer<Schema> name="tradingDate" />
              </div>

              {variant === 'update' && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tradingDate">Status</Label>
                  <ControlledToggleGroup<Schema>
                    name="status"
                    options={StatusOption}
                  />
                </div>
              )}
            </div>
          </form>
        </ScrollArea>
        <SheetFooter className="items-end border-t">
          <div>
            <SheetClose className="me-4" asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button onClick={handleSubmit(onSubmit)} disabled={load}>
              {load && <LoaderCircle className="animate-spin" />}
              Save
            </Button>
          </div>
        </SheetFooter>
      </AppSheet>
    </>
  );
};

export default FormInputSheet;
