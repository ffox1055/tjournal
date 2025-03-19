import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {EllipsisVertical} from 'lucide-react'
import { Button } from './ui/button';

interface Props {
    data: {
        id: number;
        token_name: string;
        trading_date: string;
        trade_duration: number;
        risk_reward_ratio: number;
        status: string;
        reason: string;
        image_path: string;
        created_at: string;
        updated_at: string;
    }[]
}

export default function TableData({ data }: Props) {
    console.log(data);


    return (
        <Table className='border'>
            <TableHeader>
                <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Risk/Reward</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Opt</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>Action</TableCell>
                            <TableCell>INV001</TableCell>
                            <TableCell>INV001</TableCell>
                            <TableCell>INV001</TableCell>
                            <TableCell>INV001</TableCell>
                            <TableCell>INV001</TableCell>
                            <TableCell>INV001</TableCell>
                            <TableCell><Button variant={'outline'} size={'sm'}><EllipsisVertical size={16}/></Button></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}

