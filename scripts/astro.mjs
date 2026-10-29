// Runs an Astro command for one or all sites:
//   node scripts/astro.mjs <dev|build|preview> <hub|sport|mototechna|all>
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ALL = ['hub', 'sport', 'mototechna'];
const [command, target] = process.argv.slice(2);

if (!['dev', 'build', 'preview'].includes(command) || !(target === 'all' || ALL.includes(target))) {
  console.error('Usage: node scripts/astro.mjs <dev|build|preview> <hub|sport|mototechna|all>');
  process.exit(1);
}
if (target === 'all' && command !== 'build') {
  console.error('"all" works only with build – run dev/preview for one site at a time.');
  process.exit(1);
}

const astroBin = fileURLToPath(new URL('../node_modules/astro/bin/astro.mjs', import.meta.url));

for (const site of target === 'all' ? ALL : [target]) {
  console.log(`\n▶ astro ${command} – ${site}\n`);
  const result = spawnSync(process.execPath, [astroBin, command], {
    stdio: 'inherit',
    env: { ...process.env, PELETON_SITE: site },
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
