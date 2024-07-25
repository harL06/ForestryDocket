import imports

class analysedImage:
    def __init__(self, logCount, licensePlate):
        self.logCount = logCount
        self.licensePlate = licensePlate

def getImage(imageURL, fileName):
    response = imports.requests.get(imageURL)
    if response.status_code == 200:
        with open(fileName, 'wb') as file:
            file.write(response.content)
        print("Image downloaded successfully.")
    else:
        print(f"Failed to download image. Status code: {response.status_code}")

def cleanUp(fileName):
    imports.os.remove(fileName)
    print("Image cleaned successfully!")

def countLogs(logImage):
    rf = imports.Roboflow(api_key="6WG2SlsmsONN8vyUxY4u")
    project = rf.workspace().project("wood-log-detection-v2")
    model = project.version(2).model

    result = model.predict(logImage, confidence=40, overlap=30).json()

    detections = imports.sv.Detections.from_inference(result)
    numLogs = len(detections)
    return numLogs

def readLicensePlate(truckImage):
    regions = ["ie"]

    with open(truckImage, 'rb') as fp:
        response = imports.requests.post(
            'https://api.platerecognizer.com/v1/plate-reader/',
            data=dict(regions=regions),  #Optional
            files=dict(upload=fp),
            headers={'Authorization': 'Token 788a89d0e0463e0593cc1690cf890990969c2695'})

    plateJson = response.json()
    #pprint(plateJson)
    truckPlate = plateJson['results'][0]['plate']
    return truckPlate

def analyseImage(dataBaseImageURL):
    imageName = 'tempImage.jpg'
    getImage(dataBaseImageURL, imageName)
    logNumber = countLogs(imageName)
    truckLicensePlate = readLicensePlate(imageName)
#    print(f"Number of logs counted: {logNumber}")
#    print(F"Truck License Plate: {truckLicensePlate}")
    cleanUp(imageName)
    return analysedImage(logNumber, truckLicensePlate)

#imageResults = analyseImage(imageURL)
#print(f"Logggg: {imageResults.logCount}")
#print(f"Licenseeee: {imageResults.licensePlate}")
