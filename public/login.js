const login = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    if (!email || !password) {
        alert('Please enter a valid email and password');
        return;
    }
    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    }
    else {
        alert(response.statusText);
    }
};

document.querySelector('.login-form').addEventListener('submit', login);
