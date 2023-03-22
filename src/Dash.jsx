import { useState, useEffect } from "react";
import LinkContainer from "./Containers/LinkContainer.jsx";
import InputContainer from "./Containers/InputContainer.jsx";

function Dash(props) {
  const { userInfo, setUserInfo } = props;
  const userProjectNames = userInfo.Projects.map((Project) => Project.Name);
  const userId = userInfo._id;
  const [projects, setProjects] = useState(userProjectNames);
  console.log("uI prop -> projs", userProjectNames);

  const [tags, setTags] = useState([
    //on the Links obj
    //zach is creating a route that will get all the users tags, will use that route to populate this arr
    "JavaScript",
    "TypeScript",
    "React",
    "Vue",
  ]);

  const handleClickSubmit = async (project, addedTags, link, comment) => {
    console.log("submitted", project, addedTags, link);

    try {
      const response = fetch("http://localhost:3000/projects/createLink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          link,
          comment,
          name: project,
          tags: addedTags,
          userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => setUserInfo(data))
        .then((userInfoUPDATED) =>
          console.log("userInfoUPDATED", userInfoUPDATED)
        );

      console.log("userInfo FROM state", userInfo);
    } catch (err) {
      console.error("error creating a new link", err);
    }
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
        top
        userInfo={userInfo}
        projects={projects}
        tags={tags}
        handleClickSubmit={handleClickSubmit}
      />
      <LinkContainer
        projects={projects}
        tags={tags}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
    </div>
  );
}

export default Dash;
