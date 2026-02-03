import useTypingEffect from "../../hooks/useTypingEffect";
import { config } from "../../config";

function SocialsOutput({ animate = false }) {
  const { socials } = config.contact;

  const text = `Social Media:\n${Object.entries(socials)
    .map(([platform, handle]) => `• ${platform.charAt(0).toUpperCase() + platform.slice(1)}: ${handle}`)
    .join("\n")}`;

  const { displayedText, isComplete } = useTypingEffect(
    animate ? text : text,
    animate ? 20 : 0
  );

  if (animate && !isComplete) {
    return (
      <div>
        <pre className="whitespace-pre-wrap font-display">{displayedText}</pre>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <p className="mb-2">Social Media:</p>
      {Object.entries(socials).map(([platform, handle]) => (
        <div key={platform}>
          <a
            href={platform === 'twitter' ? `https://twitter.com/${handle.replace('@', '')}` :
              platform === 'github' ? `https://${handle}` :
                platform === 'linkedin' ? `https://${handle}` : '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline block"
          >
            • {platform.charAt(0).toUpperCase() + platform.slice(1)}: {handle}
          </a>
        </div>
      ))}
    </div>
  );
}

export default SocialsOutput;
