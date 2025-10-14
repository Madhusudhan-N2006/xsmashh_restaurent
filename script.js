// script.js — works for both index.html and packages.html

// -----------------------------
// Footer year update
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
    const year = new Date().getFullYear();
    ["year", "year2", "year3"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = year;
    });
  });
  
  // -----------------------------
  // Global selected package state
  // -----------------------------
  const selectedPackage = { name: "", price: 0, duration: "" };
  
  // -----------------------------
  // setPackage(name, price, duration)
  // Called when "Book Now" or "Details" button clicked
  // -----------------------------
  function setPackage(name, price, duration = "") {
    selectedPackage.name = String(name ?? "");
    selectedPackage.price = Number(price ?? 0) || 0;
    selectedPackage.duration = String(duration ?? "");
  
    console.log("setPackage()", selectedPackage);
  
    // Update fields if modal already open
    updateModalFields();
  }
  
  // -----------------------------
  // Update modal inputs dynamically
  // Works for both #bookModal and #packageModal
  // -----------------------------
  function updateModalFields() {
    const modalIds = ["bookModal", "packageModal", "myModal"];
    modalIds.forEach(modalId => {
      const modal = document.getElementById(modalId);
      if (!modal) return;
  
      const pkgInput = modal.querySelector("#modalPackage, #pkgName");
      const priceInput = modal.querySelector("#modalPrice, #pkgPrice");
      const daysInput = modal.querySelector("#modalDays, #pkgDays");
      const totalInput = modal.querySelector("#modalTotal, #pkgTotal");
      const pkgHidden = modal.querySelector("#modalPackageName, #pkgHiddenName");
      const titleEl = modal.querySelector("#pkgTitle");
  
      // Update visible text fields
      if (pkgInput) {
        if (pkgInput.tagName === "INPUT") pkgInput.value = selectedPackage.name;
        else pkgInput.textContent = selectedPackage.name;
      }
      if (priceInput) {
        if (priceInput.tagName === "INPUT") priceInput.value = selectedPackage.price;
        else priceInput.textContent = selectedPackage.price;
      }
      if (pkgHidden) pkgHidden.value = selectedPackage.name;
      if (titleEl) titleEl.textContent = selectedPackage.name;
  
      // Handle days and total
      const days = Number(daysInput?.value) || 1;
      if (daysInput) daysInput.value = days;
      const total = selectedPackage.price * days;
      if (totalInput) {
        if (totalInput.tagName === "INPUT") totalInput.value = total.toFixed(2);
        else totalInput.textContent = total.toFixed(2);
      }
    });
  }
  
  // -----------------------------
  // Ensure modals refresh data each time they open
  // -----------------------------
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".modal").forEach(modalEl => {
      modalEl.addEventListener("show.bs.modal", updateModalFields);
    });
  });
  
  // -----------------------------
  // Calculator inside modal
  // -----------------------------
  function modalCalc() {
    const priceInput = document.querySelector("#modalPrice, #pkgPrice");
    const daysInput = document.querySelector("#modalDays, #pkgDays");
    const totalInput = document.querySelector("#modalTotal, #pkgTotal");
  
    const price = Number(priceInput?.value || priceInput?.textContent) || selectedPackage.price || 0;
    const days = Number(daysInput?.value) || 1;
    const total = price * days;
  
    if (totalInput) {
      if (totalInput.tagName === "INPUT") totalInput.value = total.toFixed(2);
      else totalInput.textContent = total.toFixed(2);
    }
  }
  
  // -----------------------------
  // Booking submission handler (for index.html modal)
  // -----------------------------
  function handleModalBooking(e) {
    e.preventDefault();
  
    const form = e.target;
    const pkg =
      form.querySelector("#modalPackage, #pkgName")?.value ||
      selectedPackage.name ||
      "";
    const total =
      form.querySelector("#modalTotal, #pkgTotal")?.value ||
      form.querySelector("#modalTotal, #pkgTotal")?.textContent ||
      "0.00";
    const email =
      form.querySelector("#modalEmail, #pkgEmail")?.value || "";
  
    alert(`✅ Booking Confirmed:\n\nPackage: ${pkg}\nTotal: $${total}\nEmail: ${email}`);
  
    form.reset();
  
    // Close modal after submission
    const modalEl = form.closest(".modal");
    if (modalEl) {
      const modalInst = bootstrap.Modal.getInstance(modalEl);
      if (modalInst) modalInst.hide();
    }
  }
  
  // -----------------------------
  // Expose functions globally
  // -----------------------------
  window.setPackage = setPackage;
  window.modalCalc = modalCalc;
  window.handleModalBooking = handleModalBooking;
  