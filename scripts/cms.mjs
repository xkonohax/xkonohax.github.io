import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);
const packagePath = require.resolve('decap-server/package.json');
const pkg = require(packagePath);
const bin = typeof pkg.bin === 'string' ? pkg.bin : Object.values(pkg.bin)[0];
const child = spawn(process.execPath, [resolve(dirname(packagePath), bin)], {
  cwd: root,
  stdio: 'inherit',
  windowsHide: true,
  env: { ...process.env, PORT: '8081', BIND_HOST: '127.0.0.1' },
});
child.on('error', error => { console.error(error.message); process.exitCode = 1; });
child.on('exit', code => { process.exitCode = code ?? 0; });
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
