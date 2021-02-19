const getStatusElement = () => document.getElementById("status");
const resetStatusElement = () => (getStatusElement().innerHTML = "");

const br = () => `<br/>`;

const span = (content, color) => `<span style="color: ${color}">${content}</span>`;

export { getStatusElement, resetStatusElement, br, span };
