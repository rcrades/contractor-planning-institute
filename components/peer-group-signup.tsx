"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Check, HelpCircle, Users, Building, Briefcase, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

const formSchema = z.object({
  meetingFormat: z.enum(["in-person", "virtual", "hybrid"]),
  peerLocation: z.enum(["local", "separated", "mixed"]),
  firmSize: z.enum(["small", "medium", "large", "enterprise"]),
  experienceLevel: z.number().min(1).max(5),
  interests: z.array(z.string()).min(1, {
    message: "Please select at least one area of interest",
  }),
  industry: z.string({
    required_error: "Please select an industry",
  }),
  paidMembership: z.boolean().default(false),
})

const interests = [
  { value: "business-development", label: "Business Development" },
  { value: "project-management", label: "Project Management" },
  { value: "technology-adoption", label: "Technology Adoption" },
  { value: "sustainability", label: "Sustainability Practices" },
  { value: "workforce-development", label: "Workforce Development" },
  { value: "risk-management", label: "Risk Management" },
  { value: "financial-management", label: "Financial Management" },
  { value: "leadership", label: "Leadership Development" },
]

const industries = [
  { value: "residential", label: "Residential Construction" },
  { value: "commercial", label: "Commercial Construction" },
  { value: "industrial", label: "Industrial Construction" },
  { value: "heavy-civil", label: "Heavy Civil" },
  { value: "specialty", label: "Specialty Contractor" },
  { value: "design-build", label: "Design-Build" },
  { value: "engineering", label: "Engineering" },
  { value: "architecture", label: "Architecture" },
]

const steps = [
  { id: "step-1", name: "Meeting", icon: Calendar },
  { id: "step-2", name: "Contact", icon: Building },
  { id: "step-3", name: "Experience", icon: Briefcase },
  { id: "step-4", name: "Review", icon: Check },
]

export default function PeerGroupSignup() {
  const [currentStep, setCurrentStep] = useState(0)
  const [open, setOpen] = useState(false)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [preferredContact, setPreferredContact] = useState<"text" | "email">("text")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      meetingFormat: "in-person",
      peerLocation: "local",
      firmSize: "medium",
      experienceLevel: 3,
      interests: [],
      industry: "",
      paidMembership: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({
      ...values,
      contactMethod: preferredContact,
      name,
      contact: preferredContact === "text" ? phone : email,
    })
    setSubmitted(true)
  }

  const toggleInterest = (interest: string) => {
    setSelectedInterests((current) => {
      if (current.includes(interest)) {
        return current.filter((i) => i !== interest)
      } else {
        return [...current, interest]
      }
    })

    form.setValue(
      "interests",
      selectedInterests.includes(interest)
        ? selectedInterests.filter((i) => i !== interest)
        : [...selectedInterests, interest],
      { shouldValidate: true },
    )
  }

  const next = async () => {
    const fields = [
      ["meetingFormat", "peerLocation", "paidMembership"],
      [], // No form fields to validate for step 2, we'll handle it manually
      ["experienceLevel", "interests"],
      [],
    ][currentStep]

    if (currentStep === 1) {
      // Validate contact information
      if (!name) {
        alert("Please enter your name")
        return
      }
      if (preferredContact === "text" && !phone) {
        alert("Please enter your phone number")
        return
      }
      if (preferredContact === "email" && !email) {
        alert("Please enter your email address")
        return
      }
      setCurrentStep((step) => step + 1)
      return
    }

    const output = await form.trigger(fields as any, { shouldFocus: true })

    if (!output) return

    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1)
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 p-2 sm:p-4 md:p-8">
        <Card className="w-full max-w-3xl mx-auto shadow-lg border border-neutral-700 overflow-hidden bg-neutral-800 text-white">
          <CardHeader className="bg-neutral-800 text-white p-4 sm:p-6 border-b border-neutral-700">
            <CardTitle className="text-xl sm:text-2xl">Thank You for Signing Up!</CardTitle>
            <CardDescription className="text-neutral-400 text-sm sm:text-base">
              We've received your contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 pb-4 sm:pt-8 sm:pb-6 text-center px-4 sm:px-6">
            <div className="rounded-full w-16 h-16 sm:w-20 sm:h-20 bg-green-100 mx-auto flex items-center justify-center mb-4 sm:mb-6 shadow-md">
              <Check className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white">
              You're on your way to valuable industry connections
            </h3>
            <p className="text-neutral-400 mb-4 sm:mb-6 max-w-lg mx-auto text-sm sm:text-base">
              Our team will contact you via {preferredContact === "text" ? "text message" : "email"} within 3-5 business
              days with your group details and next steps.
            </p>
            <Button
              onClick={() => setSubmitted(false)}
              variant="outline"
              className="mt-2 border-neutral-600 text-neutral-400 hover:bg-neutral-700"
            >
              Return to Form
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 p-0 sm:p-4 md:p-8">
      <Card className="w-full max-w-3xl mx-auto shadow-lg border border-neutral-700 overflow-hidden bg-neutral-800 text-white">
        <CardHeader className="bg-neutral-800 text-white p-4 sm:p-6 border-b border-neutral-700">
          <div className="flex items-center gap-2 sm:gap-3 mb-1">
            <div className="bg-yellow-400 p-1.5 sm:p-2 rounded-full">
              <Users className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold">Join a Construction Peer Group</CardTitle>
          </div>
          <CardDescription className="text-neutral-400 text-sm sm:text-base">
            Connect with industry peers to share knowledge and grow your business
          </CardDescription>
        </CardHeader>

        <CardContent className="p-3 sm:p-6">
          <div className="max-w-md mx-auto">
            {currentStep === 0 && (
              <div className="space-y-4 sm:space-y-6">
                <div className="text-center mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-white">Meeting Preferences</h2>
                  <p className="text-neutral-500 text-sm">Let us know your preferred meeting style and location</p>
                </div>

                <div className="bg-neutral-800 p-3 sm:p-5 rounded-xl border border-neutral-600 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5">
                    <div className="flex items-center justify-center mb-3 sm:mb-0 sm:mt-1">
                      <div className="bg-yellow-400/20 p-2 sm:p-2.5 rounded-lg">
                        <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="meetingFormat" className="block text-sm font-medium text-neutral-300 mb-1">
                            Meeting Format
                          </label>
                          <select
                            id="meetingFormat"
                            className="w-full px-3 py-2 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-neutral-700 text-white"
                            {...form.register("meetingFormat")}
                          >
                            <option value="in-person">In-Person</option>
                            <option value="virtual">Virtual</option>
                            <option value="hybrid">Hybrid</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="peerLocation" className="block text-sm font-medium text-neutral-300 mb-1">
                            Peer Location
                          </label>
                          <select
                            id="peerLocation"
                            className="w-full px-3 py-2 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-neutral-700 text-white"
                            {...form.register("peerLocation")}
                          >
                            <option value="local">Local</option>
                            <option value="separated">Separated</option>
                            <option value="mixed">Mixed</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-neutral-300">Paid Membership</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-neutral-700 rounded-lg">
                          <span className="text-sm text-neutral-500">Consider Paid Membership</span>
                          <Switch
                            {...form.register("paidMembership")}
                            className="data-[state=checked]:bg-yellow-400 mx-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-700 p-3 sm:p-5 rounded-xl border border-neutral-600">
                  <h3 className="font-medium text-yellow-400 mb-2 flex items-center gap-1 sm:gap-2 text-sm">
                    <HelpCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    Why These Preferences Matter
                  </h3>
                  <p className="text-yellow-400 text-xs sm:text-sm mb-3">
                    Choosing the right meeting format and peer location can significantly impact your peer group
                    experience. Consider what works best for your schedule and learning style.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4 sm:space-y-6">
                <div className="text-center mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-white">Contact Information</h2>
                  <p className="text-neutral-500 text-sm">Tell us how to reach you about peer group opportunities</p>
                </div>

                <div className="space-y-4 bg-neutral-800 p-3 sm:p-5 rounded-xl border border-neutral-600 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5">
                    <div className="flex items-center justify-center mb-3 sm:mb-0 sm:mt-1">
                      <div className="bg-yellow-400/20 p-2 sm:p-2.5 rounded-lg">
                        <Building className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-neutral-300">Preferred Contact Method</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-neutral-700 rounded-lg">
                          <span
                            className={`text-sm ${preferredContact === "text" ? "font-medium text-yellow-400" : "text-neutral-500"}`}
                          >
                            Text Message
                          </span>
                          <Switch
                            checked={preferredContact === "email"}
                            onCheckedChange={(checked) => setPreferredContact(checked ? "email" : "text")}
                            className="data-[state=checked]:bg-yellow-400 mx-2"
                          />
                          <span
                            className={`text-sm ${preferredContact === "email" ? "font-medium text-yellow-400" : "text-neutral-500"}`}
                          >
                            Email
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="w-full px-3 py-2 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-neutral-700 text-white"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        {preferredContact === "text" ? (
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-neutral-300 mb-1">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              className="w-full px-3 py-2 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-neutral-700 text-white"
                              placeholder="(123) 456-7890"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                            <p className="text-xs text-neutral-500 mt-1">
                              We'll send you a text message to connect about peer group opportunities.
                            </p>
                          </div>
                        ) : (
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              className="w-full px-3 py-2 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-neutral-700 text-white"
                              placeholder="you@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <p className="text-xs text-neutral-500 mt-1">
                              We'll email you about peer group opportunities.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-700 p-3 sm:p-5 rounded-xl border border-neutral-600">
                  <h3 className="font-medium text-yellow-400 mb-2 flex items-center gap-1 sm:gap-2 text-sm">
                    <HelpCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    Research-Backed Benefits
                  </h3>
                  <p className="text-yellow-400 text-xs sm:text-sm mb-3">
                    According to Harvard Business Review, "Peer-to-peer learning accelerates and deepens professional
                    development by exposing individuals to a much wider range of perspectives and experiences than they
                    would encounter on their own." (HBR, "The Power of Peer-to-Peer Learning", 2019)
                  </p>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4 sm:space-y-6">
                <div className="text-center mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-white">Experience & Interests</h2>
                  <p className="text-neutral-500 text-sm">
                    Share your experience level and areas of interest to help us match you with the right group
                  </p>
                </div>

                <div className="bg-neutral-800 p-3 sm:p-5 rounded-xl border border-neutral-600 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5">
                    <div className="flex items-center justify-center mb-3 sm:mb-0 sm:mt-1">
                      <div className="bg-yellow-400/20 p-2 sm:p-2.5 rounded-lg">
                        <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="mb-4">
                        <label htmlFor="experienceLevel" className="block text-sm font-medium text-neutral-300 mb-1">
                          Years of Experience
                        </label>
                        <input
                          type="number"
                          id="experienceLevel"
                          className="w-full px-3 py-2 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-neutral-700 text-white"
                          placeholder="Enter your years of experience"
                          {...form.register("experienceLevel", { valueAsNumber: true })}
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="industry" className="block text-sm font-medium text-neutral-300 mb-1">
                          Industry
                        </label>
                        <select
                          id="industry"
                          className="w-full px-3 py-2 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-neutral-700 text-white"
                          {...form.register("industry")}
                        >
                          <option value="">Select an industry</option>
                          {industries.map((industry) => (
                            <option key={industry.value} value={industry.value}>
                              {industry.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-2">Areas of Interest</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {interests.map((interest) => (
                            <label
                              key={interest.value}
                              className={`flex items-center p-3 rounded-md border cursor-pointer transition-colors ${
                                selectedInterests.includes(interest.value)
                                  ? "bg-neutral-700 border-yellow-400"
                                  : "border-neutral-600 hover:bg-neutral-700"
                              } text-white`}
                            >
                              <input
                                type="checkbox"
                                className="mr-2 accent-yellow-400"
                                value={interest.value}
                                checked={selectedInterests.includes(interest.value)}
                                onChange={() => toggleInterest(interest.value)}
                              />
                              <span className="text-sm text-neutral-300">{interest.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-700 p-3 sm:p-5 rounded-xl border border-neutral-600">
                  <h3 className="font-medium text-yellow-400 mb-2 flex items-center gap-1 sm:gap-2 text-sm">
                    <HelpCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    Why This Information Matters
                  </h3>
                  <p className="text-yellow-400 text-xs sm:text-sm mb-3">
                    Understanding your experience level and interests allows us to create peer groups with relevant
                    expertise and shared goals, ensuring a valuable experience for all members.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4 sm:space-y-6">
                <div className="text-center mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-white">Review Your Information</h2>
                  <p className="text-neutral-500 text-sm">
                    Please review the information you've provided to ensure it's accurate.
                  </p>
                </div>

                <div className="bg-neutral-800 p-3 sm:p-5 rounded-xl border border-neutral-600 shadow-sm">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <div className="bg-yellow-400/20 p-1 sm:p-1.5 rounded-lg">
                      <Building className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
                    </div>
                    <h3 className="font-medium text-xs sm:text-sm text-neutral-300">Contact Information</h3>
                  </div>
                  <p className="font-medium text-sm text-white mb-1">Name: {name}</p>
                  <p className="font-medium text-sm text-white mb-1">
                    Contact Method: {preferredContact === "text" ? "Text Message" : "Email"}
                  </p>
                  <p className="font-medium text-sm text-white">
                    {preferredContact === "text" ? `Phone: ${phone}` : `Email: ${email}`}
                  </p>
                </div>

                <div className="bg-neutral-800 p-3 sm:p-5 rounded-xl border border-neutral-600 shadow-sm">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <div className="bg-yellow-400/20 p-1 sm:p-1.5 rounded-lg">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
                    </div>
                    <h3 className="font-medium text-xs sm:text-sm text-neutral-300">Meeting Preferences</h3>
                  </div>
                  <p className="font-medium text-sm text-white mb-1">
                    Meeting Format: {form.getValues("meetingFormat")}
                  </p>
                  <p className="font-medium text-sm text-white">Peer Location: {form.getValues("peerLocation")}</p>
                </div>

                <div className="bg-neutral-800 p-3 sm:p-5 rounded-xl border border-neutral-600 shadow-sm">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <div className="bg-yellow-400/20 p-1 sm:p-1.5 rounded-lg">
                      <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
                    </div>
                    <h3 className="font-medium text-xs sm:text-sm text-neutral-300">Experience & Interests</h3>
                  </div>
                  <p className="font-medium text-sm text-white mb-1">
                    Years of Experience: {form.getValues("experienceLevel")}
                  </p>
                  <p className="font-medium text-sm text-white mb-1">Industry: {form.getValues("industry")}</p>
                  <p className="font-medium text-sm text-white">
                    Areas of Interest: {form.getValues("interests").join(", ")}
                  </p>
                </div>

                <div className="bg-neutral-700 p-3 sm:p-5 rounded-xl border border-neutral-600">
                  <h3 className="font-medium text-yellow-400 mb-2 flex items-center gap-1 sm:gap-2 text-sm">
                    <HelpCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    Final Step
                  </h3>
                  <p className="text-yellow-400 text-xs sm:text-sm mb-3">
                    Once you submit, our team will review your information and contact you to discuss potential peer
                    group opportunities.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t border-neutral-700 p-3 sm:p-6 bg-neutral-800">
          <Button
            onClick={prev}
            disabled={currentStep === 0}
            variant="outline"
            className="border-neutral-600 text-neutral-400 hover:bg-neutral-700"
          >
            Previous
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button
              onClick={next}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium shadow-md h-10 px-4 sm:px-6"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={() => form.handleSubmit(onSubmit)()}
              disabled={!name || (preferredContact === "text" ? !phone : !email)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium shadow-md h-10 px-4 sm:px-6"
            >
              Submit
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
