import { useState } from "react";
import LinkContainer from "./Containers/LinkContainer.jsx";
import InputContainer from "./Containers/InputContainer.jsx";

function Dash(props) {
  console.log(props);
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

  const handleClickSubmit = async (project, addedTags, link) => {
    console.log("submitted", project, addedTags, link);

    const linkRes = await fetch("http://localhost:3000/projects/createLink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link,
        comment: "hi zak",
        project,
        tags: addedTags,
        userId: "6418bb589938c7e38f1c7fc5",
      }),
    });

    console.log("linkRes", await linkRes.json());
    // console.log("projRes", projResponse);
    // const newProjs = [...projResponse];
    // const newTags = [...tagResponse];

    // await setProjects(newProjs);
    // await setTags(newTags);
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
