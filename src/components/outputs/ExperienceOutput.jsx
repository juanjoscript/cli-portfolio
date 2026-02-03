import useTypingEffect from "../../hooks/useTypingEffect";
import { config } from "../../config";

function ExperienceOutput({ animate = false }) {
  const { experience } = config;

  const experienceText = experience.map(exp =>
    `${exp.role} at ${exp.company} (${exp.period})\n${exp.description}`
  ).join("\n\n");

  const text = `Work Experience:\n\n${experienceText}\n\n💡 Open to opportunities and collaborations!`;

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
      <p className="mb-3">Work Experience:</p>
      {experience.map((exp, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-yellow-400 font-semibold">{exp.role}</h3>
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>{exp.company}</span>
            <span>{exp.period}</span>
          </div>
          <p className="text-gray-300">
            {exp.description}
          </p>
        </div>
      ))}
      <p className="text-violet-500 mt-2">
        💡 Open to opportunities and collaborations!
      </p>
    </div>
  );
}

export default ExperienceOutput;
