function formatHttpError(message, code) {
	return {
		message: message,
		code: code,
	};
}

module.exports = {
	formatHttpError,
};
