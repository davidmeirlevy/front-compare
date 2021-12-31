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

let startTime;
let type;

export const FN = {
	loadList(setList) {
		setList(getList());
		startTime = performance.now();
		type = 'load';
	},
	clearList(setList) {
		setList([]);
		startTime = performance.now();
		type = 'clear';
	},
	measure(setTimers) {
		setTimers(state => ({...state, [type]: (performance.now() - startTime).toFixed(3) }))
	}
}