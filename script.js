const svg = document.getElementById('svg-overlay');
const tooltip = document.getElementById('tooltip');
const areas = document.querySelectorAll('area');

// داده‌های جدید
const data = {
    "محمد بهاری": {
        "توقیف پاییز": "1027 (16%)",
        "رفع پاییز": "189 (15%)",
        "فروش پاییز": "322 (14%)",
        "مجموع": "1538",
        "مشارکت فرد": "15%"
    },
    "عیوض بدر": {
        "توقیف پاییز": "1132 (17%)",
        "رفع پاییز": "161 (13%)",
        "فروش پاییز": "685 (29%)",
        "مجموع": "1978",
        "مشارکت فرد": "19%"
    },
    "میثم محمدی": {
        "توقیف پاییز": "1484 (23%)",
        "رفع پاییز": "259 (21%)",
        "فروش پاییز": "732 (31%)",
        "مجموع": "2475",
        "مشارکت فرد": "24%"
    },
    "سید علی اکبر نصرتی پور": {
        "توقیف پاییز": "110 (2%)",
        "رفع پاییز": "0 (0%)",
        "فروش پاییز": "2 (0.1%)",
        "مجموع": "112",
        "مشارکت فرد": "1%"
    },
    "سعید زاهدی": {
        "توقیف پاییز": "2799 (43%)",
        "رفع پاییز": "653 (52%)",
        "فروش پاییز": "633 (27%)",
        "مجموع": "4085",
        "مشارکت فرد": "40%"
    }
};

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

    const name = area.getAttribute('data-name'); // نام فرد از attribute
    const personData = data[name]; // دریافت داده‌های فرد

    // تولید HTML برای tooltip
    const infoHtml = Object.keys(personData)
        .map(key => {
            if (key === "فروش پاییز") {
                // اضافه کردن خط جداکننده بعد از فروش پاییز
                return `<li>${key}: <strong>${personData[key]}</strong></li><hr class="separator">`;
            }
            return `<li>${key}: <strong>${personData[key]}</strong></li>`;
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
