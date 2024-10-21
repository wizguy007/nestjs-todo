import { IResponse } from 'src/definition';

export function convertMinutesToSeconds(minutes: number): number {
	return minutes * 60;
}

export function boolean(value: string | number | boolean | undefined): boolean {
	if (value === null || value === undefined) {
		return false;
	}
	if (typeof value === 'boolean') {
		return value;
	}
	if (['true', 'on', 'yes', '1'].includes(String(value).toLowerCase())) {
		return true;
	}
	if (['false', 'off', 'no', '0'].includes(String(value).toLowerCase())) {
		return false;
	}
	return false;
}

export const successRequestResponse = (message: string, data?: IResponse['data']): IResponse => {
	return {
		status: true,
		message,
		data,
	};
};
