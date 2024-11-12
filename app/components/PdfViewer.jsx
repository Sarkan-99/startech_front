"use client";

export const PdfViewer = ({ src }) => {
  if(src){
    console.log('PDF from PdfViewer : ', src)
  } else {
    console.log('Nope')
  }
  return (
    <div className="h-[50rem] mt-10 flex justify-center" >
      <iframe id="pdframe" src="/user_507.pdf" frameBorder="0" width="80%" height="70%" ></iframe>
    </div>
  );
};