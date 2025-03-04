import { JournalCreateUpdate, JournalPayload } from '@/types/journal';
import { Schema } from '@/types/journal/schema';

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
