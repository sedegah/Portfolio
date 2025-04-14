// Function to toggle dark mode
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');

  const button = document.getElementById('toggle-dark-mode');
  if (body.classList.contains('dark-mode')) {
    button.innerHTML = '☀️'; // Change to sun icon when in dark mode
    button.setAttribute('aria-label', 'Switch to Light Mode');
  } else {
    button.innerHTML = '🌙'; // Change to moon icon when in light mode
    button.setAttribute('aria-label', 'Switch to Dark Mode');
  }
}

// Set dark mode as default
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  body.classList.add('dark-mode'); // Enable dark mode by default

  const button = document.getElementById('toggle-dark-mode');
  button.addEventListener('click', toggleDarkMode);
});