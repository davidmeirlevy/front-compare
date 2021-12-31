import { useCallback, useState } from 'react';

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


export default Item;
