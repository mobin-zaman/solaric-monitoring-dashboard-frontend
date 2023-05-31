import { createHash } from "crypto";

// Hash function using SHA-256 algorithm
const hash = (password) => {
  const hashFunction = createHash("sha256");
  hashFunction.update(password);
  return hashFunction.digest("hex");
};

export default hash;