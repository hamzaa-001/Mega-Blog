"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const userContactDetails = {
    from_name: name,
    email_id: email,
    message: message,
  };
  console.log("🚀 ~ ContactPage ~ userContactDetails:", userContactDetails);

  const handleSendEmail = (e: any) => {
    e.preventDefault();
    emailjs
      .send(
        "service_yzoe5cv",
        "template_w63w1rp",
        userContactDetails,
        "a6NPBLqd_7WpiPW_h"
      )
      .then(function (res) {
        let form = document.querySelector(".contact-form");
        //@ts-ignore
        form.style.display = "none";
        setShowSuccessMsg(true);
      });
  };

  return (
    <div className="dark:bg-[#0A0A0A] dark:text-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Get in Touch
            </h1>
            <p className="mt-3 text-md text-gray-500 dark:text-gray-400">
              Have a question or want to work together? Fill out the form below
              and I&apos;ll get back to you as soon as possible.
            </p>
          </div>
          {showSuccessMsg ? (
            <div className="py-20">
              <div className="bg-green-200 px-6 py-4 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg">
                <svg
                  viewBox="0 0 24 24"
                  className="text-green-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                >
                  <path
                    fill="currentColor"
                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                  ></path>
                </svg>
                <span className="text-green-800">
                  Email has been sent successfully
                </span>
              </div>
            </div>
          ) : (
            <form className="space-y-6 contact-form" onSubmit={handleSendEmail}>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    required
                    className="bg-[#f3f4f6] dark:bg-[#262626] dark:placeholder:text-gray-500 border"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    required
                    className="bg-[#f3f4f6] dark:bg-[#262626] dark:placeholder:text-gray-500 border"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="Your message"
                  required
                  className="bg-[#f3f4f6] dark:bg-[#262626] dark:placeholder:text-gray-500 border "
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <h3 className="text-lg font-medium">Email Address</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                for.hamza007@gmail.com
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Phone</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                +92 3XX XXXXXX
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Social</h3>
              <div className="mt-2 flex space-x-4">
                <Link
                  href="https://github.com/hamzaa-001"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  target="_blank"
                >
                  <FaGithub />
                </Link>
                <Link
                  href="https://www.facebook.com/profile.php?id=100087970008455"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  target="_blank"
                >
                  <FaFacebook />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/hamza-shahid-26787b281/"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  target="_blank"
                >
                  <FaLinkedin />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FacebookIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TwitterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
