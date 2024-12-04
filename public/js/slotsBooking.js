// Fetch available slots when the date changes
document
  .getElementById("appointmentDate")
  .addEventListener("change", async function () {
    const date = this.value;
    const slotsDropdown = document.getElementById("availableSlots");
    const saveButton = document.getElementById("saveAppointmentButton");

    // Reset the dropdown and disable the save button
    slotsDropdown.innerHTML =
      '<option value="">-- Select a time slot --</option>';
    saveButton.disabled = true;

    if (date) {
      // Fetch available slots for the selected date
      try {
        const response = await fetch(`/g/available-slots?date=${date}`);
        const availableSlots = await response.json();

        if (availableSlots.length === 0) {
          slotsDropdown.innerHTML +=
            '<option value="">No slots available</option>';
        } else {
          availableSlots.forEach((slot) => {
            const option = document.createElement("option");
            option.value = slot._id;
            option.textContent = `${slot.time}`;
            slotsDropdown.appendChild(option);
          });
        }
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    }
  });

// Enable save button when a slot is selected
document
  .getElementById("availableSlots")
  .addEventListener("change", function () {
    const saveButton = document.getElementById("saveAppointmentButton");
    saveButton.disabled = !this.value;
  });

// Save the selected appointment slot
document
  .getElementById("saveAppointmentButton")
  .addEventListener("click", async function () {
    const selectedSlot = document.getElementById("availableSlots").value;
    if (!selectedSlot) {
      alert("Please select a slot before saving.");
      return;
    }

    try {
      const response = await fetch(`/g/book-slot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appointmentId: selectedSlot }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message || "Appointment saved successfully!");
        window.location.href = "/g"; // Redirect to G page
      } else {
        alert(result.error || "Failed to save appointment.");
      }
    } catch (error) {
      console.error("Error saving appointment:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  });
