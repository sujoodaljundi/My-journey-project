//Each comment describes the code above
"use strict";
document.addEventListener("DOMContentLoaded", function () {
  //country API 
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      const countrySelect = document.getElementById("country");
      data.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.name.common;
        option.textContent = country.name.common;
        countrySelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching countries:", error));
});

/*************************************Contries Api*******************************/


const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".reg-container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
/************************************Switching Between Pages************************/


// Sign Up Form Elements
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");
const confirmPassword = document.getElementById("confirm-password");
const signupBtn = document.getElementById("signupBtn");

const emailErrorMessage = document.getElementById("email-error-message");
const errorMessage = document.getElementById("error-message");

const minLength = document.getElementById("min-length");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const number = document.getElementById("number");
const specialChar = document.getElementById("special-char");

const loginEmail = document.getElementById("email");
const loginPassword = document.getElementById("pswd");
const loginBtn = document.getElementById("loginBtn");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Function to validate email format
function validateEmail(emailInput, errorSpan) {
  if (!emailPattern.test(emailInput.value)) {
    errorSpan.textContent = "Please enter a valid email address";
    return false;
  } else {
    errorSpan.textContent = "";
    return true;
  }
}

// Function to check if passwords match
function checkPasswords() {
  if (signupPassword.value !== confirmPassword.value) {
    errorMessage.textContent = "Passwords do not match";
    return false;
  } else {
    errorMessage.textContent = "";
    return true;
  }
}

// Function to check password strength
function checkPasswordStrength() {
  const password = signupPassword.value;
  let valid = true;

  if (password.length >= 8) {
    minLength.classList.add("valid");
  } else {
    minLength.classList.remove("valid");
    valid = false;
  }

  if (/[A-Z]/.test(password)) {
    uppercase.classList.add("valid");
  } else {
    uppercase.classList.remove("valid");
    valid = false;
  }

  if (/[a-z]/.test(password)) {
    lowercase.classList.add("valid");
  } else {
    lowercase.classList.remove("valid");
    valid = false;
  }

  if (/\d/.test(password)) {
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    valid = false;
  }

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    specialChar.classList.add("valid");
  } else {
    specialChar.classList.remove("valid");
    valid = false;
  }

  return valid;
}

function toggleSignupButton() {
  const isEmailValid = validateEmail(signupEmail, emailErrorMessage);
  const isPasswordValid = checkPasswordStrength();
  const doPasswordsMatch = checkPasswords();

  signupBtn.disabled = !(isEmailValid && isPasswordValid && doPasswordsMatch);
}

signupEmail.addEventListener("input", toggleSignupButton);
signupPassword.addEventListener("input", toggleSignupButton);
confirmPassword.addEventListener("input", toggleSignupButton);

function toggleLoginButton() {
  const isEmailValid = validateEmail(loginEmail, emailErrorMessage);
  loginBtn.disabled = !(isEmailValid && loginPassword.value.length >= 8);
}

loginEmail.addEventListener("input", toggleLoginButton);
loginPassword.addEventListener("input", toggleLoginButton);

toggleSignupButton();
toggleLoginButton();

/*********************************Form Validation*************************************** */

document.querySelector(".sign-up-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const country = document.getElementById("country").value;
    const hashedPassword = CryptoJS.SHA256(password).toString();

    const newUser = {
      username: username,
      email: email,
      password: hashedPassword,
      country: country
    };

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const alertMessage = document.getElementById("alertMessage");

    if (users.some((user) => user.email === email)) {
      alertMessage.classList.remove("d-none");
      alertMessage.classList.add("alert-danger");
      alertMessage.textContent = "This email is already registered!";
      return;
    }

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    
    localStorage.setItem("loggedInUserEmail", email);

    alertMessage.classList.remove("d-none", "alert-danger");
    alertMessage.classList.add("alert-success");
    alertMessage.textContent = "User data saved successfully";


    setTimeout(() => {

      window.location.href = "./index.html";
    }, 2000);
  });

/***********************************Sign Up********************************* */
document.querySelector('.sign-in-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();


    const email = document.getElementById('email').value;
    const password = document.getElementById('pswd').value;
    const hashedPassword = CryptoJS.SHA256(password).toString();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === hashedPassword);

    if (user) {
      localStorage.setItem("loggedInUserEmail", email);
      alertMessage.classList.remove("d-none", "alert-danger");
      alertMessage.classList.add("alert-success");
      alertMessage.textContent = "Login successful! Welcome " + user.username;

      setTimeout(() => {

        window.location.href = "./index.html";
      }, 2000);

    } else {

      alertMessage.classList.remove("d-none");
      alertMessage.classList.add("alert-danger");
      alertMessage.textContent = "Invalid email or password. Please try again.";
    }
  });

/********************************************************************/


