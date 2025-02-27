import { ArrowRightIcon } from "@radix-ui/react-icons"

interface WelcomeScreenProps {
  onNext: () => void
}

export default function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 bg-neutral-900">
      <div className="max-w-md w-full mx-auto text-center">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-yellow-400 p-3 rounded-lg">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z"
                  stroke="black"
                  strokeWidth="2"
                />
                <path d="M12 4V20" stroke="black" strokeWidth="2" />
                <path d="M7 9H4" stroke="black" strokeWidth="2" />
                <path d="M7 15H4" stroke="black" strokeWidth="2" />
                <path d="M20 9H17" stroke="black" strokeWidth="2" />
                <path d="M20 15H17" stroke="black" strokeWidth="2" />
                <path d="M12 9H9" stroke="black" strokeWidth="2" />
                <path d="M15 15H12" stroke="black" strokeWidth="2" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Contractor Planning Institute</h1>
          <p className="text-lg text-neutral-300 mb-6">
            Learn about selling your construction firm and get personalized next steps in 5 minutes.
          </p>

          <div className="bg-neutral-800 rounded-lg p-6 shadow-lg mb-8 border border-neutral-700">
            <h2 className="text-xl font-semibold text-white mb-4">What you'll learn:</h2>
            <ul className="text-left space-y-3">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">✓</span>
                <span className="text-neutral-300">Where your business stands in today's M&A market</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">✓</span>
                <span className="text-neutral-300">Which buyer types might be interested in your firm</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">✓</span>
                <span className="text-neutral-300">Personalized next steps to maximize your sale value</span>
              </li>
            </ul>
          </div>
        </div>

        <button
          onClick={onNext}
          className="flex items-center justify-center w-full py-3 px-4 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg transition duration-200 shadow-lg"
        >
          Start Now
          <ArrowRightIcon className="ml-2 h-5 w-5" />
        </button>

        <p className="text-sm text-neutral-400 mt-4">Completely confidential. No obligation.</p>
      </div>
    </div>
  )
}

