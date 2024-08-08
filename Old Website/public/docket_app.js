// Import the Supabase client from a CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Initialize the Supabase client
const SUPABASE_URL = 'https://wvehlmuxjxpiawlnxdjr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2ZWhsbXV4anhwaWF3bG54ZGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4MzI3NTEsImV4cCI6MjAzNzQwODc1MX0.6wCO36WzXNklp8upySArJ0YBvqoFbseQa5DMXdUyFXE';

//const { createClient } = supabase; // Ensure Supabase is available globally
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
let managerId;

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    managerId = urlParams.get('manager_id');

    console.log("Manager ID:", managerId);

    if (!managerId) {
        document.getElementById('submit-error').innerText = 'Invalid submission link.';
        return;
    }

    const languageSelector = document.getElementById('language-selector');
                const translations = {
                    en: '/docket_lang/en.json',
                    pl: '/docket_lang/pl.json'
                    // Add more languages and their respective JSON files
                };


                function loadLanguage(lang) {
                    fetch(translations[lang])
                        .then(response => response.json())
                        .then(data => {
                            document.getElementById('section-title').textContent = data.section_title;
                            document.getElementById('permit-number-label').textContent = data.permit_number;
                            document.getElementById('forest-code-label').textContent = data.forest_code;
                            document.getElementById('vehicle-registration-label').textContent = data.vehicle_registration;
                            document.getElementById('driver-name-label').textContent = data.driver_name;

                            document.getElementById('vehicle-type-label').textContent = data.vehicle_type;
                            document.getElementById('8-wheel-label').childNodes[0].textContent = data.eight_wheel_label;
                            document.getElementById('8-wheel-trailer-label').childNodes[0].textContent = data.eight_wheel_trailer_label;
                            document.getElementById('articulated-label').childNodes[0].textContent = data.articulated_label;
                            document.getElementById('other-label').childNodes[0].textContent = data.other_label;

                            document.getElementById('product-type-label').textContent = data.product_type;
                            document.getElementById('sawlog-label').childNodes[0].textContent = data.sawlog_label;
                            document.getElementById('pallet-label').childNodes[0].textContent = data.pallet_label;
                            document.getElementById('stake-label').childNodes[0].textContent = data.stake_label;
                            document.getElementById('pulp-label').childNodes[0].textContent = data.pulp_label;
                            document.getElementById('other-label-2').childNodes[0].textContent = data.other_label;

                            document.getElementById('estimated-tonnage-label').textContent = data.estimated_tonnage;
                            document.getElementById('destination-label').textContent = data.destination;
                            document.getElementById('time-of-arrival-label').textContent = data.time_of_arrival;
                            document.getElementById('time-of-departure-label').textContent = data.time_of_departure;
                            document.getElementById('certified-pure-label').textContent = data.certified_pure;
                            document.getElementById('certification-info-label').textContent = data.certification_info;
                            document.getElementById('submit-button').textContent = data.submit;
                            // Update any other labels similarly
                        });
                }

                languageSelector.addEventListener('change', (event) => {
                    loadLanguage(event.target.value);
                });

                // Load default language (English) on page load
                loadLanguage('en');


    // Show or hide certification details based on checkbox
    const certifiedPureCheckbox = document.getElementById('certified-pure');
    const certificationDetailsDiv = document.getElementById('certification-details');

    certifiedPureCheckbox.addEventListener('change', () => {
        if (certifiedPureCheckbox.checked) {
            certificationDetailsDiv.style.display = 'block';
        } else {
            certificationDetailsDiv.style.display = 'none';
        }
    });

    // Handle docket submission logic here, using the managerId
});

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

    // Get the selected vehicle type
    const vehicleType = formData.get('vehicle_type');
    const productType = formData.get('product_type');

    const data = {
        manager_id: managerId,
        permit_number: formData.get('permit_number'),
        forest_code: formData.get('forest_code'),
        vehicle_registration: formData.get('vehicle_registration'),
        driver_name: formData.get('driver_name'),
        vehicle_type: vehicleType,
        product_type: productType,
        estimated_tonnage: formData.get('estimated_tonnage'),
        destination: formData.get('destination'),
        time_of_arrival: formData.get('time_of_arrival'),
        time_of_departure: formData.get('time_of_departure'),
        certified_pure: formData.get('certified_pure') === 'on', // Convert checkbox to boolean
        certification_info: formData.get('certification_info') || null,
        image_url: uploadedImageUrl // Retrieve the stored image URL
    };

    try {
        // Insert form data into Supabase
        const { data: insertData, error } = await supabase
        .from('forestry_dockets')
        .insert([data]);    
        window.location.href = 'confirm_submit.html'; // Redirect to submission confirm

        if (error) throw error;

        console.log('Docket submitted successfully:', insertData);

    } catch (error) {
        console.error('Error submitting docket form:', error.message);
        // Show an error message to the user
    }
});
