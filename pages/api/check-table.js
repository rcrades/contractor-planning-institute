import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  try {
    // Query to get table structure
    const { data, error } = await supabase
      .rpc('get_table_info', { table_name: 'response_logs' })
      .select('*');
    
    if (error) {
      // If the RPC function doesn't exist, try a different approach
      console.log('RPC method not available, trying direct SQL query');
      
      // Alternative: query the information schema
      const { data: schemaData, error: schemaError } = await supabase
        .from('information_schema.columns')
        .select('column_name, data_type, is_nullable')
        .eq('table_name', 'response_logs');
      
      if (schemaError) {
        console.error('Error querying schema:', schemaError);
        return res.status(500).json({ 
          error: 'Failed to get table structure', 
          details: schemaError 
        });
      }
      
      return res.status(200).json({ 
        success: true, 
        structure: schemaData 
      });
    }
    
    return res.status(200).json({ 
      success: true, 
      structure: data 
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ 
      error: 'An unexpected error occurred', 
      details: error.message 
    });
  }
} 