// Import the Supabase client from a CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Initialize the Supabase client
const SUPABASE_URL = 'https://wvehlmuxjxpiawlnxdjr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2ZWhsbXV4anhwaWF3bG54ZGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4MzI3NTEsImV4cCI6MjAzNzQwODc1MX0.6wCO36WzXNklp8upySArJ0YBvqoFbseQa5DMXdUyFXE';

//const { createClient } = supabase; // Ensure Supabase is available globally
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Get the manager_id from the URL
function getManagerId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('manager_id');
}

const loadingText = document.getElementById('loadingText');
const shareableLinkInput = document.getElementById('shareableLink');
const copyLinkButton = document.getElementById('copyLink');


// Fetch data from Supabase
async function fetchData() {

    const managerId = getManagerId();

    if (!managerId) {
        console.error('No manager ID found in the URL');
        document.getElementById('loadingText').innerText = 'Error: No manager ID provided.';
        return;
    }

    loadingText.hidden = false;
    const { data, error } = await supabase
        .from('forestry_dockets')
        .select('*')
        .eq('manager_id', managerId); // Filter by manager_id

    if (error) {
        console.error('Error fetching data:', error);
        return;
    }

    populateTable(data);
    generateShareableLink(managerId);
}

// Populate the table with data
function populateTable(data) {
    const tableBody = document.getElementById('activityTable').getElementsByTagName('tbody')[0];

    data.forEach(row => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${row.permit_number}</td>
            <td>${new Date(row.time_of_arrival).toLocaleString()}</td>
            <td>${row.driver_name}</td>
            <td>${row.estimated_tonnage}</td>
            <td>${row.cap_reg_plate}</td>
            <td>${row.cap_logs}</td>
            <td><a href="${row.image_url}" target="_blank">View Image</a></td>
        `;

        tableBody.appendChild(tr);
    });
    loadingText.hidden = true;
}

// Generate the shareable link
function generateShareableLink(managerId) {
    const baseUrl = 'https://www.logwatch.ie/capture%20copy.html'; // Replace with the correct URL to the upload page
    const shareableLink = `${baseUrl}?manager_id=${managerId}`;
    shareableLinkInput.value = shareableLink;
}

// Copy the link to clipboard
copyLinkButton.addEventListener('click', () => {
    shareableLinkInput.select();
    document.execCommand('copy');
    alert('Link copied to clipboard!');
});

// Load data when the page is loaded
document.addEventListener('DOMContentLoaded', fetchData);
