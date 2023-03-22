import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import parse from "html-react-parser";

function LinkCard(props) {
  // const { projects, links, tags } = props;

  const { userInfo, setUserInfo } = props;
  const tags = props.tags.map((tag) => {
    return <li>{tag}</li>;
  });

  return (
    <Card variant="outlined" id={props.linkid}>
      <h2>{props.title}</h2>
      <div> {parse(JSON.parse(props.topAnswer))}</div>
      <ul>{tags}</ul>
      <h5>
        <a href={props.link}>{props.link}</a>
      </h5>
    </Card>
  );
}

//   const linkInfo = {
//     LinkId: "adjo1j093210m",
//     Title: "Title goes here",
//     Link: "https://stackoverflow.com/questions/74597732/uncaught-syntaxerror-export-import-react3-is-not-defined-in-module-at-chunk",
//     DateCreated: Date.now(),
//     Comment: "hi zak",
//     Tags: ["tag1", "javacript"],
//     Favorite: false,
//     TopAnswer: `<div class="s-prose js-post-body" itemprop="text">
//     <p class="flipthis-highlight">I have a project created with <code>create-react-app</code> with <code>Typescript</code>. And I am using <code>yarn 3.3.0</code> as the package manager.</p>
//     <p>Now I am trying to shift from <code>cra</code>s <code>webpack</code> to <code>vite</code>. I have bootstrapped a project with the <code>yarn create vite</code> command. And simply copy and paste the components from previous project to the new one.</p>
//     <p>When I run on the command line <code>yarn tsc</code> I am facing no error.</p>
//     <p>Also running <code>yarn dev</code> is okay in the terminal and the server starts successfully.</p>
//     <p>However, in the browser I am facing an weird error on the terminal which says:</p>
//     <pre class="lang-js s-code-block"><code class="hljs language-javascript"><span class="hljs-title class_">Uncaught</span> <span class="hljs-title class_">SyntaxError</span>: <span class="hljs-title class_">Export</span> <span class="hljs-string">'import_react3'</span> is not defined <span class="hljs-keyword">in</span> <span class="hljs-variable language_">module</span> (at chunk-<span class="hljs-title class_">ALR5B</span>6M7.<span class="hljs-property">js</span>?v=<span class="hljs-attr">aa4e0109</span>:<span class="hljs-number">17143</span>:<span class="hljs-number">3</span>)
//     </code></pre>
//     <p><a href="https://i.stack.imgur.com/EhI4f.png" rel="nofollow noreferrer"><img src="https://i.stack.imgur.com/EhI4f.png" alt="enter image description here"></a></p>
//         </div`,
//   };

//   // turns html into markup object
//   const markup = { __html: linkInfo.TopAnswer };

//   return (
//     <Card variant="outlined">
//       <h2>{linkInfo.Title}</h2>
//       <div dangerouslySetInnerHTML={markup}></div>
//     </Card>
//   );
// }

export default LinkCard;
