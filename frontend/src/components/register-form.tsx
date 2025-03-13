import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/features/auth/authSlice";
import { useRegisterMutation } from "../redux/api/users";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [register, { isLoading }] = useRegisterMutation();
  
    const { userInfo } = useSelector((state: any) => state.auth);
  
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";
  
    useEffect(() => {
      if (userInfo) {
        navigate(redirect);
      }
    }, [navigate, redirect, userInfo]);
  
    const submitHandler = async (e: any) => {
      e.preventDefault();
  
      if (password !== confirmPassword) {
        toast.error("Password do not match");
      } else {
        try {
          const res = await register({ username, email, password }).unwrap();
          dispatch(setCredentials({ ...res }));
          navigate(redirect);
          toast.success("User successfully registered.");
        } catch (err: any) {
          console.log(err);
          toast.error(err.data.message);
        }
      }
    };
  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Enter your email below to register to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="example123"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}    
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}    
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input 
                    id="password" 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}      
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input 
                    id="confirmPassword"
                    type="password" 
                    required 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button 
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Register"}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
                <Link
                    to={redirect ? `/login?redirect=${redirect}` : "/login"}
                    className="underline underline-offset-4"
                >
                    Log In
                </Link>
            </div>
            {isLoading && 
              <Button disabled>
                <Loader2 className="animate-spin" />
                Please wait
              </Button>
            }
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
