import React, { useState, useEffect, useRef } from "react";
import { validateCommands } from "../commands";
import CommandOutput from "./CommandOutput";
import { config } from "../config";

function Terminal() {
  const [message, setMessage] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when content changes (including typing effects)
  useEffect(() => {
    if (!scrollRef.current) return;

    const scrollToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };

    // Initial scroll
    scrollToBottom();

    // Create observer to watch for content changes (typing, new elements)
    const observer = new MutationObserver(() => {
      scrollToBottom();
    });

    observer.observe(scrollRef.current, {
      childList: true, // Elements added/removed
      subtree: true,   // Deep changes
      characterData: true, // Text content changes (typing effect)
    });

    return () => observer.disconnect();
  }, [message]); // Re-attach if message array reference changes (cleaner reset)

  const handleOnKeyDown = (event) => {
    const actualCommand = event.target.value;

    if (actualCommand === "") return;

    const result = validateCommands(actualCommand.toLowerCase());

    if (result === "") {
      setMessage([]);
      setInputValue("");
    } else {
      setMessage([...message, result]);
      setInputValue("");
      setHistoryIndex(-1);
    }
  };

  const handleOtherKeys = (e) => {
    const key = e.key;

    if (key === "ArrowUp") {
      e.preventDefault();

      const newIndex =
        historyIndex === -1
          ? message.length - 1
          : Math.max(0, historyIndex - 1);

      if (message[newIndex]) {
        setHistoryIndex(newIndex);
        const command = message[newIndex].input;
        const commandWithoutPrefix = command.split(" ")[1] || "";
        setInputValue(commandWithoutPrefix);
      }
    } else if (key === "ArrowDown") {
      e.preventDefault();

      if (historyIndex === -1) return;

      const newIndex = historyIndex + 1;

      if (newIndex >= message.length) {
        setHistoryIndex(-1);
        setInputValue("");
      } else {
        setHistoryIndex(newIndex);
        const command = message[newIndex].input;
        const commandWithoutPrefix = command.split(" ")[1] || "";
        setInputValue(commandWithoutPrefix);
      }
    }
  };

  const handleOnChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="min-h-screen bg-stone-900 text-gray-200 font-display flex justify-center overflow-hidden selection:bg-stone-700 selection:text-white">
      <div className="w-full max-w-3xl flex flex-col h-screen shadow-2xl bg-stone-900 border-x border-stone-800/50">

        {/* Output Area - Scrolls Independently */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 scrollbar-thin"
        >
          {/* Welcome Message / Initial Buffer */}
          <div className="mb-8 text-stone-400 opacity-80">
            <p>Welcome to {config.about.name} portfolio</p>
            <p>Type <span className="text-cyan-400">'help'</span> to see available commands.</p>
          </div>

          {/* Command History */}
          {message.map((m, index) => (
            <div key={index} className="mb-6 animate-fade-in">
              <div className="flex items-center gap-2 mb-2 opactiy-90">
                <span className="text-emerald-500 font-bold">➜</span>
                <span className="text-cyan-400 font-medium">visitor@portfolio</span>
                <span className="text-stone-500">~$</span>
                <span className="text-stone-100">{m.input.replace(/^visitor@portfolio:~\$\s*/, '')}</span>
              </div>
              <div className="pl-4 border-l-2 border-stone-800 ml-1">
                <CommandOutput
                  type={m.type}
                  output={m.output}
                  isLatest={index === message.length - 1}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Input Area - Fixed at Bottom */}
        <div className="p-4 bg-stone-900/95 backdrop-blur border-t border-stone-800">
          <div className="flex items-center gap-3 text-lg">
            <span className="text-emerald-500 font-bold">➜</span>
            <div className="flex gap-2">
              <span className="text-cyan-400 font-medium hidden sm:inline">visitor@portfolio</span>
              <span className="text-stone-500 hidden sm:inline">~$</span>
            </div>
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-stone-100 placeholder-stone-600 caret-emerald-500"
              value={inputValue}
              autoFocus
              placeholder="Type a command..."
              spellCheck="false"
              autoComplete="off"
              onKeyDown={(event) => {
                const key = event.key;
                if (key === "Enter") {
                  // Manually construct the input format expected by validateCommands/history 
                  // or just pass the value if we adjust the history storage. 
                  // The original code passed `actualCommand` to validateCommands, 
                  // but stored `result.input` which might have been formatted.
                  // The validateCommands logic (not shown fully) likely handles the logic.
                  // IMPORTANT: The original code handled `actualCommand` inside `handleOnKeyDown`.
                  // We need to keep that logic valid.
                  handleOnKeyDown(event);
                } else {
                  handleOtherKeys(event);
                }
              }}
              onChange={handleOnChange}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Terminal;
