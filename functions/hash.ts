import crypto from "crypto";

const generateHash = (password: string) => {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
};

const verifyHash = (password: string, hash: string) => {
  const hashedInput = generateHash(password);
  return hashedInput === hash;
};

export { generateHash, verifyHash };
