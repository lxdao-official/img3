import { SandpackFiles } from '@codesandbox/sandpack-react';

export const getFilesDependencies = (files: SandpackFiles) => {
  let modules: string[] = [];

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

    const imports = fileCode.match(/import\s*.*\s*from\s+('|"|`).*('|"|`);?/g);
    if (imports) {
      imports.forEach((imp) => {
        const dependency = imp.match(/('|"|`).*('|"|`)/g);
        if (dependency) {
          modules.push(dependency[0].replace(/('|"|`)/g, ''));
        }
      });
    }
  }

  const dependencies: Record<string, string> = {};

  modules = modules
    .filter((dep) => dep !== 'react' && dep !== 'react-dom')
    .filter((dep) => !dep.startsWith('./') && !dep.startsWith('../'));

  modules.forEach((dep) => {
    dependencies[dep] = 'latest';
  });

  return dependencies;
};
