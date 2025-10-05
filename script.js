import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
    import { 
      getAuth, 
      createUserWithEmailAndPassword, 
      signInWithEmailAndPassword,
      GoogleAuthProvider, signInWithPopup,
      signOut,
      onAuthStateChanged
    } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
    // Firebase config
    const firebaseConfig = {
      apiKey: "AIzaSyAhk8BRy2NgElvzceyAbVxQ6cD0FbfQA8Q",
      authDomain: "apna-toon.firebaseapp.com",
      projectId: "apna-toon",
      storageBucket: "apna-toon.firebasestorage.app",
      messagingSenderId: "939053272043",
      appId: "1:939053272043:web:f1b07c19b8695b89e827ae",
      measurementId: "G-21XLXY2BCT"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    // Google Provider
    const provider = new GoogleAuthProvider();


const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let loginEmail = document.getElementById('loginEmail');
let statusEl = document.getElementById('statusEl');
let signUpEmail = document.getElementById('signUpEmail');
let signUpName = document.getElementById('signUpName');
let signUpDOB = document.getElementById('signUpDOB');

    


  const loginButton = document.getElementById('loginBtn');
  loginButton.addEventListener("click", async (e) => {
      e.preventDefault();
      let email = loginEmail.value.trim();
      if (emailPattern.test(email)) {
          console.log("Email Passed " + email)
      } else {
          console.log("Email Failed " + email)
      };
      let password = passwordInput.value;
      if (password.length < 8 || password.length > 20) {
          console.log(password + " is invalid, atleast 8 characters required or no more than 20");
      } else {
          console.log("Valid Password");
      };
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userId = user.uid;
        const userDocRef = doc(db,"users",userId);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log(userData);
        } else {
            console.warn("user not found")
        }
        alert("Login Successful!");
        console.log(user);
      } catch (error) {
        alert(error.message);
      }
  });
  const signUpButton = document.getElementById('signUpBtn');
  signUpButton.addEventListener("click", async (e) => {
      e.preventDefault();
      let name = signUpName.value.trim();
      let dob = signUpDOB.value;
      console.log(`Welcome to Apna TOON, ${name} and ${dob}`)
      let email = signUpEmail.value.trim();
      if (emailPattern.test(email)) {
          console.log("Email Passed " + email)
      } else {
          console.log("Email Failed " + email)
      };
      let password = passwordInputSignUp.value;
      if (password.length < 8 || password.length > 20) {
          console.log(password + " is invalid, atleast 8 characters required or no more than 20");
      } else {
          console.log("Valid Password");
      };
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user
        const userId = user.uid;
        await setDoc(doc(db,"users",userId), {
        name: name,
        dob: dob,
        email: email,
        createdAt: new Date()
        });
    } catch (error) {
        alert(error.code, error.message)
    }
  });
  
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener("click", async () => {
      try {
        await signOut(auth);
        alert("Logged out!");
      } catch (error) {
        alert(error.message);
      }
    });
        // Track auth state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        statusEl.innerText = `Logged in as: ${user.email}`;
      } else {
        statusEl.innerText = "Not logged in" + error.message;
      }
    });