'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
const sidebarInfoMore = document.querySelector('.sidebar-info_more');

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { 
  elementToggleFunc(sidebar); 
  sidebarInfoMore.classList.toggle('expanded');

  // Toggle full name visibility based on sidebar state
  const fullName = document.querySelector('.full-name');
  const firstName = document.querySelector('.first-name');
  if (fullName && firstName) {
    if (sidebar.classList.contains('active')) {
      fullName.style.display = 'inline';
      firstName.style.display = 'none';
    } else {
      // Hide the full name only if the screen width is less than 450px
      if (window.innerWidth < 450) {
        fullName.style.display = 'none';
        firstName.style.display = 'inline';
      } else {
        fullName.style.display = 'inline';
        firstName.style.display = 'none';
      }
    }
  }
});




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
};

// See More/Less functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all timeline sections to show only 3 items
  const sections = document.querySelectorAll('.timeline');
  
  sections.forEach(section => {
    const items = section.querySelectorAll('.timeline-item');
    
    // Only add the see more button if there are more than 3 items
    if (items.length > 3) {
      // Hide items beyond the first 3
      for (let i = 3; i < items.length; i++) {
        items[i].classList.add('hidden-item');
      }
      
      // Create and add the "See More" button
      const seeMoreContainer = document.createElement('div');
      seeMoreContainer.className = 'see-more-container';
      
      const seeMoreBtn = document.createElement('button');
      seeMoreBtn.className = 'see-more-btn';
      seeMoreBtn.textContent = 'See More';
      
      seeMoreContainer.appendChild(seeMoreBtn);
      section.appendChild(seeMoreContainer);
      
      // Add click event listener to the button
      seeMoreBtn.addEventListener('click', function() {
        const hiddenItems = section.querySelectorAll('.hidden-item');
        
        if (seeMoreBtn.textContent === 'See More') {
          // Show all items
          hiddenItems.forEach(item => {
            item.classList.remove('hidden-item');
          });
          seeMoreBtn.textContent = 'See Less';
        } else {
          // Hide items beyond the first 3
          for (let i = 3; i < items.length; i++) {
            items[i].classList.add('hidden-item');
          }
          seeMoreBtn.textContent = 'See More';
        }
      });
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // Get the current URL path
  const path = window.location.pathname;

  // Extract the project identifier (e.g., "project-2")
  const projectMatch = path.match(/project-(\d+)/);

  // If the URL contains "project-X", redirect to "projects/project-X"
  if (projectMatch) {
    const projectId = projectMatch[0]; // e.g., "project-2"
    window.location.href = `./projects/${projectId}`;
  }
});
document.addEventListener('DOMContentLoaded', function () {
  const toggleNameBtn = document.querySelector('.toggle-name-btn');
  const firstName = document.querySelector('.first-name');
  const fullName = document.querySelector('.full-name');

  toggleNameBtn.addEventListener('click', function () {
    if (fullName.style.display === 'none') {
      fullName.style.display = 'inline';
      firstName.style.display = 'none';
      toggleNameBtn.textContent = 'Show First Name';
    } else {
      fullName.style.display = 'none';
      firstName.style.display = 'inline';
      toggleNameBtn.textContent = 'Show Full Name';
    }
  });
});