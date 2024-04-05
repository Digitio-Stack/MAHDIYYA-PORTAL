import React, { Suspense } from "react";
import "react-quill/dist/quill.bubble.css";

const LazyReactQuill = React.lazy(() => import("react-quill"));

const HtmlViewer = ({ value }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyReactQuill theme="bubble" value={value} readOnly />
    </Suspense>
  );
};

export default HtmlViewer;
