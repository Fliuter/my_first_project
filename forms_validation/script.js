const form = document.querySelector("#registration-form");

const fields = {
  name: document.querySelector("#name"),
  email: document.querySelector("#email"),
  phone: document.querySelector("#phone"),
  password: document.querySelector("#password"),
  confirmPassword: document.querySelector("#confirm-password"),
  agreement: document.querySelector("#agreement")
};

const messages = {
  name: document.querySelector("#name-error"),
  email: document.querySelector("#email-error"),
  phone: document.querySelector("#phone-error"),
  password: document.querySelector("#password-error"),
  confirmPassword: document.querySelector("#confirm-password-error"),
  agreement: document.querySelector("#agreement-error")
};

const successMessage = document.querySelector("#success-message");

function showError(field, messageElement, message) {
  messageElement.textContent = message;
  field.classList.add("invalid");
  field.classList.remove("valid");
  field.setAttribute("aria-invalid", "true");
}

function showValid(field, messageElement) {
  messageElement.textContent = "";
  field.classList.remove("invalid");
  field.classList.add("valid");
  field.removeAttribute("aria-invalid");
}

function validateName() {
  const value = fields.name.value.trim();
  if (value.length < 2) {
    showError(fields.name, messages.name, "Введите имя (минимум 2 символа).");
    return false;
  }
  showValid(fields.name, messages.name);
  return true;
}

function validateEmail() {
  if (!fields.email.validity.valid || !fields.email.value.trim()) {
    showError(fields.email, messages.email, "Введите корректный адрес электронной почты.");
    return false;
  }
  showValid(fields.email, messages.email);
  return true;
}

function validatePhone() {
  if (fields.phone.value.trim() && !fields.phone.validity.valid) {
    showError(fields.phone, messages.phone, "Проверьте формат номера телефона.");
    return false;
  }
  showValid(fields.phone, messages.phone);
  return true;
}

function validatePassword() {
  const value = fields.password.value;
  if (value.length < 8 || !/[A-Za-zА-Яа-яЁё]/.test(value) || !/[0-9]/.test(value)) {
    showError(fields.password, messages.password, "Пароль должен содержать не менее 8 символов, букву и цифру.");
    return false;
  }
  showValid(fields.password, messages.password);
  return true;
}

function validateConfirmPassword() {
  if (!fields.confirmPassword.value || fields.confirmPassword.value !== fields.password.value) {
    showError(fields.confirmPassword, messages.confirmPassword, "Пароли не совпадают.");
    return false;
  }
  showValid(fields.confirmPassword, messages.confirmPassword);
  return true;
}

function validateAgreement() {
  if (!fields.agreement.checked) {
    messages.agreement.textContent = "Необходимо принять условия.";
    fields.agreement.setAttribute("aria-invalid", "true");
    return false;
  }
  messages.agreement.textContent = "";
  fields.agreement.removeAttribute("aria-invalid");
  return true;
}

fields.name.addEventListener("input", validateName);
fields.email.addEventListener("input", validateEmail);
fields.phone.addEventListener("input", validatePhone);
fields.password.addEventListener("input", () => {
  validatePassword();
  if (fields.confirmPassword.value) validateConfirmPassword();
});
fields.confirmPassword.addEventListener("input", validateConfirmPassword);
fields.agreement.addEventListener("change", validateAgreement);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  successMessage.textContent = "";

  const isValid = [
    validateName(),
    validateEmail(),
    validatePhone(),
    validatePassword(),
    validateConfirmPassword(),
    validateAgreement()
  ].every(Boolean);

  if (isValid) {
    successMessage.textContent = "Форма заполнена правильно! Проверка пройдена.";
    form.reset();
    Object.values(fields).forEach((field) => {
      field.classList.remove("valid", "invalid");
      field.removeAttribute("aria-invalid");
    });
  }
});
