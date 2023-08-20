// import firebase from "firebase";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { uploadBytesResumable, getStorage, getDownloadURL, ref } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";

const firebaseConfig = initializeApp(
    {
        apiKey: "AIzaSyClNkOYMTBXxdGzUYHFeyIBGFJyqDYFntY",
        authDomain: "etch-a-sketch-3cc0b.firebaseapp.com",
        projectId: "etch-a-sketch-3cc0b",
        storageBucket: "etch-a-sketch-3cc0b.appspot.com",
        messagingSenderId: "233143707855",
        appId: "1:233143707855:web:764e583bb4bcffc63e2fba"
    }
);

const db = getStorage(firebaseConfig);

document.getElementById("upload").onclick = upLoad;



function upLoad(e) {
    const canvas = document.querySelector(".canvas")
    console.log("uploading...")
    var n = Math.floor(Math.random() * 100)+1;
    html2canvas(canvas).then((c) => {
        var theImg = c.toDataURL('image/png')
        console.log(theImg);

        // Create the file metadata
        const file = theImg

        var img = new Image();
        // img.src = theImg;

        
        img.onload = function() {
            var canva = document.createElement('canva');
            canva.width = img.width;
            canva.height = img.height;
            var ctx = canva.getContext('2d');
            // Draw the image onto the canvas
            ctx.drawImage(img, 0, 0);
          
            // Convert the canvas to a PNG data URL
            var convertedDataUrl = canva.toDataURL('image/png');
          
            // Log the converted data URL
            console.log(convertedDataUrl);
        };

        const metadata = {
            contentType: 'image/png'
        };

        // Upload file and metadata to the object 'images/mountains.jpg'

        
        const storageRef = ref(db, `files/${n}.png`);
        const uploadTask = uploadBytesResumable(storageRef, img, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                });
            }
        );


    })
}

