const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //check email caterina 

let loginEmail = document.getElementById('loginEmail');
let loginPassword = document.getElementById('loginPassword');
//login inputs

let signUpName = document.getElementById('signUpName');
let signUpDOB = document.getElementById('signUpDOB')
let signUpEmail = document.getElementById('signUpEmail');
let signUpPassword = document.getElementById('signUpPassword');
//signUp input 
let status = document.getElementById('status');
function login() {
    let passwordValue = loginPassword.value;
    /*
    console.log(emailPattern.test(email.value));
    console.log(password.value);
    console.log(password.value.length);*/
    if (loginEmail.value == ""){
        status.innerHTML="Please, enter email";
    status.style.color = 'red';
    }else if(passwordValue == "" ){
    status.innerHTML="Please, enter password";
    status.style.color = 'red';
    }else if (!emailPattern.test(loginEmail.value)) {
    status.innerHTML="Invalid email";
    status.style.color = 'red';
}else if(passwordValue.length < 8 || passwordValue.length > 20){
    status.innerHTML="Invalid Password, atleast 8 characters";
    status.style.color = "red";
}
else{
    status.innerHTML = "logging....";
    status.style.color = "green";
    }
};
function signUp() {
    console.log(email.value);
    status.innerHTML = "Sign up....";
    status.style.color = "green";
};
// Toggle forms
document.getElementById("showSignUp").addEventListener("click", () => {
  loginForm.classList.add("hidden");
  signUpForm.classList.remove("hidden");
});

document.getElementById("showLogin").addEventListener("click", () => {
  signUpForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});