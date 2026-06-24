'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// Google Sheets form submission
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    const statusMsg = document.getElementById("form-status");
    const originalBtnText = formBtn.innerHTML;
    
    formBtn.setAttribute("disabled", "");
    formBtn.innerHTML = "<ion-icon name='sync-outline'></ion-icon><span>Sending...</span>";
    statusMsg.style.display = "none";
    
    const formData = new FormData(form);
    
    fetch("https://script.google.com/macros/s/AKfycbzl_u2feujMu7EpMA5cXoikN--EPF_qWipS55HMb3ZkI8bCEPAewO92V0OeSQuRYecu/exec", {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if(data.result === "success") {
        statusMsg.style.color = "var(--orange-yellow-crayola)";
        statusMsg.innerText = "Message sent successfully!";
        statusMsg.style.display = "block";
        form.reset();
      } else {
        throw new Error("Form submission failed");
      }
    })
    .catch(error => {
      statusMsg.style.color = "#ff5e5e"; // error red
      statusMsg.innerText = "Oops! Something went wrong. Please try again later.";
      statusMsg.style.display = "block";
    })
    .finally(() => {
      formBtn.removeAttribute("disabled");
      formBtn.innerHTML = originalBtnText;
      if (formInputs.length > 0) {
        formInputs[0].dispatchEvent(new Event('input'));
      }
    });
  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Custom Searchable Dropdown Logic
const countryInput = document.getElementById("country-input");
const countryDropdown = document.getElementById("country-dropdown");

if (countryInput && countryDropdown) {
  const items = countryDropdown.querySelectorAll("li");

  function updateDropdownVisibility(forceOpen = false) {
    const filter = countryInput.value.toLowerCase();
    let exactMatch = false;
    let visibleCount = 0;

    items.forEach(item => {
      const text = item.innerText.toLowerCase();
      if (text.includes(filter)) {
        item.style.display = "block";
        visibleCount++;
        if (text === filter) {
          exactMatch = true;
        }
      } else {
        item.style.display = "none";
      }
    });

    if (forceOpen) {
      if (visibleCount > 0) countryDropdown.classList.add("active");
      else countryDropdown.classList.remove("active");
      return;
    }

    // Hide if no matches, or if we have an exact match (user already selected it)
    if (visibleCount === 0 || exactMatch) {
      countryDropdown.classList.remove("active");
    } else {
      countryDropdown.classList.add("active");
    }
  }

  // Show dropdown on click
  countryInput.addEventListener("click", () => {
    const val = countryInput.value.toLowerCase();
    let isMatch = false;
    items.forEach(i => { if (i.innerText.toLowerCase() === val) isMatch = true; });
    
    // If they click it while a valid country is already selected, clear it so they see the full list again
    if (isMatch) {
       countryInput.value = ""; 
       countryInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    updateDropdownVisibility(true);
    
    // Force open if empty so user sees options immediately
    if (countryInput.value.trim() === "") {
      items.forEach(item => item.style.display = "block");
      countryDropdown.classList.add("active");
    }
  });

  // Filter items on type
  countryInput.addEventListener("input", () => {
    updateDropdownVisibility();
    if (countryInput.value.trim() === "") {
      items.forEach(item => item.style.display = "block");
      countryDropdown.classList.add("active");
    }
  });

  // Select item
  items.forEach(item => {
    item.addEventListener("mousedown", (e) => {
      e.preventDefault(); // Prevent input from losing focus before click fires
      countryInput.value = item.innerText;
      countryDropdown.classList.remove("active");
      // Trigger input event for form validation logic
      countryInput.dispatchEvent(new Event('input', { bubbles: true }));
    });
  });

  // strictly enforce selection on blur
  countryInput.addEventListener("blur", () => {
    countryDropdown.classList.remove("active");
    const typed = countryInput.value.toLowerCase();
    let matchFound = false;
    
    items.forEach(item => {
      if (item.innerText.toLowerCase() === typed) {
        countryInput.value = item.innerText; // Fix casing
        matchFound = true;
      }
    });
    
    // If they typed nonsense, automatically clear it out
    if (!matchFound && countryInput.value !== "") {
      countryInput.value = "";
      countryInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
}
