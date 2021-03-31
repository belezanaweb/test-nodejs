import { DynamicModule } from '@nestjs/common';
import loaderUtils from '../shared/utils/loader.utils';

export function loadModules(pathDir: string = __dirname): DynamicModule[] {
  return loaderUtils(pathDir, 'module');
}
