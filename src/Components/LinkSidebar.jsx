// list of projects, with links appended as children
// create unordered lists from each project
// append links as children to those projects
// push unordered lists projects to an array
// render them under linkSidebar

function LinkSidebar(props) {
  const { userInfo, setUserInfo, chosenProject, setChosenProject } = props;
  console.log("userInfo", userInfo);
  const userProjects = userInfo.Projects;
  console.log("userProjects in linksidebar", userProjects.Name);
  //iterate through userProjects
  // for each projectEl, access the project Name and array of Links
  // iterate through the Links array, Accessing title and tags
  //push projectEl to projects
  const projects = [];
  const links = []; // [ [link, link], [link, link] ]
  const tags = [];

  userProjects.forEach((el, i) => {
    const projLinks = [];
    // links should be a list item of the Title
    // this creates a links array of list items of link titles
    el.Links.forEach((link) => {
      const projTags = link.Tags; // this is an array of string tags
      const projTagsArray = [];
      projTags.forEach((tag) => {
        projTagsArray.push(
          <div className="sidebarTag">
            {tag}
            <button className="sidebarXButton">X</button>
          </div>
        );
      });
      projLinks.push(
        <li className="sidebarListItem">
          {link.Title}
          {projTagsArray}
        </li>
      );
    });
    //pushes projLinks array to links array
    links.push(projLinks);
    //create an array within an array of links

    projects.push(
      <div className="sidebarProject">
        <h4
          id={el.Name}
          onClick={(e) => {
            console.log("targetId: ", e.target.id);
            return setChosenProject(e.target.id);
          }}
        >
          Project: {el.Name}
        </h4>
        <div>
          <ul className="sidebarLinkList">{links[i]}</ul>
        </div>
      </div>
    );
    console.log("projects", projects);
    console.log("links", links);
    console.log("chosenproject", chosenProject);
  });
  console.log("chosenproject", chosenProject);
  return (
    <div className="LinkSidebar">
      <h3>Projects</h3>
      <div>{projects}</div>
    </div>
  );
}

export default LinkSidebar;
