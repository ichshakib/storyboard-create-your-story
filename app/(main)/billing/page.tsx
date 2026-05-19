"use client"

import * as React from "react"
import { AlertCircle, Check } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card"

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
      <div className="border-destructive/20 bg-destructive/5 text-destructive flex items-center gap-3 rounded-xl border p-4 text-sm font-medium">
        <AlertCircle className="size-4 shrink-0" />
        <span>
          Subscription management and upgrades are currently unavailable.
        </span>
      </div>

      <div className="space-y-0.5">
        <h2 className="text-foreground text-2xl font-bold tracking-tight">
          Plans & Billing
        </h2>
        <p className="text-muted-foreground">
          View available plans and subscription tier options.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-3">
        {PLANS.map((plan) => (
          <Card
            key={plan.name}
            className="border-border/50 bg-card/50 flex flex-col"
          >
            <CardHeader className="pb-4">
              <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                {plan.name}
              </span>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground text-xs">/mo</span>
              </div>
              <CardDescription className="pt-1.5 text-xs">
                {plan.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-muted-foreground flex items-start gap-2 text-xs font-medium"
                  >
                    <Check className="text-primary mt-0.5 size-3.5 shrink-0" />
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
