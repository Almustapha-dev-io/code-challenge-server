import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const getHash = async ({
  s,
  rounds = 10,
}: {
  s: string;
  rounds?: number;
}) => {
  const salt = await bcrypt.genSalt(rounds);
  const hash = await bcrypt.hash(s, salt);
  return hash;
};

export const validateString = async (s: string, hash: string) => {
  return await bcrypt.compare(s, hash);
};

export const getHMACMD5Hash = (s: string, secret: string) => {
  const hmac = crypto.createHmac('md5', secret);
  const data = hmac.update(s);
  return data.digest('base64');
};
