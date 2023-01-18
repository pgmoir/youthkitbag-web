import { getImages } from '../image';

describe('image tests', () => {
  test('null return when undefined passed to images', () => {
    const result = getImages(undefined);

    expect(result).toBeNull();
  });
});
