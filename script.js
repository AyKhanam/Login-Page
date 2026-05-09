// Form validation and interaction
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const loginBtn = document.querySelector('.login-btn');

    // Real-time validation
    usernameInput.addEventListener('blur', validateUsername);
    passwordInput.addEventListener('blur', validatePassword);

    // Clear errors on focus
    usernameInput.addEventListener('focus', () => hideError(usernameError));
    passwordInput.addEventListener('focus', () => hideError(passwordError));

    // Form submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const isUsernameValid = validateUsername();
        const isPasswordValid = validatePassword();

        if (isUsernameValid && isPasswordValid) {
            // Simulate login process
            loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
            loginBtn.disabled = true;

            // Simulate API call delay
            setTimeout(() => {
                // Here you would typically send the data to a server
                alert('Login successful! Welcome back!');
                loginForm.reset();
                loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
                loginBtn.disabled = false;
            }, 2000);
        }
    });

    function validateUsername() {
        const username = usernameInput.value.trim();
        if (username === '') {
            showError(usernameError, 'Username or email is required');
            return false;
        } else if (!isValidEmail(username) && username.length < 3) {
            showError(usernameError, 'Please enter a valid username or email');
            return false;
        }
        hideError(usernameError);
        return true;
    }

    function validatePassword() {
        const password = passwordInput.value;
        if (password === '') {
            showError(passwordError, 'Password is required');
            return false;
        } else if (password.length < 6) {
            showError(passwordError, 'Password must be at least 6 characters long');
            return false;
        }
        hideError(passwordError);
        return true;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
        element.style.animation = 'shake 0.5s ease-in-out';
    }

    function hideError(element) {
        element.style.display = 'none';
        element.textContent = '';
    }

    // Add shake animation for errors
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);

    // Password visibility toggle (optional enhancement)
    const passwordGroup = document.querySelector('.form-group:nth-child(2)');
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
    toggleBtn.className = 'password-toggle';
    toggleBtn.style.cssText = `
        position: absolute;
        right: 15px;
        top: 38px;
        background: none;
        border: none;
        color: #667eea;
        cursor: pointer;
        font-size: 1rem;
        transition: color 0.3s ease;
    `;
    passwordGroup.style.position = 'relative';
    passwordGroup.appendChild(toggleBtn);

    toggleBtn.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
        } else {
            passwordInput.type = 'password';
            toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
        }
    });

    toggleBtn.addEventListener('mouseenter', () => toggleBtn.style.color = '#764ba2');
    toggleBtn.addEventListener('mouseleave', () => toggleBtn.style.color = '#667eea');
});