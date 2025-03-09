import { Button } from "@/components/ui/button"
import { HardHat, ArrowRight } from "lucide-react"

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-zinc-900 text-white p-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center mb-6">
          <HardHat className="h-12 w-12 text-yellow-400 mr-2" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Contractor Planning Institute</h1>
        </div>

        <p className="text-xl md:text-2xl mt-6 mb-10 text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Learn about selling your construction firm and get personalized next steps in{" "}
          <span className="text-yellow-400 font-semibold">3 minutes</span>.
        </p>

        <Button
          size="lg"
          className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-black font-medium text-lg px-8 py-6 h-auto"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
            <div className="text-yellow-400 font-bold text-lg mb-2">Step 1</div>
            <p className="text-zinc-300">Answer a few questions about your construction business</p>
          </div>
          <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
            <div className="text-yellow-400 font-bold text-lg mb-2">Step 2</div>
            <p className="text-zinc-300">Receive a personalized valuation estimate</p>
          </div>
          <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
            <div className="text-yellow-400 font-bold text-lg mb-2">Step 3</div>
            <p className="text-zinc-300">Get a detailed roadmap for selling your firm</p>
          </div>
        </div>
      </div>
    </div>
  )
}

