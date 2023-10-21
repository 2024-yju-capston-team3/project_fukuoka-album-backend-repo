type FetchMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const fetchOptions = (method: string, body: object | null) => {
	const headers: HeadersInit = {};

	if (body) {
		headers["Content-Type"] = "application/json";
	}

	return {
		method,
		headers,
		body: body ? JSON.stringify(body) : null,
	};
};

export const fetchToDB = (
	method: FetchMethod = "GET",
	endpoint: string = "",
	body: object | null = null
) => {
	const options = fetchOptions(method, body);
	const jsonServerUrl = `http://localhost:3004/${endpoint}`;

	return fetch(jsonServerUrl, options);
};
