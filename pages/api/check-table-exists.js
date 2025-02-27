import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * API endpoint to check if the response_logs table exists in Supabase
 * 
 * @route GET /api/check-table-exists
 * @returns {object} JSON response indicating if the table exists
 */
export default async function handler(req, res) {
  try {
    console.log('Checking if response_logs table exists...');
    
    // Query to check if the table exists
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_name', 'response_logs')
      .eq('table_schema', 'public')
      .single();
    
    if (error) {
      console.error('Error checking table existence:', error);
      
      // Try a simpler approach - just try to select from the table
      console.log('Trying to select from the table directly...');
      const { data: _testData, error: testError } = await supabase
        .from('response_logs')
        .select('id')
        .limit(1);
      
      // If we get a specific error about the table not existing, then it doesn't exist
      const tableExists = !testError || !testError.message.includes('relation "response_logs" does not exist');
      
      return res.status(200).json({ 
        success: true, 
        tableExists: tableExists,
        error: testError ? testError.message : null
      });
    }
    
    return res.status(200).json({ 
      success: true, 
      tableExists: !!data,
      data: data
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ 
      error: 'An unexpected error occurred', 
      details: error.message,
      stack: error.stack
    });
  }
} 