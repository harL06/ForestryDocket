const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture-button');
const logImageInput = document.getElementById('log-image');

// Get access to the camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
    })
    .catch((err) => {
        console.error("Error accessing camera: ", err);
    });

captureButton.addEventListener('click', () => {
    // Draw the current video frame to the canvas
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert the canvas image to a data URL
    const imageDataUrl = canvas.toDataURL('image/png');
    
    // Convert data URL to Blob
    const blob = dataURLToBlob(imageDataUrl);
    
    // Set the Blob to the hidden input field for reference
    logImageInput.dataset.blob = blob;
    
    // Optionally hide the video stream and display the canvas
    video.style.display = 'none';
    canvas.style.display = 'block';
});

// Convert data URL to Blob
function dataURLToBlob(dataURL) {
    const [header, base64] = dataURL.split(',');
    const mime = header.split(':')[1].split(';')[0];
    const binary = atob(base64);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: mime });
}

// Handle form submission
const SUPABASE_URL = 'https://wvehlmuxjxpiawlnxdjr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2ZWhsbXV4anhwaWF3bG54ZGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4MzI3NTEsImV4cCI6MjAzNzQwODc1MX0.6wCO36WzXNklp8upySArJ0YBvqoFbseQa5DMXdUyFXE'; // Replace with your actual key

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('docket-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

//     try {
//         // Upload image to Supabase Storage
//         const blob = logImageInput.dataset.blob;
//         const fileName = `images/${Date.now()}.png`; // Generate a unique file name
//         const { data: storageData, error: storageError } = await supabase
//             .storage
//             .from('image_logs') // Replace with your actual bucket name
//             .upload(fileName, blob, {
//                 contentType: 'image/png' // Ensure this is the correct MIME type for your image
//             });

//         if (storageError) throw storageError;

//         // Get the public URL for the uploaded image
//         const { publicURL, error: urlError } = supabase
//             .storage
//             .from('image_logs')
//             .getPublicUrl(fileName);
//             console.log(publicURL)

//         if (urlError) throw urlError;

//         // Add image URL to form data
//         data.image_url = publicURL; // Update this to match the column name you created

//         // Insert form data into Supabase database
//         const { data: insertedData, error } = await supabase
//             .from('forestry_dockets') // Replace with your actual table name
//             .insert([data]);
//             console.log([data]);

//         if (error) throw error;

//         alert('Form submitted successfully!');
//         console.log('Inserted data:', insertedData);

//         // Optionally reset form and UI
//         video.style.display = 'block';
//         canvas.style.display = 'none';
//         canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
//         logImageInput.dataset.blob = ''; // Clear the hidden input
//     } catch (error) {
//         console.error('Error submitting form:', error);
//         alert('Error submitting form. Please try again.');
//     }
// });
})
