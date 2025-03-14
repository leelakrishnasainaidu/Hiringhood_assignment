const users = JSON.parse(localStorage.getItem('users') || '[]');

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorMessage.textContent = "Invalid email format";
        return;
    }
    if (password.length < 6) {
        errorMessage.textContent = "Password must be at least 6 characters long";
        return;
    }


    const button = event.submitter;
    const ripple = button.querySelector('.ripple');


    if (ripple) {
        ripple.remove();
    }


    const circle = document.createElement('div');
    circle.classList.add('ripple');
    button.appendChild(circle);


    button.disabled = true;
    button.querySelector('span').textContent = 'Signing in...';

    setTimeout(() => {
        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));
        console.log("Registered Users:", users);

        const originalText = button.querySelector('span').textContent;
        button.querySelector('span').textContent = 'Success!';
        button.style.background = '#10B981';

        setTimeout(() => {
            alert("Login successful! User added.");
            document.getElementById("loginForm").reset();
            button.disabled = false;
            button.querySelector('span').textContent = 'Sign In';
            button.style.background = '';
        }, 1000);
    }, 1500);
});

console.log("Existing Users:", users);