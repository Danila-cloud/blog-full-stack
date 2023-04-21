import { Link } from "@remix-run/react";
import { Logo } from "~/assets";

export default function Footer() {
  return (
    <footer className="bg-neutral-100 shadow">
      <div className="w-full mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to="/">
            <div className="text-2xl flex flex-row">
              <img src={Logo} className="h-14 mt-auto mr-3" alt="Blog.sol Logo" />

              <h1 className="my-auto">BLOG.sol</h1>
            </div>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
            <li>
              <a href="/register" className="mr-4 hover:underline md:mr-6 ">
                Sign-up
              </a>
            </li>
            <li>
              <a href="/login" className="mr-4 hover:underline md:mr-6">
                Sign-in
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Danila-cloud/blog-full-stack"
                className="mr-4 hover:underline md:mr-6 "
              >
                GitHub
              </a>
            </li>
            <li>
              {/* <a href="#" className="hover:underline">
                Contact
              </a> */}
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Blog.sol™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
