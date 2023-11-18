import { file2base64 } from './file2base64';

function decodeBase64(base64: string) {
  const str = base64.replace(/^data:image\/([^;]+);base64,/, '');
  return Buffer.from(str, 'base64').toString('utf-8');
}

describe('src/file2base64.ts', function () {
  it('should return base64', function () {
    const blob = new Blob(['hello world'], { type: 'text/plain' });
    const file = new File([blob], 'hello.txt', { type: 'text/plain' });

    return file2base64(file).then((base64) => {
      expect(base64).toBe('data:text/plain;base64,' + Buffer.from('hello world').toString('base64'));
    });
  });

  it('should support svg', () => {
    const svg = `<svg t="1700280458957" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1030" width="200" height="200"><path d="M512 85.333333a426.666667 426.666667 0 1 0 0 853.333334 426.666667 426.666667 0 0 0 0-853.333334z m0 768a341.333333 341.333333 0 1 1 0-682.709333A341.333333 341.333333 0 0 1 512 853.333333zM426.666667 384a42.666667 42.666667 0 1 0-85.333334 0 42.666667 42.666667 0 0 0 85.333334 0z m213.333333-42.666667a42.666667 42.666667 0 1 0 0 85.333334 42.666667 42.666667 0 0 0 0-85.333334z m-128 128a144.64 144.64 0 0 0-138.666667 149.333334A144.64 144.64 0 0 0 512 768a144.64 144.64 0 0 0 138.666667-149.333333A144.64 144.64 0 0 0 512 469.333333z m0 213.333334a59.306667 59.306667 0 0 1-53.333333-64A59.306667 59.306667 0 0 1 512 554.666667a59.306667 59.306667 0 0 1 53.333333 64A59.306667 59.306667 0 0 1 512 682.666667z" fill="#000000" p-id="1031"></path></svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const file = new File([blob], 'hello.svg', { type: 'image/svg+xml' });

    const svgBase64 = 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64');

    return file2base64(file).then((base64) => {
      expect(base64).toBe(svgBase64);
    });
  });
});
