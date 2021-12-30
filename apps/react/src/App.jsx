import { useCallback, useEffect, useState } from 'react'
import { getList } from './data-list';

let startTime;
let type;

const FN = {
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
		setTimers(state => ({...state, [type]: performance.now() - startTime }))
	}
}

function App() {
	const [list, setList] = useState([])
	const [timers, setTimers] = useState({load:null, clear:null})

	const loadList = useCallback(() => FN.loadList(setList), [])
	const clearList = useCallback(() => FN.clearList(setList), [])

	useEffect(() => FN.measure(setTimers), [list])

	return (
		<main>
			<header>
				<button onClick={loadList}>Load list</button>
				<button onClick={clearList}>Clear list</button>
				<span>load time: <strong>{timers.load}</strong></span>
				<span>clear time: <strong>{timers.clear}</strong></span>
			</header>

			{list.map((row) => <div key={row.id}>{row.content}</div>)}
		</main>
	)
}



export default App
