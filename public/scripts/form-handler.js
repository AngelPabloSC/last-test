document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const dialog = document.getElementById("thank-you-dialog");
  const titleEl = document.getElementById("dialog-title");
  const messageEl = document.getElementById("dialog-message");
  const closeBtn = document.getElementById("close-dialog");

  if (!form || !dialog || !titleEl || !messageEl || !closeBtn) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: form["full-name"].value,
      phone: form["phone"].value,
      email: form["email"].value,
      address: form["address"].value,
      city: form["city"].value,
      project: form["project"].value,
    };

    try {
      const response = await fetch(
        "https://connection.nova-solutions.us/contacts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const result = await response.json();
        titleEl.textContent = "Registration Successful!";
        titleEl.className = "text-xl font-bold text-green-500";
        messageEl.textContent = `${result.name}, you will be contacted by one of our advisors during the day.`;
      } else {
        titleEl.textContent = "Registration Error";
        titleEl.className = "text-xl font-bold text-red-500";
        messageEl.textContent = "There was an error sending your message. Please try again.";
      }

      dialog.showModal();
      form.reset();
    } catch (err) {
      alert("Server error. Please try again later.");
    }
  });

  closeBtn.addEventListener("click", () => {
    dialog.close();
  });
});