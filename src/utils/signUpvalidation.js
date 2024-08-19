export const validateName = (nameType, name) => {
  if (typeof name !== "string" || name.length < 2 || name.length > 25) {
    return `${nameType} should be a string with a minimum length of 2 and a maximum length of 25`;
  }
  return "";
};

export const validatePassword = (password) => {
  if (typeof password !== "string") {
    return "Password must be a string";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return "Password must contain at least one special character";
  }
  return "";
};
