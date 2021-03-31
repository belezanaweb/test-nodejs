import { DynamicModule } from '@nestjs/common';
import * as path from 'path';
import { Dirent, readdirSync } from 'fs';

function convertToDynamicModule(pathDir, dir, file): DynamicModule {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(path.join(pathDir, dir, file)) as DynamicModule;
}

function getModuleFiles(files: string[], patternFile: string) {
  return files.filter(
    (file) =>
      file.endsWith(`${patternFile}.js`) || file.endsWith(`${patternFile}.ts`),
  );
}

function getDirectories(dirPath: string): Dirent[] {
  return readdirSync(dirPath, { withFileTypes: true }).filter((file: Dirent) =>
    file.isDirectory(),
  );
}

export default function loaderUtils(pathDir: string, patternFile: string) {
  return getDirectories(pathDir)
    .map(({ name: dir }: { name: string }) => ({
      dir,
      files: readdirSync(path.join(pathDir, dir)),
    }))
    .map(({ files, dir }: { files: string[]; dir: string }) => ({
      dir,
      files: getModuleFiles(files, patternFile),
    }))
    .map(({ files, dir }: { files: string[]; dir: string }) =>
      files.map((file) => convertToDynamicModule(pathDir, dir, file)),
    )
    .filter((module) => module.length)
    .map((module) => Object.values(module[0]))
    .reduce((acc, cur) => acc.concat(cur), []);
}
