# Firebase Notification Server

This is a simple server application that allows to enable Firebase Cloud Messaging Push Notification for Firebase Chat Demo.

# Getting Started 

Follow the instructions [here](https://firebase.google.com/docs/functions/get-started) to setup your firebase functions.<br/>
Go to [google cloud console](https://console.cloud.google.com/iam-admin/iam/iam-zero), select your project, go to service accounts, create a new service account, then create a new json key, name the file *serviceAccountKey.json* and put it in the *functions* folder.<br/>
Run *npm install* to retrieve all the necessary dependencies.<br/>
Run *firebase deploy --only functions* .<br/>
