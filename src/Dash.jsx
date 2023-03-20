import { useState } from "react";
import LinkContainer from "./Containers/LinkContainer.jsx";
import InputContainer from "./Containers/InputContainer.jsx";

function Dash() {
  const [links, setLinks] = useState([]);
  const [projects, setProjects] = useState([]);

  return (
    <div className="Dash">
      <h1>Dash</h1>
      <InputContainer />
      <LinkContainer />
    </div>
  );
}

export default Dash;
