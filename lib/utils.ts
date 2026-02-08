import { customAlphabet } from 'nanoid';

// Generate a URL-safe ID
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10);

export function generatePublicId(): string {
  return nanoid();
}
