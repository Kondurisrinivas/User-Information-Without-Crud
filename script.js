document.getElementById('user-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var phone = document.getElementById('phone').value;

  var formData = {
    name: name,
    email: email,
    phone: phone
  };

  // Generate a unique key
  var uniqueKey = generateUniqueKey();

  // Save the form data with the unique key
  localStorage.setItem(uniqueKey, JSON.stringify(formData));

  // Display the stored user data
  displayData();

  // Clear the form input fields
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('phone').value = '';
});

function generateUniqueKey() {
  var timestamp = new Date().getTime(); // Generate a timestamp
  return "formData_" + timestamp;
}

function displayData() {
  var dataList = document.getElementById('data-list');
  dataList.innerHTML = ''; // Clear the existing list

  var hasAppointments = false; // Track if there are any appointments

  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (key.startsWith('formData_')) {
      var formData = JSON.parse(localStorage.getItem(key));

      var listItem = document.createElement('li');
      listItem.textContent = "Name: " + formData.name + ", Email: " + formData.email + ", Phone: " + formData.phone;

      var editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.dataset.key = key; // Set the key as a data attribute
      editButton.addEventListener('click', function(event) {
        var keyToEdit = event.target.dataset.key;
        editData(keyToEdit);
      });
      listItem.appendChild(editButton);

      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.dataset.key = key; // Set the key as a data attribute
      deleteButton.addEventListener('click', function(event) {
        var keyToDelete = event.target.dataset.key;
        deleteData(keyToDelete);
      });
      listItem.appendChild(deleteButton);

      dataList.appendChild(listItem);

      hasAppointments = true; // There is at least one appointment
    }
  }

  if (!hasAppointments) {
    var noAppointmentsMessage = document.createElement('li');
    noAppointmentsMessage.textContent = 'OOPS..!! Currently No Appointments to show';
    noAppointmentsMessage.classList.add('no-appointments'); // Add the CSS class
    dataList.appendChild(noAppointmentsMessage);
  }
}

function deleteData(key) {
  localStorage.removeItem(key);
  displayData();
}

function editData(key) {
  var formData = JSON.parse(localStorage.getItem(key));
  document.getElementById('name').value = formData.name;
  document.getElementById('email').value = formData.email;
  document.getElementById('phone').value = formData.phone;

  // Remove the data from local storage after editing
  localStorage.removeItem(key);
}

// Load and display the stored user data on page load
displayData();