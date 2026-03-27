import { isPhoto, Photo } from './photo.model';

describe('isPhoto', () => {
  const valid: Photo = { id: '1', url: 'https://example.com/img.jpg', width: 200, height: 300, author: 'Author' };

  it('returns true for a valid Photo object', () => {
    expect(isPhoto(valid)).toBe(true);
  });

  it('returns false for null', () => {
    expect(isPhoto(null)).toBe(false);
  });

  it('returns false for a non-object', () => {
    expect(isPhoto('string')).toBe(false);
    expect(isPhoto(42)).toBe(false);
  });

  it('returns false when id is missing', () => {
    const { id: _id, ...rest } = valid;
    expect(isPhoto(rest)).toBe(false);
  });

  it('returns false when url is missing', () => {
    const { url: _url, ...rest } = valid;
    expect(isPhoto(rest)).toBe(false);
  });

  it('returns false when width is not a number', () => {
    expect(isPhoto({ ...valid, width: '200' })).toBe(false);
  });

  it('returns false when height is not a number', () => {
    expect(isPhoto({ ...valid, height: null })).toBe(false);
  });

  it('returns false when author is missing', () => {
    const { author: _author, ...rest } = valid;
    expect(isPhoto(rest)).toBe(false);
  });
});
