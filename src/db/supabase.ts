import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './database.types';
import { env } from '../utils/env';

const SUPABASE_URL: string = env.SUPABASE_URL;
const SUPABASE_KEY: string = env.SUPABASE_KEY;
const supabase: SupabaseClient = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
