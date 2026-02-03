import useTypingEffect from "../../hooks/useTypingEffect";
import { config } from "../../config";

function SkillsOutput({ animate = false }) {
  const { skills } = config;

  const skillsText = skills
    .map((s) => `${s.category}:\n${s.items.map((i) => `• ${i}`).join("\n")}`)
    .join("\n\n");

  const text = `Technologies & Skills:\n\n${skillsText}`;

  const { displayedText, isComplete } = useTypingEffect(
    animate ? text : text,
    animate ? 20 : 0
  );

  if (animate && !isComplete) {
    return (
      <div className="my-2">
        <pre className="whitespace-pre-wrap font-display">{displayedText}</pre>
      </div>
    );
  }

  return (
    <div className="my-2 animate-fade-in">
      <p className="mb-3">Technologies & Skills:</p>
      {skills.map((skillGroup, index) => (
        <div key={index} className="mb-3">
          <p className="text-cyan-400 font-semibold">
            {skillGroup.category}:
          </p>
          <ul className="ml-4">
            {skillGroup.items.map((skill, i) => (
              <li key={i} className="text-gray-300">
                • {skill}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default SkillsOutput;
