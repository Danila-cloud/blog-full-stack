import { LinksFunction, LoaderFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import Navigation from "./components/navigation";

import stylesheet from "~/tailwind.css";
import Footer from "./components/footer";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchLogin, selectIsAuth } from "./redux/slices/user";
import { ReactNode, useEffect } from "react";

export const links: LinksFunction = () => {
  return [
    // { rel: "stylesheet", href: CSS },
    { rel: "stylesheet", href: stylesheet },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
    {
      rel: "shortcut icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicons/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicons/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      href: "/favicons/android-chrome-192x192.png",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      sizes: "180x180",
      href: "/favicons/apple-touch-icon.png",
    },
    {
      rel: "mask-icon",
      href: "/favicons/safari-pinned-tab.svg",
    },

    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500;600;700&display=swap",
    },
  ];
};

export function OutletProvider() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchLogin());
  }, []);

  return <Outlet />;
}

function Document({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <Navigation />
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
          <Footer />
        </Provider>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <OutletProvider />
    </Document>
  );
}
