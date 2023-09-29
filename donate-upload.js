import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWTdVygi4do_Wy2qopydqxvnhvWrqYQNk",
  authDomain: "donate-upload-base.firebaseapp.com",
  projectId: "donate-upload-base",
  storageBucket: "donate-upload-base.appspot.com",
  messagingSenderId: "241084912939",
  appId: "1:241084912939:web:222a6d99dbc0a11cb9e16e",
  measurementId: "G-J9ECSCK4SB"
};


// Initialize donate-upload database
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";
import { getStorage, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-storage.js";
import { ref as sRef } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-storage.js";
import { getApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";

// Function to get get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

// //define variables file & storage for use in uploadFrontImage(), writeDonationData()
// const storage = getStorage();
// const type = getInputVal('front');
// const file = document.getElementById("front").files[0];
// const storageRef = sRef(storage, `/images/${type}`);

function uploadFrontImage() {
  // Initialize Cloud Storage and get a reference to the service
  const storage = getStorage();
  const type = getInputVal('front');
  const file = document.getElementById("front").files[0];
  const storageRef = sRef(storage, `/images/${type}`);
  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });
}

function uploadBackImage() {
  // Initialize Cloud Storage and get a reference to the service
  const storage = getStorage();
  const type = getInputVal('back');
  const file = document.getElementById("back").files[0];
  const storageRef = sRef(storage, `/images/${type}`);
  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });
}

// function uploadFrontImage() {
//   var type = getInputVal('front');
//   const firebaseApp = getApp();
//   const file = document.getElementById("front").files[0];
//   const storage = getStorage(firebaseApp);
//   var storageref = sRef(storage, `/images/${type}`);
//   storageref.put(file);
//   uploadBytes(storageref, file).then((snapshot) => {
//     console.log('Uploaded a blob or file!');
//   });
//   // var thisref = storageref.child(type).child(file.name).put(file);
//   console.log(storageref);
// }


//return item of clothing being donated, radiolist
function getItemChecked() {
  const clothing_items = document.querySelectorAll(".radio");
  let item_checked = "";
  clothing_items.forEach((element) => {
    if (element.checked) {
      item_checked = element.value;
    }
  })
  return item_checked;
}

//return a list of nonprofits that user checked off
function getNonprofitsChecked() {
  const np = document.querySelectorAll(".checkbox");
  let nonprofits_checked = [];
  np.forEach((element) => {
    if (element.checked) {
      nonprofits_checked.push(element.value);
    }
  })
  return nonprofits_checked;
}

//data of donation
function writeDonationData() {
  const db = getDatabase();
  const fname = document.getElementById('fname').value;
  const lname = document.getElementById('lname').value;
  const donation_email = document.getElementById('donation_email').value;
  const nonprofits = getNonprofitsChecked();
  const clothing = getItemChecked();
  // const link = getDownloadURL(`/images/${type}`);
  // const fphoto = getFrontPhoto();
  const donator_info = {
    first_name: fname,
    last_name: lname,
    email: donation_email,
    clothing_item: clothing,
    nonprofit_organizations: nonprofits,
    // url: link
  };
  console.log(donator_info);
  set(ref(db, 'users/' + fname + lname), donator_info);
  console.log("stored donation");
  alert("Thank you for submitting a donation form.");
}

const submit_button = document.getElementById('submit');
console.log(submit_button);
submit_button.addEventListener('click', () => {
  uploadFrontImage();
  uploadBackImage();
  writeDonationData();
});
// submit_button.addEventListener('click', writeDonationData);
// submit_button.addEventListener('click', uploadFrontImage);
// submit_button.addEventListener('click', uploadBackImage);

