# Import necessary libraries and modules from imports.py
import imports

''' Define a class to store the results of image analysis '''
class analysedImage:
    def __init__(self, logCount, licensePlate): # Self initialisation function to define the variables used
        self.logCount = logCount  # Number of logs counted in the image
        self.licensePlate = licensePlate  # Detected license plate from the image

''' Function to download an image from a given URL and save it locally '''
def getImage(imageURL, fileName):
    response = imports.requests.get(imageURL)  # Send a GET request to the image URL
    if response.status_code == 200:  # Check if the request was successful
        with open(fileName, 'wb') as file:  # Open a file in write-binary mode
            file.write(response.content)  # Write the image content to the file
        print("Image downloaded successfully.")  # Print success message
    else:
        print(f"Failed to download image. Status code: {response.status_code}")  # Print error message if download fails

''' Function to delete the downloaded image file '''
def cleanUp(fileName):
    imports.os.remove(fileName)  # Remove the specified file
    print("Image cleaned successfully!")  # Print success message

''' Function to count the number of logs in an image using Roboflow's API '''
def countLogs(logImage):
    rf = imports.Roboflow(api_key="6WG2SlsmsONN8vyUxY4u")  # Initialize Roboflow with API key
    project = rf.workspace().project("wood-log-detection-v2")  # Access the specific project
    model = project.version(2).model  # Get the model version to use for prediction

    # Perform prediction on the image with specified confidence and overlap thresholds
    result = model.predict(logImage, confidence=40, overlap=30).json()

    detections = imports.sv.Detections.from_inference(result)  # Parse the prediction result
    numLogs = len(detections)  # Count the number of detected logs
    return numLogs  # Return the count of logs

''' Function to read and recognize the license plate from an image using Plate Recognizer's API '''
def readLicensePlate(truckImage):
    regions = ["ie"]  # Specify regions to search for license plates

    # Open the image file in read-binary mode
    with open(truckImage, 'rb') as fp:
        response = imports.requests.post(
            'https://api.platerecognizer.com/v1/plate-reader/',  # API endpoint for license plate recognition
            data=dict(regions=regions),  # Optional regions parameter
            files=dict(upload=fp),  # Upload the image file
            headers={'Authorization': 'Token 788a89d0e0463e0593cc1690cf890990969c2695'})  # Authorization token

    plateJson = response.json()  # Parse the JSON response
    truckPlate = plateJson['results'][0]['plate']  # Extract the detected license plate
    return truckPlate  # Return the license plate

''' Function to analyze an image by counting logs and reading the license plate '''
def analyseImage(dataBaseImageURL):
    imageName = 'tempImage.jpg'  # Temporary file name for the downloaded image
    getImage(dataBaseImageURL, imageName)  # Download the image
    logNumber = countLogs(imageName)  # Count logs in the image
    truckLicensePlate = readLicensePlate(imageName)  # Read the license plate from the image
    cleanUp(imageName)  # Clean up the downloaded image file
    return analysedImage(logNumber, truckLicensePlate)  # Return the analysis results as an analysedImage object

''' Uncomment the lines below to test the analyseImage function '''
# imageResults = analyseImage(imageURL)
# print(f"Logggg: {imageResults.logCount}")
# print(f"Licenseeee: {imageResults.licensePlate}")
