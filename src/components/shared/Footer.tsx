import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 dark:bg-[#151515] border-t-[1px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:justify-between">
          <div className="lg:w-4/6 w-full mb-8 lg:mb-0">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              About
            </h2>
            <p className="lg:w-3/4 w-full mt-4 text-sm text-gray-600 dark:text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-500">
              <span className="dark:text-white font-semibold">Email:</span>
              &nbsp;for.hamza007@gmail.com
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-500">
              <span className="dark:text-white font-semibold">Phone:</span>{" "}
              &nbsp;880 123 456 789
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Quick Link
              </h2>
              <ul className="mt-4 text-sm text-gray-600 dark:text-gray-500 list-none">
                <li>
                  <a href="#" className="hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Archived
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Author
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Category
              </h2>

              <ul className="mt-4 text-sm text-gray-600 dark:text-gray-500 list-none">
                <li>
                  <a href="#" className="hover:underline">
                    Lifestyle
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Technology
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Travel
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Business
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Economy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Sports
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Weekly Newsletter
              </h2>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-500">
                Get blog articles and offers via email.
              </p>
              <form className="mt-4 flex flex-col gap-2">
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none  dark:bg-[#262626] text-xs"
                  placeholder="Your Email"
                />
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-xs">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between text-sm text-gray-600 dark:text-gray-500">
          <p>© Devmax 2024. All Rights Reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">
              Terms of Use
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
