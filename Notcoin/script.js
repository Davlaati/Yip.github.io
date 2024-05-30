const apiUrl = 'http://localhost:3000'; // Your server URL

function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    }).then(response => {
        if (response.ok) {
            alert('Ro\'yxatdan o\'tish muvaffaqiyatli bo\'ldi');
        } else {
            alert('Ro\'yxatdan o\'tishda xatolik yuz berdi');
        }
    });
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    }).then(response => response.json())
      .then(data => {
          if (data.token) {
              localStorage.setItem('token', data.token);
              document.getElementById('user-section').style.display = 'none';
              document.getElementById('mining-section').style.display = 'block';
              loadLeaderboard();
          } else {
              alert('Kirishda xatolik yuz berdi');
          }
      });
}

function mineNotcoins() {
    const token = localStorage.getItem('token');

    fetch(`${apiUrl}/mine`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json())
      .then(data => {
          document.getElementById('notcoin-count').textContent = data.notcoins;
          loadLeaderboard();
      });
}

function loadLeaderboard() {
    fetch(`${apiUrl}/leaderboard`)
        .then(response => response.json())
        .then(data => {
            const leaderboard = document.getElementById('leaderboard');
            leaderboard.innerHTML = '';
            data.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.username}: ${user.notcoins}`;
                leaderboard.appendChild(li);
            });
        });
}

document.addEventListener('DOMContentLoaded', loadLeaderboard);