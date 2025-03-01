import { Head, usePage } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { JournalResponse } from '@/types/journal';
import { columns } from './components/columns';
import DataTable from './components/data-table';
import FormInput from './components/form-input';
import { FormContext } from '@/context/journal/form-context';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Journal',
    href: '/journal/index',
  },
];

export default function List() {
  const data = usePage().props;
  const journals = data.journals as JournalResponse[];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Journal" />
      <FormContext>
        <div className="layout flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
          <FormInput />
          <div className="grid auto-rows-min">
            <DataTable columns={columns} data={journals} />
          </div>
        </div>
      </FormContext>
    </AppLayout>
  );
}
