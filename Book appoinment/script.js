// script.js

const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');

// Function to fetch and display the list of users
async function fetchAndDisplayUsers() {
  try {
    const response = await axios.get('/api/users');
    const users = response.data;
    userList.innerHTML = ''; // Clear the existing list before rendering

    users.forEach(user => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <span>${user.username}, ${user.email}, ${user.phone}</span>
        <button onclick="editUser(${user.id})">Edit</button>
        <button onclick="deleteUser(${user.id})">Delete</button>
      `;
      userList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to handle form submission
userForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  try {
    const response = await axios.post('/api/users', { username, email, phone });
    console.log('User registered:', response.data);
    userForm.reset(); // Reset the form fields
    fetchAndDisplayUsers(); // Refresh the user list
  } catch (error) {
    console.error('Error:', error);
  }
});

// Function to edit a user
async function editUser(userId) {
  // Implement edit functionality here
  console.log('Edit user:', userId);
}

// Function to delete a user
async function deleteUser(userId) {
  try {
    const response = await axios.delete(`/api/users/${userId}`);
    console.log('User deleted:', response.data);
    fetchAndDisplayUsers(); // Refresh the user list
  } catch (error) {
    console.error('Error:', error);
  }
}

// Fetch and display the list of users when the page loads
fetchAndDisplayUsers();
