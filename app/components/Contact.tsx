// app/components/ContactComponent.tsx

"use client";

import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";

const DynamicCloudinaryImage = dynamic(() => import("./CloudinaryImage"), {
  ssr: false,
});

const ContactComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSucess] = useState<Boolean | null>(null);
  const formRef = useRef(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitting(false);
        setSubmitSucess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitting(false);
      setSubmitSucess(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-black text-white px-4 md:px-8 flex flex-col justify-center pt-16 sm:flex-row"
    >
      <div className="w-full sm:w-1/2 p-8 order-2 sm:order-1 flex flex-col ">
        <div className="pb-16">
          <h2 className="pb-8 text-4xl">Wanting to get in contact with us?</h2>
          <p className="pb-8">
            Either flick us a message on one of our socials, drop by the studio
            (during normal business hours) or fill out the form below and
            we&apos;ll get back to you.
          </p>
          <div className="flex flex-col pb-4 justify-center">
            <a
              href="https://instagram.com/grandrisingstudios"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-colors duration-300"
            >
              <p>
                Instagram:{" "}
                <i className="hover:underline underline md:no-underline">
                  @grandrisingstudios
                </i>
              </p>
            </a>
            <a
              href="https://facebook.com/grandrisingstudios"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              <p>
                Facebook:{" "}
                <i className="hover:underline underline md:no-underline">
                  @grandrisingstudios
                </i>
              </p>
            </a>
          </div>
          <div>
            <p>Email: grandrisingstudios@gmail.com</p>
            <p>Studio Address: 40A Water Street, Whangārei 0110</p>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="w-full ">
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-gray-900 bg-gray-100 focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-gray-900 bg-gray-100 focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block mb-2 text-sm font-medium">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 text-gray-900 bg-gray-100 focus:outline-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className={`${
              submitting ? "cursor-not-allowed bg-gray-600" : ""
            } w-full px-3 py-2 text-gray-900 bg-gray-100 focus:outline-none relative`}
          >
            {submitting ? (
              <>
                Sending
                <span className="absolute inline-flex">
                  <span className="animate-dot1">.</span>
                  <span className="animate-dot2">.</span>
                  <span className="animate-dot3">.</span>
                </span>
              </>
            ) : (
              "Send Message"
            )}
          </button>
          {submitSuccess !== null && (
            <p
              className={`${
                submitSuccess ? "text-green-700" : "text-red-700"
              } italic  `}
            >
              {submitSuccess
                ? "Message sent successfully!"
                : "Error sending message"}
            </p>
          )}
        </form>
      </div>
      <div className="w-full max-w-2xl sm:w-1/2 order-1 sm:order-2 flex items-center justify-center p-8">
        <DynamicCloudinaryImage
          src="/grand-rising-shop.png"
          alt="Contact Us"
          width={600}
          height={600}
          extraClasses="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
};

export default ContactComponent;
