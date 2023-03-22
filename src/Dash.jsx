import { useState } from 'react';
import LinkContainer from './Containers/LinkContainer.jsx';
import InputContainer from './Containers/InputContainer.jsx';

function Dash(props) {
  const projNames = props.userInfo.Projects.map((project) => project.Name);
  const tagNames = props.userInfo.Projects.reduce((acc, curr) => {}, []);
  console.log('projNames', projNames);
  const [links, setLinks] = useState(['http://localhost:5173/#/dash']);
  const [tags, setTags] = useState([
    'JavaScript',
    'TypeScript',
    'React',
    'Vue',
  ]);
  const [projects, setProjects] = useState(projNames);

  const handleClickSubmit = async (project, addedTags, link) => {
    console.log('submitted', project, addedTags, link);

    const linkRes = await fetch('http://localhost:3000/projects/createLink', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        link,
        comment: 'hi zak',
        name: project,
        tags: addedTags,
        userId: props.userInfo._id,
      }),
    });

    console.log('linkRes', await linkRes.json());
    // console.log("projRes", projResponse);
    // const newProjs = [...projResponse];
    // const newTags = [...tagResponse];

    // await setProjects(newProjs);
    // await setTags(newTags);
  };

  return (
    <div className='dash'>
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
