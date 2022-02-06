"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_alias_1 = require("module-alias");
const path_1 = require("path");
(0, module_alias_1.addAlias)('@', (0, path_1.resolve)(process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'));
//# sourceMappingURL=module-alias.js.map