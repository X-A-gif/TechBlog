const signup = async (event) => {
    event.preventDefault();

    const usernameEl = document.querySelector('#name-signup').value.trim();
    const emailEl = document.querySelector('#email-signup').value.trim();
    const passwordEl = document.querySelector('#password-signup').value.trim();
       
    if (usernameEl && emailEl && passwordEl) {
            console.log("randomshit");
            const response = await fetch('/api/user/', {
                method: 'POST',
                body: JSON.stringify({ username: usernameEl, email: emailEl, password: passwordEl }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                console.log('asdasdsad');
            }
            else {
                alert(response.statusText);
            }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signup);

