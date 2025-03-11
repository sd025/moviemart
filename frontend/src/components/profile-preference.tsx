"use client"

import { ArrowLeft, ChevronRight, Globe, Lock, Trash2, Eye, Subtitles, RefreshCw, History, Tv } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"

type Profile = {
  id: string
  name: string
  color: string
  type: "adult" | "children"
  avatar: string
}

interface ProfilePreferencesProps {
  profile: Profile
  onBack: () => void
  onDelete: (id: string) => void
}

export function ProfilePreferences({ profile, onBack, onDelete }: ProfilePreferencesProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  return (
    <div className="w-full max-w-2xl px-4 py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-neutral-400 hover:text-white">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-medium text-center flex-1">Manage profile and preferences</h1>
      </div>

      <div className="bg-neutral-950 rounded-lg border border-neutral-800 mb-6">
        <div className="p-4 flex items-center">
          <div className="w-12 h-12 mr-4 rounded overflow-hidden">
            {profile.type === "children" ? (
              <div className="w-full h-full flex">
                <div className="w-1/4 h-full bg-green-800"></div>
                <div className="w-1/4 h-full bg-orange-500"></div>
                <div className="w-1/4 h-full bg-pink-500"></div>
                <div className="w-1/4 h-full bg-blue-600"></div>
              </div>
            ) : (
              <div className={`w-full h-full ${profile.color} flex items-center justify-center`}>
                <div className="flex flex-col items-center justify-center scale-75">
                  <div className="flex space-x-4 mb-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="w-6 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{profile.name}</h3>
            <p className="text-sm text-neutral-400">Edit personal and contact info</p>
          </div>
          <ChevronRight className="h-5 w-5 text-neutral-400" />
        </div>

        <Separator className="bg-neutral-800" />

        <div className="p-4 flex items-center">
          <Lock className="w-5 h-5 mr-4 text-neutral-400" />
          <div className="flex-1">
            <h3 className="font-medium">Profile Lock</h3>
            <p className="text-sm text-neutral-400">Require a PIN to access this profile</p>
          </div>
          <ChevronRight className="h-5 w-5 text-neutral-400" />
        </div>
      </div>

      <h2 className="text-lg mb-4">Preferences</h2>

      <div className="bg-neutral-950 rounded-lg border border-neutral-800 mb-6">
        <div className="p-4 flex items-center">
          <Globe className="w-5 h-5 mr-4 text-neutral-400" />
          <div className="flex-1">
            <h3 className="font-medium">Languages</h3>
            <p className="text-sm text-neutral-400">Set languages for display and audio</p>
          </div>
          <ChevronRight className="h-5 w-5 text-neutral-400" />
        </div>

        <Separator className="bg-neutral-800" />

        <div className="p-4 flex items-center">
          <Eye className="w-5 h-5 mr-4 text-neutral-400" />
          <div className="flex-1">
            <h3 className="font-medium">Viewing restrictions</h3>
            <p className="text-sm text-neutral-400">Edit maturity rating and title restrictions</p>
          </div>
          <ChevronRight className="h-5 w-5 text-neutral-400" />
        </div>

        <Separator className="bg-neutral-800" />

        <div className="p-4 flex items-center">
          <Subtitles className="w-5 h-5 mr-4 text-neutral-400" />
          <div className="flex-1">
            <h3 className="font-medium">Subtitle appearance</h3>
            <p className="text-sm text-neutral-400">Customise the way subtitles appear</p>
          </div>
          <ChevronRight className="h-5 w-5 text-neutral-400" />
        </div>

        <Separator className="bg-neutral-800" />

        <div className="p-4 flex items-center">
          <RefreshCw className="w-5 h-5 mr-4 text-neutral-400" />
          <div className="flex-1">
            <h3 className="font-medium">Playback settings</h3>
            <p className="text-sm text-neutral-400">Set autoplay and audio, video quality</p>
          </div>
          <ChevronRight className="h-5 w-5 text-neutral-400" />
        </div>

        <Separator className="bg-neutral-800" />

        <div className="p-4 flex items-center">
          <History className="w-5 h-5 mr-4 text-neutral-400" />
          <div className="flex-1">
            <h3 className="font-medium">Viewing activity</h3>
            <p className="text-sm text-neutral-400">Manage viewing history and ratings</p>
          </div>
          <ChevronRight className="h-5 w-5 text-neutral-400" />
        </div>
      </div>

      <div className="bg-neutral-950 rounded-lg border border-neutral-800 mb-6 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Tv className="w-5 h-5 mr-4 text-neutral-400" />
            <div>
              <h3 className="font-medium">TV animation effects</h3>
              <p className="text-sm text-neutral-400">Reduce motion transitions</p>
            </div>
          </div>
          <Switch />
        </div>
      </div>

      <Button
        variant="ghost"
        className="w-full justify-center text-red-500 hover:text-red-400 hover:bg-neutral-900"
        onClick={() => setDeleteDialogOpen(true)}
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Delete Profile
      </Button>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md bg-neutral-900 border-neutral-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl">Delete Profile</DialogTitle>
            <DialogDescription className="text-neutral-400">
              Are you sure you want to delete the profile "{profile.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="destructive"
              className="w-full sm:w-auto"
              onClick={() => {
                onDelete(profile.id)
                setDeleteDialogOpen(false)
              }}
            >
              Delete
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto text-white border-neutral-700 hover:bg-neutral-800"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

