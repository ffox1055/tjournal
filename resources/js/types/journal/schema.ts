import { z } from 'zod';

export const schema = z.intersection(
  z.object({
    tokenName: z.string().min(1, 'Token name required'),
    tradingDate: z.date(),
    tradeDuration: z.number(),
    riskRatioReward: z.number(),
    reason: z.string(),
    imagePath: z.string(),
  }),
  z.discriminatedUnion('variant', [
    z.object({ variant: z.literal('create') }),
    z.object({
      variant: z.literal('update'),
      status: z.union([z.literal('win'), z.literal('loss'), z.literal('be')]),
      id: z.number(),
    }),
  ]),
);

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  variant: 'create',
  tokenName: 'TIA',
  tradingDate: new Date(),
  riskRatioReward: 0,
  tradeDuration: 0,
  reason: '',
  imagePath: '',
};
