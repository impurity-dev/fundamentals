const command = new Deno.Command('git', {
    args: ['config', 'core.hooksPath', '.githooks'],
});
const { code } = await command.output();
if (code === 0) {
    console.log('✅ Git hooks path set to .githooks');
} else {
    console.error('❌ Failed to set git hooks path');
}
