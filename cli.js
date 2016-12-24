#!/usr/bin/env node

const chalk = require('chalk');
const kHash = require('kevoree-hash');

try {
	console.log(kHash(process.cwd()));
} catch (err) {
	if (err.code === 'ENOENT') {
		console.log(chalk.red('Error:') + ' unable to find ' + chalk.yellow('package.json') + ' in current directory');
	} else {
		throw err;
	}
}
