"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    serverHost: (_a = process.env.WEBSITE_HOSTNAME) !== null && _a !== void 0 ? _a : '127.0.0.1',
    port: (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 5059,
    databaseEnv: (_c = process.env.DB_ENV) !== null && _c !== void 0 ? _c : 'dev',
    jwtSecrets: {
        secretDefault: 'efd112ef60538d1360dfe26722eeb2c2'
    }
};
//# sourceMappingURL=env.js.map