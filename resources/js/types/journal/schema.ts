import { z } from 'zod';

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

// Numeric Field Schema (Reusable)
const NumericField = z.coerce
  .number({
    required_error: 'This field is required',
    invalid_type_error: 'Please input a number',
  })
  .positive();

// File Validation Schema
const SingleFileSchema = z
  .instanceof(File, { message: 'File is required.' })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: `Image size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: 'Invalid image type. Must be PNG, JPG, or JPEG.',
  });

// Main Form Schema
export const schema = z.intersection(
  z.object({
    tokenName: z.string().min(1, { message: 'Token name is required' }),
    tradingDate: z.date({ required_error: 'Trading date is required' }),
    tradeDuration: z.optional(NumericField).nullable(),
    riskRewardRatio: z.optional(NumericField).nullable(),
    reason: z.string().min(1, { message: 'Please provide a reason' }),
    status: z
      .string()
      .transform((val) => (val === '' ? undefined : val))
      .refine((val) => val !== undefined, {
        message: 'Please select a status',
      })
      .pipe(
        z.enum(['win', 'loss', 'be', 'active'], {
          invalid_type_error: 'Invalid status selected',
        }),
      ),
    image: z.union([
      SingleFileSchema,
      z.string().min(1, { message: 'Please provide an image' }),
    ]),
  }),

  // Variant Handling for Create & Update
  z.discriminatedUnion('variant', [
    z.object({ variant: z.literal('create') }),

    z.object({
      variant: z.literal('update'),
      id: z.number({ required_error: 'Id is required' }),
    }),
  ]),
);

// Type Inference
export type Schema = z.infer<typeof schema>;

// Default Values for the Form
export const defaultValues: Schema = {
  variant: 'create',
  tokenName: '',
  tradingDate: new Date(),
  status: 'active',
  reason: '',
  image: '',
};
