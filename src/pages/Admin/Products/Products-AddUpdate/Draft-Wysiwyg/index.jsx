import React, { useState, forwardRef, useEffect } from "react";
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";
const DraftWysiwyg = (props, ref) => {
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState(props.value)
  );

  useEffect(() => {}, []);

  const submitContent = async () => {};

  const handleEditorChange = (editorState) => {};
  return (
    <div style={{ border: "1px solid #ccc" }}>
      <BraftEditor
        value={editorState}
        onChange={handleEditorChange}
        onSave={submitContent}
      />
    </div>
  );
};
export default forwardRef(DraftWysiwyg);
