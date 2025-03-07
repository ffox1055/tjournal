import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const SingleFileSchema = z
  .instanceof(File)
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    `Image size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
  )
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    `Invalid type image. Type must be: PNG, JPG, JPEG`,
  );

const NumericField = z.coerce
  .number({
    required_error: 'This field is required',
    invalid_type_error: 'Please input a number',
  })
  .positive()
  .min(1);

export const schema = z.intersection(
  z.object({
    tokenName: z.string().min(1, 'Token name required'),
    tradingDate: z.date(),
    tradeDuration: NumericField,
    riskRewardRatio: NumericField,
    reason: z.string(),
    image: z.union([SingleFileSchema, z.string()]),
  }),
  z.discriminatedUnion('variant', [
    z.object({ variant: z.literal('create') }),
    z.object({
      variant: z.literal('update'),
      id: z.number(),
      status: z
        .union([z.literal('win'), z.literal('loss'), z.literal('be')])
        .refine((val) => val !== undefined, {
          message: 'Status is required',
        }),
    }),
  ]),
);

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  variant: 'create',
  tokenName: 'A',
  tradingDate: new Date(),
  riskRewardRatio: 1,
  tradeDuration: 1,
  reason: '',
  image: '',
};
