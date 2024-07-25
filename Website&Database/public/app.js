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
captureButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the form from submitting
  const context = canvas.getContext('2d');
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  uploadButton.disabled = false; // Enable upload button
  resetButton.disabled = false;  // Enable reset button
  videoElement.pause(); // Pause the video to freeze the frame
});

// Reset camera
resetButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the form from submitting
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
uploadButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the form from submitting
  imageLink.textContent = 'Loading...'; // Show loading message

  canvas.toBlob(async (blob) => {
    if (blob) {
      // Create a unique file name based on the current date and time
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
      } else {
        imageLink.textContent = 'Error uploading the image.';
      }
    }
  }, 'image/png');
});

// document.getElementById('docket-form').addEventListener('submit', async function(event) {
//     event.preventDefault();

//     const formData = new FormData(event.target);
//     const data = {};
//     formData.forEach((value, key) => {
//         data[key] = value;
//     });

//     try {
//         // Retrieve blob from hidden input field
//         const blob = logImageInput.dataset.blob;

//         // Ensure that the blob and fileName are available
//         if (!blob) {
//             throw new Error('No image blob found.');
//         }

//         const fileName = `images/${Date.now()}.png`; // Generate a unique file name
        
//         // Upload image to Supabase Storage
//         const { data: storageData, error: storageError } = await supabase
//             .storage
//             .from('image_logs')
//             .upload(fileName, blob, {
//                 contentType: 'image/png' // Ensure this matches the actual MIME type
//             });

//         if (storageError) {
//             console.error('Upload error:', storageError);
//             throw storageError;
//         }

//         // Get the public URL for the uploaded image
//         const { publicURL, error: urlError } = supabase
//             .storage
//             .from('image_logs')
//             .getPublicUrl(fileName);

//         if (urlError) {
//             console.error('Get URL error:', urlError);
//             throw urlError;
//         }

//         // Add image URL to form data
//         data.image_url = publicURL;

//         // Insert form data into Supabase database
//         const { data: insertedData, error } = await supabase
//             .from('forestry_dockets') // Replace with your actual table name
//             .insert([data]);

//         if (error) {
//             console.error('Insert error:', error);
//             throw error;
//         }

//         alert('Form submitted successfully!');
//         console.log('Inserted data:', insertedData);

//         // Optionally reset form and UI
//         video.style.display = 'block';
//         canvas.style.display = 'none';
//         canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
//         logImageInput.dataset.blob = ''; // Clear the hidden input
//     } catch (error) {
//         console.error('Error:', error);
//         alert('Error submitting form. Please try again.');
//     }
// });
