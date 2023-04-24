import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "~/redux/slices/auth";
import { Button } from "@mui/material";
import { Link } from "@remix-run/react";
import { Logo } from "~/assets";
import { useEffect } from "react";
import { ThunkDispatch } from "@reduxjs/toolkit";

export default function Navigation() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const isAuth = useSelector(selectIsAuth);

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="fixed top-0 left-0 z-[999] flex w-full flex-row py-auto h-[56px] gap-x-6 gap-y-2 bg-neutral-100 font-semibold text-sky-800">
      <Link to="/">
        <div className="gap-2 my-auto text-2xl flex flex-row mr-auto ml-24">
          <img src={Logo} className="h-14 mt-auto" alt="Blog.sol Logo" />

          <h1 className="my-auto">BLOG.sol</h1>
        </div>
      </Link>
      {isAuth ? (
        <div className="flex flex-row gap-2 my-auto ml-auto mr-24 relative right">
          <Button variant="contained" href="#">
            Create a new post
          </Button>

          <Button variant="outlined" onClick={onLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex flex-row gap-2 my-auto ml-auto mr-24 relative right">
          <Button variant="outlined" href="/login">
            Sign-in
          </Button>

          <Button variant="contained" href="/register">
            Sign-up
          </Button>
        </div>
      )}
    </div>
  );
}
