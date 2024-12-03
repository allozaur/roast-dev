import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	import.meta.env.VITE_PUBLIC_SUPABASE_URL,
	import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY,
	{
		auth: {
			autoRefreshToken: true,
			persistSession: true,
			detectSessionInUrl: true
		}
	}
);

export default supabase;
