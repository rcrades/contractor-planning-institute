// Import the Supabase client
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (you'll need to set these environment variables)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Create a Supabase client with the service role key for server-side operations
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Log a response to Supabase
 * @param {string} key - The key to identify this log (e.g., user ID, session ID)
 * @param {object} value - The value to store (will be converted to JSON)
 * @returns {Promise} - The result of the insert operation
 */
export async function logResponse(key, value) {
  try {
    // Insert the key/value pair into the response_logs table
    const { data, error } = await supabase
      .from('response_logs')
      .insert([
        { 
          key: key, 
          value: value 
        }
      ]);
    
    // If there was an error, throw it
    if (error) {
      throw error;
    }
    
    // Return the inserted data
    return data;
  } catch (error) {
    console.error('Error logging response:', error);
    throw error;
  }
}

/**
 * Get all logs for a specific key
 * @param {string} key - The key to look up
 * @returns {Promise} - The logs associated with the key
 */
export async function getResponseLogs(key) {
  try {
    // Query the response_logs table for entries with the given key
    const { data, error } = await supabase
      .from('response_logs')
      .select('*')
      .eq('key', key)
      .order('created_at', { ascending: false });
    
    // If there was an error, throw it
    if (error) {
      throw error;
    }
    
    // Return the logs
    return data;
  } catch (error) {
    console.error('Error getting response logs:', error);
    throw error;
  }
}

/**
 * Delete logs for a specific key
 * @param {string} key - The key to delete logs for
 * @returns {Promise} - The result of the delete operation
 */
export async function deleteResponseLogs(key) {
  try {
    // Delete entries with the given key from the response_logs table
    const { data, error } = await supabase
      .from('response_logs')
      .delete()
      .eq('key', key);
    
    // If there was an error, throw it
    if (error) {
      throw error;
    }
    
    // Return the result
    return data;
  } catch (error) {
    console.error('Error deleting response logs:', error);
    throw error;
  }
} 