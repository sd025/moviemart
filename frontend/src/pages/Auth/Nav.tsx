import { useState } from "react";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";
import { House, LogIn, UserRoundPlus } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <Menubar className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex space-x-4">
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Link to="/" className="flex items-center">
              <House className="mr-2" />
              Home
            </Link>
          </MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger asChild>
            <Link to="/movies" className="flex items-center">
              <MdOutlineLocalMovies className="mr-2" size={26} />
              SHOP
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
      </div>

      <div>
        {userInfo ? (
          <MenubarMenu>
            <MenubarTrigger
              onClick={toggleDropdown}
              className="flex items-center cursor-pointer"
            >
              <span className="mr-2">{userInfo.username}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </MenubarTrigger>
            {dropdownOpen && (
              <MenubarContent align="end" className="w-40">
                {userInfo.isAdmin && (
                  <>
                    <MenubarItem asChild>
                      <Link to="/admin/movies/dashboard">Dashboard</Link>
                    </MenubarItem>
                    <MenubarSeparator />
                  </>
                )}
                <MenubarItem asChild>
                  <Link to="/profile">Profile</Link>
                </MenubarItem>
                <MenubarItem onClick={logoutHandler}>Logout</MenubarItem>
              </MenubarContent>
            )}
          </MenubarMenu>
        ) : (
          <div className="flex space-x-4">
            <Link to="/login" className="flex items-center">
              <LogIn className="mr-2" />
              LOGIN
            </Link>
            <Link to="/register" className="flex items-center">
              <UserRoundPlus className="mr-2" />
              REGISTER
            </Link>
          </div>
        )}
      </div>
    </Menubar>
  );
};

export default Navigation;
