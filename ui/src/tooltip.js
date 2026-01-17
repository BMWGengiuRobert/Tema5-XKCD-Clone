const tooltip = document.createElement('div');
tooltip.className = 'custom-tooltip';
document.body.appendChild(tooltip);

export function setupTooltip(imageElement) {

    imageElement.addEventListener('mousemove', (e) => {
        tooltip.textContent = imageElement.alt;
        tooltip.style.display = 'block';
        tooltip.style.left = `${e.pageX + 16}px`;
        tooltip.style.top = `${e.pageY + 16}px`;
    });

    imageElement.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
}