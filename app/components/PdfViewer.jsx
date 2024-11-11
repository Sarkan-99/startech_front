"use client";

export const PdfViewer = ({ src }) => {
  if(src){
    console.log('PDF from PdfViewer : ', src)
  } else {
    console.log('Nope')
  }
  return (
    <div className="h-[60rem] mt-10 flex justify-center" >
      <iframe id="pdframe" src={src} frameBorder="0" width="80%" height="70%" ></iframe>
    </div>
  );
};