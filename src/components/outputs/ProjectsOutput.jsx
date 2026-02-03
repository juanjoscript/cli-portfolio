import useTypingEffect from "../../hooks/useTypingEffect";
import { config } from "../../config";

function ProjectsOutput({ animate = false }) {
  const { projects } = config;

  // Create a flattened string representation for the typing effect
  const projectText = projects
    .map(
      (p) =>
        `~${p.name} [${p.status}]\n${p.description}\nTech: ${p.tech.join(
          ", "
        )}\nLink: ${p.link}`
    )
    .join("\n\n");

  const text = `My Projects:\n\n${projectText}\n\nMore projects coming soon...`;

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
      <p className="mb-3">My Projects:</p>
      {projects.map((project, index) => (
        <div key={index} className="mb-4">
          <div>
            <h3 className="text-amber-300 font-semibold text-lg inline-block">
              ~{project.name}
            </h3>
            <span className="text-xs text-green-500 px-2 py-1 ml-2 border border-green-500 rounded">
              {project.status}
            </span>
          </div>
          <p className="text-gray-300 mb-2 mt-1">{project.description}</p>
          <p className="text-sm text-gray-400 mb-1">
            Tech: {project.tech.join(", ")}
          </p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline text-sm"
          >
            → View Project
          </a>
        </div>
      ))}
      <p className="text-gray-400 text-sm mt-4">
        More projects coming soon...
      </p>
    </div>
  );
}

export default ProjectsOutput;
