import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { saveAs } from 'file-saver';
import axios from 'axios';
import {jwtDecode} from "jwt-decode"; 
import { useNavigate } from 'react-router-dom';


const FaceId = ({ onBack, frontFile, backFile }) => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [isPhotoConfirmed, setIsPhotoConfirmed] = useState(false);
  const navigate = useNavigate();


  // Capture a photo from the webcam
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    setIsPhotoConfirmed(false); // Reset confirmation status when taking a new photo
  };

  // Helper function to convert data URI to Blob
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

  // Function to send the images to the API
  const handleSubmit = async () => {
    const token = localStorage.getItem("authToken"); // Get the token from localStorage
  
    if (!token) {
      console.error("No token found, please log in.");
      return;
    }
  
    try {
      // Decode the token to extract user_id
      const decodedToken = jwtDecode(token);
      const userId = decodedToken?.user_id; // Adjust this based on your token structure
  
      if (!userId) {
        console.error("User ID not found in token.");
        return;
      }
  
      if (frontFile && backFile && imageSrc) {
        const formData = new FormData();
        formData.append("user_id", userId); // Use extracted user_id
        formData.append("front_id", frontFile);
        formData.append("back_id", backFile);
        formData.append("selfie_with_id", dataURItoBlob(imageSrc)); // Convert webcam image to Blob
  

        try {
          const response = await axios.post(
            "https://8082-38-137-52-117.ngrok-free.app/upload-kyc",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`, // Include token in headers
              },
            }
          );
  
          console.log("API Response:", response.data);
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
    <div>
      <h2>Capture Your Photo</h2>
      
      {!imageSrc ? (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
          />
          <button onClick={capture}>Take Photo</button>
        </div>
      ) : (
        <div>
          <img src={imageSrc} alt="Captured" style={{ width: '100%', maxWidth: '400px' }} />
          {!isPhotoConfirmed ? (
            <div>
              <button onClick={() => setIsPhotoConfirmed(true)}>✔️ Confirm Photo</button>
            </div>
          ) : (
            <div>
              <button onClick={saveImage}>Save Photo</button>
              <button onClick={() => setImageSrc(null)}>Retake Photo</button>
            </div>
          )}
        </div>
      )}
      
      <div>
        <button onClick={onBack}>Back</button>
        <button onClick={handleSubmit}>Submit</button> {/* Submit Button to make API call */}
      </div>
    </div>
  );
};

export default FaceId;
