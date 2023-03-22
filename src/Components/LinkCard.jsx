import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import parse from 'html-react-parser';

function LinkCard(props) {
  // const { projects, links, tags } = props;
  const { userInfo, setUserInfo } = props;
  const tags = props.tags.map((tag) => {
    return <li>{tag}</li>;
  });

  return (
    <Card variant='outlined' id={props.linkid}>
      <h2>{props.title}</h2>
      <div> {parse(JSON.parse(props.topAnswer))}</div>
      <ul>{tags}</ul>
      <h5>
        <a href={props.link}>{props.link}</a>
      </h5>
    </Card>
  );
}

export default LinkCard;
