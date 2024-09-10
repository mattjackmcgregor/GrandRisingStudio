import React from "react";
import Link from "next/link";
import { serviceData } from "@/data/serviceData";
import ServiceTile from "../../components/ServiceTile";

const ServiceAllPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Our Services</h1>
        <p className="text-lg text-center mb-6">
          At our studio, we offer a range of professional services including
          barbering, tattooing, and design. Each service is delivered with the
          highest level of skill and attention to detail.
        </p>
        <p className="text-lg text-center mb-12">
          Click on each service below to learn more about what we offer.
        </p>

        <div className="space-y-12">
          {serviceData.map((service, index) => (
            <div key={service.service}>
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
  );
};

export default ServiceAllPage;
