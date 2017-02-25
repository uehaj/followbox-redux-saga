export async function getNewUsers() {
  const randomOffset = Math.floor(Math.random()*500);
  const url = 'https://api.github.com/users?since=' + randomOffset;

  const resp = await fetch(url, { method: 'GET' });
  const json = await resp.json();

  return resp.ok ? Promise.resolve(json) : Promise.reject(resp);
}
