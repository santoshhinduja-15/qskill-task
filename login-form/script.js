// DOM elements
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");
const form = document.getElementById("loginForm");
const alertBox = document.getElementById("alertBox");

// ---------------- PASSWORD SHOW / HIDE ----------------
togglePassword.addEventListener("click", function () {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;

  this.classList.toggle("bi-eye");
  this.classList.toggle("bi-eye-slash");
});

// ---------------- BOOTSTRAP ALERT FUNCTION ----------------
function showAlert(message, type) {
  alertBox.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
}

// ---------------- FORM SUBMIT ----------------
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = passwordInput.value.trim();

  // BOTH EMPTY
  if (!email && !password) {
    showAlert("Please fill all the fields", "danger");
    return;
  }

  // EMAIL EMPTY
  if (!email) {
    showAlert("Enter email", "danger");
    return;
  }

  // PASSWORD EMPTY
  if (!password) {
    showAlert("Enter password", "danger");
    return;
  }

  // LENGTH CHECK
  if (password.length < 6) {
    showAlert("Password must be at least 6 characters", "warning");
    return;
  }

  // UPPERCASE CHECK
  if (!/[A-Z]/.test(password)) {
    showAlert(
      "Password must contain at least one uppercase letter",
      "warning"
    );
    return;
  }

  // LOWERCASE CHECK
  if (!/[a-z]/.test(password)) {
    showAlert(
      "Password must contain at least one lowercase letter",
      "warning"
    );
    return;
  }

  // NUMBER CHECK
  if (!/[0-9]/.test(password)) {
    showAlert(
      "Password must contain at least one number",
      "warning"
    );
    return;
  }

  // SPECIAL CHARACTER CHECK
  if (!/[@$!%*?&]/.test(password)) {
    showAlert(
      "Password must contain at least one special character (@ $ ! % * ? &)",
      "warning"
    );
    return;
  }

  // SUCCESS
  showAlert("Login successful!", "success");
});
