const form = document.getElementById("form"); // id should be in  single quotaion mark
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//  show error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

//show success message
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// check required
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// check length required
function checkLength(input, min, max) {
  if (
    input.value === "" ||
    (input.value.length >= min && input.value.length < max)
  )
    return true;
  else showError(input, `must be atleast ${min} and max ${max} characters`);
}

// Field name to upper case
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// for email validating
function ValidateEmail(inputText) {
  var mailFormat = /\S+@\S+\.\S+/;
  if (inputText.value.match(mailFormat)) {
    showSuccess(inputText);
  } else if (inputText.value !== "") {
    showError(inputText, "invalid Email");
  }
}

// password checker
function checkPassword(pass1, pass2) {
  if (pass1.value === pass2.value) {
  } else showError(pass2, "passwords do not match");
}
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 15);
  checkLength(password2, 6, 15);
  ValidateEmail(email);
  checkPassword(password, password2);
});
