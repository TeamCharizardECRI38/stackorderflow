import { useState } from "react";
import LinkCard from "../Components/LinkCard.jsx";
import LinkSidebar from "../Components/LinkSidebar.jsx";

function LinkContainer() {
  return (
    <div className="LinkContainer">
      <h2>LinkContainer</h2>
      <LinkCard />
      <LinkSidebar />
    </div>
  );
}

export default LinkContainer;
