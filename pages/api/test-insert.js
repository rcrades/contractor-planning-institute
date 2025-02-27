import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  try {
    // Log the connection details (without exposing the full key)
    console.log('Supabase URL:', supabaseUrl);
    console.log('Service Key (first 10 chars):', supabaseServiceKey?.substring(0, 10) + '...');
    
    // Simple direct insert test
    console.log('Attempting to insert test record...');
    
    const { data, error } = await supabase
      .from('response_logs')
      .insert([
        { 
          key: 'direct_test', 
          value: { message: 'Direct insert test', timestamp: new Date().toISOString() } 
        }
      ]);
    
    // Remove .select() to simplify the request
    
    if (error) {
      console.error('Error inserting test record:', error);
      return res.status(500).json({ 
        error: 'Test insert failed', 
        details: error,
        message: error.message,
        code: error.code
      });
    }
    
    return res.status(200).json({ 
      success: true, 
      message: 'Test insert successful',
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