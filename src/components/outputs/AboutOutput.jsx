import useTypingEffect from "../../hooks/useTypingEffect";
import { config } from "../../config";

function AboutOutput({ animate = false }) {
  const { about } = config;
  const intro = `👋 Hi! I'm ${about.name}, a ${about.role} from ${about.location}.`;
  const text = `${intro}\n\n${about.bio.join("\n\n")}\n\nType 'skills' to see my tech stack or 'projects' to see what I've built.`;

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
      <p className="mb-2">
        👋 Hi! I'm{" "}
        <span className="text-cyan-400 font-semibold">{about.name}</span>, a{" "}
        {about.role} from <span className="font-semibold">{about.location}</span>.
      </p>
      {about.bio.map((paragraph, index) => (
        <p key={index} className={index === 0 ? "mb-2" : "text-gray-300"}>
          {paragraph}
        </p>
      ))}
      <p className="mt-3 text-sm text-gray-400">
        Type <span className="text-cyan-400">'skills'</span> to see my tech
        stack or <span className="text-cyan-400">'projects'</span> to see what
        I've built.
      </p>
    </div>
  );
}

export default AboutOutput;
