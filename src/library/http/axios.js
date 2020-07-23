const axios = require('axios');

function enableInterceptor($axios) {
	// Add a request interceptor
	$axios.interceptors.request.use(
		function(request) {
			// Do something before request is sent
			console.log('axios request', request);
			return request;
		},
		function(error) {
			console.log('axios request error ', error);
			// Do something with request error
			return Promise.reject(error);
		}
	);

	// Add a response interceptor
	$axios.interceptors.response.use(
		function(response) {
			// Any status code that lie within the range of 2xx cause this function to trigger
			// Do something with response data
			console.log('axios response', response);
			return response;
		},
		function(error) {
			console.log('axios response error ', error);
			// Any status codes that falls outside the range of 2xx cause this function to trigger
			// Do something with response error
			return Promise.reject(error);
		}
	);
}

// enableInterceptor(axios);

module.exports.get = async (url, data, httpConfig) => {
	return axios
		.get(url, data, httpConfig)
		.then(response => response)
		.catch(error => error);
};

module.exports.post = async (url, data, httpConfig) => {
	return axios
		.post(url, data, httpConfig)
		.then(response => response)
		.catch(error => error);
};

module.exports.put = async (url, data, httpConfig) => {
	return axios
		.put(url, data, httpConfig)
		.then(response => response)
		.catch(error => error);
};
