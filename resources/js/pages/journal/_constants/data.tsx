import { Circle, HelpCircle, Timer } from 'lucide-react';

export const statuses = [
  {
    value: 'win',
    label: 'Win',
    icon: HelpCircle,
  },
  {
    value: 'be',
    label: 'Breakeven',
    icon: Circle,
  },
  {
    value: 'loss',
    label: 'Loss',
    icon: Timer,
  },
];

export const StatusOption = [
  { value: 'active', label: 'Active' },
  { value: 'win', label: 'Win' },
  { value: 'be', label: 'Break Even' },
  { value: 'loss', label: 'Loss' },
];
