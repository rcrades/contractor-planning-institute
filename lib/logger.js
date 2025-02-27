import { logResponse } from './supabase/responseLogs';

/**
 * Log user interaction with the application
 * 
 * @param {string} userId - User identifier
 * @param {string} action - The action being performed
 * @param {object} data - Additional data to log
 */
export async function logUserAction(userId, action, data = {}) {
  try {
    await logResponse(userId, {
      action,
      data,
      timestamp: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Failed to log user action:', error);
    return false;
  }
} 