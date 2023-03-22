import { useState } from "react";
import LinkCard from "../Components/LinkCard.jsx";
import LinkSidebar from "../Components/LinkSidebar.jsx";

function LinkContainer(props) {
  const { projects, tags } = props;
  const { userInfo, setUserInfo } = props;
  const [chosenProject, setChosenProject] = useState("");
  const [closeWindowValues, setCloseWindowValues] = useState([]);
  const { projIndex, setProjIndex } = useState();

  // if selectproject else cards will be empty array
  let chosenProjObj;
  for (let i = 0; i < userInfo.Projects.length; i++) {
    let selectedProj = userInfo.Projects[i];
    console.log("selectedProj.Name", selectedProj.Name);
    if (selectedProj.Name === chosenProject) {
      chosenProjObj = userInfo.Projects[i];
    }
  }
  let cards;
  if (chosenProject !== "") {
    cards = chosenProjObj.Links.map((link) => {
      return (
        <LinkCard
          comment={link.Comment}
          link={link.Link}
          tags={link.Tags}
          title={link.Title}
          topAnswer={link.TopAnswer}
          linkid={link._id}
          setUserInfo={setUserInfo}
        />
      );
    });
  } else {
    cards = [];
  }
  //console.log('userInfo in link container', userInfo);

  // return (
  // <div className='LinkContainer'>
  // <h2>LinkContainer</h2>
  // <div>{cards}</div>
  // <LinkSidebar userInfo={userInfo} setUserInfo={setUserInfo} />)

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
      <div className="vertical">
        <h2>{chosenProject ? chosenProject : "Choose a Project!"}</h2>
        <div className="horizontal">
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
        </div>
      </div>
      <div>{cards}</div>
      <LinkSidebar
        left
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        chosenProject={chosenProject}
        setChosenProject={setChosenProject}
      />
    </div>
  );
}

export default LinkContainer;
