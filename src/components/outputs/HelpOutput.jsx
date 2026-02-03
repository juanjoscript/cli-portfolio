import useTypingEffect from "../../hooks/useTypingEffect";

function HelpOutput({ animate = false }) {
  const text = `Available commands:
  help       - Show this help message
  about      - Information about me
  skills     - My technologies and skills
  projects   - List of my projects
  experience - Work experience
  education  - Academic background
  contact    - Contact information
  socials    - Social media links
  clear      - Clear terminal`;

  const { displayedText, isComplete } = useTypingEffect(
    animate ? text : text,
    animate ? 20 : 0
  );

  if (animate && !isComplete) {
    return (
      <div className="whitespace-pre-wrap font-display">
        {displayedText}
      </div>
    );
  }

  return (
    <div className="whitespace-pre-wrap animate-fade-in">
      {text}
    </div>
  );
}

export default HelpOutput;
