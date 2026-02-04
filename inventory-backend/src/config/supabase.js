import { createClient } from '@supabase/supabase-js';
import { ENV } from './env.js';

if (!ENV.SUPABASE_URL || !ENV.SUPABASE_SERVICE_KEY) {
  throw new Error('Supabase env variables missing');
}

export const supabase = createClient(
  ENV.SUPABASE_URL,
  ENV.SUPABASE_SERVICE_KEY
);
