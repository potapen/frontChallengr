import React from "react";
import "./FileInput.css";

const FileInput = ({ value, onChange, ...rest }) => {
  console.log("fileinput", value);
  return (
    <label>
      <span className="filePickerButton">Select a file</span>
      <input
        {...rest}
        style={{ display: "none" }}
        type="file"
        onChange={onChange}
      />
      {value && Boolean(value.name.length) && (
        <div>Selected file: {value.name}</div>
      )}
    </label>
  );
};
export default FileInput;