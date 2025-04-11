import PeerGroupSignup from "@/components/peer-group-signup"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

export default function PeerGroupPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900">
      <header className="fixed top-0 left-0 w-full z-10 bg-neutral-900/80 backdrop-blur-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2 py-2 px-3 text-neutral-300 hover:text-white transition-colors"
            aria-label="Back to survey"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400/10 group-hover:bg-yellow-400/20 transition-colors">
              <ArrowLeftIcon className="h-4 w-4 text-yellow-400" />
            </span>
            <span className="text-sm font-medium">Back</span>
          </Link>
          <h1 className="text-base font-medium text-white">Peer Group Matching</h1>
          <div className="w-20"></div> {/* Spacer for balance */}
        </div>
      </header>
      <div className="pt-16"></div>
      <div className="flex-1">
        <PeerGroupSignup />
      </div>
    </main>
  )
}
