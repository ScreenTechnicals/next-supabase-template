"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { useUserAuth } from "@/hooks/useUserAuth";


export default function Home() {
  const { login, logout } = useUserAuth()
  const { isAuthenticated, user } = useUser();

  const btnHandler = () => {
    if (isAuthenticated) {
      logout()
    } else {
      login("chinmayasa09@gmail.com")
    }
  }
  return (
    <div className="p-5">
      <Button className="cursor-pointer" onClick={btnHandler}>{isAuthenticated ? "logout" : "login"}</Button>
    </div>
  );
}
