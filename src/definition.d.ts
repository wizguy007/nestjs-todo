export interface IObjectInterface {
	[key: string]: string | any;
}

export interface IResponse {
	status: boolean;
	message: string;
	data?: IObjectInterface[] | IObjectInterface | any;
}
