"use client";

import { useState } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleSendEmail = (
    values: { name: any; email: any; message: any },
    { resetForm }: any
  ) => {
    const userContactDetails = {
      from_name: values.name,
      email_id: values.email,
      message: values.message,
    };

    emailjs
      .send(
        "service_yzoe5cv",
        "template_w63w1rp",
        userContactDetails,
        "a6NPBLqd_7WpiPW_h"
      )
      .then(function (res) {
        setShowSuccessMsg(true);
        resetForm();
      })
      .catch(function (error) {
        console.error("Error sending email:", error);
      });
  };

  return (
    <div className="dark:bg-[#0A0A0A] dark:text-white min-h-screen flex items-center justify-center">
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
            <Formik
              initialValues={{ name: "", email: "", message: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSendEmail}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6 contact-form">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Field
                        as={Input}
                        name="name"
                        type="text"
                        placeholder="Your name"
                        className="bg-[#f3f4f6] dark:bg-[#262626] dark:placeholder:text-gray-500 border rounded-md p-2"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Field
                        as={Input}
                        name="email"
                        type="email"
                        placeholder="Your email address"
                        className="bg-[#f3f4f6] dark:bg-[#262626] dark:placeholder:text-gray-500 border rounded-md p-2"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Field
                      as={Textarea}
                      name="message"
                      rows={5}
                      placeholder="Your message"
                      className="bg-[#f3f4f6] dark:bg-[#262626] dark:placeholder:text-gray-500 border rounded-md p-2"
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </Form>
              )}
            </Formik>
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
};

export default ContactPage;
