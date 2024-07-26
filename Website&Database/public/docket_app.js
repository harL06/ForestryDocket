// Import the Supabase client from a CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Initialize the Supabase client
const SUPABASE_URL = 'https://wvehlmuxjxpiawlnxdjr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2ZWhsbXV4anhwaWF3bG54ZGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4MzI3NTEsImV4cCI6MjAzNzQwODc1MX0.6wCO36WzXNklp8upySArJ0YBvqoFbseQa5DMXdUyFXE';

//const { createClient } = supabase; // Ensure Supabase is available globally
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Add event listener for form submission
const docketForm = document.getElementById('docketForm');
docketForm.addEventListener('submit', async (event) => {
event.preventDefault();

const uploadedImageUrl = localStorage.getItem('uploadedImageUrl');
if (uploadedImageUrl) {
    console.log('Retrieved Image URL:', uploadedImageUrl);
}
  // Collect form data
const formData = new FormData(docketForm);
const data = {
    permit_number: formData.get('permit_number'),
    forest_code: formData.get('forest_code'),
    vehicle_registration: formData.get('vehicle_registration'),
    driver_name: formData.get('driver_name'),
    vehicle_type: formData.get('vehicle_type'),
    product_type: formData.get('product_type'),
    estimated_tonnage: formData.get('estimated_tonnage'),
    destination: formData.get('destination'),
    time_of_arrival: formData.get('time_of_arrival'),
    time_of_departure: formData.get('time_of_departure'),
    weight_ticket_number: formData.get('weight_ticket_number'),
    net_weight: formData.get('net_weight'),
    driver_signature: formData.get('driver_signature'),
    image_url: uploadedImageUrl // Retrieve the stored image URL
};

try {
    // Insert form data into Supabase
    const { data: insertData, error } = await supabase
    .from('forestry_dockets')
    .insert([data]);
    //window.location.href = 'confirm_submit.html'; // Redirect to submission confirm

    if (error) throw error;

    console.log('Docket submitted successfully: hh', insertData);

    const response = await fetch('https://9e80-89-101-154-45.ngrok-free.app', {
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    console.log('Python script executed successfully');

    // Redirect or show a success message to the user
} catch (error) {
    console.error('Error submitting docket form:', error.message);
    // Show an error message to the user
}
});
