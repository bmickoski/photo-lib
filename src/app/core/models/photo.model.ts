export interface Photo {
  id: string;
  url: string;
  width: number;
  height: number;
  author: string;
}

export function isPhoto(value: unknown): value is Photo {
  if (!value || typeof value !== 'object') return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj['id'] === 'string' &&
    typeof obj['url'] === 'string' &&
    typeof obj['width'] === 'number' &&
    typeof obj['height'] === 'number' &&
    typeof obj['author'] === 'string'
  );
}
