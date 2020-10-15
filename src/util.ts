import { getInput, InputOptions } from '@actions/core';

export interface UpdaterOptions {
	branch: string;
	token: string;
	message: string;
}

export function getBooleanInput(name: string, options?: InputOptions): boolean {
	const value = getInput(name, options).toLowerCase();

	if (value === 'true') {
		return true;
	}
	if (value === 'false') {
		return false;
	}

	throw new Error(`Invalid input: ${value}`);
}

export function getUpdaterOptions(): UpdaterOptions {
	const token = getInput('github-token', { required: true });
	const message = getInput('commit-msg', { required: true });
	const branch = getInput('branch');

	return { token, message, branch };
}

export function isNotNull<T>(arg: T): arg is Exclude<T, null> {
	return arg !== null;
}
