import { router } from '@inertiajs/react';
import omit from 'lodash/omit';

import { Schema } from '@/types/journal/schema';
import { mapData } from '@/utils/journal/map-data';

export function postJournal(data: Schema) {
  const payload = omit(mapData(data), 'variant');
  router.post('/journal', payload);
}
