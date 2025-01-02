const svg = document.getElementById('svg-overlay');
const tooltip = document.getElementById('tooltip');
const areas = document.querySelectorAll('area');

areas.forEach(area => {
    const coords = area.getAttribute('coords').split(',').map(Number);
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

    let points = '';
    for (let i = 0; i < coords.length; i += 2) {
        points += `${coords[i]},${coords[i + 1]} `;
    }

    polyline.setAttribute('points', points.trim());
    polyline.classList.add('highlight');
    svg.appendChild(polyline);

    // استخراج اطلاعات
    const info = area.getAttribute('data-info').split('|');
    const name = info[0]; // اولین مقدار به عنوان نام فرد
    const infoHtml = info
        .slice(1) // حذف نام فرد از لیست اطلاعات
        .map((item, index) => {
            // افزودن خط جداکننده بعد از هر 6 آیتم
            let content = `<li>${item}</li>`;
            if ((index + 1) % 6 === 0 && index + 1 !== info.length) {
                content += '<hr style="margin: 10px 0; border: 0; border-top: 1px solid gold;">';
            }
            return content;
        })
        .join('');

    area.addEventListener('mouseenter', (e) => {
        polyline.style.visibility = 'visible';

        // تنظیم محتوای tooltip
        tooltip.innerHTML = `<h3>${name}</h3><ul>${infoHtml}</ul>`;
        tooltip.style.display = 'block';
        tooltip.style.top = `${e.clientY + 10}px`;
        tooltip.style.left = `${e.clientX + 10}px`;
    });

    area.addEventListener('mousemove', (e) => {
        tooltip.style.top = `${e.clientY + 10}px`;
        tooltip.style.left = `${e.clientX + 10}px`;
    });

    area.addEventListener('mouseleave', () => {
        polyline.style.visibility = 'hidden';
        tooltip.style.display = 'none';
    });
});
