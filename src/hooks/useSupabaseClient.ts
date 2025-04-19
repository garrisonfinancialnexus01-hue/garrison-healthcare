
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

export const useSupabaseClient = () => {
  const [supabaseClient, setSupabaseClient] = useState(null);
  
  useEffect(() => {
    // Initialize Supabase client with environment variables
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    // Log environment variables for debugging (will be visible only in development)
    console.log("Supabase URL:", supabaseUrl ? "Available" : "Missing");
    console.log("Supabase Anon Key:", supabaseAnonKey ? "Available" : "Missing");

    // Only create client if both URL and key are available and not empty strings
    if (supabaseUrl && supabaseAnonKey && supabaseUrl.trim() !== '' && supabaseAnonKey.trim() !== '') {
      try {
        const client = createClient(supabaseUrl, supabaseAnonKey);
        setSupabaseClient(client);
        console.log("Supabase client initialized successfully");
      } catch (error) {
        console.error("Error initializing Supabase client:", error);
      }
    } else {
      console.error("Supabase credentials missing or invalid - client not initialized");
    }
  }, []);
  
  return supabaseClient;
};

export default useSupabaseClient;
