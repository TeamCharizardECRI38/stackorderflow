import { useState, useEffect } from "react";
import React from "react";
import TextField from "@material-ui/core/TextField";
import ButtonUnstyled from "@mui/base/ButtonUnstyled";

import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
const filter = createFilterOptions();

function InputContainer(props) {
  const { userInfo, tags, handleClickSubmit } = props;
  const userProjectNames = userInfo.Projects.map((Project) => Project.Name);
  const [projects, setProjects] = useState(userProjectNames);
  const [link, setLink] = useState("");
  const [proj, setProj] = useState("");
  const [tagArr, setTagArr] = useState("");
  const [comm, setComm] = useState("");
  const [inputProj, setInputProj] = useState("");
  const [inputComm, setInputComm] = useState("");

  return (
    <div className="InputContainer">
      <h2>InputContainer</h2>
      <TextField
        //setup validation here
        margin="normal"
        variant="outlined"
        id="stackOverflowLink"
        label="Paste link here"
        fullWidth
        onChange={(e) => {
          setLink(e.target.value);
          console.log("input link is", e.target.value);
        }}
        value={link}
      />
      <Autocomplete
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          // Suggest the creation of a new value
          if (params.inputValue !== "") {
            filtered.push(`${params.inputValue}`);
          }
          return filtered;
        }}
        margin="normal"
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={projects}
        renderOption={(option) => option}
        sx={{ display: "inline-flex", width: "50%" }}
        freeSolo
        value={proj}
        onChange={(e, v) => {
          setProj(v);
          console.log(v);
        }}
        onInputChange={(_, newInputValue) => {
          setInputProj(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            margin="normal"
            id="projects"
            label="Select a project, or add a new project here" //make it clear for users that they should add projs here
            variant="outlined"
          />
        )}
      />
      <Autocomplete
        multiple
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          // Suggest the creation of a new value
          if (params.inputValue !== "") {
            filtered.push(`${params.inputValue}`);
          }
          return filtered;
        }}
        options={tags}
        getOptionLabel={(option) => option}
        defaultValue={[tags[0]]}
        freeSolo
        filterSelectedOptions
        onChange={(e, v) => {
          setTagArr(v);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            id="tags"
            margin="normal"
            variant="outlined"
            label="Tags"
            placeholder="Favorites"
          />
        )}
      />

      <div>
        <TextField
          variant="outlined"
          multiline
          minRows={3}
          maxRows={4}
          style={{ display: "inline-flex", width: "100%" }}
          onChange={(e) => {
            setComm(e.target.value);
            console.log("input link is", e.target.value);
          }}
          onInputChange={(_, newInputValue) => {
            setInputComm(newInputValue);
          }}
          value={comm}
          margin="normal"
          id="comments"
          label="Comments"
        />
        <ButtonUnstyled
          margin="normal"
          onClick={(e) => {
            console.log(e);
            console.log(projects);
            console.log(tags);
            console.log(link);
            console.log(comm);
            handleClickSubmit(proj, tagArr, link, comm);
            setLink("");
            setProj("");
            setTagArr("");
            setComm("");
          }}
        >
          Submit
        </ButtonUnstyled>
      </div>
    </div>
  );
}

export default InputContainer;

/**
 *       {/* <Autocomplete
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          // Suggest the creation of a new value
          if (params.inputValue !== "") {
            filtered.push(`Add "${params.inputValue}"`);
          }
          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={tags}
        renderOption={(option) => option}
        sx={{ display: "inline-flex", width: "50%" }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Tags" variant="outlined" />
        )}
      /> 
 */
