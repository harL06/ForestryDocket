// Import the Supabase client from a CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Initialize the Supabase client
const SUPABASE_URL = 'https://wvehlmuxjxpiawlnxdjr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2ZWhsbXV4anhwaWF3bG54ZGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4MzI3NTEsImV4cCI6MjAzNzQwODc1MX0.6wCO36WzXNklp8upySArJ0YBvqoFbseQa5DMXdUyFXE';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Get elements
const videoElement = document.getElementById('videoElement');
const captureButton = document.getElementById('captureButton');
const resetButton = document.getElementById('resetButton');
const uploadButton = document.getElementById('uploadButton');
const canvas = document.getElementById('canvas');
const imageLink = document.getElementById('imageLink');

// Set up video stream
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    videoElement.srcObject = stream;
  })
  .catch(err => {
    console.error('Error accessing webcam:', err);
  });

// Capture image and freeze video
captureButton.addEventListener('click', () => {
  const context = canvas.getContext('2d');
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  uploadButton.disabled = false; // Enable upload button
  resetButton.disabled = false;  // Enable reset button
  videoElement.pause(); // Pause the video to freeze the frame
});

// Reset camera
resetButton.addEventListener('click', () => {
  videoElement.play(); // Resume video playback
  uploadButton.disabled = true; // Disable upload button
  resetButton.disabled = true;  // Disable reset button
  imageLink.textContent = ''; // Clear the image link
});

// Function to upload an image
async function uploadImage(file) {
  const bucketName = 'image_logs';
  const filePath = `${file.name}`;

  try {
    const { data, error } = await supabase
      .storage
      .from(bucketName)
      .upload(filePath, file);

    if (error) {
      throw error;
    }

    console.log('File uploaded successfully:', data);
    return data;
  } catch (error) {
    console.error('Error uploading file:', error.message);
    return null;
  }
}

// Upload the captured image to Supabase
uploadButton.addEventListener('click', async () => {
  canvas.toBlob(async (blob) => {
    // Create a unique file name based on the current date and time
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `image_${timestamp}.png`;
    const file = new File([blob], fileName, { type: 'image/png' });
    const result = await uploadImage(file);
    if (result) {
      const publicUrl = supabase.storage.from('image_logs').getPublicUrl(result.path);
      imageLink.textContent = `Image URL: ${publicUrl.data.publicUrl}`;
      imageLink.href = publicUrl.data.publicUrl;
    }
  }, 'image/png');
});
