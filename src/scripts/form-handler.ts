document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form") as HTMLFormElement | null;
  const dialog = document.getElementById("thank-you-dialog") as HTMLDialogElement | null;
  const titleEl = document.getElementById("dialog-title") as HTMLElement | null;
  const messageEl = document.getElementById("dialog-message") as HTMLElement | null;
  const closeBtn = document.getElementById("close-dialog") as HTMLButtonElement | null;

  if (!form || !dialog || !titleEl || !messageEl || !closeBtn) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: (form["full-name"] as HTMLInputElement).value,
      phone: (form["phone"] as HTMLInputElement).value,
      email: (form["email"] as HTMLInputElement).value,
      address: (form["address"] as HTMLInputElement).value,
      city: (form["city"] as HTMLInputElement).value,
      project: (form["project"] as HTMLTextAreaElement).value,
    };

    try {
      const response = await fetch(
        "http://ec2-3-215-5-204.compute-1.amazonaws.com:3000/contacts",
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

      // Mostrar el diálogo
      dialog.showModal();
      form.reset();
    } catch (err) {
      alert("Error del servidor. Por favor intenta más tarde.");
    }
  });

  closeBtn.addEventListener("click", () => {
    dialog.close();
  });
});