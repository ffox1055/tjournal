import { Head, usePage } from "@inertiajs/react";

import Heading from "@/components/heading";
import TableData from "@/components/table-data";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Journal',
        href: '/journal/index',
    },
];

export default function List() {
    const { journals } = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Journal" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="layout">
                    <div className="mx-6">
                        <Heading title="Journal" />
                    </div>

                    <div className="mx-6">
                        <TableData data={journals} />
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
