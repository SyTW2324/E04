import React from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../../state/store";
import { LoginForm } from "./LoginForm";
import { Header } from "../Header";

export const Login = () => {
  const setUser = useUserStore((state: any) => state.setUser);

  return (
    <>
    <Header/>
    <div>
      <LoginForm setUser={setUser} />

    </div>
    </>
  )
}