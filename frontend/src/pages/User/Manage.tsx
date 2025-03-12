import { useState } from "react";
import { toast } from "react-toastify";
import {
  useGetProfilesQuery,
  useCreateProfileMutation,
  useUpdateProfileByIdMutation,
  useDeleteProfileMutation,
  useSwitchProfileMutation,
} from "../../redux/api/users";
import { useDispatch } from "react-redux";
import { setActiveProfile } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router";
import { Pencil, Plus } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ManageProfiles() {
  const { data: profiles, isLoading, isError } = useGetProfilesQuery();
  const [createProfile] = useCreateProfileMutation();
  const [updateProfileById] = useUpdateProfileByIdMutation();
  const [deleteProfile] = useDeleteProfileMutation();
  const [switchProfile] = useSwitchProfileMutation();
  
  const [newProfileName, setNewProfileName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <div className="w-full max-w-4xl px-4">
          <h1 className="text-5xl font-medium text-center mb-16">Manage Profiles:</h1>
  
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {profiles.map((profile: any) => (
              <div key={profile.id} className="flex flex-col items-center">
                <div className="relative w-36 h-36 mb-4">
                  {profile.type === "children" ? (
                    <div className="w-full h-full rounded-md overflow-hidden">
                      <div className="flex h-full">
                        <div className="w-1/4 h-full bg-green-800"></div>
                        <div className="w-1/4 h-full bg-orange-500"></div>
                        <div className="w-1/4 h-full bg-pink-500"></div>
                        <div className="w-1/4 h-full bg-blue-600"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-red-500">children</span>
                      </div>
                    </div>
                  ) : (
                    <div className={`w-full h-full ${profile.color} rounded-md flex items-center justify-center`}>
                      <div className="flex space-x-16">
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                  )}
  
                  <button className="absolute bottom-2 right-2 w-10 h-10 bg-transparent flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                      <Pencil className="w-5 h-5 text-black" />
                    </div>
                  </button>
                </div>
                <span className="text-gray-300 text-lg">{profile.name}</span>
              </div>
            ))}
  
            <div className="flex flex-col items-center">
              <div className="w-36 h-36 mb-4 flex items-center justify-center">
                <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center">
                  <Plus className="w-10 h-10 text-gray-300" />
                </div>
              </div>
              <span className="text-gray-300 text-lg">Add Profile</span>
            </div>
          </div>
  
          <div className="flex justify-center">
            <button className="px-10 py-2 bg-white text-black font-medium text-lg">Manage</button>
          </div>
        </div>
      </div>
  );
}
