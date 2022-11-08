import 'jest-preset-angular/setup-jest';

declare let require: any;
// eslint-disable-next-line no-var
var crypto = require('crypto');

Object.defineProperty(globalThis.self, 'crypto', {
    value: {
        getRandomValues: (arr: any) => crypto.randomBytes(arr.length)
    }
});
