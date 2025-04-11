import { DownloadIcon, ExternalLinkIcon } from "@radix-ui/react-icons"

interface ResultsScreenProps {
  responses: {
    motivation: string
    revenue: string
    employees: string
    buyerPreference: string
    preparation: string
    timeline: string
  }
  email?: string
}

export default function ResultsScreen({ responses, email }: ResultsScreenProps) {
  // Generate personalized report content based on responses
  const generateReport = () => {
    // For demonstration purposes - in a real implementation, this would have more complex logic
    const motivationText =
      responses.motivation === "skipped"
        ? "You didn't specify your motivation for selling. Consider reflecting on your primary goals for this process."
        : responses.motivation === "Retirement"
          ? "As you're preparing for retirement, timing and proper valuation will be critical for your exit strategy."
          : responses.motivation === "Growth opportunities"
            ? "Since you're focused on growth, consider strategic buyers who can provide resources and market expansion."
            : responses.motivation === "Financial liquidity"
              ? "With financial liquidity as your goal, PE firms might offer attractive terms for a partial or complete sale."
              : "Based on your specific situation, a customized approach will be needed for your sale process."

    const revenueText =
      responses.revenue === "skipped"
        ? "You didn't provide revenue information. A professional valuation could help you understand your firm's market position."
        : responses.revenue === "Less than $1M"
          ? "Your revenue is below the typical threshold for PE firms, but strategic buyers may still find value in your operations."
          : responses.revenue === "$1M-$5M"
            ? "Your revenue puts you in range for smaller PE firms and many strategic buyers."
            : responses.revenue === "$5M-$20M"
              ? "Your revenue exceeds the $5M industry average, making you an attractive target for both PE and strategic buyers."
              : "Your substantial revenue makes you a prime target for larger PE firms and major strategic buyers."

    const timelineAdvice =
      responses.timeline === "skipped"
        ? "You haven't specified a timeline. Consider your ideal timeframe and how it aligns with market conditions."
        : responses.timeline === "Less than 6 months"
          ? "Your accelerated timeline requires immediate preparation. Consider engaging an M&A advisor immediately."
          : responses.timeline === "6-12 months"
            ? "Your timeline aligns with typical M&A processes. Begin preparation now to maximize value."
            : "Your extended timeline gives you an opportunity to implement value-enhancement strategies before selling."

    const preparationAdvice =
      responses.preparation === "skipped"
        ? "You haven't indicated your preparation level. Start by assessing your readiness and identifying areas for improvement."
        : responses.preparation === "No"
          ? "We recommend starting with a professional valuation and addressing any financial documentation gaps."
          : "Your preparation puts you ahead of many sellers. Focus now on positioning your unique value proposition."

    return {
      motivationText,
      revenueText,
      timelineAdvice,
      preparationAdvice,
    }
  }

  const report = generateReport()

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Your report is ready!</h2>
          <p className="text-neutral-300">Please provide your email to view the full report.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900 p-4 md:p-8">
      <div className="max-w-2xl w-full mx-auto">
        <div className="bg-neutral-800 rounded-lg shadow-lg p-6 md:p-8 my-8 border border-neutral-700">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-yellow-400 p-3 rounded-full">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 12L11 14L15 10M12 3L4 7.5V12.5C4 15.7 7.4 19.5 12 21C16.6 19.5 20 15.7 20 12.5V7.5L12 3Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Your Best Next Steps Report</h2>
            <p className="text-neutral-400">Based on your unique situation</p>
          </div>

          <div className="mb-8 pb-8 border-b border-neutral-700">
            <h3 className="text-xl font-semibold text-white mb-4">Key Findings</h3>

            <div className="space-y-4">
              <div className="bg-neutral-700 p-4 rounded-lg border-l-4 border-yellow-400">
                <p className="text-neutral-300">{report.motivationText}</p>
              </div>

              <div className="bg-neutral-700 p-4 rounded-lg border-l-4 border-yellow-400">
                <p className="text-neutral-300">{report.revenueText}</p>
              </div>
            </div>
          </div>

          <div className="mb-8 pb-8 border-b border-neutral-700">
            <h3 className="text-xl font-semibold text-white mb-4">Recommended Action Plan</h3>

            <ol className="space-y-4 list-decimal list-inside text-neutral-300">
              <li className="p-3 bg-neutral-700 rounded-lg">{report.preparationAdvice}</li>
              <li className="p-3 bg-neutral-700 rounded-lg">{report.timelineAdvice}</li>
              <li className="p-3 bg-neutral-700 rounded-lg">
                {responses.buyerPreference === "Strategic (e.g., for legacy)"
                  ? "Focus on highlighting operational synergies and cultural fit to attract strategic buyers."
                  : responses.buyerPreference === "PE (e.g., for quick liquidity)"
                    ? "Prepare detailed growth projections and identify efficiency opportunities to appeal to PE firms."
                    : "Consider a broad marketing approach to both strategic and financial buyers for best valuation."}
              </li>
            </ol>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Industry Benchmarking</h3>

            <div className="bg-neutral-700 p-4 rounded-lg mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-neutral-300">Size</span>
                <span className="font-medium text-white">
                  {responses.employees === "Less than 10"
                    ? "Smaller than average"
                    : responses.employees === "10-50"
                      ? "Average size"
                      : "Larger than average"}
                </span>
              </div>
              <div className="w-full bg-neutral-600 rounded-full h-2.5">
                <div
                  className="bg-yellow-400 h-2.5 rounded-full"
                  style={{
                    width:
                      responses.employees === "Less than 10"
                        ? "30%"
                        : responses.employees === "10-50"
                          ? "50%"
                          : responses.employees === "50-100"
                            ? "75%"
                            : "90%",
                  }}
                ></div>
              </div>
            </div>

            <div className="bg-neutral-700 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-neutral-300">Revenue</span>
                <span className="font-medium text-white">
                  {responses.revenue === "Less than $1M"
                    ? "Below average"
                    : responses.revenue === "$1M-$5M"
                      ? "Average"
                      : responses.revenue === "$5M-$20M"
                        ? "Above average"
                        : "Top tier"}
                </span>
              </div>
              <div className="w-full bg-neutral-600 rounded-full h-2.5">
                <div
                  className="bg-yellow-400 h-2.5 rounded-full"
                  style={{
                    width:
                      responses.revenue === "Less than $1M"
                        ? "25%"
                        : responses.revenue === "$1M-$5M"
                          ? "50%"
                          : responses.revenue === "$5M-$20M"
                            ? "75%"
                            : "95%",
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center py-3 px-6 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg transition duration-200 shadow-md flex-1">
              <DownloadIcon className="mr-2 h-5 w-5" />
              Download Report
            </button>

            <button className="flex items-center justify-center py-3 px-6 bg-neutral-700 hover:bg-neutral-600 text-white font-medium rounded-lg transition duration-200 shadow-md flex-1 border border-neutral-600">
              <ExternalLinkIcon className="mr-2 h-5 w-5" />
              Contact an Expert
            </button>
          </div>
        </div>
        <div className="w-full h-1 bg-neutral-800 my-8">
          <div className="w-1/3 h-full bg-yellow-400"></div>
        </div>
        <div className="text-center text-neutral-500 text-sm pb-8">
          <p>This report is based on the information you provided and industry trends.</p>
          <p>For a detailed valuation and personalized strategy, consult with an M&A advisor.</p>
        </div>
      </div>
    </div>
  )
}
