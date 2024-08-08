// Import the Supabase client from a CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Initialize the Supabase client
const SUPABASE_URL = 'https://wvehlmuxjxpiawlnxdjr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2ZWhsbXV4anhwaWF3bG54ZGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4MzI3NTEsImV4cCI6MjAzNzQwODc1MX0.6wCO36WzXNklp8upySArJ0YBvqoFbseQa5DMXdUyFXE';

//const { createClient } = supabase; // Ensure Supabase is available globally
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Get elements
const videoElement = document.getElementById('videoElement');
const captureButton = document.getElementById('captureButton');
const resetButton = document.getElementById('resetButton');
const uploadButton = document.getElementById('uploadButton');

const nextButton = document.getElementById('nextButton');

const canvas = document.getElementById('canvas');
const imageLink = document.getElementById('imageLink');

// Function to get the back camera
async function getBackCamera() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter(device => device.kind === 'videoinput');
  return videoDevices[videoDevices.length - 1];
}

// Set up video stream with back camera
getBackCamera()
  .then(camera => {
    return navigator.mediaDevices.getUserMedia({
      video: { deviceId: camera.deviceId }
    });
  })
  .then(stream => {
    videoElement.srcObject = stream;
    videoElement.play(); // Ensure the video plays
  })
  .catch(err => {
    console.error('Error accessing camera:', err);
  });

// Capture image and freeze video
captureButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the form from submitting
  const context = canvas.getContext('2d');
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  uploadButton.disabled = false; // Enable upload button
  resetButton.disabled = false;  // Enable reset button
  captureButton.disabled = true;
  videoElement.pause(); // Pause the video to freeze the frame
});

// Reset camera
resetButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the form from submitting
  videoElement.play(); // Resume video playback
  uploadButton.disabled = true; // Disable upload button
  resetButton.disabled = true;  // Disable reset button
  captureButton.disabled = false;
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
uploadButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the form from submitting
  uploadButton.disabled = true;
  uploadButton.hidden = true;

  resetButton.disabled = true;
  resetButton.hidden = true;

  captureButton.disabled = true;
  captureButton.hidden = true;

  if (nextButton) {
    nextButton.hidden = false;  // Show the button
    nextButton.disabled = false; // Enable the button
  } else {
    console.error('nextButton not found in the DOM.');
  }

  imageLink.textContent = 'Loading...'; // Show loading message

  canvas.toBlob(async (blob) => {
    if (blob) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = `image_${timestamp}.png`;
      const file = new File([blob], fileName, { type: 'image/png' });

      const result = await uploadImage(file);
      if (result) {
        const { data: { publicUrl }, error } = supabase
          .storage
          .from('image_logs')
          .getPublicUrl(result.path);

        if (error) {
          throw error;
        }

        imageLink.textContent = `Image URL: ${publicUrl}`;
        imageLink.href = publicUrl;
        localStorage.setItem('capturedImageUrl', publicUrl);
      } else {
        imageLink.textContent = 'Error uploading the image.';
      }
    }
  }, 'image/png');
});

// Navigate to next page on clicking the next button
nextButton.addEventListener('click', (event) => {
  event.preventDefault();
  window.location.href = 'docket_form.html'; // Redirect to docket_form.html
});