export function roundTo(number, digits) {
	const factor = 10 ** digits;
	return Math.round((number + Number.EPSILON) * factor) / factor;
}
