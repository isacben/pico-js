const esbuild = require( 'esbuild' );
const fs = require( 'fs' );

/** 
 * PICO-JS Build Script
 * - Combine input files
 * - Run custom build steps
 * - Check for errors
 * - Output to build folder
 */

const ENGINE_NAME = 'pico-js';
const BUILD_FOLDER = 'dist';
const EXAMPLES_DIRECTORY = 'examples';
const SOURCE_FOLDER = 'src';
const engineSourceFiles = [
    `${SOURCE_FOLDER}/engineInput.js`,
    `${SOURCE_FOLDER}/engineFont.js`,
    `${SOURCE_FOLDER}/engineMenu.js`,
    `${SOURCE_FOLDER}/engineDraw.js`,
    `${SOURCE_FOLDER}/engineApi.js`,
    `${SOURCE_FOLDER}/engine.js`,
];
const license = '// PICO-JS - MIT License - Copyright 2025 Isaac Benitez\n'

const startTime = Date.now();

try
{
    // Setup build folder
    fs.rmSync( BUILD_FOLDER, { recursive: true, force: true } );
    fs.mkdirSync( BUILD_FOLDER );
}
catch (e) {
    console.error( e );
    console.error( 'Failed to create build folder!' );
    process.exit( 1 );
}

esbuild.build( {
	// entryPoints: ['./src/engine.js'],
	entryPoints: ['./index.js'],
	bundle: true,
	outfile: `${BUILD_FOLDER}/${ENGINE_NAME}.release.js`,
	// drop: [ 'console' ],
	// minify: true,
	loader: { '.png': 'dataurl' },
} ).then( () => {
    // Do stuff after the bundle is built.

    // TODO: Add license at the top
    fs.copyFileSync( `${BUILD_FOLDER}/${ENGINE_NAME}.release.js`, `${EXAMPLES_DIRECTORY}/${ENGINE_NAME}.release.js` );

    console.log(`Engine built in ${((Date.now() - startTime)/1e3).toFixed(2)} seconds!`);
} );
