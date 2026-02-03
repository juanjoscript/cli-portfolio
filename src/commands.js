export const validateCommands = (command) => {
  const prefix = "visitor@portfolio:~$";
  switch (command) {
    case "help":
      return {
        input: `${prefix} ${command}`,
        type: "help",
      };

    case "about":
      return {
        input: `${prefix} ${command}`,
        type: "about",
      };

    case "skills":
      return {
        input: `${prefix} ${command}`,
        type: "skills",
      };

    case "projects":
      return {
        input: `${prefix} ${command}`,
        type: "projects",
      };

    case "experience":
      return {
        input: `${prefix} ${command}`,
        type: "experience",
      };

    case "education":
      return {
        input: `${prefix} ${command}`,
        type: "education",
      };

    case "contact":
      return {
        input: `${prefix} ${command}`,
        type: "contact",
      };

    case "socials":
      return {
        input: `${prefix} ${command}`,
        type: "socials",
      };



    case "clear":
    case "cls":
      return "";

    default:
      return {
        input: `${prefix} ${command}`,
        type: "error",
        output: `Command not found: '${command}'
Type 'help' for available commands`,
      };
  }
};
