import { logResponse, getResponseLogs } from '../../lib/supabase/responseLogs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Example: Log a user's response to a question
      const userId = req.body.userId; // The key (user ID in this case)
      const responseData = {
        question: req.body.question,
        answer: req.body.answer,
        timestamp: new Date().toISOString()
      }; // The value (response data)
      
      // Log the response
      await logResponse(userId, responseData);
      
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error in API route:', error);
      res.status(500).json({ error: 'Failed to log response' });
    }
  } else if (req.method === 'GET') {
    try {
      // Example: Get all responses for a user
      const userId = req.query.userId;
      
      // Get the logs
      const logs = await getResponseLogs(userId);
      
      res.status(200).json(logs);
    } catch (error) {
      console.error('Error in API route:', error);
      res.status(500).json({ error: 'Failed to get response logs' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 