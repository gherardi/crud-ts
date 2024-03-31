import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
	PORT: z.string().default('3000'),
	SUPABASE_URL: z.string(),
	SUPABASE_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
