-- Create a table for storing response logs as key/value pairs
CREATE TABLE response_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Unique identifier for each log entry
  key TEXT NOT NULL, -- The key (could be user ID, session ID, etc.)
  value JSONB NOT NULL, -- The value stored as JSON (flexible for different response types)
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- When the log was created
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW() -- When the log was last updated
);

-- Create an index on the key for faster lookups
CREATE INDEX response_logs_key_idx ON response_logs(key);

-- Add a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function whenever a row is updated
CREATE TRIGGER update_response_logs_updated_at
BEFORE UPDATE ON response_logs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column(); 