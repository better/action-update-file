import { existsSync } from 'fs';

import { setFailed, setOutput, info, getInput } from '@actions/core';
import { create as createGlob } from '@actions/glob';

import { getUpdaterOptions, getBooleanInput } from './util';
import { Updater } from './update';

async function main(): Promise<void> {
	const options = getUpdaterOptions();

	const rawPaths = getInput('file-path');
	const isRemovingAllowed = getBooleanInput('allow-removing');

	const globber = await createGlob(rawPaths);
	const pathsToUpdate = await globber.glob();

	for (const path of pathsToUpdate) {
		const isLocalFileExists = existsSync(path);
		if (!isLocalFileExists && !isRemovingAllowed) {
			setFailed(`Removing remote ${path} is not allowed`);
			return;
		}
	}

	const updater = new Updater(options);
	try {
		const updateResult = await updater.updateFiles(pathsToUpdate);

		if (updateResult === null) {
			info('No files to update');
			return;
		}

		const { commitSha, branch } = updateResult;

		setOutput('commit-sha', commitSha);

		const shortSha = commitSha.slice(0, 7);
		info(`Pushed ${shortSha} to ${branch}`);
	} catch (err) {
		setFailed((err as Error).message);
	}
}

main();
