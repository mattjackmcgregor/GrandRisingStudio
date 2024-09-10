// app/services/[slug]/page.tsx

import React from "react";
import { notFound } from "next/navigation";
import { serviceData } from "@/data/serviceData";
import CloudinaryImage from "../../components/CloudinaryImage";

import dynamic from "next/dynamic";
import Link from "next/link";

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

        <div className="relative">
          {/* Background stamp image */}
          <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
            <CloudinaryImage
              src="/compressedLogo_lq4ksg"
              alt="logo"
              height={800}
              width={800}
              extraClasses="object-cover w-full h-full"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12  relative z-10">
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
              <p className="text-gray-300 px-4 md:px-0">
                {service.description}
              </p>
            </div>
          </div>

          <div className="mb-12 px-4 md:px-0">
            <h2 className="text-2xl font-semibold mb-4">What to Expect</h2>
            <ul className="list-disc pl-5 text-gray-300">
              <li>Consultation to understand your preferences</li>
              <li>
                Professional service using high-quality tools and products
              </li>
              <li>Styling advice and product recommendations</li>
              <li>Follow-up care instructions</li>
            </ul>
          </div>
        </div>
        <div className="mb-12 px-4 md:px-0">
          <h2 className="text-2xl font-semibold mb-4">
            Our {service.service} Specialists
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.specialists.map((specialist) => (
              <Link
                href={`/team/${specialist.urlPath}`}
                key={specialist.urlPath}
                className="bg-transparent border border-gray-600 transform hover:scale-105 cursor-pointer transition-all duration-300 p-4 rounded-lg"
              >
                <CloudinaryImage
                  src="//compressedLogo_lq4ksg" // @TODO: Replace with actual image of person
                  alt={`Specialist ${specialist.name}`}
                  width={200}
                  height={200}
                  extraClasses="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">
                  {specialist.name}
                </h3>
                <ul className="flex">
                  {specialist.skills.map((skill, index) => (
                    <li key={skill} className="text-gray-300 italic text-sm">
                      {skill}
                      {index < specialist.skills.length - 1 && (
                        <span className="mx-1">|</span>
                      )}
                    </li>
                  ))}
                </ul>
              </Link>
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
