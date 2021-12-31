import { memo, useEffect, useState } from 'react';
import Item from './Item';

let currentLength = 100;

function List({ items }) {
	const [ shownItems, setShownItems ] = useState([]);

	useEffect(() => setShownItems(items.slice(0, 100)), [ items ]);

	useEffect(() => {
		if (!items.length) return;

		function onScroll() {
			if (!items.length) return;

			if (document.scrollingElement.scrollTop < (document.scrollingElement.offsetHeight - window.innerHeight - 50)) {
				return;
			}
			if (shownItems.length < items.length) {
				currentLength += 100;
				setShownItems(items.slice(0, currentLength));
			} else {
				document.removeEventListener('scroll', onScroll);
			}
		}

		document.addEventListener('scroll', onScroll)
		return () => document.removeEventListener('scroll', onScroll);
	}, [ items ]);

	return (
		<div>
			{shownItems.map((row) => <Item key={row.id} item={row}/>)}
		</div>
	)
}

export default memo(List);
