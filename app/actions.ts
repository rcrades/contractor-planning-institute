'use server'

import { saveSurveyResults } from '@/lib/redis'

export async function submitSurvey(email: string, responses: any) {
  try {
    const result = await saveSurveyResults(email, responses)
    if (!result.success) {
      throw new Error('Failed to save survey results')
    }
    return { success: true }
  } catch (error) {
    console.error('Error in submitSurvey:', error)
    return { success: false, error: 'Failed to submit survey' }
  }
} 