const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) {
  throw new Error('Environment variable NEXT_PUBLIC_API_URL is not set');
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL;