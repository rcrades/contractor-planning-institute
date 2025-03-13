import { Redis } from '@upstash/redis'

// Initialize Redis client
export const redis = new Redis({
  url: 'https://helped-ladybird-61919.upstash.io',
  token: 'AfHfAAIjcDE0ZDlhMDg3Zjk5N2U0ZTZhYTljNmUwNjcwNGNhY2Q0NXAxMA'
})

// Helper function to save survey results
export async function saveSurveyResults(email: string, responses: any) {
  try {
    // Create a unique key for this survey response
    const timestamp = new Date().toISOString()
    const key = `survey:${email}:${timestamp}`
    
    // Prepare the data to save
    const data = {
      email,
      responses,
      timestamp,
    }
    
    // Save to Redis
    await redis.set(key, JSON.stringify(data))
    
    return { success: true }
  } catch (error) {
    console.error('Error saving survey results:', error)
    return { success: false, error }
  }
} 