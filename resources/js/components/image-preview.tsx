import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Props {
  image: string;
  isOpen: boolean;
  setIsOpen?: (value: boolean) => void;
}

const ImagePreview = ({ image, setIsOpen, isOpen }: Props) => {
  console.log(image);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-h-4/5 w-auto overflow-hidden px-0 pb-0 lg:max-w-none">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="h-full w-full">
          <img
            src={image}
            alt="Trade history"
            className="h-full w-full object-cover"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreview;
