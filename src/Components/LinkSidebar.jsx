// list of projects, with links appended as children
// create unordered lists from each project
// append links as children to those projects
// push unordered lists projects to an array
// render them under linkSidebar

function LinkSidebar(props) {
  const { userInfo, setUserInfo } = props;
  console.log("userInfo", userInfo);
  const userProjects = userInfo.Projects;
  console.log("userProjects in linksidebar", userProjects.Name);
  //iterate through userProjects
  // for each projectEl, access the project Name and array of Links
  // iterate through the Links array, Accessing title and tags
  // **TODO: what to do with tags?
  //push projectEl to projects
  const projects = [];
  const links = [];

  userProjects.forEach((el, i) => {
    const projLinks = [];
    // links should be a list item of the Title
    // this creates a links array of list items of link titles
    el.Links.forEach((link) => {
      projLinks.push(<li>{link.Title}</li>);
    });
    //pushes projLinks array to links array
    links.push(projLinks);
    //create an array within an array of links

    projects.push(
      <div>
        <h4>Project: {el.Name}</h4>
        <div>
          <ul>{links[i]}</ul>
        </div>
      </div>
    );
    console.log("projects", projects);
    console.log("links", links);
  });

  return (
    <div className="LinkSidebar">
      <h3>Projects</h3>
      <div>{projects}</div>
    </div>
  );
}

export default LinkSidebar;
