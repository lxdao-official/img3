import { file2base64 } from './file2base64';

describe('src/file2base64.ts', function () {
  it('should return base64', function () {
    const blob = new Blob(['hello world'], { type: 'text/plain' });
    const file = new File([blob], 'hello.txt', { type: 'text/plain' });

    return file2base64(file).then((base64) => {
      expect(base64).toBe('data:text/plain;base64,aGVsbG8gd29ybGQ=');
    });
  });
});
