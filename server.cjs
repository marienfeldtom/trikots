async function loadApp() {
    await import('./build/index.js'); // Uses the build output from SvelteKit
}

loadApp();
