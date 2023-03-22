import { useState } from "react";
import LinkContainer from "./Containers/LinkContainer.jsx";
import InputContainer from "./Containers/InputContainer.jsx";

function Dash() {
  const [links, setLinks] = useState(["http://localhost:5173/#/dash"]);
  const [tags, setTags] = useState([
    "JavaScript",
    "TypeScript",
    "React",
    "Vue",
  ]);
  const [projects, setProjects] = useState([
    "Project 1",
    "Project 2",
    "Project 3",
  ]);

  const handleClickSubmit = async (project, addedTags, link, comments) => {
    console.log("submitted", project, addedTags, link);
    //add condition to only do one or the other
    //create both a new  proj AND a new Link
    const projResponse = await fetch("/createProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: project,
        link,
        comment,
        tags,
      }),
    });

    const linkRes = await fetch("/createLink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        links,
        comment,
        project,
        tags: addedTags,
      }),
    });

    console.log("linkRes", linkRes);
    console.log("projRes", projResponse);
    const newProjs = [...projResponse];
    const newTags = [...tagResponse];

    await setProjects(newProjs);
    await setTags(newTags);
  };

  return (
    <div className="dash">
      <h1>Dash</h1>
      <InputContainer
        projects={projects}
        tags={tags}
        handleClickSubmit={handleClickSubmit}
      />
      <LinkContainer projects={projects} tags={tags} />
    </div>
  );
}

export default Dash;
