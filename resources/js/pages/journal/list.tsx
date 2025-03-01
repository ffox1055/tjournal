import { Head, usePage } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Journal } from '@/types/journal';
import { columns } from './components/columns';
import DataTable from './components/data-table';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Journal',
    href: '/journal/index',
  },
];

export default function List() {
  const data = usePage().props;
  const { journals } = data;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Journal" />

      <div className="layout flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="grid auto-rows-min">
          <DataTable columns={columns} data={journals as Journal[]} />
        </div>
      </div>
    </AppLayout>
  );
}
