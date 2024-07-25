// Import the Supabase client from a CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Initialize the Supabase client
const SUPABASE_URL = 'https://wvehlmuxjxpiawlnxdjr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2ZWhsbXV4anhwaWF3bG54ZGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4MzI3NTEsImV4cCI6MjAzNzQwODc1MX0.6wCO36WzXNklp8upySArJ0YBvqoFbseQa5DMXdUyFXE';

//const { createClient } = supabase; // Ensure Supabase is available globally
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Get elements
const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const nextButton = document.getElementById('nextButton');
const imageLink = document.getElementById('imageLink');

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

// Event listener for file input change
fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    uploadButton.disabled = false;
  } else {
    uploadButton.disabled = true;
  }
});

// Upload the selected image to Supabase
uploadButton.addEventListener('click', async (event) => {
  event.preventDefault(); // Prevent the form from submitting
  uploadButton.disabled = true;

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];

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
      localStorage.setItem('uploadedImageUrl', publicUrl);

      nextButton.hidden = false;  // Show the button
      nextButton.disabled = false; // Enable the button
    } else {
      imageLink.textContent = 'Error uploading the image.';
    }
  }
});

// Navigate to next page on clicking the next button
nextButton.addEventListener('click', (event) => {
  event.preventDefault();
  window.location.href = 'docket_form.html'; // Redirect to docket_form.html
});