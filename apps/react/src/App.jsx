import { useCallback, useEffect, useState } from 'react'
import useVirtual from "react-cool-virtual"
import Item from './Item'
import { FN } from './utils'

function App() {
	const [list, setList] = useState([])
	const [timers, setTimers] = useState({load:0, clear:0})
	const { outerRef, innerRef, items } = useVirtual({ itemCount:list.length, itemSize:22 })

	const loadList = useCallback(() => FN.loadList(setList), [])
	const clearList = useCallback(() => FN.clearList(setList), [])

	useEffect(() => FN.measure(setTimers), [list])

	return (
		<main ref={outerRef}>
			<header>
				<button onClick={loadList}>Load list</button>
				<button onClick={clearList}>Clear list</button>
				<span>load time: <strong>{timers.load}ms</strong></span>
				<span>clear time: <strong>{timers.clear}ms</strong></span>
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
