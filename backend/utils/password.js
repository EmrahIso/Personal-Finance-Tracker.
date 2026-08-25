import bcrypt from 'bcryptjs';

async function generatePassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  } catch (error) {
    console.error('Error generating password hash', error);
    throw error;
  }
}

async function validatePassword(password, passwordHash) {
  try {
    const isValid = await bcrypt.compare(password, passwordHash);

    return isValid;
  } catch (error) {
    console.error('Error validating password hash', error);
    throw error;
  }
}

export { generatePassword, validatePassword };
