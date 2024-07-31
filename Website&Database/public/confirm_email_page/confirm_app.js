
//NEW

// Import the Supabase client from a CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Initialize the Supabase client
const SUPABASE_URL = 'https://wvehlmuxjxpiawlnxdjr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2ZWhsbXV4anhwaWF3bG54ZGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4MzI3NTEsImV4cCI6MjAzNzQwODc1MX0.6wCO36WzXNklp8upySArJ0YBvqoFbseQa5DMXdUyFXE';

//const { createClient } = supabase; // Ensure Supabase is available globally
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function handleEmailConfirmation() {
  // Extract the fragment identifier part
  const hash = window.location.hash.substring(1);
  
  // Split the hash into key-value pairs
  const params = new URLSearchParams(hash);
  
  // Extract the necessary parameters
  const token = params.get('access_token');
  const type = params.get('type');
  
  if (token && type) {
    // Supabase uses the signIn method to handle the verification
    const { error } = await supabase.auth.signIn({ token, type });
  
    if (error) {
      document.getElementById('message').textContent = 'Error confirming your email. Please try again.';
      console.error('Error confirming email:', error.message);
    } else {
      document.getElementById('message').textContent = 'Your email has been confirmed successfully! You can now log in.';
    }
  } else {
    document.getElementById('message').textContent = 'Invalid request. Please check your confirmation link.';
  }
}

// Call the function to handle email confirmation
handleEmailConfirmation();