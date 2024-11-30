import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const QuillTextEditor = dynamic(() => import("react-quill"), { ssr: false });

interface QuillEditorProps {
  content: string;
  setContent: (newContent: string) => void;
}

const QuillEditor = ({ content, setContent }: QuillEditorProps) => {
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    // "image",
    "align",
    "color",
    "code-block",
  ];

  const handleEditorChange = (newContent: any) => {
    setContent(newContent);
  };

  return (
    <QuillTextEditor
      className="w-full h-full"
      formats={quillFormats}
      modules={quillModules}
      value={content}
      onChange={handleEditorChange}
    />
  );
};

export default QuillEditor;
