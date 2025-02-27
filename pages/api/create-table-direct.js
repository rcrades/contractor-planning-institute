import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Creating response_logs table directly...');
    
    // Use the Supabase REST API directly for SQL execution
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'apikey': supabaseServiceKey,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        query: `
          CREATE TABLE IF NOT EXISTS public.response_logs (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            key TEXT NOT NULL,
            value JSONB NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );
          
          CREATE INDEX IF NOT EXISTS response_logs_key_idx ON public.response_logs(key);
          
          CREATE OR REPLACE FUNCTION update_updated_at_column()
          RETURNS TRIGGER AS $$
          BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
          END;
          $$ LANGUAGE plpgsql;
          
          DROP TRIGGER IF EXISTS update_response_logs_updated_at ON public.response_logs;
          CREATE TRIGGER update_response_logs_updated_at
          BEFORE UPDATE ON public.response_logs
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column();
        `
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error creating table:', errorData);
      return res.status(500).json({ 
        error: 'Failed to create table', 
        details: errorData 
      });
    }
    
    // Test the table by inserting a sample record
    const { error: insertError } = await supabase
      .from('response_logs')
      .insert([
        { 
          key: 'setup_test', 
          value: { message: 'Table setup successful', timestamp: new Date().toISOString() } 
        }
      ]);
    
    if (insertError) {
      console.error('Error inserting test record:', insertError);
      return res.status(500).json({ 
        error: 'Table may have been created but test insert failed', 
        details: insertError 
      });
    }
    
    return res.status(200).json({ 
      success: true, 
      message: 'Response logs table created successfully and test record inserted' 
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ 
      error: 'An unexpected error occurred', 
      details: error.message 
    });
  }
} 