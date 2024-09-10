import React from "react";
import Link from "next/link";
import { serviceData } from "@/data/serviceData";
import ServiceTile from "../../components/ServiceTile";

const ServiceAllPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8 pt-navbar">
      <div className=" mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:space-x-8">
          <div className="lg:w-1/2 lg:pr-8 mb-12 lg:mb-0 lg:sticky lg:top-24 ">
            <h1 className="text-4xl font-bold mb-8 text-center lg:text-left">
              Our Services
            </h1>
            <p className="text-lg mb-6 text-center lg:text-left">
              At our studio, we offer a range of professional services including
              barbering, tattooing, and design. Each service is delivered with
              the highest level of skill and attention to detail.
            </p>
            <p className="text-lg mb-12 text-center lg:text-left">
              Click on each service below to learn more about what we offer.
            </p>
          </div>

          <div className="lg:w-1/2 space-y-8">
            {serviceData.map((service, index) => (
              <div
                key={service.service}
                className="transform transition-all duration-300 hover:scale-105"
              >
                <Link href={`/services/${service.service.toLowerCase()}`}>
                  <ServiceTile
                    title={service.service}
                    description={service.description}
                    videoUrl={service.videoUrl}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceAllPage;
