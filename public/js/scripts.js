// validation.js
document.addEventListener("DOMContentLoaded", () => {
  const g2Form = document.getElementById("g2Form");

  g2Form.addEventListener("submit", function (e) {
    let isValid = true;

    // Clear previous error messages
    const clearErrors = () => {
      document.querySelectorAll(".error-message").forEach((error) => {
        error.textContent = "";
      });
    };

    clearErrors();

    // Validate Personal Information
    const firstName = document.getElementById("firstName");
    if (!firstName.value.trim()) {
      document.getElementById("firstNameError").textContent =
        "First Name is required.";
      isValid = false;
    }

    const lastName = document.getElementById("lastName");
    if (!lastName.value.trim()) {
      document.getElementById("lastNameError").textContent =
        "Last Name is required.";
      isValid = false;
    }

    const licenseNumber = document.getElementById("licenseNumber");
    if (
      licenseNumber.value.length !== 8 ||
      !/^[a-zA-Z0-9]+$/.test(licenseNumber.value)
    ) {
      document.getElementById("licenseError").textContent =
        "License number must be exactly 8 alphanumeric characters.";
      isValid = false;
    }

    const age = document.getElementById('age');
    const ageValue = age.value.trim();
    if (!/^\d+$/.test(ageValue) || ageValue < 16 || ageValue > 100) {
      document.getElementById('ageError').textContent = 'Age must be a number between 16 and 100.';
      isValid = false;
    }


    const dob = document.getElementById("dob");
    if (!dob.value) {
      document.getElementById("dobError").textContent =
        "Date of Birth is required.";
      isValid = false;
    }

    // Validate Car Information
    const carMake = document.getElementById("carMake");
    if (!carMake.value.trim()) {
      document.getElementById("carMakeError").textContent =
        "Car Make is required.";
      isValid = false;
    }

    const carModel = document.getElementById("carModel");
    if (!carModel.value.trim()) {
      document.getElementById("carModelError").textContent =
        "Car Model is required.";
      isValid = false;
    }

    const carYear = document.getElementById('carYear');
    const carYearValue = carYear.value.trim();
    if (!/^\d+$/.test(carYearValue) || carYearValue < 1900 || carYearValue > 2024) {
      document.getElementById('carYearError').textContent = 'Car Year must be a number between 1900 and 2024.';
      isValid = false;
    }

    const plateNumber = document.getElementById("plateNumber");
    if (!/^[A-Z0-9-]+$/.test(plateNumber.value)) {
      document.getElementById("plateError").textContent =
        "Plate number must contain only uppercase letters, numbers, and dashes.";
      isValid = false;
    }

    // Prevent form submission if any field is invalid
    if (!isValid) {
      e.preventDefault();
    } else {
      alert("Your request has been submitted successfully!");
    }
  });
});
