import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useSelector } from "react-redux";
import { RootStore } from "../../utils/TypeScript";

interface IProps {
  body: string;
  setBody: (value: string) => void;
}

const LiteQuill: React.FC<IProps> = ({ body, setBody }) => {
  const { darkMode } = useSelector((state: RootStore) => state);
  const { isdarkMode } = darkMode;
  const modules = { toolbar: { container } };

  return (
    <div>


      <ReactQuill
        className={`text-${isdarkMode ? 'light' : 'dark'} border border-${isdarkMode ? 'light' : 'dark'}`}
        theme="bubble"
        modules={modules}
        placeholder="Write somethings..."
        onChange={(e) => setBody(e)}
        value={body}
        id="commenteditor"

      />
    </div>
  );
};

let container = [
  [{ font: [] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block", "link"],
  [{ script: "sub" }, { script: "super" }],
];

export default LiteQuill;
