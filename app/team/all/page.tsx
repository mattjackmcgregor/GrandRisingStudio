import React from "react";
import Link from "next/link";

import CloudinaryImage from "../../components/CloudinaryImage";
import { teamData } from "../../../data/teamData.json";
import DisplayTile from "@/app/components/DisplayTile";

const TeamAllPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8 pt-navbar">
      <div className=" mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:space-x-8">
          <div className="lg:w-1/3 lg:pr-8 mb-12 lg:mb-0 lg:sticky lg:top-24 ">
            <h1 className="text-4xl font-bold mb-8 text-center lg:text-left">
              Our Team
            </h1>
            <p className="text-lg mb-6 text-center lg:text-left">
              At our studio, we offer a range of professional services including
              barbering, tattooing, and design. Each service is delivered with
              the highest level of skill and attention to detail.
            </p>
            <p className="text-lg mb-12 text-center lg:text-left">
              Click on each service to learn more about what we offer.
            </p>
          </div>

          <div className="lg:w-2/3 space-y-8">
            {teamData.map((member) => (
              <div
                key={member.id}
                className="transform transition-all duration-300 hover:scale-100"
              >
                <Link href={`/team/${member.slug}`}>
                  <DisplayTile
                    title={member.name}
                    description={member.description}
                    displayImage={member.profile_image}
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

export default TeamAllPage;
