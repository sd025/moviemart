import { useState } from "react";
import { toast } from "react-toastify";
import {
  useGetProfilesQuery,
  useCreateProfileMutation,
  useUpdateProfileByIdMutation,
  useDeleteProfileMutation,
  useSwitchProfileMutation,
} from "../../redux/api/users";
import { useDispatch, useSelector } from "react-redux";
import { setActiveProfile } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router";
import { Pencil, Plus, Trash } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function ManageProfiles() {
  const { data: profiles, isLoading, isError } = useGetProfilesQuery();
  const [createProfile] = useCreateProfileMutation();
  const [updateProfileById] = useUpdateProfileByIdMutation();
  const [deleteProfile] = useDeleteProfileMutation();
  const [switchProfile] = useSwitchProfileMutation();
  
  const [newProfileName, setNewProfileName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeProfile = useSelector((state: any) => state.auth.activeProfile);

  const handleCreate = async () => {
    if (!newProfileName.trim()) {
      toast.error("Profile name is required");
      return;
    }
    try {
      await createProfile({ name: newProfileName }).unwrap();
      setNewProfileName("");
      toast.success("Profile created successfully");
    } catch (error: any) {
      console.error("Create error:", error);
      toast.error(error?.data?.message || "Error creating profile");
    }
  };

  const handleUpdate = async (profileId: string, currentName: string) => {
    const updatedName = prompt("Enter new profile name", currentName);
    if (updatedName && updatedName.trim() !== "") {
      try {
        await updateProfileById({ profileId, profileData: { name: updatedName } }).unwrap();
        toast.success("Profile updated successfully");
      } catch (error: any) {
        console.error("Update error:", error);
        toast.error(error?.data?.message || "Error updating profile");
      }
    } else {
      toast.error("Profile name cannot be empty");
    }
  };

  const handleDelete = async (profileId: string) => {
    if (!window.confirm("Are you sure you want to delete this profile?")) return;
    try {
      await deleteProfile(profileId).unwrap();
      toast.success("Profile deleted successfully");
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(error?.data?.message || "Error deleting profile");
    }
  };

  const handleSwitch = async (profileId: string) => {
    try {
      const res = await switchProfile(profileId).unwrap();
      dispatch(setActiveProfile(res.activeProfile));
      toast.success(`Switched to profile: ${res.activeProfile.name}`);
      navigate("/");
    } catch (error: any) {
      console.error("Switch error:", error);
      toast.error(error?.data?.message || "Error switching profile");
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="text-3xl font-medium text-center mb-16">Manage Profiles</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        {isLoading ? (
            <p className="text-white">Loading profiles...</p>
          ) : isError ? (
            <p className="text-red-500">Error loading profiles.</p>
          ) : (
            <>
              {profiles && profiles.length > 0 ? (
              <RadioGroup 
                value={activeProfile ? activeProfile._id : profiles[0]?._id}
                className="grid grid-cols-3 gap-4"
              >
              {profiles.map((profile: any) => (
                <div key={profile.id}>
                  <RadioGroupItem
                    value={profile._id}
                    id={`profile-${profile._id}`}
                    className="peer sr-only"
                    aria-label={profile.name}
                    onClick={() => handleSwitch(profile._id)}
                  />
                  <Label
                    htmlFor={`profile-${profile._id}`}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    {profile.name}
                    <div className="flex gap-2">
                      <Button
                        className="border-neutral-900"
                        onClick={() => handleUpdate(profile._id, profile.name)}
                        >
                        <Pencil />
                      </Button>
                      <Button
                        variant="outline"
                        className="border-neutral-600 text-red-500 hover:bg-red-500 hover:text-white"
                        onClick={() => handleDelete(profile._id)}
                        >
                        <Trash />
                      </Button>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
              ) : (
              <p className="text-white">No profiles found.</p>
            )}
          </>
        )}
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name"
            placeholder="Enter profile name"
            value={newProfileName}
            onChange={(e) => setNewProfileName(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleCreate}>Continue</Button>
      </CardFooter>
    </Card>
  </div>
  </div>
  );
}
