"use client"

import * as React from "react"
import { AlertCircle, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const PLANS = [
  {
    name: "Free Plan",
    price: "$0",
    description: "Ideal for beginners and small projects.",
    features: [
      "Up to 3 active storyboards",
      "Standard exports (PDF)",
      "Daily AI credit allotment",
    ],
  },
  {
    name: "Starter Plan",
    price: "$19",
    description: "For individual creators and power users.",
    features: [
      "Unlimited storyboards",
      "HD image & PDF exports",
      "Advanced AI Architect",
    ],
  },
  {
    name: "Pro Plan",
    price: "$49",
    description: "Designed for agencies and teams.",
    features: [
      "Everything in Starter",
      "Team collaboration tools",
      "Bulk storyboard generation",
    ],
  },
]

export default function BillingPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 p-6">
      {/* Service Unavailable Banner */}
      <div className="flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-destructive text-sm font-medium">
        <AlertCircle className="size-4 shrink-0" />
        <span>Subscription management and upgrades are currently unavailable.</span>
      </div>

      <div className="space-y-0.5">
        <h2 className="text-foreground text-2xl font-bold tracking-tight">
          Plans & Billing
        </h2>
        <p className="text-muted-foreground">
          View available plans and subscription tier options.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {PLANS.map((plan) => (
          <Card key={plan.name} className="flex flex-col border-border/50 bg-card/50">
            <CardHeader className="pb-4">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {plan.name}
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground text-xs">/mo</span>
              </div>
              <CardDescription className="text-xs pt-1.5">
                {plan.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs font-medium text-muted-foreground">
                    <Check className="size-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

