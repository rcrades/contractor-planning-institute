import { ArrowRightIcon } from "@radix-ui/react-icons"
import { HardHat } from "lucide-react"

interface WelcomeScreenProps {
  onNext: () => void
}

export default function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col min-h-[80vh] justify-center p-4 md:p-8">
      <div className="max-w-2xl w-full mx-auto text-center">
        <div className="flex items-center justify-center mb-8">
          <HardHat className="h-16 w-16 text-yellow-400 mr-3" />
          <h1 className="text-4xl md:text-5xl font-bold text-white">Welcome to Your Business Valuation</h1>
        </div>

        <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
          In the next few minutes, we'll help you understand your construction firm's potential value and create a
          personalized roadmap for selling your business.
        </p>

        <div className="bg-neutral-800 rounded-lg p-6 mb-8 border border-neutral-700">
          <h2 className="text-2xl font-semibold text-white mb-4">What to Expect</h2>
          <ul className="space-y-3 text-left">
            <li className="flex items-start">
              <span className="text-yellow-400 mr-3">•</span>
              <span className="text-neutral-300">Answer simple questions about your business</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 mr-3">•</span>
              <span className="text-neutral-300">Get an estimated valuation range</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 mr-3">•</span>
              <span className="text-neutral-300">Receive a customized action plan</span>
            </li>
          </ul>
        </div>

        <button
          onClick={onNext}
          className="flex items-center mx-auto py-4 px-8 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg transition duration-200 shadow-md text-lg"
        >
          Start Assessment
          <ArrowRightIcon className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  )
} 