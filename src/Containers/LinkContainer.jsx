import { useState } from 'react';
import LinkCard from '../Components/LinkCard.jsx';
import LinkSidebar from '../Components/LinkSidebar.jsx';

function LinkContainer(props) {
  const { projects, tags } = props;
  const { userInfo, setUserInfo } = props;
  console.log('userInfo in link container', userInfo);
  const cards = userInfo.Projects[0].Links.map((link) => {
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
  return (
    <div className='LinkContainer'>
      <h2>LinkContainer</h2>
      <div>{cards}</div>
      <LinkSidebar userInfo={userInfo} setUserInfo={setUserInfo} />
    </div>
  );
}

export default LinkContainer;
