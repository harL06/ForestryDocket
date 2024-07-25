from supabase import create_client, Client
import pandas as pd
from ComputerVision import analyseImage

# Initialize Supabase client
url = "https://wvehlmuxjxpiawlnxdjr.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2ZWhsbXV4anhwaWF3bG54ZGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4MzI3NTEsImV4cCI6MjAzNzQwODc1MX0.6wCO36WzXNklp8upySArJ0YBvqoFbseQa5DMXdUyFXE"
supabase: Client = create_client(url, key)

# Fetch records where 'analysed' is FALSE
response = supabase.table('forestry_dockets').select('id, image_url, cap_reg_plate, cap_logs').eq('analysed', False).execute()
data = response.data

# Check if data is not empty
if data:
    # Iterate through the fetched records
    for record in data:
        # Update values for the columns as needed
        imageURL = record['image_url']
        imageResults = analyseImage(imageURL)
        record['cap_reg_plate'] = imageResults.licensePlate
        record['cap_logs'] = imageResults.logCount      # Replace with your actual value or logic
        record['analysed'] = True  # Set 'analysed' to TRUE to mark as processed

    # Upsert the modified records back to Supabase
    upsert_response = supabase.table('forestry_dockets').upsert(data).execute()

    # Check for errors
    if upsert_response.data:
        # Assuming that the response data should contain the updated records
        print("Data updated successfully.")
        print(f"Updated records: {upsert_response.data}")
    else:
        print("No data was returned or an issue occurred.")
else:
    print("No records to update.")
