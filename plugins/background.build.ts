export function bundleBackground() {

    require('esbuild').buildSync({
        entryPoints: ['src/background.ts'],
        bundle: true,
        outfile: 'dist/background.js',
        platform: 'node',
        target: 'node16',
        external: ['electron'],
    });
    
}