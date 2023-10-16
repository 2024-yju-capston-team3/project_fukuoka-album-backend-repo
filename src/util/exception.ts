export class UnauthorizeException extends Error {
	status: number;
	message: string;
	constructor(message: string = "권한이 없습니다.") {
		super(message);
		this.status = 401;
		this.message = message;
	}
}
export class NotFoundException extends Error {
	status: number;
	message: string;

	constructor(message: string = "페이지를 찾을 수 없습니다.") {
		super(message);
		this.status = 404;
		this.message = message;
	}
}
export class GoneException extends Error {
	status: number;
	message: string;

	constructor(message: string = "자원이 사라졌습니다.") {
		super(message);
		this.status = 410;
		this.message = message;
	}
}

export class InternalServerErrorException extends Error {
	status: number;
	message: string;

	constructor(message: string = "서버 오류가 발생했습니다.") {
		super(message);
		this.status = 500;
		this.message = message;
	}
}
export class UnprocessableEntityException extends Error {
	status: number;
	message: string;

	constructor(message: string = "처리할 수 없는 엔터티입니다.") {
		super(message);
		this.status = 422;
		this.message = message;
	}
}
