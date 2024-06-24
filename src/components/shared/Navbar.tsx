"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Menu, X, Search } from "lucide-react";
import { IoMoonSharp } from "react-icons/io5";
import { IoMdSunny } from "react-icons/io";
import Logo from "../../../public/Logo.png";
import LogoDark from "@/../public/Logo-dark.png";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { FaPlus } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";

const menuItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "All Blogs",
    href: "/all-blogs",
  },
  {
    name: "Contact",
    href: "/contact-us",
  },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.body.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.body.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        const data = jsonData.result;

        if (Array.isArray(data)) {
          //@ts-ignore
          setBlogs(data);
        } else {
          console.error("Data is not an array:", data);
          setBlogs([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    if (document.body.classList.contains("dark")) {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term) {
      const results = blogs.filter((blog: any) =>
        blog.blog_title.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const { user, isSignedIn } = useUser();

  return (
    <div className="dark:bg-[#151515] relative w-full bg-white border-b-[1px] ">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <Image
              src={isDarkMode ? LogoDark : Logo}
              className="logo"
              width={100}
              height={100}
              alt="Logo"
            />
          </span>
        </div>
        <div className="hidden lg:block">
          <ul className="ml-12 inline-flex space-x-8 list-none">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="inline-flex items-center text-sm text-gray-400 hover:text-gray-900 dark:text-white dark:hover:text-gray-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex grow justify-end items-center">
          <div className="relative">
            <div className="flex items-center h-10 w-[200px] rounded-lg bg-gray-100 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#262626] border dark:border-gray-700 border-gray-300 ">
              <input
                className="bg-transparent focus:border-none focus:outline-none"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                ref={searchInputRef}
              ></input>
              <Search className="text-gray-600 cursor-pointer" />
            </div>
            {searchResults.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute p-4 top-12 -left-32  md:-left-20 w-[180%] md:w-[200%] bg-white dark:bg-[#1F1F1F] shadow-2xl rounded-lg max-h-960 overflow-y-auto z-50 no-scrollbar"
              >
                <ul className="list-none">
                  {searchResults.map((result: any) => (
                    <div key={result._id}>
                      <li className="px-2 py-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                        <Link
                          href={`/blog/${result._id}`}
                          className="flex items-center gap-4"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={result.blog_imgPath}
                            alt="searchImg"
                            className="w-20 h-50 rounded-md"
                          />
                          {result.blog_title}
                        </Link>
                      </li>
                      <Separator />
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="hidden ml-3 md:flex items-center space-x-2">
            <Link
              href={"/create-blog"}
              className={`${isSignedIn ? "block" : "hidden"}`}
            >
              <button
                className="h-10 w-10 flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-[#262626]"
                title="Create New Blog"
              >
                <FaPlus />
              </button>
            </Link>
            <Link
              href={"/dashboard"}
              className={`${isSignedIn ? "block" : "hidden"}`}
            >
              <button
                className="h-10 w-10 flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-[#262626]"
                title="dashboard"
              >
                <IoMdSettings />
              </button>
            </Link>

            <button
              className="h-10 w-10 flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-[#262626]"
              title="Change Theme"
              onClick={toggleTheme}
            >
              {isDarkMode ? <IoMoonSharp /> : <IoMdSunny />}
            </button>

            <div className="ml-3">
              {isSignedIn ? (
                <UserButton />
              ) : (
                <Link href={"/sign-up"}>
                  <Button variant="default">Sign up</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="ml-2 mt-2 hidden lg:block"></div>
        <div className="ml-2 lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white dark:bg-[#181A2A] shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <Image
                      src={isDarkMode ? LogoDark : Logo}
                      className="logo"
                      width={100}
                      height={100}
                      alt="Logo"
                    />
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm dark:text-white"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="ml-3 mt-4 flex items-center space-x-2">
                  <Link
                    href={"/create-blog"}
                    className={`${isSignedIn ? "block" : "hidden"}`}
                  >
                    <button
                      className="h-10 w-10 flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-[#262626]"
                      title="Create New Blog"
                    >
                      <FaPlus />
                    </button>
                  </Link>
                  <Link
                    href={"/dashboard"}
                    className={`${isSignedIn ? "block" : "hidden"}`}
                  >
                    <button
                      className="h-10 w-10 flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-[#262626]"
                      title="dashboard"
                    >
                      <IoMdSettings />
                    </button>
                  </Link>
                  <button
                    className="h-10 w-10 flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-[#242535]"
                    onClick={toggleTheme}
                  >
                    {isDarkMode ? <IoMoonSharp /> : <IoMdSunny />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
