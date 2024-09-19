import React from "react";
import CloudinaryImage from "../../components/CloudinaryImage";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { teamData } from "../../../data/teamData.json";

export async function generateStaticParams() {
  return teamData.map((member) => ({
    slug: member.slug,
  }));
}

const TeamMemberPage = ({ params: { slug } }: { params: { slug: string } }) => {
  const member = teamData.find((m) => m.slug.toString() === slug);

  if (!member) {
    return <div>Member not found</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white py-24 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        <Link
          href="/team/all"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors duration-300"
        >
          <ArrowLeft className="mr-2" />
          Back to Team
        </Link>
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
          <div className="relative h-96">
            <CloudinaryImage
              src={member.images[0]}
              alt={member.name}
              width={800}
              height={600}
              extraClasses="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <h1 className="text-4xl font-bold">{member.name}</h1>
              <p className="text-xl text-gray-300">
                {member.services.join(", ")}
              </p>
            </div>
          </div>
          <div className="p-8">
            <p className="text-gray-300 mb-6">{member.description}</p>
            <h2 className="text-2xl font-semibold mb-4">Services</h2>
            <ul className="list-disc list-inside text-gray-300 mb-6">
              {member.services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
            <h2 className="text-2xl font-semibold mb-4">Portfolio</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {member.images.slice(1).map((image, index) => (
                <CloudinaryImage
                  key={index}
                  src={image}
                  alt={`${member.name}'s work ${index + 1}`}
                  width={300}
                  height={300}
                  extraClasses="w-full h-40 object-cover rounded-lg"
                />
              ))}
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Connect</h2>
              <div className="flex space-x-4">
                {Object.entries(member.socialMediaHandles).map(
                  ([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberPage;
