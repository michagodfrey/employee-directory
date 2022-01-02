let employees = [];
const urlAPI = 'https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US';
const container = document.querySelector('.flex-container');
const overlay = document.querySelector('.overlay');
const modalContent = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
const card = document.querySelector('.card');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

// data is provided by Random User https://randomuser.me/
fetch(urlAPI)
  .then(res => res.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => console.log(err));

  // ------------------------------------------
  //  HELPER FUNCTIONS
  // ------------------------------------------

  function displayEmployees(employeeData) {

    employees = employeeData;

    let employeeHTML = '';

    employees.forEach((employee, index) => {
      let name = employee.name;
      let email = employee.email;
      let city = employee.location.city;
      let picture = employee.picture;

      employeeHTML += `
        <div class="card" data-index="${index}">
          <img class="profile-image" src="${picture.large}" />
          <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
          </div>
        </div>
      `;
    });

    container.innerHTML = employeeHTML;
  }

  function displayModal(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index];

    let date = new Date(dob.date);
    let number = street.number;
    let streetName = street.name;

    const modalHTML = `
      <img class="profile-image-modal" src="${picture.large}" />
      <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr />
        <p>${phone}</p>
        <p class="address">${number} ${streetName}, ${city}</p>
        <p>${state} ${postcode}</p>
        <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;

    overlay.classList.remove('hidden');
    modalContent.innerHTML = modalHTML;
  }

  // ------------------------------------------
  //  EVENT LISTENERS
  // ------------------------------------------

  container.addEventListener('click', e => {

    if (e.target !== container) {
      const card = e.target.closest('.card');
      const index = card.getAttribute('data-index');

      displayModal(index);
    }
  });

  modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
  });
