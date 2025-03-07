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
  { value: 'win', label: 'Win' },
  { value: 'be', label: 'Be' },
  { value: 'loss', label: 'Loss' },
];
