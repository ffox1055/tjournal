import { useForm, SubmitHandler } from 'react-hook-form';
import { router } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppDrawer from '@/components/app-drawer';
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer';

type Inputs = {
  token_name: string;
  risk_reward_ratio: string;
};

const FormInput = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    router.post('/journal', {
      ...data,
    });
  };

  return (
    <AppDrawer>
      <form>
        <div className="grid gap-4 px-6 py-6">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="token">Token</Label>
            <Input {...register('token_name')} id="token" className="col-span-3" placeholder="Token name..." />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="risk_reward_ratio">Risk/Reward</Label>
            <Input
              {...register('risk_reward_ratio')}
              id="risk_reward_ratio"
              className="col-span-3"
              placeholder="risk reward..."
            />
          </div>
        </div>
      </form>
      <DrawerFooter className="items-end border-t">
        <div>
          <DrawerClose className="me-4" asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button onClick={handleSubmit(onSubmit)}>Save changes</Button>
        </div>
      </DrawerFooter>
    </AppDrawer>
  );
};

export default FormInput;
