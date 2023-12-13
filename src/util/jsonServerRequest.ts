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
	const port = process.env.JSON_SERVER_PORT || 3300;
	const jsonServerUrl = `http://localhost:${port}/${endpoint}`;

	return fetch(jsonServerUrl, options);
};
