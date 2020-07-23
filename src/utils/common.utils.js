const nacl = require('tweetnacl');
const utils = require('tweetnacl-util');
const { config } = require('@src/config');

function generateTokenDateTime() {
	const dt = new Date();
	const fullDate = `${dt.getFullYear()}-${`0${dt.getMonth() + 1}`.slice(-2)}-${dt.getDate()} `;
	const fullTime = dt.toLocaleTimeString(`en-US`, { hour12: false });
	return fullDate + fullTime;
}

function generateInvoiceNumber() {
	const dt = new Date();
	const date = String(dt.getDate()).padStart(2, `0`);
	const hour = String(dt.getHours()).padStart(2, `0`);
	const minute = String(dt.getMinutes()).padStart(2, `0`);
	const second = String(dt.getSeconds()).padStart(2, `0`);
	const mssecond = String(dt.getMilliseconds()).padStart(3, `0`);
	const month =
		dt.getMonth() + 1 >= 10 ? String(dt.getMonth() + 1) : String(`0${dt.getMonth() + 1}`);

	return `${dt
		.getFullYear()
		.toString()
		.substr(-2)}${month}${date}${hour}${minute}${second}${mssecond}`;
}

function encryptData(data) {
	const { encodeBase64 } = utils;
	const callbackPost = JSON.stringify(data);
	// Our nonce must be a 24 bytes Buffer (or Uint8Array)
	const nonce = nacl.randomBytes(24);
	// Our secret key must be a 32 bytes Buffer (or Uint8Array)
	const secretKey = Buffer.from(config.PG_SECRET_KEY, `utf8`);
	// Make sure your data is also a Buffer of Uint8Array
	const secretData = Buffer.from(callbackPost, `utf8`);
	const encrypted = nacl.secretbox(secretData, nonce, secretKey);
	// We can now store our encrypted result and our nonce somewhere
	const encryptedDetailCharges = `${encodeBase64(nonce)}:${encodeBase64(encrypted)}`;
	return encryptedDetailCharges;
}

function generatePaymentDateTime() {
	const dt = new Date();
	const date = `${dt.getFullYear()}-${`0${dt.getMonth() + 1}`.slice(-2)}-${dt.getDate()} `;
	const time = dt.toLocaleTimeString(`en-US`, { hour12: false });
	return date + time;
}

function maskingData(data) {
	const dataTemp = data.split('');

	// eslint-disable-next-line no-plusplus
	for (let i = 3; i < dataTemp.length - 3; i++) {
		dataTemp[i] = '*';
	}

	return dataTemp.join('');
}

module.exports = {
	encryptData,
	generatePaymentDateTime,
	generateInvoiceNumber,
	generateTokenDateTime,
	maskingData
};
