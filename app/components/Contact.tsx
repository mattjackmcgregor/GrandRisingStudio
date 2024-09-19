// app/components/ContactComponent.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const ContactComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const socialIconsRef = useRef(null);
  const formRef = useRef(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <section className="bg-black text-white py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 ref={titleRef} className="text-4xl font-bold mb-4 text-center">
          Get in Touch
        </h2>
        <p ref={descriptionRef} className="text-xl mb-8 text-center">
          Have a question or want to book an appointment? Reach out to us on
          social media or fill out the form below.
        </p>

        <div
          ref={socialIconsRef}
          className="flex justify-center space-x-8 mb-12"
        >
          <a
            href="https://instagram.com/grandrisingstudios"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl hover:text-pink-500 transition-colors duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="https://facebook.com/grandrisingstudios"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl hover:text-blue-500 transition-colors duration-300"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com/grandrisingstudios"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl hover:text-blue-400 transition-colors duration-300"
          >
            <FaTwitter />
          </a>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-gray-900 p-8 rounded-lg shadow-lg"
        >
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
              className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactComponent;
