import { useState } from "react";
import LinkCard from "../Components/LinkCard.jsx";
import LinkSidebar from "../Components/LinkSidebar.jsx";

function LinkContainer(props) {
  const { projects, tags } = props;
  const { userInfo, setUserInfo } = props;
  return (
    <div className="LinkContainer">
      <h2>LinkContainer</h2>
      <LinkCard />
      <LinkSidebar userInfo={userInfo} setUserInfo={setUserInfo} />
    </div>
  );
}

export default LinkContainer;
