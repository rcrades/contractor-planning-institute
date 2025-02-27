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
    // Create the table using Supabase's built-in methods instead of exec_sql
    
    // 1. First, check if the table already exists
    const { data: existingTable, error: checkError } = await supabase
      .from('response_logs')
      .select('*')
      .limit(1)
      .maybeSingle();
    
    // If we get a specific error about the table not existing, we need to create it
    const tableExists = !checkError || !checkError.message.includes('relation "response_logs" does not exist');
    
    if (tableExists) {
      return res.status(200).json({ 
        success: true, 
        message: 'Response logs table already exists' 
      });
    }
    
    // 2. Create the table using SQL query
    const { error: createError } = await supabase
      .from('_sql')
      .select('*')
      .execute(`
        CREATE TABLE response_logs (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          key TEXT NOT NULL,
          value JSONB NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        
        CREATE INDEX response_logs_key_idx ON response_logs(key);
        
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        
        CREATE TRIGGER update_response_logs_updated_at
        BEFORE UPDATE ON response_logs
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
      `);

    if (createError) {
      console.error('Error creating table:', createError);
      return res.status(500).json({ 
        error: 'Failed to create table', 
        details: createError 
      });
    }

    // 3. Test the table by inserting a sample record
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
        error: 'Table created but test insert failed', 
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