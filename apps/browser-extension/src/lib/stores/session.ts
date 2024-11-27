import type { AuthSession } from '@supabase/supabase-js';
import { writable, type Writable } from 'svelte/store';

const session: Writable<AuthSession | null> = writable(null);

export default session;
