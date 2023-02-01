import { SandpackFiles } from '@codesandbox/sandpack-react';
import { transformSync } from '@swc/wasm-web';
function replaceImport(code: string) {
  // remove all import statements
  return code.replace(/import\s*.*\s*from\s+('|"|`).*('|"|`);?/g, '');
}

function replaceExport(code: string) {
  // remove all export statements
  return code.replace(/export\s*(default\s*)?/g, '');
}

export const files2code = async (files: SandpackFiles) => {
  const code: string[] = [];

  const fileNames = Object.keys(files);

  for (let i = 0; i < fileNames.length; i++) {
    const fileName = fileNames[i];
    const file = files[fileName];
    let fileCode = '';
    if (typeof file === 'string') {
      fileCode = file;
    } else {
      fileCode = file.code;
    }

    if (/\.tsx?$/.test(fileName)) {
      const result = transformSync(fileCode, {
        filename: fileName,
        jsc: { parser: { syntax: 'typescript', tsx: true } },
      });
      fileCode = result.code;
    }

    fileCode = replaceImport(fileCode);
    fileCode = replaceExport(fileCode);

    code.push(fileCode);
  }

  code.push('render(<App />)');

  return code.join('\n');
};
