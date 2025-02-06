import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import * as faceapi from 'face-api.js';

const FaceId = ({ onBack, frontFile, backFile }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [isPhotoConfirmed, setIsPhotoConfirmed] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false); // Track if models are loaded
  const navigate = useNavigate();

  useEffect(() => {
    const loadModels = async () => {
      try {
        // Load all necessary models from a local path
        await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
        
        setModelsLoaded(true); // Mark models as loaded
        console.log('Models loaded successfully');
      } catch (error) {
        console.error("Error loading face-api models:", error);
      }
    };

    loadModels(); // Load models on component mount
  }, []);

  useEffect(() => {
    if (modelsLoaded && webcamRef.current) {
      // Start face detection when the webcam and models are ready
      const interval = setInterval(() => {
        if (webcamRef.current && webcamRef.current.video.readyState === 4) {
          detectFace();
        }
      }, 100); // Run detection every 100ms

      return () => clearInterval(interval); // Clean up the interval
    }
  }, [modelsLoaded]);

  const detectFace = async () => {
    // Detect faces after models are loaded
    const detections = await faceapi.detectAllFaces(webcamRef.current.video)
      .withFaceLandmarks()
      .withFaceDescriptors();

    // Check if any faces are detected
    if (detections.length > 0) {
      setFaceDetected(true);
    } else {
      setFaceDetected(false);
    }

    // Create canvas and draw the detections on it
    const canvas = faceapi.createCanvasFromMedia(webcamRef.current.video);
    canvasRef.current?.html(canvas);
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    setIsPhotoConfirmed(false);
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ua = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ua[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found, please log in.");
      return;
    }
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken?.user_id;
      if (!userId) {
        console.error("User ID not found in token.");
        return;
      }
      if (frontFile && backFile && imageSrc) {
        const formData = new FormData();
        formData.append("user_id", userId);
        formData.append("front_id", frontFile);
        formData.append("back_id", backFile);
        formData.append("selfie_with_id", dataURItoBlob(imageSrc));
        try {
          const response = await axios.post(
            "https://8082-38-137-52-117.ngrok-free.app/upload-kyc",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
              },
            }
          );
          if (response.status === 201) {
            navigate("/dashboard");
          }
        } catch (error) {
          console.error("Error uploading files:", error);
        }
      } else {
        console.log("Please upload all required images.");
      }
    } catch (error) {
      console.error("Invalid token format:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg text-center">
      <h2 className="text-2xl font-semibold mb-4">Capture Your Photo</h2>
      <div className="relative w-full h-64 border border-gray-300 rounded-lg overflow-hidden">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full h-full"
        />
        <canvas ref={canvasRef} className="absolute inset-0"></canvas>
        {faceDetected && (
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="border-4 border-blue-500 rounded-full w-32 h-48 flex justify-center items-center">
              <span className="text-white">Align Face</span>
            </div>
          </div>
        )}
        <button
          onClick={capture}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Take Photo
        </button>
      </div>
      {!imageSrc ? (
        <div className="flex flex-col items-center mt-4">
          <button
            onClick={capture}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
          >
            Capture Photo
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-4">
          <img src={imageSrc} alt="Captured" className="w-64 h-64 rounded-lg object-cover mb-4" />
          {!isPhotoConfirmed ? (
            <button
              onClick={() => setIsPhotoConfirmed(true)}
              className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
            >
              ✔️ Confirm Photo
            </button>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={() => setImageSrc(null)}
                className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
              >
                Retake Photo
              </button>
            </div>
          )}
        </div>
      )}
      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FaceId;
