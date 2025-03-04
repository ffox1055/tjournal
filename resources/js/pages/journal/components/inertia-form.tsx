import { Button } from '@/components/ui/button';
import AppDrawer from '@/components/app-drawer';
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer';
import { FormEventHandler, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const InertiaForm = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    token_name: 'TIA',
    risk_reward_ratio: '',
  });

  console.log(processing);

  const submit: FormEventHandler = (e) => {
    console.log('ok');

    e.preventDefault();
    post(route('journal.store'), {
      onError: (e) => {
        console.log(e);
      },
      onSuccess: (s) => {
        console.log('abs', s);
      },
    });
  };

  return (
    <>
      <Button onClick={() => setOpenDrawer(true)}>Open Drawer</Button>

      <AppDrawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <form onSubmit={submit}>
          <div className="grid gap-4 px-6 py-6">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="token">Token name</Label>
              <Input
                id="token"
                required
                autoFocus
                tabIndex={1}
                autoComplete="off"
                value={data.token_name}
                onChange={(e) => setData('token_name', e.target.value)}
                placeholder="BTC/ETH/TIA/SOL etc..."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="risk_reward">RR</Label>
              <Input
                id="risk_reward"
                required
                autoFocus
                tabIndex={2}
                autoComplete="off"
                value={data.risk_reward_ratio}
                onChange={(e) => setData('risk_reward_ratio', e.target.value)}
                placeholder="1"
              />
            </div>
          </div>
        </form>
        <DrawerFooter className="items-end border-t">
          <div>
            <DrawerClose className="me-4" asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
            <Button
              onClick={(e) => {
                submit(e);
              }}
              disabled={processing}
            >
              {processing && <LoaderCircle className="animate-spin" />}
              Create Journal
            </Button>
          </div>
        </DrawerFooter>
      </AppDrawer>
    </>
  );
};

export default InertiaForm;
