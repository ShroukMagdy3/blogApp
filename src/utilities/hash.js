import bcrypt from "bcrypt";

export const Hash = async (
  plainText,
  SALT_ROUNDS = process.env.SALT_ROUNDS
) => {
  return bcrypt.hash(plainText, Number(SALT_ROUNDS));
};


export const compare = async (plainText, cipherText) => {
  return bcrypt.compareSync(plainText, cipherText);
}


