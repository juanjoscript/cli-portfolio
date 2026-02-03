import useTypingEffect from "../../hooks/useTypingEffect";
import { config } from "../../config";

function EducationOutput({ animate = false }) {
  const { education } = config;

  const educationText = education.map(edu =>
    `${edu.degree} at ${edu.institution} (${edu.period})\n${edu.description}`
  ).join("\n\n");

  const text = `Education:\n\n${educationText}`;

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
      <p className="mb-3">Education:</p>
      {education.map((edu, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-yellow-400 font-semibold">{edu.degree}</h3>
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>{edu.institution}</span>
            <span>{edu.period}</span>
          </div>
          <p className="text-gray-300">
            {edu.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default EducationOutput;
