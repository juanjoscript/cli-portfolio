import useTypingEffect from "../../hooks/useTypingEffect";
import { config } from "../../config";

function ContactOutput({ animate = false }) {
  const { contact } = config;
  const text = `📧 You can contact me through my email: ${contact.email}`;

  const { displayedText, isComplete } = useTypingEffect(
    animate ? text : text,
    animate ? 20 : 0,
  );

  if (animate && !isComplete) {
    return (
      <div className="my-2">
        <pre className="whitespace-pre-wrap font-display">{displayedText}</pre>
      </div>
    );
  }

  return <p className="my-2 animate-fade-in">{text}</p>;
}

export default ContactOutput;
