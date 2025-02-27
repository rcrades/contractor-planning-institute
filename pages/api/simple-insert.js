import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  try {
    console.log('Attempting simple insert...');
    
    // Simple insert test
    const { data, error } = await supabase
      .from('response_logs')
      .insert([
        { 
          key: 'simple_test', 
          value: { message: 'Simple insert test', timestamp: new Date().toISOString() } 
        }
      ]);
    
    if (error) {
      console.error('Error inserting record:', error);
      return res.status(500).json({ 
        error: 'Insert failed', 
        details: error 
      });
    }
    
    return res.status(200).json({ 
      success: true, 
      message: 'Insert successful',
      data: data
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ 
      error: 'An unexpected error occurred', 
      details: error.message 
    });
  }
} 