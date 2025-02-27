import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  try {
    console.log('Listing all tables...');
    
    // Query to list all tables
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .order('table_name');
    
    if (error) {
      console.error('Error listing tables:', error);
      return res.status(500).json({ 
        error: 'Failed to list tables', 
        details: error 
      });
    }
    
    return res.status(200).json({ 
      success: true, 
      tables: data.map(row => row.table_name)
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ 
      error: 'An unexpected error occurred', 
      details: error.message 
    });
  }
} 