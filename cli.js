#!/usr/bin/env node

const path = require('path');
const chalk = require('chalk');
const pkgHash = require('pkg-hash');
const kHash = require('kevoree-hash');

try {
	const pkg = require(path.join(process.cwd(), 'package.json'));
	pkgHash(process.cwd(), function (err, hash) {
		if (err) {
			console.log(chalk.red('Error:') + err.message);
			process.exit(1);
		} else {
			if (pkg.kevoree && pkg.kevoree.namespace) {
				console.log(kHash(hash, pkg.kevoree.namespace, pkg.name, pkg.version, pkg.dependencies || {}));
			} else {
				console.log(chalk.red('Error:') + ' unable to find ' + chalk.yellow('kevoree.namespace') + ' in current ' + chalk.yellow('package.json'));
			}
		}
	});
} catch (err) {
	if (err.code === 'ENOENT') {
		console.log(chalk.red('Error:') + ' unable to find ' + chalk.yellow('package.json') + ' in current directory');
	} else {
		throw err;
	}
}
