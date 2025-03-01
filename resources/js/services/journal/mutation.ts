import { Schema } from '@/types/journal/schema';
import { mapData } from '@/utils/journal/map-data';
import omit from "lodash/omit";
import { router } from '@inertiajs/react';

export function useCreateJournal(data: Schema) {
  const payload = omit mapData(data)
  router.post('/journal', { data });
}
