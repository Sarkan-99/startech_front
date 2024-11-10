"use client";

export const PdfViewer = ({ src }) => {
  return (
    <div className="h-[60rem] mt-10 flex justify-center" >
      <iframe id="pdframe" src={src} frameBorder="0" width="80%" height="70%" ></iframe>
    </div>
      
  );
};