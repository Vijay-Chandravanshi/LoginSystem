const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //check email caterina 

let email = document.getElementById('email');
let password = document.getElementById('password');
let status = document.getElementById('status');
function login() {
    let passwordValue = password.value;
    /*
    console.log(emailPattern.test(email.value));
    console.log(password.value);
    console.log(password.value.length);*/
    if (email.value == ""){
        status.innerHTML="Please, enter email";
    status.style.color = 'red';
    }else if(passwordValue == "" ){
    status.innerHTML="Please, enter password";
    status.style.color = 'red';
    }else if (!emailPattern.test(email.value)) {
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