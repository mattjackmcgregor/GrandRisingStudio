import React from "react";
import Link from "next/link";

import CloudinaryImage from "../../components/CloudinaryImage";
import { teamData } from "../../../data/teamData.json";

const TeamAllPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-16 bg-clip-text text-white">
          Team
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamData.map((member, index) => (
            <div
              key={member.id}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Link href={`/team/${member.slug}`}>
                <div className="relative h-64">
                  <CloudinaryImage
                    src={member.images[0]}
                    alt={member.name}
                    width={400}
                    height={300}
                    extraClasses="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h2 className="text-2xl font-bold">{member.name}</h2>
                    <p className="text-gray-300">
                      {member.services.join(", ")}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-400 line-clamp-3">
                    {member.description}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamAllPage;
