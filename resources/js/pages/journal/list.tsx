import { Head, usePage } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { JournalResponse } from '@/types/journal';
import { getColumns } from './_components/columns';
import DataTable from './_components/data-table';
import { FormContext } from '@/context/journal/form-context';
import { useCallback, useMemo, useState } from 'react';
import { mapResponse } from '@/utils/journal/map-data';
import { Schema } from '@/types/journal/schema';
import FormInput from './_components/form-input';
import { deleteJournal } from '@/services/journal/mutation';
import useConfirmationStore from '@/store/confirmation-store';
import useLoadingStore from '@/store/loading-store';
import { toast } from '@/hooks/use-toast';
import HeadingSmall from '@/components/heading-small';
import Heading from '@/components/heading';

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
  const { openConfirmation } = useConfirmationStore();
  const { isFormLoading, setIsFormLoading } = useLoadingStore();

  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const onUpdate = useCallback((journals: JournalResponse) => {
    setSelectedJournal(mapResponse(journals));
    setIsSheetOpen(true);
  }, []);

  const onDelete = useCallback(
    (journals: JournalResponse) => {
      // Return when the process in on load
      if (isFormLoading) {
        toast({
          variant: 'error',
          title: 'Ops',
          description: 'Please wait until other proccess is finish.',
          duration: 2000,
        });

        return;
      }

      openConfirmation({
        title: 'Delete Confirmation',
        description: 'Are you sure you want to delete this item?',
        cancelLabel: 'Cancel',
        actionLabel: 'Delete',
        actionVariant: 'destructive',
        onAction: () => {
          setIsFormLoading(true);
          deleteJournal(journals.id, () => setIsFormLoading(false));
        },
      });
    },
    [isFormLoading, setIsFormLoading, openConfirmation],
  );

  const columns = useMemo(
    () => getColumns({ onDelete: onDelete, onUpdate: onUpdate }),
    [onDelete, onUpdate],
  );

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Journal" />
      <FormContext>
        <div className="layout flex h-full flex-1 flex-col rounded-xl p-4">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <Heading
              className="lg:w-1/2"
              title="Journal List"
              description="Track your trading journey with a complete history of past and active trades. Stay organized, analyze your progress, and keep pushing towards success!"
            />
            <FormInput
              isOpen={isSheetOpen}
              onOpenChange={(value) => {
                setIsSheetOpen(value);
                if (!value) setSelectedJournal(null);
              }}
              journalDetail={selectedJournal}
            />
          </div>
          <div className="grid auto-rows-min">
            <DataTable columns={columns} data={journalsEntries} />
          </div>
        </div>
      </FormContext>
    </AppLayout>
  );
}
