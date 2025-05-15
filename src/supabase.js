import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://cjokefntgdfxoyqwphhm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqb2tlZm50Z2RmeG95cXdwaGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyNjkzNjAsImV4cCI6MjA2Mjg0NTM2MH0.wC8w-ADebwi7jiSprkfxzWV8qtmDtYgJ5dgBmgduldk';
export const supabase = createClient(supabaseUrl, supabaseKey);