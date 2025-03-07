import {
  JournalCreateUpdate,
  JournalPayload,
  JournalResponse,
} from '@/types/journal';
import { Schema } from '@/types/journal/schema';

// mapdata before send to backend
export function mapData(data: Schema): JournalCreateUpdate {
  const date = data.tradingDate;
  const formattedDate = date.toISOString().split('T')[0];

  const common: JournalPayload = {
    token_name: data.tokenName,
    trading_date: formattedDate,
    trade_duration: data.tradeDuration,
    risk_reward_ratio: data.riskRewardRatio,
    reason: data.reason,
    image: data.image,
  };

  switch (data.variant) {
    case 'create': {
      return { ...common, variant: data.variant };
    }
    case 'update': {
      return {
        ...common,
        variant: data.variant,
        id: data.id,
        status: data.status,
      };
    }
  }
}

//  map respone from backend before pass to RHF
export function mapResponse(data: JournalResponse): Schema {
  return {
    variant: 'update',
    tokenName: data.token_name,
    status: data.status,
    id: data.id,
    image: data.image,
    reason: data.reason,
    riskRewardRatio: data.risk_reward_ratio,
    tradingDate: new Date(data.trading_date),
    tradeDuration: data.trade_duration,
  };
}
