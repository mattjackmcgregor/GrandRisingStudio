"use client";

import React, { useState } from "react";
import TeamCard from "./TeamCard";
import teamDataJson from "../../data/teamData.json";

const TeamOverviewContainer = () => {
  const [teamMemberIdx, setTeamMemberIdx] = useState<number>(0);

  const handlePrevTeamMember = (): void => {
    setTeamMemberIdx((prevIdx) =>
      prevIdx === 0 ? teamDataJson.teamData.length - 1 : prevIdx - 1
    );
  };
  const handleNextTeamMember = (): void => {
    setTeamMemberIdx((prevIdx) =>
      prevIdx === teamDataJson.teamData.length - 1 ? 0 : prevIdx + 1
    );
  };

  const getNextTeamMember = (): string => {
    const nextName =
      teamMemberIdx === teamDataJson.teamData.length - 1
        ? teamDataJson.teamData[0].name
        : teamDataJson.teamData[teamMemberIdx + 1].name;
    return nextName;
  };
  const getPrevTeamMember = (): string => {
    const prevName =
      teamMemberIdx === 0
        ? teamDataJson.teamData[teamDataJson.teamData.length - 1].name
        : teamDataJson.teamData[teamMemberIdx - 1].name;
    return prevName;
  };

  return (
    <div id="teamOverview" className="h-full py-6 flex flex-col">
      <h2 className="text-3xl font-bold text-center pb-6 text-white">
        Meet the Team
      </h2>
      <TeamCard
        key={teamDataJson.teamData[teamMemberIdx].id}
        {...teamDataJson.teamData[teamMemberIdx]}
        onPrevTeamMember={handlePrevTeamMember}
        onNextTeamMember={handleNextTeamMember}
        prevTeamMember={getPrevTeamMember()}
        nextTeamMember={getNextTeamMember()}
      />
    </div>
  );
};

export default TeamOverviewContainer;
