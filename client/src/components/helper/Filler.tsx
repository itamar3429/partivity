/**
 *
 * this function is to fill top or bottom of an element.
 *
 * when using margin and want it to affect the height of the parent.
 *
 * for example: when child of body has margin top.
 *
 * but we want background color of body to start at the top of the page.
 *
 * without having the margin affect where it starts.
 */
function Filler() {
	return (
		<div style={{ display: "block", height: 0, overflow: "hidden" }}></div>
	);
}

export default Filler;
