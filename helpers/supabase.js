import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pjmgeeuxtbzwnoznpdnu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqbWdlZXV4dGJ6d25vem5wZG51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc3MjIyMzEsImV4cCI6MjAyMzI5ODIzMX0.dwPNdQNLcvD_iM-wc0qZGSQUmItKqN8pvdjuYKkKhdY";
export const supabase = createClient(supabaseUrl, supabaseKey);
