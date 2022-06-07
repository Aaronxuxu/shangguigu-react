import React, { useState, forwardRef, useImperativeHandle } from "react";
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";
const DraftWysiwyg = (props, ref) => {
  const [editorState, setEditorState] = useState(null);
  useImperativeHandle(ref, () => ({
    setEditor: (value) => {
      setEditorState(BraftEditor.createEditorState(value));
    },
    getEditor: () => {
      return editorState.toHTML();
    },
  }));
  const handleChange = (editorState) => {
    return setEditorState(editorState);
  };
  return (
    <div style={{ border: "1px solid #ccc" }}>
      <BraftEditor value={editorState} onChange={handleChange} />
    </div>
  );
};

export default forwardRef(DraftWysiwyg);
