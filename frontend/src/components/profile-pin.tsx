"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"

interface PinSetupProps {
  onBack: () => void
  onSave: (pin: string) => void
}

export function PinSetup({ onBack, onSave }: PinSetupProps) {
  const [pin, setPin] = useState(["", "", "", ""])
  const inputs = Array(4).fill(0)

  const handlePinChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPin = [...pin]
      newPin[index] = value
      setPin(newPin)

      if (value && index < 3) {
        const nextInput = document.getElementById(`pin-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`)
      prevInput?.focus()
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-neutral-600">
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-4">Add a 4-digit PIN to create your Profile Lock</h1>
          <p className="text-neutral-600 mb-8">
            You will be asked to re-enter your PIN when you select your profile on any device.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          {inputs.map((_, index) => (
            <Input
              key={index}
              id={`pin-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={pin[index]}
              onChange={(e) => handlePinChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-16 h-20 text-2xl text-center"
            />
          ))}
        </div>

        <p className="text-neutral-600 text-center mb-8">
          Note: a profile PIN is not required to make changes to profile settings or to delete a profile.
        </p>

        <div className="space-y-3">
          <Button
            className="w-full h-12 text-lg"
            onClick={() => onSave(pin.join(""))}
            disabled={pin.some((digit) => !digit)}
          >
            Save PIN
          </Button>
          <Button variant="secondary" className="w-full h-12 text-lg" onClick={onBack}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

