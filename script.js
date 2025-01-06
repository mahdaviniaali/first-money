const svg = document.getElementById('svg-overlay');
const tooltip = document.getElementById('tooltip');
const areas = document.querySelectorAll('area');

// داده‌های قدیمی
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
        "فروش پاییز": "2 (0%)",
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

// داده‌های جدید تحت "بیزاجی"
const bizagiData = {
    "سعید زاهدی": {
        "توقیف": "2390 (70%)",
        "فروش": "104 (72%)",
        "مجموع": { "تعداد": "2494", "مشارکت فرد": "70%" }
    },
    "سید علی اکبر نصرتی پور": {
        "توقیف": "1009 (30%)",
        "فروش": "4 (3%)",
        "مجموع": { "تعداد": "1013", "مشارکت فرد": "28%" }
    },
    "عیوض بدر": {
        "توقیف": "12 (0%)",
        "فروش": "36 (25%)",
        "مجموع": { "تعداد": "48", "مشارکت فرد": "1%" }
    }
};

// مقدار پیش‌فرض برای "بیزاجی"
const defaultBizagiData = {
    "توقیف": "0 (0%)",
    "فروش": "0 (0%)",
    "مجموع": { "تعداد": "0", "مشارکت فرد": "0%" }
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
    const personData = data[name] || {}; // دریافت داده‌های فرد از داده‌های قدیمی
    const bizagiPersonData = { ...defaultBizagiData, ...bizagiData[name] }; // تکمیل داده‌های "بیزاجی" با مقدار پیش‌فرض

    // تولید HTML برای داده‌های قدیمی
    const oldDataHtml = Object.keys(personData)
        .map((key, index) => {
            // اضافه کردن خط نازک خاکستری بعد از "فروش پاییز"
            if (key === "فروش پاییز") {
                return `<li>${key}: <strong>${personData[key]}</strong></li><hr style="border: 0.5px solid #ccc; margin: 5px 0;">`;
            }
            return `<li>${key}: <strong>${personData[key]}</strong></li>`;
        })
        .join('');

    // تولید HTML برای داده‌های بیزاجی
    const bizagiDataHtml = `
        <hr style="border: 1px solid gold; margin: 10px 0;">
        <h4 style="color: #ff9900; font-weight: bold; margin-bottom: 5px;">بیزاجی</h4>
        <ul style="color: #666; font-style: italic;">
            <li>توقیف: <strong>${bizagiPersonData["توقیف"]}</strong></li>
            <li>فروش: <strong>${bizagiPersonData["فروش"]}</strong></li>
            <hr style="border: 0.5px solid #ccc; margin: 5px 0;">
            <li>مجموع: <strong>${bizagiPersonData["مجموع"]["تعداد"]}</strong></li>
            <li>مشارکت فرد: <strong>${bizagiPersonData["مجموع"]["مشارکت فرد"]}</strong></li>
        </ul>
    `;

    area.addEventListener('mouseenter', (e) => {
        polyline.style.visibility = 'visible';

        // تنظیم محتوای tooltip
        tooltip.innerHTML = `<h3>${name}</h3><ul>${oldDataHtml}</ul>${bizagiDataHtml}`;
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
