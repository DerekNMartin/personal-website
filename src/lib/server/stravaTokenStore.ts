import fs from 'fs/promises';
const TOKEN_PATH = 'src/lib/server/strava-tokens.json';

export async function readTokens() {
  const data = await fs.readFile(TOKEN_PATH, 'utf-8');
  return JSON.parse(data);
}

export async function writeTokens(tokens: {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}) {
  await fs.writeFile(TOKEN_PATH, JSON.stringify(tokens, null, 2));
}
