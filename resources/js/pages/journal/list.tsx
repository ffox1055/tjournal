import { Head, router, usePage } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, ErrorResponse } from '@/types';
import { JournalResponse } from '@/types/journal';
import { getColumns } from './_components/columns';
import DataTable from './_components/data-table';
import { FormContext } from '@/context/journal/form-context';
import { useCallback, useMemo, useState } from 'react';
import { mapResponse } from '@/utils/journal/map-data';
import { Schema } from '@/types/journal/schema';
import { toast } from 'sonner';
import FormInput from './_components/form-input';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Journal',
    href: '/journal/index',
  },
];

export default function List() {
  const props = usePage().props;
  const journalsEntries = props.journals as JournalResponse[];
  const [selectedJournal, setSelectedJournal] = useState<Schema | null>(null);

  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const onUpdate = useCallback((journals: JournalResponse) => {
    setSelectedJournal(mapResponse(journals));
    setIsSheetOpen(true);
  }, []);

  const onDelete = useCallback((journals: JournalResponse) => {
    router.delete(`journal/${journals.id}`, {
      onSuccess: ({ props }) => {
        const err = props.err as ErrorResponse;
        if (!err.message) {
          toast.success('Journal deleted');
        }
      },
    });
  }, []);

  const columns = useMemo(
    () => getColumns({ onDelete: onDelete, onUpdate: onUpdate }),
    [onDelete, onUpdate],
  );

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Journal" />
      <FormContext>
        <div className="layout flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
          <FormInput
            isOpen={isSheetOpen}
            onOpenChange={(value) => {
              setIsSheetOpen(value);
              if (!value) setSelectedJournal(null);
            }}
            journalDetail={selectedJournal}
          />
          <div className="grid auto-rows-min">
            <DataTable columns={columns} data={journalsEntries} />
          </div>
        </div>
      </FormContext>
    </AppLayout>
  );
}
