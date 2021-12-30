import { memo, useCallback, useMemo, useState } from 'react';

function Item({ item }) {
	const [showTooltip, setShowTooltip] = useState(false);

	const show = useCallback(() => setShowTooltip(true));
	const hide = useCallback(() => setShowTooltip(false));

	const tooltip = useMemo(() => showTooltip ? <span className="tooltip">this is the tooltip of id: {item.id}</span> : null, [showTooltip]);

	return (
		<p className="item">
			<span onMouseEnter={show} onMouseLeave={hide}>{item.content}</span>
			{tooltip}
		</p>
	)
}

export default memo(Item);
