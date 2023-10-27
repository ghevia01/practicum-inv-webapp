const FACING_MODE = "environment";

// Get the video stream from the camera
export async function getCameraStream() {
  return await navigator.mediaDevices.getUserMedia({
    video: { facingMode: FACING_MODE },
  });
}
