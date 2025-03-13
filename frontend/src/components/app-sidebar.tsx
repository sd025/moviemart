import * as React from "react"
import {
  BookOpen,
  Bot,
  Frame,
  House,
  Popcorn,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { ProfileSwitcher } from "@/components/profile-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useSelector } from "react-redux"
import { SearchForm } from "./search-form"
import { TeamSwitcher } from "./team-switcher"
import { useGetProfilesQuery } from "@/redux/api/users"

const data = {
  teams: [
    {
      name: "Netflix",
      logo: Popcorn,
      plan: "See What's Next",
    }
  ],
  navMain: [
    {
      title: "All Types",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Movies",
          url: "#",
        },
        {
          title: "TV Shows",
          url: "#",
        },
        {
          title: "Anime",
          url: "#",
        },
        {
          title: "New & Popular",
          url: "#",
        },
      ],
    },
    {
      title: "Genres",
      url: "#",
      icon: Bot,
      items: [
        { title: "Action", url: "#" },
        { title: "Adult", url: "#" },
        { title: "Adventure", url: "#" },
        { title: "Animation", url: "#" },
        { title: "Biography", url: "#" },
        { title: "Comedy", url: "#" },
        { title: "Crime", url: "#" },
        { title: "Documentary", url: "#" },
        { title: "Drama", url: "#" },
        { title: "Erotic", url: "#" },
        { title: "Family", url: "#" },
        { title: "Fantasy", url: "#" },
        { title: "History", url: "#" },
        { title: "Horror", url: "#" },
        { title: "Music", url: "#" },
        { title: "Mystery", url: "#" },
        { title: "Romance", url: "#" },
        { title: "Science Fiction", url: "#" },
        { title: "Western", url: "#" },
        { title: "Thriller", url: "#" },
        { title: "TV Movie", url: "#" },
        { title: "Uncategorized", url: "#" },
        { title: "War", url: "#" },
      ]
    },
    {
      title: "Your Preferences",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Original",
          url: "#",
        },
        {
          title: "Dubbing",
          url: "#",
        },
        {
          title: "Subtitles",
          url: "#",
        },
      ],
    },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  projects: [
    {
      name: "Home",
      url: "/",
      icon: House,
    },
    {
      name: "My List",
      url: "#",
      icon: Frame,
    },
    // {
    //   name: "Sales & Marketing",
    //   url: "#",
    //   icon: PieChart,
    // },
    // {
    //   name: "Travel",
    //   url: "#",
    //   icon: Map,
    // },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { userInfo } = useSelector((state:any) => state.auth);
  const { data: profiles } = useGetProfilesQuery();
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={profiles} />
      </SidebarHeader>
      <SidebarContent>
      <SearchForm className="pt-2" />
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userInfo} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
