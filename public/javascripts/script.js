window.onload = function () {
  const loginPage = document.getElementById("loginpage");
  const registerPage = document.getElementById("registerpage");

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginTitle = document.getElementById("loginTitle");
  const registerTitle = document.getElementById("registerTitle");

  const signUpBtn = document.getElementById("signup");
  const signInBtn = document.getElementById("signin");

  // Switch back to login form
  registerPage.classList.add("collapsed");
  registerPage.classList.remove("expanded");

  loginPage.classList.remove("collapsed");
  loginPage.classList.add("expanded");

  // Toggle visibility of form content
  registerForm.style.display = "none";
  registerTitle.style.display = "none";
  loginForm.style.display = "block";
  loginTitle.style.display = "block";

  signInBtn.style.display = "none";
  signUpBtn.style.display = "block";

  signUpBtn.addEventListener("click", () => {
    // Switch to register form
    loginPage.classList.add("collapsed");
    loginPage.classList.remove("expanded");

    registerPage.classList.remove("collapsed");
    registerPage.classList.add("expanded");

    // Toggle visibility of form content
    loginForm.style.display = "none";
    loginTitle.style.display = "none";
    registerForm.style.display = "block";
    registerTitle.style.display = "block";

    signUpBtn.style.display = "none";
    signInBtn.style.display = "block";
  });

  signInBtn.addEventListener("click", () => {
    // Switch back to login form
    registerPage.classList.add("collapsed");
    registerPage.classList.remove("expanded");

    loginPage.classList.remove("collapsed");
    loginPage.classList.add("expanded");

    // Toggle visibility of form content
    registerForm.style.display = "none";
    registerTitle.style.display = "none";
    loginForm.style.display = "block";
    loginTitle.style.display = "block";

    signInBtn.style.display = "none";
    signUpBtn.style.display = "block";
  });
};
