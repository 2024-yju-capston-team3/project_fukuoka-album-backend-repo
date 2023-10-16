interface CustomResponse {
	statusCode: number;
	message: string;
	data?: {};
}

export const OK = (message: string = "OK", data?: {}): CustomResponse => ({
	statusCode: 200,
	message,
	data,
});

export const Created = (
	message: string = "Created",
	data?: {}
): CustomResponse => ({
	statusCode: 201,
	message,
	data,
});
