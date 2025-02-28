import React, { useState, useRef } from "react";
import { ChevronLeft, Upload, Check } from "lucide-react";

const UploadDocument = ({ onBack, onNext, onFileUpload }) => {
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturingSide, setCapturingSide] = useState(null); // 'front' or 'back'

  // Handle file selection (Mobile)
  const handleFileChange = (e, side) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      side === "front" ? setFrontFile(file) : setBackFile(file);
      onFileUpload(file, side);
    }
  };

  // Open Camera (Desktop)
  const openCamera = (side) => {
    setIsCameraOpen(true);
    setCapturingSide(side);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam:", err));
  };

  // Capture Image (Desktop)
  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      const file = new File([blob], `document-${capturingSide}.jpg`, {
        type: "image/jpeg",
      });
      if (capturingSide === "front") setFrontFile(file);
      else setBackFile(file);
      onFileUpload(file, capturingSide);
      setIsCameraOpen(false);
      video.srcObject.getTracks().forEach((track) => track.stop()); // Stop webcam
    }, "image/jpeg");
  };

  // Check if both files are uploaded
  React.useEffect(() => {
    setIsFileUploaded(frontFile && backFile);
  }, [frontFile, backFile]);

  // Detect if the device is mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div className="max-w-lg mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-lg">
      <div className="flex items-center gap-4 mb-6 sm:mb-8">
        <button onClick={onBack} className="p-2 rounded-full bg-gray-100">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl sm:text-2xl font-semibold">Document type</h2>
      </div>

      <div className="space-y-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="font-medium mb-4">Identity document</p>

          {/* Mobile & Desktop Upload Options */}
          {["front", "back"].map((side) => (
            <div
              key={side}
              className="border-2 border-dashed border-gray-200 rounded-lg p-4 sm:p-6 text-center"
            >
              <div className="flex justify-center mb-4">
                <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              </div>
              <p className="font-medium mb-1 text-sm sm:text-base">
                {side === "front" ? "Front side" : "Back side"}
              </p>

              {/* Show Uploaded File Name or Confirmation */}
              {(side === "front" && frontFile) || (side === "back" && backFile) ? (
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-gray-700">
                    {side === "front" ? frontFile.name : backFile.name} (Uploaded)
                  </p>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-gray-500">
                  Choose, drag & drop, or take a photo
                </p>
              )}

              {/* Mobile Camera Input */}
              {isMobile && (
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  capture={side === "front" ? "user" : "environment"}
                  onChange={(e) => handleFileChange(e, side)}
                  className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                />
              )}

              {/* Desktop Camera Button */}
              {!isMobile && (
                <button
                  onClick={() => openCamera(side)}
                  className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg"
                >
                  Use Camera
                </button>
              )}
            </div>
          ))}

          {/* Camera Modal (Desktop) */}
          {isCameraOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg">
                <video ref={videoRef} autoPlay className="w-full h-auto"></video>
                <canvas
                  ref={canvasRef}
                  width="640"
                  height="480"
                  className="hidden"
                ></canvas>
                <button
                  onClick={captureImage}
                  className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg"
                >
                  Capture
                </button>
              </div>
            </div>
          )}

          <p className="text-xs sm:text-sm text-gray-500 mt-4">
            JPG, PNG, HEIC, or PDF (max 50mb)
          </p>
        </div>

        {/* Continue Button */}
        <button
          onClick={onNext}
          className={`w-full bg-[#0066CC] text-white py-2 sm:py-3 px-6 rounded-lg font-medium ${
            isFileUploaded ? "" : "opacity-50 cursor-not-allowed"
          }`}
          disabled={!isFileUploaded}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default UploadDocument;













// import React, { useState, useRef } from "react";
// import { ChevronLeft, Upload, Check } from "lucide-react";

// const UploadDocument = ({ onBack, onNext, onFileUpload }) => {
//   const [frontFile, setFrontFile] = useState(null);
//   const [backFile, setBackFile] = useState(null);
//   const [isFileUploaded, setIsFileUploaded] = useState(false);
//   const [isCameraOpen, setIsCameraOpen] = useState(false);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [capturingSide, setCapturingSide] = useState(null); // 'front' or 'back'

//   // Handle file selection (Mobile)
//   const handleFileChange = (e, side) => {
//     const file = e.target.files[0];
//     if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
//       side === "front" ? setFrontFile(file) : setBackFile(file);
//       onFileUpload(file, side);
//     }
//   };

//   // Open Camera (Desktop)
//   const openCamera = (side) => {
//     setIsCameraOpen(true);
//     setCapturingSide(side);
//     navigator.mediaDevices
//       .getUserMedia({ video: true })
//       .then((stream) => {
//         videoRef.current.srcObject = stream;
//       })
//       .catch((err) => console.error("Error accessing webcam:", err));
//   };

//   // Capture Image (Desktop)
//   const captureImage = () => {
//     const canvas = canvasRef.current;
//     const video = videoRef.current;
//     const context = canvas.getContext("2d");
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);
//     canvas.toBlob((blob) => {
//       const file = new File([blob], `document-${capturingSide}.jpg`, {
//         type: "image/jpeg",
//       });
//       if (capturingSide === "front") setFrontFile(file);
//       else setBackFile(file);
//       onFileUpload(file, capturingSide);
//       setIsCameraOpen(false);
//       video.srcObject.getTracks().forEach((track) => track.stop()); // Stop webcam
//     }, "image/jpeg");
//   };

//   // Check if both files are uploaded
//   React.useEffect(() => {
//     setIsFileUploaded(frontFile && backFile);
//   }, [frontFile, backFile]);

//   return (
//     <div className="max-w-lg mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-lg">
//       <div className="flex items-center gap-4 mb-6 sm:mb-8">
//         <button onClick={onBack} className="p-2 rounded-full bg-gray-100">
//           <ChevronLeft className="w-5 h-5" />
//         </button>
//         <h2 className="text-xl sm:text-2xl font-semibold">Document type</h2>
//       </div>

//       <div className="space-y-6">
//         <div className="p-4 bg-gray-50 rounded-lg">
//           <p className="font-medium mb-4">Identity document</p>

//           {/* Mobile & Desktop Upload Options */}
//           {["front", "back"].map((side) => (
//             <div
//               key={side}
//               className="border-2 border-dashed border-gray-200 rounded-lg p-4 sm:p-6 text-center"
//             >
//               <div className="flex justify-center mb-4">
//                 <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
//               </div>
//               <p className="font-medium mb-1 text-sm sm:text-base">
//                 {side === "front" ? "Front side" : "Back side"}
//               </p>

//               {/* Show Uploaded File Name or Confirmation */}
//               {(side === "front" && frontFile) || (side === "back" && backFile) ? (
//                 <div className="flex items-center justify-center gap-2 mt-2">
//                   <Check className="w-5 h-5 text-green-600" />
//                   <p className="text-sm text-gray-700">
//                     {side === "front" ? frontFile.name : backFile.name} (Uploaded)
//                   </p>
//                 </div>
//               ) : (
//                 <p className="text-xs sm:text-sm text-gray-500">
//                   Choose, drag & drop, or take a photo
//                 </p>
//               )}

//               {/* Mobile Camera Input */}
//               <input
//                 type="file"
//                 accept="image/jpeg, image/png"
//                 capture={side === "front" ? "user" : "environment"}
//                 onChange={(e) => handleFileChange(e, side)}
//                 className="mt-2 p-2 border border-gray-300 rounded-md w-full"
//               />

//               {/* Desktop Camera Button */}
//               <button
//                 onClick={() => openCamera(side)}
//                 className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg"
//               >
//                 Use Camera
//               </button>
//             </div>
//           ))}

//           {/* Camera Modal (Desktop) */}
//           {isCameraOpen && (
//             <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
//               <div className="bg-white p-6 rounded-lg">
//                 <video ref={videoRef} autoPlay className="w-full h-auto"></video>
//                 <canvas
//                   ref={canvasRef}
//                   width="640"
//                   height="480"
//                   className="hidden"
//                 ></canvas>
//                 <button
//                   onClick={captureImage}
//                   className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg"
//                 >
//                   Capture
//                 </button>
//               </div>
//             </div>
//           )}

//           <p className="text-xs sm:text-sm text-gray-500 mt-4">
//             JPG, PNG, HEIC, or PDF (max 50mb)
//           </p>
//         </div>

//         {/* Continue Button */}
//         <button
//           onClick={onNext}
//           className={`w-full bg-[#0066CC] text-white py-2 sm:py-3 px-6 rounded-lg font-medium ${
//             isFileUploaded ? "" : "opacity-50 cursor-not-allowed"
//           }`}
//           disabled={!isFileUploaded}
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UploadDocument;