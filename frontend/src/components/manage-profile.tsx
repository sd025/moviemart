"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { Pencil, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { EditProfile } from "./edit-profile"
import { PinSetup } from "./profile-pin"

type Profile = {
  id: string
  name: string
  color: string
  type: "adult" | "children"
  avatar: string
}

type View = "list" | "edit" | "add" | "pin"

export function ProfileManager() {
  const [profiles, setProfiles] = useState<Profile[]>([
    { id: "1", name: "sam", color: "bg-blue-800", type: "adult", avatar: "smile" },
    { id: "2", name: "tv", color: "bg-amber-700", type: "adult", avatar: "smile" },
    { id: "3", name: "Children", color: "", type: "children", avatar: "children" },
  ])

  const [currentView, setCurrentView] = useState<View>("list")
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null)
  const [addProfileOpen, setAddProfileOpen] = useState(false)
  const [newProfile, setNewProfile] = useState<Partial<Profile>>({
    name: "",
    type: "adult",
    color: "bg-blue-800",
    avatar: "smile",
  })

  const handleAddProfile = () => {
    if (newProfile.name) {
      const profile: Profile = {
        id: Date.now().toString(),
        name: newProfile.name,
        color: newProfile.color || "bg-blue-800",
        type: newProfile.type || "adult",
        avatar: newProfile.type === "children" ? "children" : "smile",
      }
      setProfiles([...profiles, profile])
      setNewProfile({ name: "", type: "adult", color: "bg-blue-800", avatar: "smile" })
      setAddProfileOpen(false)
    }
  }

  const handleDeleteProfile = (id: string) => {
    setProfiles(profiles.filter((profile) => profile.id !== id))
    setCurrentView("list")
  }

  const handleEditProfile = (profile: Profile) => {
    setCurrentProfile(profile)
    setCurrentView("edit")
  }

  const handleSavePin = (pin: string) => {
    console.log("PIN saved:", pin)
    setCurrentView("list")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {currentView === "list" && (
        <div className="w-full max-w-4xl px-4">
          <h1 className="text-4xl font-semibold text-center mb-16">Manage Profiles:</h1>

          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {profiles.map((profile) => (
              <div key={profile.id} className="flex flex-col items-center">
                <div className="relative w-36 h-36 mb-4">
                  {profile.type === "children" ? (
                    <div className="w-full h-full rounded-md overflow-hidden">
                      <div className="flex h-full">
                        <div className="w-1/4 h-full bg-green-600"></div>
                        <div className="w-1/4 h-full bg-orange-500"></div>
                        <div className="w-1/4 h-full bg-pink-500"></div>
                        <div className="w-1/4 h-full bg-blue-500"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">children</span>
                      </div>
                    </div>
                  ) : (
                    <div className={`w-full h-full ${profile.color} rounded-md flex items-center justify-center`}>
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex space-x-16 mb-4">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <div className="w-10 h-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                  )}

                  <button
                    className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
                    onClick={() => handleEditProfile(profile)}
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-lg">{profile.name}</span>
              </div>
            ))}

            <div className="flex flex-col items-center">
              <button
                className="w-36 h-36 mb-4 flex items-center justify-center"
                onClick={() => setAddProfileOpen(true)}
              >
                <div className="w-20 h-20 bg-neutral-200 rounded-full flex items-center justify-center hover:bg-neutral-300 transition-colors">
                  <Plus className="w-10 h-10 text-neutral-600" />
                </div>
              </button>
              <span className="text-lg">Add Profile</span>
            </div>
          </div>

          <div className="flex justify-center">
            <Button className="px-10 py-6 text-lg">Done</Button>
          </div>
        </div>
      )}

      {currentView === "edit" && currentProfile && (
        <EditProfile
          profile={currentProfile}
          onBack={() => setCurrentView("list")}
          onSave={(updatedProfile) => {
            setProfiles(profiles.map((p) => (p.id === updatedProfile.id ? updatedProfile : p)))
            setCurrentView("list")
          }}
          onDelete={handleDeleteProfile}
        />
      )}

      {currentView === "pin" && <PinSetup onBack={() => setCurrentView("list")} onSave={handleSavePin} />}

      <Dialog open={addProfileOpen} onOpenChange={setAddProfileOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">Add a profile</DialogTitle>
            <DialogDescription className="text-center">
              Add a profile for another person watching Netflix.
            </DialogDescription>
          </DialogHeader>
          <button
            className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-600"
            onClick={() => setAddProfileOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>

          <div className="flex gap-4 items-center mt-4">
            <div
              className={cn(
                "w-24 h-24 rounded-md flex items-center justify-center",
                newProfile.type === "children"
                  ? "bg-gradient-to-r from-green-600 via-orange-500 to-blue-500"
                  : "bg-blue-800",
              )}
            >
              {newProfile.type === "children" ? (
                <span className="text-2xl font-bold text-white">children</span>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <div className="flex space-x-8 mb-4">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="w-10 h-3 bg-white rounded-full"></div>
                </div>
              )}
            </div>

            <div className="flex-1">
              <Input
                placeholder="Name"
                value={newProfile.name}
                onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between py-4">
            <div className="space-y-0.5">
              <Label>Children's Profile</Label>
              <p className="text-sm text-neutral-500">Only see kid-friendly TV shows and movies</p>
            </div>
            <Switch
              checked={newProfile.type === "children"}
              onCheckedChange={(checked) => setNewProfile({ ...newProfile, type: checked ? "children" : "adult" })}
            />
          </div>

          <div className="flex flex-col gap-2 mt-6">
            <Button onClick={handleAddProfile} disabled={!newProfile.name}>
              Save
            </Button>
            <Button variant="outline" onClick={() => setAddProfileOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

