import { Row } from '@tanstack/react-table';

// Define operation types for creating or updating a journal
type CreateAction = {
  variant: 'create';
};

type UpdateAction = {
  variant: 'update';
  id: number;
  status: string;
};

// Common fields shared across create and update operations
export type JournalBase = {
  tokenName: string;
  tradingDate: string;
  tradeDuration: number;
  riskRewardRatio: number;
  reason: string;
  image: string;
};

// Structure for transforming data before sending to the backend
export type JournalPayload = {
  id: number;
  token_name: string;
  trading_date: string;
  trade_duration: number;
  risk_reward_ratio: number;
  reason: string;
  image: File | string;
};

// Unified type for creating or updating a journal entry
export type JournalCreateUpdate = JournalPayload &
  (CreateAction | UpdateAction);

// Response format for a journal entry from the backend
export type JournalResponse = {
  id: number;
  status: string;
  token_name: string;
  trading_date: string;
  trade_duration: number;
  risk_reward_ratio: number;
  reason: string;
  image: string;
  created_at: string;
  updated_at: string;
};

export interface DataTableRowAction<TData> {
  row: Row<TData>;
  type: 'update' | 'delete';
}
