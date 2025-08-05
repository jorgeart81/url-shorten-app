export async function getTitleFromUrl(url: string): Promise<string | null> {
  const response = await fetch(url);
  const html = await response.text();
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.querySelector('title')?.textContent ?? null;
}