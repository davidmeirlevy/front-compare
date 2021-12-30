import { useCallback, useEffect, useState } from 'react'
import useVirtual from "react-cool-virtual";
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



function Item({ children, id }) {
	const [showTooltip, setShowTooltip] = useState(false);

	const show = useCallback(() => setShowTooltip(true), []);
	const hide = useCallback(() => setShowTooltip(false), []);

	return (
		<div onMouseEnter={show} onMouseLeave={hide}>
			<span>{children}</span>
			{showTooltip && <span className="tooltip"> 👈 tooltip</span>}
		</div>
	)
}


function App() {
	const [list, setList] = useState([])
	const [timers, setTimers] = useState({load:null, clear:null})
	const { outerRef, innerRef, items } = useVirtual({
    itemCount: list.length,
		itemSize: 22,
  });

	const loadList = useCallback(() => FN.loadList(setList), [])
	const clearList = useCallback(() => FN.clearList(setList), [])

	useEffect(() => FN.measure(setTimers), [list])

	return (
		<main ref={outerRef}>
			<header>
				<button onClick={loadList}>Load list</button>
				<button onClick={clearList}>Clear list</button>
				<span>load time: <strong>{timers.load}</strong></span>
				<span>clear time: <strong>{timers.clear}</strong></span>
			</header>

			<div ref={innerRef} className='list'>
				{items.map(({index}) => (
						list[index] && <Item key={index} id={list[index]?.id}>{list[index]?.content}</Item>
				))}
			</div>
		</main>
	)
}



export default App
