// Functions for validating authentication inputs

// Checks that username has 3 to 16 characters
export const validateUsername = (username: string): boolean => {
  return /^[a-z0-9_-]{3,16}$/.test(username);
};

export const validateEmail = (email: string): boolean => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

// Checks that password has 8 characters with at least 1 uppercase letter and number
export const validatePassword = (password: string): boolean => {
  return /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/i.test(
    password
  );
};

// Checks that code has 6 digits
export const validateCode = (code: string): boolean => {
  return /^\d{6}$/gm.test(code);
};
