"use client";

import React, { useEffect } from "react";
import Prism from "prismjs";
import Parse from "html-react-parser";
// languages:
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-aspnet";
import "prismjs/components/prism-sass";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-solidity";
import "prismjs/components/prism-json";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-r";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-go";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-mongodb";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

// import "prismjs/components/prism-javascript";
// import "prismjs/components/prism-css";
// import "prismjs/components/prism-docker";
// import "prismjs/components/prism-git";

interface Props {
  data: string;
}
const ParseEditorHTML = ({ data }: Props) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className={"text-dark100_light900  w-full min-w-full"}>
      {Parse(data)}
    </div>
  );
};

export default ParseEditorHTML;
