
// Fetch available slots when the date changes
document.getElementById("appointmentDate").addEventListener("change", async function () {
    const date = this.value;
    const slotsDropdown = document.getElementById("availableSlots");
  
    // Fetch available slots for the selected date
    const response = await fetch(`/g2/available-slots?date=${date}`);
    const availableSlots = await response.json();
  
    // Populate slots dropdown
    slotsDropdown.innerHTML = '<option value="">-- Select a time slot --</option>';
    if (availableSlots.length === 0) {
      slotsDropdown.innerHTML += '<option value="">No slots available</option>';
    } else {
      availableSlots.forEach((slot) => {
        const option = document.createElement("option");
        option.value = slot._id;
        option.textContent = `${slot.time}`;
        slotsDropdown.appendChild(option);
      });
    }
  });
  
  function selectSlot(appointmentId) {
    document.getElementById("appointmentId").value = appointmentId;
    document.getElementById("bookSlotForm").style.display = "block";
  }
  