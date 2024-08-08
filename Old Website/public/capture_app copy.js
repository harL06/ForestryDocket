// Import the Supabase client from a CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Initialize the Supabase client
const SUPABASE_URL = 'https://wvehlmuxjxpiawlnxdjr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2ZWhsbXV4anhwaWF3bG54ZGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4MzI3NTEsImV4cCI6MjAzNzQwODc1MX0.6wCO36WzXNklp8upySArJ0YBvqoFbseQa5DMXdUyFXE';

//const { createClient } = supabase; // Ensure Supabase is available globally
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
console.log(supabase)

// Get elements
const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const nextButton = document.getElementById('nextButton');
const imageLink = document.getElementById('imageLink');


document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const managerId = urlParams.get('manager_id');
  localStorage.setItem('manager_id', managerId); // Store manager_id in local storage for later use
  console.log("Manager ID:", managerId);
});

// Function to upload an image
async function uploadImage(file) {
  const bucketName = 'image_logs';
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filePath = `image_${timestamp}.png`;
  

  try {
    
    const { data, error } = await supabase
      .storage
      .from(bucketName)
      .upload(filePath, file);
    if (error) {
      console.error('Upload error:', error);
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
  uploadButton.disabled = fileInput.files.length === 0;
});

// Upload the selected image to Supabase
uploadButton.addEventListener('click', async (event) => {
  event.preventDefault();
  uploadButton.disabled = true;
  console.log("TEST");
  if (fileInput.files.length > 0) {
    
    const file = fileInput.files[0];
    console.log(file)
    const result = await uploadImage(file);
    console.log("TEST2");
    


    if (result) {
      const { data: { publicUrl }, error } = supabase
        .storage
        .from('image_logs')
        .getPublicUrl(result.path);

      if (error) {
        console.error('Error fetching public URL:', error);
        imageLink.textContent = 'Error fetching image URL.';
        return;
      }

      imageLink.textContent = `Image URL: ${publicUrl}`;
      imageLink.href = publicUrl;
      localStorage.setItem('uploadedImageUrl', publicUrl);

      nextButton.hidden = false;
      nextButton.disabled = false;
    } else {
      imageLink.textContent = 'Error uploading the image.';
    }
  } else {
    imageLink.textContent = 'No file selected.';
  }
});

// Navigate to the next page on clicking the next button
nextButton.addEventListener('click', (event) => {
  event.preventDefault();
  const managerId = localStorage.getItem('manager_id');
  if (managerId) {
      window.location.href = `docket_form.html?manager_id=${managerId}`;
  } else {
      console.error('Manager ID not found.');
  }
});

