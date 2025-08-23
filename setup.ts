const p = Deno.run({
    cmd: ['git', 'config', 'core.hooksPath', '.githooks'],
});
const status = await p.status();
if (status.success) {
    console.log('✅ Git hooks path set to .githooks');
} else {
    console.error('❌ Failed to set git hooks path');
}
p.close();
