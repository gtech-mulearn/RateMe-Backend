const apiUrl = "http://localhost:3000";

function showRegister() {
  document.getElementById("login").style.display = "none";
  document.getElementById("register").style.display = "block";
}

function showLogin() {
  document.getElementById("login").style.display = "block";
  document.getElementById("register").style.display = "none";
}

function showDashboard() {
  document.getElementById("dashboard").style.display = "block";
  document.getElementById("profile").style.display = "none";
}

function showProfile() {
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("profile").style.display = "block";
}

function register() {
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;

  fetch(`${apiUrl}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      showLogin();
    });
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("token", data.token);
      showDashboard();
      fetchUsers();
    });
}

function logout() {
  localStorage.removeItem("token");
  showLogin();
}

function fetchUsers() {
  fetch(`${apiUrl}/users/list`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  })
    .then((response) => response.json())
    .then((users) => {
      const usersList = document.getElementById("usersList");
      usersList.innerHTML = "";
      users.forEach((user) => {
        const userDiv = document.createElement("div");
        userDiv.innerHTML = `
                <p>${user.username} - ${user.averageRating}</p>
                <button onclick="viewProfile('${user._id}')">View Profile</button>
            `;
        usersList.appendChild(userDiv);
      });
    });
}

function viewProfile(userId) {
  showProfile();

  fetch(`${apiUrl}/users/profile/${userId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  })
    .then((response) => response.json())
    .then((user) => {
      const userProfile = document.getElementById("userProfile");
      userProfile.innerHTML = `<p>${user.username} - ${user.averageRating}</p>`;
    });

  // Ensure rateeId is passed correctly to submitRating function
  document.getElementById("submitRating").onclick = function () {
    submitRating(userId);
  };
}

function submitRating(rateeId) {
  const rating = document.getElementById("rating").value;
  const feedback = document.getElementById("feedback").value;

  fetch(`${apiUrl}/ratings/rate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rateeId, rating, feedback }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      showDashboard();
      fetchUsers();
    });
}
