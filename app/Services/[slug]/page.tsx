// app/services/[slug]/page.tsx

import React from "react";
import { notFound } from "next/navigation";
import { serviceData } from "@/data/serviceData";
import CloudinaryImage from "../../components/CloudinaryImage";
import CloudinaryVideoService from "../../components/CloudinaryVideo";

import dynamic from "next/dynamic";

const DynamicCloudinaryVideoService = dynamic(
  () => import("../../components/CloudinaryVideo"),
  { ssr: false }
);

export async function generateStaticParams() {
  return serviceData.map((service) => ({
    slug: service.service.toLowerCase(),
  }));
}

const ServicePage = ({ params }: { params: { slug: string } }) => {
  const service = serviceData.find(
    (s) => s.service.toLowerCase() === params.slug
  );

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white pt-navbar md:px-8">
      <div className=" mx-auto  py-12">
        <h1 className="text-4xl px-4 md:px-0 font-bold mb-8">
          {service.service}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <DynamicCloudinaryVideoService
              publicId={service.videoUrl}
              className="w-full h-64 object-cover "
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold px-4 md:px-0 mb-4">
              About Our {service.service}
            </h2>
            <p className="text-gray-300 px-4 md:px-0">{service.description}</p>
          </div>
        </div>

        <div className="mb-12 px-4 md:px-0">
          <h2 className="text-2xl font-semibold mb-4">What to Expect</h2>
          <ul className="list-disc pl-5 text-gray-300">
            <li>Consultation to understand your preferences</li>
            <li>Professional service using high-quality tools and products</li>
            <li>Styling advice and product recommendations</li>
            <li>Follow-up care instructions</li>
          </ul>
        </div>

        <div className="mb-12 px-4 md:px-0">
          <h2 className="text-2xl font-semibold mb-4">
            Our {service.service} Specialists
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Replace with actual data */}
            {[1, 2, 3].map((specialist) => (
              <div
                key={specialist}
                className="bg-transparent border border-gray-600 transform hover:scale-105 transition-all duration-300 p-4 rounded-lg"
              >
                <CloudinaryImage
                  src="//compressedLogo_lq4ksg" // Replace with actual image
                  alt={`Specialist ${specialist}`}
                  width={200}
                  height={200}
                  extraClasses="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">
                  Specialist {specialist}
                </h3>
                <p className="text-gray-300">
                  Specializes in various styles and techniques
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold px-4 md:px-0 mb-4">Our Work</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 px-4 md:px-0 gap-4">
            {/* Replace with actual data */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((work) => (
              <CloudinaryImage
                key={work}
                src="//compressedLogo_lq4ksg" // Replace with actual image
                alt={`Work sample ${work}`}
                width={300}
                height={300}
                extraClasses="w-full h-48 object-cover  rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
