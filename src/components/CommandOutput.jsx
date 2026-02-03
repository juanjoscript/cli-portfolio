import React from "react";
import HelpOutput from "./outputs/HelpOutput";
import AboutOutput from "./outputs/AboutOutput";
import SkillsOutput from "./outputs/SkillsOutput";
import ProjectsOutput from "./outputs/ProjectsOutput";
import ExperienceOutput from "./outputs/ExperienceOutput";
import EducationOutput from "./outputs/EducationOutput";
import ContactOutput from "./outputs/ContactOutput";
import SocialsOutput from "./outputs/SocialsOutput";
import ErrorOutput from "./outputs/ErrorOutput";

function CommandOutput({ type, output, isLatest }) {
  switch (type) {
    case "help":
      return <HelpOutput animate={isLatest} />;
    case "about":
      return <AboutOutput animate={isLatest} />;
    case "skills":
      return <SkillsOutput animate={isLatest} />;
    case "projects":
      return <ProjectsOutput animate={isLatest} />;
    case "experience":
      return <ExperienceOutput animate={isLatest} />;
    case "education":
      return <EducationOutput animate={isLatest} />;
    case "contact":
      return <ContactOutput animate={isLatest} />;
    case "socials":
      return <SocialsOutput animate={isLatest} />;
    case "resume":
      return <ResumeOutput animate={isLatest} />;
    case "error":
      return <ErrorOutput message={output} animate={isLatest} />;
    default:
      return <p>{output}</p>;
  }
}

export default CommandOutput;
