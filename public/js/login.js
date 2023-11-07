document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
      console.info('DOM loaded');
    }
  
    // SUBMIT LOGIN FORM
    const loginFormHandler = async (event) => {
      event.preventDefault();
  
      // Collect values from the login form
      const email = document.querySelector('#email-login').value.trim();
      const password = document.querySelector('#password-login').value.trim();
  
      // If both fields have content
      if (email && password) {
        // Post the email and password to the server
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          // If successful, redirect the browser to the dashboard page
          document.location.replace('/dashboard');
        } else {
          alert('Failed to log in.');
        }
      }
    };
  
    // Add event listener to form for submit action
    document
      .querySelector('.login-form')
      .addEventListener('submit', loginFormHandler);
  });
  