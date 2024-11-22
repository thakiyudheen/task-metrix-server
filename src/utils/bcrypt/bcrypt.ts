import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10; 

export const hashPassword = async (plainPassword:any) => {
  try {
    return await bcrypt.hash(plainPassword, SALT_ROUNDS);
  } catch (error) {
    throw new Error('Error hashing password');
  }
};


export const comparePassword = async (plainPassword:any, hashedPassword:any) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

