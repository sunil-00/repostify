import { createClient } from '@supabase/supabase-js';

const getValueFromEnvOrStorage = (key: string) => {
    return import.meta.env[key] || getStoredItem(key);
};

const getStoredItem = (key: string) => {
    return localStorage.getItem(key);
};

const promptForInput = (key: string) => {
    const value = prompt(`Enter your Supabase ${key.replace('VITE_', '')}:`);
    if (value) {
        localStorage.setItem(key, value);
    }
    return value;
};

const supabaseUrl = getValueFromEnvOrStorage('VITE_SUPABASE_URL') || promptForInput('VITE_SUPABASE_URL');
const supabaseAnonKey = getValueFromEnvOrStorage('VITE_SUPABASE_ANON_KEY') || promptForInput('VITE_SUPABASE_ANON_KEY');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
