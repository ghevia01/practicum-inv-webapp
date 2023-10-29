// Set the camera to use the back camera
const FACING_MODE = "environment";

// Get the video stream from the camera
export async function getCameraStream() {
  return navigator.mediaDevices.getUserMedia({
    video: { facingMode: FACING_MODE },
  });
}
