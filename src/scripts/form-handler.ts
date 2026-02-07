document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form") as HTMLFormElement | null;
  const dialog = document.getElementById("thank-you-dialog") as HTMLDialogElement | null;
  const titleEl = document.getElementById("dialog-title");
  const messageEl = document.getElementById("dialog-message");
  const closeBtn = document.getElementById("close-dialog");

  if (!form || !dialog || !titleEl || !messageEl || !closeBtn) return;

  form.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault();

    const submitBtn = document.getElementById("submit-button") as HTMLButtonElement | null;
    const btnText = document.getElementById("button-text");
    const spinner = document.getElementById("button-spinner");

    if (submitBtn && btnText && spinner) {
      submitBtn.disabled = true;
      btnText.textContent = "Sending...";
      spinner.classList.remove("hidden");
    }

    const formData = new FormData(form);
    const data = {
      name: formData.get("full-name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      address: formData.get("address"),
      city: formData.get("city"),
      project: formData.get("project"),
    };

    try {
      // Injected directly by Astro/Vite at build time
      const apiUrl = import.meta.env.PUBLIC_BACKEND_URL;

      if (!apiUrl) {
        throw new Error("API URL not configured");
      }

      const response = await fetch(
        apiUrl,
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
      console.error("Form submission error:", err);
      alert("Server error. Please try again later.");
    } finally {
      if (submitBtn && btnText && spinner) {
        submitBtn.disabled = false;
        btnText.textContent = "Get Free Inspections";
        spinner.classList.add("hidden");
      }
    }
  });

  closeBtn.addEventListener("click", () => {
    dialog.close();
  });
});
