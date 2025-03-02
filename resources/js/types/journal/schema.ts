import { z } from 'zod';

const NumericField = z.coerce
  .number({
    required_error: 'This field is required',
    invalid_type_error: 'Please input a number',
  })
  .int()
  .positive()
  .min(1);

export const schema = z.intersection(
  z.object({
    tokenName: z.string().min(1, 'Token name required'),
    tradingDate: z.date(),
    tradeDuration: z.number(),
    riskRewardRatio: NumericField,
    reason: z.string(),
    imagePath: z.string(),
  }),
  z.discriminatedUnion('variant', [
    z.object({ variant: z.literal('create') }),
    z.object({
      variant: z.literal('update'),
      id: z.number(),
      status: z.union([z.literal('win'), z.literal('loss'), z.literal('be')]),
    }),
  ]),
);

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  variant: 'create',
  tokenName: 'TIA',
  tradingDate: new Date(),
  riskRewardRatio: 0,
  tradeDuration: 0,
  reason: '',
  imagePath: '',
};
