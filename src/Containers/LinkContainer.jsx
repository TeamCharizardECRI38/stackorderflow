import { useState } from "react";
import LinkCard from "../Components/LinkCard.jsx";
import LinkSidebar from "../Components/LinkSidebar.jsx";

function LinkContainer(props) {
  const { projects, tags } = props;
  const { userInfo, setUserInfo } = props;
  const [chosenProject, setChosenProject] = useState("");
  const [closeWindowValues, setCloseWindowValues] = useState([]);

  const openAll = () => {
    console.log("inside openAll");
    console.log("chosen project", chosenProject);
    console.log("chosenProject.Links", chosenProject.Links);
    setCloseWindowValues([]);
    let chosenProjObj;
    for (let i = 0; i < userInfo.Projects.length; i++) {
      let selectedProj = userInfo.Projects[i];
      console.log("selectedProj.Name", selectedProj.Name);
      if (selectedProj.Name === chosenProject) {
        chosenProjObj = userInfo.Projects[i];
      }
    }
    const linksArray = [];
    chosenProjObj.Links.forEach((obj) => {
      linksArray.push(obj.Link);
    });
    linksArray.forEach((el) => {
      const result = window.open(el);
      newCloseArray = [...closeWindowValues];
      newCloseArray.push(result);
      setCloseWindowValues(newCloseArray);
    });
    return;
  };

  const closeAll = () => {
    closeWindowValues.forEach((el) => {
      el.close();
    });
    setCloseWindowValues([]);
    return;
  };

  return (
    <div className="LinkContainer">
      <h2>{chosenProject ? chosenProject : "Choose a Project!"}</h2>
      <button
        onClick={(e) => {
          console.log("inside onclick");
          openAll();
          e.preventDefault();
          return;
        }}
      >
        Open all project links
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          return closeAll();
        }}
      >
        Close all project links
      </button>
      <LinkCard
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        chosenProject={chosenProject}
        setChosenProject={setChosenProject}
      />
      <LinkSidebar
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        chosenProject={chosenProject}
        setChosenProject={setChosenProject}
      />
    </div>
  );
}

export default LinkContainer;
