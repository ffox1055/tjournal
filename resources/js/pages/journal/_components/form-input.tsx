import { SubmitHandler, useFormContext, useWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SheetClose, SheetFooter, SheetTrigger } from '@/components/ui/sheet';
import AppSheet from '@/components/app-sheet';
import { LoaderCircle, Plus } from 'lucide-react';

import ControlledTextField from '@/components/input/controlled-text-field';
import ControlledDatePicker from '@/components/input/controlled-date-picker';
import ControlledTextArea from '@/components/input/controlled-text-area';
import ControlledInputFile from '@/components/input/controlled-input-file';
import ControlledToggleGroup from '@/components/input/controlled-toggle-group';

import { putJournal, postJournal } from '@/services/journal/mutation';
import { defaultValues, Schema } from '@/types/journal/schema';
import { StatusOption } from '../_constants/data';
import useLoadingStore from '@/store/loading-store';
import ImagePreview from '@/components/image-preview';

interface FormInputProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  journalDetail: Schema | null;
}

const FormInput = ({ isOpen, onOpenChange, journalDetail }: FormInputProps) => {
  const { handleSubmit, control, reset } = useFormContext<Schema>();
  const variant = useWatch({ control, name: 'variant' });
  const { isFormLoading, setIsFormLoading } = useLoadingStore();
  const [previewImage, setPreviewImage] = useState<string>('');
  const [isImageOpen, setIsImageOpen] = useState<boolean>(false);

  // Handle form submission
  const onSubmit: SubmitHandler<Schema> = (data) => {
    setIsFormLoading(true);

    const mutation = variant === 'create' ? postJournal : putJournal;

    mutation({
      journalData: data,
      setLoadingState: setIsFormLoading,
      toggleFormOpen: onOpenChange,
    });
  };

  // Reset form values when modal opens with journal data
  useEffect(() => {
    reset(journalDetail ?? defaultValues);
  }, [journalDetail, reset]);

  return (
    <>
      <AppSheet
        onOpenChange={(val) => {
          reset(defaultValues);
          return onOpenChange(val);
        }}
        open={isOpen}
        trigger={
          <SheetTrigger asChild>
            <Button disabled={isFormLoading}>
              <Plus /> Add new trade
            </Button>
          </SheetTrigger>
        }
        sheetTitle={`${variant === 'create' ? 'Create' : 'Update'} Trade Journal`}
        sheetDescription="Record and manage your trade details efficiently. You can update this information later if needed."
      >
        <form className="overflow-y-auto">
          <div className="grid gap-4 px-6 py-6">
            {/* Token Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="token">Token</Label>
              <ControlledTextField
                name="tokenName"
                id="token"
                placeholder="Enter token name (e.g., BTC, ETH)"
                className="col-span-3"
              />
            </div>

            {/* Risk/Reward */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="riskRewardRatio">Risk/Reward</Label>
              <ControlledTextField
                name="riskRewardRatio"
                id="riskRewardRatio"
                placeholder="Enter RR ratio (e.g., 3.5) (Optional)"
                className="col-span-3"
              />
            </div>

            {/* Trade Duration */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tradeDuration">Duration</Label>
              <ControlledTextField
                name="tradeDuration"
                id="tradeDuration"
                placeholder="Enter duration in minutes (e.g., 15) (Optional)"
                className="col-span-3"
              />
            </div>

            {/* Trade Reason */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason">Reason</Label>
              <ControlledTextArea
                name="reason"
                className="col-span-3 resize-none"
                placeholder="Describe why you took this trade..."
              />
            </div>

            {/* Image Preview (Update Only) */}
            {variant === 'update' && journalDetail?.image && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="preview">Preview</Label>
                  <div
                    className="border-foreground col-span-3 overflow-hidden rounded-2xl border-2 shadow"
                    onClick={() => {
                      setIsImageOpen(!isImageOpen);
                      setPreviewImage(journalDetail.image as string);
                    }}
                  >
                    <img
                      className="max-h-80 w-full object-cover"
                      src={journalDetail.image as string}
                      alt="trade-img"
                    />
                  </div>
                </div>

                <ImagePreview
                  isOpen={isImageOpen}
                  setIsOpen={setIsImageOpen}
                  image={previewImage}
                />
              </>
            )}

            {/* Image Upload */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image">Upload Image</Label>
              <ControlledInputFile name="image" className="col-span-3" />
            </div>

            {/* Trade Date */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tradingDate">Trade Date</Label>
              <ControlledDatePicker name="tradingDate" />
            </div>

            {/* Status */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status">Status</Label>
              <ControlledToggleGroup
                name="status"
                options={StatusOption}
                className="col-span-3"
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <SheetFooter className="items-end border-t">
          <div>
            <SheetClose asChild>
              <Button
                variant="outline"
                className="me-4"
                onClick={() => reset()}
              >
                Cancel
              </Button>
            </SheetClose>
            <Button onClick={handleSubmit(onSubmit)} disabled={isFormLoading}>
              {isFormLoading && <LoaderCircle className="animate-spin" />}
              Save
            </Button>
          </div>
        </SheetFooter>
      </AppSheet>
    </>
  );
};

export default FormInput;
