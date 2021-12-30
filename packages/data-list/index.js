const list = [];

list.length = Math.pow(10, 6);

export function getList() {
	return list.map((_, i) => {
		console.log(i)
		return {
			id: Math.random().toString(),
			content: (Date.now() * Math.random()).toString(),
		}
	})
}
