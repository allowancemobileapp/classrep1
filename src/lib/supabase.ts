import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  'https://txoulxlcenwhmzqrijar.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4b3VseGxjZW53aG16cXJpamFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwNTQ3NjksImV4cCI6MjA3NDYzMDc2OX0.3zBgkYlT5-zvoY0k3wQPiO9uWKdiWtH64m-E3yB8BXQ'
);
