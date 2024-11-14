"use client";

export const PdfViewer = ({ src }) => {
  return (
    <div 
      className="h-[50rem] mt-10 flex justify-center" 
      onContextMenu={(e) => e.preventDefault()
      }
    >
      <iframe 
        id="pdframe" 
        src={src? `${src}#toolbar=0`:`/test-pdf.pdf`} 
        frameBorder="0" 
        width="80%" 
        height="70%"
      ></iframe>
    </div>
  );
};
