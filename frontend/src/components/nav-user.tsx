import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useLogoutMutation } from "../redux/api/users"
import { logout } from "../redux/features/auth/authSlice"
import {
  BadgeCheck,
  ChevronsUpDown,
  CircleUser,
  LogIn,
  LogOut,
  ShieldUser,
  UserRoundPlus,
  UsersRound,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavUser({
  user,
}: {
  user: {
    isAdmin?: any
    username: string
    email: string
    avatar?: string
  }
}) {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutApiCall] = useLogoutMutation()
  const { isMobile } = useSidebar()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate("/login")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {user ? (
                  <AvatarFallback className="rounded-lg">
                    {user ? user.username.slice(0, 2).toUpperCase() : ""}
                  </AvatarFallback>
                  ) : (
                    <AvatarFallback className="rounded-lg">
                      <CircleUser />
                    </AvatarFallback>
                )}
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                {user ? (
                  <>
                    <span className="truncate font-medium">
                      {user.username}
                    </span>
                    <span className="truncate text-xs">{user.email}</span>
                  </>
                ) : (
                  <span className="truncate font-medium">Try It Now!</span>
                )}
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
          {!user ? ( 
            <>
              <DropdownMenuItem asChild>
                <Link to="/login" className="flex items-center gap-2 p-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/register" className="flex items-center gap-2 p-2">
                  <UserRoundPlus className="h-4 w-4" />
                  Register
                </Link>
              </DropdownMenuItem>
              </>
            ) : (
            <>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">
                      {user ? user.username.slice(0, 2).toUpperCase() : ""}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.username}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
                <DropdownMenuGroup>
                {user.isAdmin && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/movies/dashboard">
                        <ShieldUser />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem asChild>
                  <Link to="/profile">
                    <BadgeCheck />
                    Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profiles">
                    <UsersRound />
                    Manage profiles
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logoutHandler}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
