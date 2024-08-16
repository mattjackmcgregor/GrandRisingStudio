"use client";

import React, { useState } from "react";
import TeamCard from "./TeamCard";

//need to clean up img paths

const teamData = [
  {
    id: 1,
    name: "John Doe",
    images: [
      "https://res.cloudinary.com/deiv1hpqw/image/upload/v1719904752/barberCompressed_xjly3c.webp",
      "https://res.cloudinary.com/deiv1hpqw/image/upload/v1719904752/barberCompressed_xjly3c.webp",
      "https://res.cloudinary.com/deiv1hpqw/image/upload/v1719904749/tattooCompressed_hqeelc.webp",
      "https://res.cloudinary.com/deiv1hpqw/image/upload/v1719904749/tattooCompressed_hqeelc.webp",
    ],
    services: ["Web Development", "UI/UX Design", "Consulting"],
    description:
      "John is a seasoned web developer with over 10 years of experience in building responsive and user-friendly websites. He specializes in front-end development and has a keen eye for design.",
    socialMediaHandles: {
      twitter: "https://twitter.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    images: [
      "https://res.cloudinary.com/deiv1hpqw/image/upload/v1719904752/barberCompressed_xjly3c.webp",
      "https://res.cloudinary.com/deiv1hpqw/image/upload/v1719904752/barberCompressed_xjly3c.webp",
      "https://res.cloudinary.com/deiv1hpqw/image/upload/v1719904749/tattooCompressed_hqeelc.webp",
      "https://res.cloudinary.com/deiv1hpqw/image/upload/v1719904749/tattooCompressed_hqeelc.webp",
      "https://res.cloudinary.com/deiv1hpqw/image/upload/v1719904752/barberCompressed_xjly3c.webp",
      "https://res.cloudinary.com/deiv1hpqw/image/upload/v1719904752/barberCompressed_xjly3c.webp",
      "https://res.cloudinary.com/deiv1hpqw/image/upload/v1719904749/tattooCompressed_hqeelc.webp",
      "https://res.cloudinary.com/deiv1hpqw/image/upload/v1719904749/tattooCompressed_hqeelc.webp",
    ],
    services: [
      "Digital Marketing",
      "Social Media Management",
      "Content Creation",
    ],
    description:
      "Jane is a digital marketing expert with a proven track record of driving growth and engagement for businesses across various industries. She excels in creating compelling content and executing effective social media strategies.",
    socialMediaHandles: {
      twitter: "https://twitter.com/janesmith",
      instagram: "https://instagram.com/janesmith",
      facebook: "https://facebook.com/janesmith",
    },
  },
  {
    id: 3,
    name: "Michael Johnson",
    images: [
      "https://res.cloudinary.com/deiv1hpqw/image/upload/v1719904752/barberCompressed_xjly3c.webp",
      "https://res.cloudinary.com/deiv1hpqw/image/upload/v1719904749/tattooCompressed_hqeelc.webp",
      "https://res.cloudinary.com/deiv1hpqw/image/upload/v1719904749/tattooCompressed_hqeelc.webp",
    ],
    services: ["Graphic Design", "Branding", "Print Design"],
    description:
      "Michael is a talented graphic designer with a passion for creating visually stunning designs that captivate audiences. He has a keen eye for detail and a deep understanding of branding principles.",
    socialMediaHandles: {
      behance: "https://behance.net/michaeljohnson",
      dribbble: "https://dribbble.com/michaeljohnson",
      instagram: "https://instagram.com/michaeljohnson",
    },
  },
];

const TeamOverviewContainer = () => {
  const [teamMemberIdx, setTeamMemberIdx] = useState<number>(0);

  const handlePrevTeamMember = (): void => {
    setTeamMemberIdx((prevIdx) =>
      prevIdx === 0 ? teamData.length - 1 : prevIdx - 1
    );
  };
  const handleNextTeamMember = (): void => {
    setTeamMemberIdx((prevIdx) =>
      prevIdx === teamData.length - 1 ? 0 : prevIdx + 1
    );
  };

  const getNextTeamMember = (): string => {
    const nextName =
      teamMemberIdx === teamData.length - 1
        ? teamData[0].name
        : teamData[teamMemberIdx + 1].name;
    return nextName;
  };
  const getPrevTeamMember = (): string => {
    const prevName =
      teamMemberIdx === 0
        ? teamData[teamData.length - 1].name
        : teamData[teamMemberIdx - 1].name;
    return prevName;
  };

  return (
    <div id="teamOverview">
      <TeamCard
        key={teamData[teamMemberIdx].id}
        {...teamData[teamMemberIdx]}
        onPrevTeamMember={handlePrevTeamMember}
        onNextTeamMember={handleNextTeamMember}
        prevTeamMember={getPrevTeamMember()}
        nextTeamMember={getNextTeamMember()}
      />
    </div>
  );
};

export default TeamOverviewContainer;
