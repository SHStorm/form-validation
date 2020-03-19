const $form = document.getElementById('form');

$form.setAttribute('novalidate', true.toString());

$form.addEventListener('submit', event => {
    event.preventDefault();

    validate();
});

const validationConfig = {
    'username': validateUsername,
    'email': validateEmail,
    'password': validatePassword,
    'password-confirmation': validatePasswordConfirmation
};

function validate() {
    const formData = new FormData($form);

    Object.entries(validationConfig).forEach(([field, validator]) => {
        validateField(field, value => validator(value, formData));
    });
}

function validateField(field, validator) {
    const $field = $form.elements.namedItem(field);
    const value = $field.value;

    const errorMessage = validator(value);
    if (!errorMessage) {
        $field.classList.add('valid');
        $field.classList.remove('invalid');
    } else {
        $field.classList.add('invalid');
        $field.classList.remove('valid');

        $field.nextElementSibling.textContent = errorMessage;
    }
}

function validateUsername(username) {
    if (username.trim() === '') {
        return 'Username is required!'
    } else if (username.length < 3) {
        return 'Username must include at least 3 characters';
    } else if (username.length > 15) {
        return 'Username can include 15 characters at most';
    }

    return null;
}

function validateEmail(email) {
    if (email.trim() === '') {
        return 'Email is required!'
    }

    const emailRegexp = /.+@.+\..+/;
    if (!emailRegexp.test(email)) {
        return 'Email is not valid';
    }

    return null;
}

function validatePassword(password) {
    if (password.trim() === '') {
        return 'Password is required!';
    } else if (password.length < 6) {
        return 'Password must include at least 6 characters';
    }

    return null;
}

function validatePasswordConfirmation(passwordConfirmation, formData) {
    if (passwordConfirmation.trim() === '') {
        return 'Password confirmation is required!';
    }

    if (passwordConfirmation === '' || passwordConfirmation !== formData.get('password')) {
        return 'Passwords must match';
    }

    return null;
}
