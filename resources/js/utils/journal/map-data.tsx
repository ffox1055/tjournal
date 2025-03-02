import { JournalCreateUpdate, JournalPayload } from '@/types/journal';
import { Schema } from '@/types/journal/schema';

export function mapData(data: Schema): JournalCreateUpdate {
  const common: JournalPayload = {
    token_name: data.tokenName,
    trading_date: data.tradingDate.toString(),
    trade_duration: data.tradeDuration,
    risk_reward_ratio: data.riskRewardRatio,
    reason: data.reason,
    image_path: data.imagePath || '',
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
