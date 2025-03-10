interface ResultsScreenProps {
  responses: {
    motivation: string
    revenue: string
    employees: string
    buyerPreference: string
    preparation: string
    timeline: string
  }
  email: string
}

export default function ResultsScreen({ responses, email }: ResultsScreenProps) {
  // Helper function to get valuation range based on revenue
  const getValuationRange = (revenue: string): string => {
    const ranges = {
      "Less than $1M": "$500K - $2M",
      "$1M-$5M": "$2M - $10M",
      "$5M-$20M": "$10M - $40M",
      "More than $20M": "$40M+",
    }
    return ranges[revenue as keyof typeof ranges] || "Valuation pending"
  }

  // Helper function to get preparation tips based on responses
  const getPreparationTips = (): string[] => {
    const tips = []
    
    if (responses.preparation === "No") {
      tips.push("Consider getting a professional valuation")
      tips.push("Organize your financial records and contracts")
      tips.push("Document your business processes and key relationships")
    }
    
    if (responses.timeline === "Less than 6 months") {
      tips.push("Accelerate preparation by focusing on essential documentation")
      tips.push("Start identifying potential buyers immediately")
    }

    if (responses.buyerPreference === "Strategic (e.g., for legacy)") {
      tips.push("Research potential strategic buyers in your market")
      tips.push("Prepare a strong business continuity plan")
    }

    return tips.length > 0 ? tips : ["Detailed recommendations sent to your email"]
  }

  return (
    <div className="flex flex-col min-h-[80vh] justify-center p-4 md:p-8">
      <div className="max-w-2xl w-full mx-auto">
        <div className="bg-neutral-800 rounded-lg shadow-lg p-6 md:p-8 border border-neutral-700">
          <h1 className="text-3xl font-bold text-white mb-6">Your Business Valuation Summary</h1>

          <div className="space-y-6">
            {/* Estimated Valuation Range */}
            <div className="bg-neutral-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-2">Estimated Valuation Range</h2>
              <p className="text-3xl font-bold text-yellow-400">{getValuationRange(responses.revenue)}</p>
              <p className="text-neutral-400 mt-2">Based on your reported annual revenue</p>
            </div>

            {/* Key Insights */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Key Insights</h2>
              <div className="space-y-4">
                <div className="bg-neutral-700 rounded-lg p-4">
                  <h3 className="font-medium text-yellow-400">Business Size</h3>
                  <p className="text-neutral-300">
                    Your business has {responses.employees} employees with {responses.revenue} in annual revenue
                  </p>
                </div>
                <div className="bg-neutral-700 rounded-lg p-4">
                  <h3 className="font-medium text-yellow-400">Sale Readiness</h3>
                  <p className="text-neutral-300">
                    You're looking to sell within {responses.timeline} and have{" "}
                    {responses.preparation === "Yes" ? "taken" : "not yet taken"} preparatory steps
                  </p>
                </div>
                <div className="bg-neutral-700 rounded-lg p-4">
                  <h3 className="font-medium text-yellow-400">Buyer Preference</h3>
                  <p className="text-neutral-300">You prefer {responses.buyerPreference}</p>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Recommended Next Steps</h2>
              <ul className="space-y-3">
                {getPreparationTips().map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-400 mr-3">•</span>
                    <span className="text-neutral-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Email Confirmation */}
            {email && (
              <div className="mt-8 text-center">
                <p className="text-neutral-400">
                  A detailed report has been sent to <span className="text-white">{email}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 