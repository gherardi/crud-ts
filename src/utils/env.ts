import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
	SUPABASE_URL: z.string(),
	SUPABASE_KEY: z.string(),
	JWT_SECRET: z.string(),
	JWT_EXPIRES_IN: z.string(),
});

export const env = envSchema.parse(process.env);
