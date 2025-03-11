"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, ChevronRight, Gamepad2, Mail, Pencil } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface EditProfileProps {
  profile: {
    id: string
    name: string
    color: string
    type: "adult" | "children"
  }
  onBack: () => void
  onSave: (profile: any) => void
  onDelete: (id: string) => void
}

export function EditProfile({ profile, onBack, onSave, onDelete }: EditProfileProps) {
  const [formData, setFormData] = useState({
    name: profile.name,
    gameHandle: "",
    email: "",
  })
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...profile, ...formData })
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-neutral-600">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-semibold ml-4">Edit Profile</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex items-start gap-6">
          <div className={`w-24 h-24 ${profile.color} rounded-md relative flex items-center justify-center`}>
            <div className="flex flex-col items-center justify-center">
              <div className="flex space-x-8 mb-4">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="w-10 h-3 bg-white rounded-full"></div>
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Pencil className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1">
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="text-lg"
              placeholder="Name"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Game Handle</h2>
            <p className="text-neutral-600 mb-4">
              Your handle is a unique name that will be used for playing with other Netflix members across all Netflix
              Games.{" "}
              <Button variant="link" className="text-blue-600 p-0">
                Learn more
              </Button>
            </p>
            <Button variant="outline" className="w-full justify-between h-auto py-4 text-left">
              <div className="flex items-center">
                <Gamepad2 className="w-5 h-5 mr-3 text-neutral-600" />
                <span>Create Game Handle</span>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-600" />
            </Button>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Info</h2>
            <Button variant="outline" className="w-full justify-between h-auto py-4 text-left">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-neutral-600" />
                <div className="flex flex-col">
                  <span>Email</span>
                  <span className="text-neutral-600 text-sm">Add profile email</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-600" />
            </Button>
          </div>
        </div>

        <div className="space-y-3 pt-6">
          <Button type="submit" className="w-full h-12 text-lg">
            Save
          </Button>
          <Button type="button" variant="secondary" className="w-full h-12 text-lg" onClick={onBack}>
            Cancel
          </Button>
        </div>

        <div className="pt-6 border-t">
          <Button
            type="button"
            variant="ghost"
            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => setDeleteDialogOpen(true)}
          >
            Delete Profile
          </Button>
        </div>
      </form>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Profile</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this profile? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onDelete(profile.id)
                setDeleteDialogOpen(false)
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

