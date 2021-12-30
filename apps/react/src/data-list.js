export function getList() {
	const l = Math.pow(10, 4);
	const arr = [];
	for (let i = 0; i < l; i++) {
		arr.push({
			id: Math.random().toString(),
			content: (Date.now() * Math.random()).toString(),
		})
	}

	return arr;
}
