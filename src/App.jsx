import { useState } from "react";
import "./App.css";
import Terminal from "./components/Terminal";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Terminal />
    </>
  );
}

export default App;
