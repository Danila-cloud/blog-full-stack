import { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import Navigation from "./components/navigation";

import stylesheet from "~/tailwind.css";
import Footer from "./components/footer";
import { Provider } from "react-redux";
import store from "./redux/store";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: stylesheet },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
    {
      rel: 'shortcut icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicons/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicons/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '192x192',
      href: '/favicons/android-chrome-192x192.png',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      sizes: '180x180',
      href: '/favicons/apple-touch-icon.png',
    },
    {
      rel: 'mask-icon',
      href: '/favicons/safari-pinned-tab.svg',
    },

    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500;600;700&display=swap',
    },
  ]
}

export default function App() {
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
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
