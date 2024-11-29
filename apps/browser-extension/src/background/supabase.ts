import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xukglkgamsanarzevyou.supabase.co';
const supabaseAnonKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1a2dsa2dhbXNhbmFyemV2eW91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2OTQ3NDUsImV4cCI6MjA0ODI3MDc0NX0.mmf4vGY96C0OsGQNBcbb3TU8uLSM732EbgVFydxYXVU';

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: true
	}
});
