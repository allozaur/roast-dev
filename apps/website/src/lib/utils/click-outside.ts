export default function clickOutside(
	node: Node,
	onOutsideClick: () => void
): { destroy: () => void } {
	function handleClick(event: MouseEvent) {
		if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
			onOutsideClick();
		}
	}

	document.addEventListener('click', handleClick, true);

	return {
		destroy: function () {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
