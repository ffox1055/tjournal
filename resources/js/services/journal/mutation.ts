import { router } from '@inertiajs/react';
import omit from 'lodash/omit';

import { Schema } from '@/types/journal/schema';
import { mapData } from '@/utils/journal/map-data';
import { toast } from '@/hooks/use-toast';

interface IErr {
  message: string | null;
}

export function postJournal(data: Schema, onLoad?: (load: boolean) => void) {
  const payload = omit(mapData(data), 'variant');
  router.post('/journal', payload, {
    onSuccess: (status) => {
      const err = status.props.err as IErr;
      if (err.message) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: err.message,
          duration: 5000,
        });

        setTimeout(() => {
          err.message = null;
        }, 10000);
      }
    },
    onFinish: () => {
      if (onLoad) {
        onLoad(false);
      }
    },
  });
}
