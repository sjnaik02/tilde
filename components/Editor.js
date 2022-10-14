import React from "react";
import autosize from "autosize";

function Editor({ value, onChange, placeholder, isReadOnly, styles }) {
  return (
    <textarea
      ref={autosize}
      className={`my-4 w-full bg-primary p-1 pl-0 text-gray-100 caret-white outline-none ${styles}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      readOnly={isReadOnly}
    />
  );
}

export default Editor;
