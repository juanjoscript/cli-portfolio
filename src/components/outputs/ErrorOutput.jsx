import useTypingEffect from "../../hooks/useTypingEffect";

function ErrorOutput({ message, animate = false }) {
  const { displayedText, isComplete } = useTypingEffect(
    animate ? message : message,
    animate ? 20 : 0
  );

  if (animate && !isComplete) {
    return (
      <pre className="whitespace-pre-wrap font-display text-red-400">
        {displayedText}
      </pre>
    );
  }

  return <p className="text-red-400 animate-fade-in">{message}</p>;
}

export default ErrorOutput;
