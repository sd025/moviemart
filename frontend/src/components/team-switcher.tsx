import * as React from "react"
import { ChevronsUpDown, Plus, Popcorn } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useSwitchProfileMutation } from "@/redux/api/users"
import { setActiveProfile } from "@/redux/features/auth/authSlice"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    _id: string
    name: string
  }[]
}) {

  const { isMobile } = useSidebar()
    const [switchProfile] = useSwitchProfileMutation();
    const dispatch = useDispatch();
  
    const handleSwitch = async (profileId: string) => {
      try {
        const res = await switchProfile(profileId).unwrap();
        dispatch(setActiveProfile(res.activeProfile));
        toast.success(`Switched to profile: ${res.activeProfile.name}`);
      } catch (error: any) {
        console.error("Switch error:", error);
        toast.error(error?.data?.message || "Error switching profile");
      }
    };
    const { activeProfile } = useSelector((state:any) => state.auth);
  

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Popcorn className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeProfile.name}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Your Profiles
            </DropdownMenuLabel>
            {teams.map((profile) => (
              <DropdownMenuItem
                key={profile.name}
                onClick={() => handleSwitch(profile._id)}
                className="gap-2 p-2"
              >
                {profile.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
