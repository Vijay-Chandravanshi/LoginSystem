import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
    import { 
      getAuth, 
      createUserWithEmailAndPassword,
        sendPasswordResetEmail, sendEmailVerification,
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
      if(name == "" || !name){
          alert("Fill Name");
          return;
      };
      console.
      let dob = signUpDOB.value;
      if(dob == "" || !dob){
          alert("Fill date of birth");
          return;
      };
      console.log(`Welcome to Apna TOON, ${name} and ${dob}`)
      let email = signUpEmail.value.trim();
      if (emailPattern.test(email)) {
          console.log("Email Passed " + email)
      } else {
          console.log("Email Failed " + email);
          return;
      };
      let password = passwordInputSignUp.value;
      if (password.length < 8 || password.length > 20) {
          console.log(password + " is invalid, atleast 8 characters required or no more than 20");
          return;
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
    
  const googleBtn = document.getElementById('google-btn');
  googleBtn.addEventListener("click", async  () => {
          // Google Provider
    const provider = new GoogleAuthProvider();
    try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const isNewUser = result.additionalUserInfo ? result.additionalUserInfo.isNewUser : false;
    const userNameFromGoogle = user.displayName;
    const userEmail = user.email;
    const userDocRef = doc(db,"users",user.uid);
    const userDoc = await getDoc(userDocRef);
    if (isNewUser || !userDoc.exists()) {
        showProfileCompletion(userNameFromGoogle, userEmail);
        alert("Please, complete your profile")
    loginForm.classList.add("hidden");
    signUpForm.classList.add("hidden");
    document.getElementById("profileComplete").classList.remove("hidden");
    } else {
    alert("Google login Successful")
    }
    } catch (error) {
        alert(`Google Sign-in Failed: ${error.message}`)
    }
  });
  function showProfileCompletion(name, email){
      if (name) {
        document.getElementById("googleName").value = name;
      }
      document.getElementById('googleDOB').value = '';
  };
  let completeBtn = document.getElementById('googleDetailBtn');
  completeBtn.addEventListener("click", async () => {
      const user = auth.currentUser;
      if (!user) {
          alert("No user signed in. try again" );
          return
      }
      const name = document.getElementById('googleName').value.trim();
      const dob = document.getElementById('googleDOB').value;
      
      if (!name || !dob) {
          alert("name and Date of Birth are required ");
          return
      }
      
      try {
          await setDoc(doc(db,"users",user.uid), {
              name: name,
              dob: dob,
              email: user.email,
              loginMethod: "Google user",
              createdAt: new Date()
          },{merge: true});
      } catch (error) {
          alert(`Error completing profile: ${error.message}`)
      }
  })
  
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener("click", async () => {
      try {
        await signOut(auth);
        alert("Logged out!");
      } catch (error) {
        alert(error.message);
      }
    });
let forgotPassword = document.getElementById("forgotBtn");
forgotPassword.addEventListener('click', async () => {
    // 1. Get the email from the login email input field
    const email = document.getElementById('loginEmail').value.trim(); // Ensure this ID is correct

    if (!email) {
        alert("Please enter your email in the email field first to receive the reset link.");
        return;
    }

    try {
        // 2. Call the Firebase API to send the email
        await sendPasswordResetEmail(auth, email);
        
        // 3. Inform the user
        alert(`Password reset email sent to ${email}! Check your inbox (and spam folder).`);
        
    } catch (error) {
        // Handle specific errors (e.g., user not found)
        alert("Error sending reset email: " + error.message);
        console.error(error);
    }
});
        // Track auth state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        statusEl.innerText = `Logged in as: ${user.email}`;
      } else {
        statusEl.innerText = "Not logged in";
      }
    });
