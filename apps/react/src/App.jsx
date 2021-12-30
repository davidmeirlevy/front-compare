import { useCallback, useEffect, useMemo, useState } from 'react'
import { getList } from './data-list';
import List from './List';

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
	measure(setLoadTime, setClearTime) {
		const endTime = performance.now();
		if (startTime) {
			if (type === 'load') {
				setLoadTime(endTime - startTime);
			} else if (type === 'clear') {
				setClearTime(endTime - startTime);
			}
		}
	},

}

function App() {
	const [ list, setList ] = useState([]);
	const [ loadTime, setLoadTime ] = useState([]);
	const [ clearTime, setClearTime ] = useState([]);

	const loadList = useCallback(() => FN.loadList(setList));

	const clearList = useCallback(() => FN.clearList(setList));

	useEffect(() => FN.measure(setLoadTime, setClearTime), [ list ]);

	const loadListBtn = useMemo(() => <button onClick={loadList}>Load list</button>, [ loadList ])
	const clearListBtn = useMemo(() => <button onClick={clearList}>Clear list</button>, [ clearList ])

	const loadTimeLabel = useMemo(() => <span>load time: {loadTime}</span>, [ loadTime ])
	const clearTimeLabel = useMemo(() => <span>clear time: {clearTime}</span>, [ clearTime ])

	return (
		<div>
			<div className="options">
				{loadListBtn}
				{clearListBtn}
				{loadTimeLabel}
				{clearTimeLabel}
			</div>
			<List items={list}/>
		</div>
	)
}

export default App
