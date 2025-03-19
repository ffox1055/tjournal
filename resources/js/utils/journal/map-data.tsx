import {
  JournalCreateUpdate,
  JournalPayload,
  JournalResponse,
} from '@/types/journal';
import { Schema } from '@/types/journal/schema';
import { omit } from 'lodash';

// mapdata before send to backend
export function mapData(data: Schema): JournalCreateUpdate {
  const date = data.tradingDate;
  const formattedDate = date.toISOString().split('T')[0];

  const common: JournalPayload = {
    token_name: data.tokenName,
    trading_date: formattedDate,
    trade_duration: data.tradeDuration,
    risk_reward_ratio: data.riskRewardRatio,
    status: data.status,
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

export function createFormData(journalData: Schema): FormData {
  const formData = new FormData();
  const formattedData = omit(mapData(journalData), 'variant');

  formData.append('_method', 'PUT');
  formData.append('token_name', formattedData.token_name);
  formData.append('image', formattedData.image);
  formData.append('trading_date', formattedData.trading_date);
  if (formattedData.risk_reward_ratio) {
    formData.append(
      'risk_reward_ratio',
      formattedData.risk_reward_ratio.toString(),
    );
  }
  if (formattedData.trade_duration) {
    formData.append('trade_duration', formattedData.trade_duration.toString());
  }
  formData.append('status', formattedData.status);
  formData.append('reason', formattedData.reason);

  return formData;
}
