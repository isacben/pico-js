#!/usr/bin/env node

/** 
 * PICO-JS Build Script
 * - Combine input files
 * - Run custom build steps
 * - Check for errors
 * - Output to build folder
 */

'use strict';

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
const fs = require('node:fs');
const child_process = require('node:child_process');

try
{
    // Setup build folder
    fs.rmSync(BUILD_FOLDER, { recursive: true, force: true });
    fs.mkdirSync(BUILD_FOLDER);
}
catch (e) { handleError(e, 'Failed to create build folder!'); }

Build
(
    'Build Engine -- release',
    `${BUILD_FOLDER}/${ENGINE_NAME}.release.js`,
    [...engineSourceFiles],
    [], true
);
fs.copyFileSync( `${BUILD_FOLDER}/${ENGINE_NAME}.release.js`, `${EXAMPLES_DIRECTORY}/${ENGINE_NAME}.release.js` );

console.log(`Engine built in ${((Date.now() - startTime)/1e3).toFixed(2)} seconds!`);

///////////////////////////////////////////////////////////////////////////////

// A single build with its own source files, build steps, and output file
// - each build step is a callback that accepts a single filename
function Build(message, outputFile, files=[], buildSteps=[], isPrimaryBuild)
{
    console.log(message);

    // copy files into a buffer
    let buffer = '';
    if (isPrimaryBuild)
    {
        // add license and strict mode to top
        buffer += license + '\n';
        buffer += "'use strict';\n\n";
    }

    for (const file of files)
    {
        // get file content
        let fileContent = fs.readFileSync(file) + '\n';

        // remove first 'use strict' from each file
        if (isPrimaryBuild)
            fileContent = fileContent.replace("'use strict';", '');

        // add it to the buffer
        buffer += fileContent;
    }

    // output file
    fs.writeFileSync(outputFile, buffer, {flag: 'w+'});

    // execute build steps in order
    for (const buildStep of buildSteps)
        buildStep(outputFile);
}

// display the error and exit
function handleError(e,message)
{
    console.error(e);
    console.error(message);
    process.exit(1);
}