document.addEventListener("DOMContentLoaded", () => {

  const g2Form = document.getElementById("g2Form");

  g2Form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission by default
    let isValid = true;

    // Clear previous error messages
    document.querySelectorAll(".error-message").forEach((error) => {
      error.textContent = "";
    });

    // Log values to verify they are accessible
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const licenseNumber = document.getElementById("licenseNumber").value;
    const dob = document.getElementById("dob").value;
    const carMake = document.getElementById("carMake").value;
    const carModel = document.getElementById("carModel").value;
    const carYear = document.getElementById("carYear").value;
    const plateNumber = document.getElementById("plateNumber").value;

    // Validate Personal Information
    if (!firstName.trim()) {
      document.getElementById("firstNameError").textContent = "First Name is required.";
      isValid = false;
    }

    if (!lastName.trim()) {
      document.getElementById("lastNameError").textContent = "Last Name is required.";
      isValid = false;
    }

    if (!/^[A-Za-z0-9]{8}$/.test(licenseNumber.trim())) {
      document.getElementById("licenseError").textContent = "License number must contain exactly 8 alphanumeric characters.";
      isValid = false;
    }

    if (!dob) {
      document.getElementById("dobError").textContent = "Date of Birth is required.";
      isValid = false;
    }

    // Validate Car Information
    if (!carMake.trim()) {
      document.getElementById("carMakeError").textContent = "Car Make is required.";
      isValid = false;
    }

    if (!carModel.trim()) {
      document.getElementById("carModelError").textContent = "Car Model is required.";
      isValid = false;
    }

    if (!/^\d{4}$/.test(carYear) || carYear < 1900 || carYear > 2024) {
      document.getElementById("carYearError").textContent = "Car Year must be between 1900 and 2024.";
      isValid = false;
    }

    if (!/^[A-Z0-9-]+$/.test(plateNumber)) {
      document.getElementById("plateError").textContent = "Plate number must contain only uppercase letters, numbers, and dashes.";
      isValid = false;
    }

    // Final check
    if (!isValid) {
      console.log("Form validation failed");
    } else {
      console.log("Form validated successfully");
      alert("Your request has been submitted successfully!");
      g2Form.submit();
    }
  });
});