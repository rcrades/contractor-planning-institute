import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons"

interface EducationalSectionProps {
  title: string
  content: string
  transition: string
  onNext: () => void
  onBack?: () => void
}

export default function EducationalSection({ title, content, transition, onNext, onBack }: EducationalSectionProps) {
  return (
    <div className="flex flex-col min-h-[80vh] justify-center p-4 md:p-8">
      <div className="max-w-lg w-full mx-auto">
        <div className="bg-neutral-800 rounded-lg shadow-lg p-6 md:p-8 border border-neutral-700">
          <div className="flex items-start mb-6">
            <div className="bg-yellow-400 p-2 rounded-md mr-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
          </div>

          <div className="mb-8 pl-12">
            <p className="text-neutral-300 text-lg leading-relaxed mb-6">{content}</p>
            <p className="text-yellow-400 font-medium text-lg">{transition}</p>
          </div>

          <div className="flex items-center justify-between mt-8">
            {onBack ? (
              <button
                onClick={onBack}
                className="flex items-center py-2 px-4 text-neutral-300 hover:text-white font-medium rounded-lg transition duration-200"
              >
                <ArrowLeftIcon className="mr-2 h-5 w-5" />
                Back
              </button>
            ) : (
              <div></div>
            )}

            <button
              onClick={onNext}
              className="flex items-center py-3 px-6 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg transition duration-200 shadow-md"
            >
              Continue
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
