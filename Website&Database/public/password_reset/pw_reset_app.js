// Import the Supabase client from a CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Initialize the Supabase client
const SUPABASE_URL = 'https://wvehlmuxjxpiawlnxdjr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2ZWhsbXV4anhwaWF3bG54ZGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4MzI3NTEsImV4cCI6MjAzNzQwODc1MX0.6wCO36WzXNklp8upySArJ0YBvqoFbseQa5DMXdUyFXE';

//const { createClient } = supabase; // Ensure Supabase is available globally
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reset-password-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== confirmPassword) {
            document.getElementById('reset-message').textContent = 'Passwords do not match.';
            return;
        }

        // Extract token from URL query parameters
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('token'); // Use 'token' if the URL contains '?token=<token>'

        if (!accessToken) {
            document.getElementById('reset-message').textContent = 'Invalid or missing access token.';
            return;
        }

        console.log('Access token:', accessToken);

        try {
            // Try to set the session using the access token
            const { error: sessionError, data: { session } } = await supabase.auth.setSession(accessToken);

            if (sessionError) {
                document.getElementById('reset-message').textContent = 'Error setting session: ' + sessionError.message;
                console.error('Session error:', sessionError);
                return;
            }

            if (!session) {
                document.getElementById('reset-message').textContent = 'No session returned.';
                console.error('No session returned.');
                return;
            }

            // Now, update the user's password
            const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });

            if (updateError) {
                document.getElementById('reset-message').textContent = 'Error resetting password: ' + updateError.message;
                console.error('Update error:', updateError);
            } else {
                document.getElementById('reset-message').textContent = 'Password has been successfully reset. You can now log in with your new password.';
                form.reset();
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            document.getElementById('reset-message').textContent = 'Unexpected error: ' + error.message;
        }
    });
});