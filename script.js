import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRkM9rNMRQ-bCabK42bSNcul1VTkm-EKw",
  authDomain: "thrift-project.firebaseapp.com",
  projectId: "thrift-project",
  storageBucket: "thrift-project.appspot.com",
  messagingSenderId: "535625642924",
  appId: "1:535625642924:web:917fbd9c022444a31d8009",
  measurementId: "G-C38M9NGEBH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";

// //Retrieve username, email, and password to store into Firebase
function writeUserData() {
  const db = getDatabase();
  const username = document.getElementById('username').value;
  const user_email = document.getElementById('email').value;
  const user_password = document.getElementById('password').value;
  const user_info = {
    email: user_email,
    password: user_password
  };
  console.log(user_info);
  set(ref(db, 'users/' + username), user_info);
  console.log("stored email/password");
}

const button=document.getElementById('register');
button.addEventListener('click', writeUserData);

// Initialize Realtime Database and get a reference to the service
const database = firebase.database();

// const user1= {
//   name:"Jim",
//   age : 14
// }

// function writeUserData(userId, name, email) {
//   firebase.database().ref('users/' + userId).set(user1);
// }



// //Set up register function
// function register(){
//   //get all input fields
//   email = document.getElementById("email").value;
//   password = document.getElementById("password").value;
//   //Validate input field
//   if(validate_email(email)==false || validate_password(password)==false){
//     alert("Email or Password invalid.");
//     return
//     //Don't continue running code
//   }
// }

// function validate_email(email){
//   expression = /^[^@]+@\w+(\.\w+)+\w$/;
//   if(expression.test(email) == true){
//     //email is good, then
//     return true;
//   } else{
//     return false;
//   } 
// }
// function validate_password(password){
//   if(password.length < 6){
//     return false;
//   } else{
//     return true;
//   }
// }

// // When the user clicks on <div>, open the popup
// function myFunction() {
//  console.log("myPopup");
//   const openPopup = document.getElementById("myPopup");
//   popup.classList.toggle("show");
// }


// Add to cart and shopping page

/* When the user clicks on <div>, open the popup
function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
} */


