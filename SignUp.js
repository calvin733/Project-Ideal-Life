
document.getElementById("SignUp-Form").addEventListener("submit", function(event) {
  event.preventDefault();
  document.querySelectorAll('.error-message').forEach(span => span.textContent = '');

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const agreement = document.getElementById("agreement").checked;

  let hasError = false;

  if(name.length < 5){
    document.getElementById("nameError").textContent = "Full name must be at least 5 characters.";
    hasError = true;a
  }

  if(!email.endsWith("@gmail.com")){
    console.log("test")
    document.getElementById("emailError").textContent = "Email must end with @gmail.com.";
    hasError = true;
  }

  if (password === "") {
    document.getElementById("passwordError").textContent = "Password is required.";
    hasError = true;
  }
 
  if(!agreement){
    document.getElementById("termsError").textContent = "You must agree to the terms and conditions.";
    hasError = true;
  }

  if(!hasError){
    alert("Thank You for Registering");
  }
});
