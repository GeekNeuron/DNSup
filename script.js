document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
     * i18n (Persian default / English toggle)
     * ========================================================= */
    const translations = {
        fa: {
            sortByPing: 'مرتب‌سازی بر اساس پینگ',
            dnsCheckTab: 'بررسی DNS',
            speedTestTab: 'تست سرعت',
            pingLabel: 'پینگ',
            downloadLabel: 'دانلود',
            uploadLabel: 'آپلود',
            go: 'شروع',
            testing: 'در حال تست...',
            addNewDns: 'افزودن DNS جدید',
            dnsNamePh: 'نام DNS (مثلاً Google)',
            primaryIpPh: 'IPv4 اصلی',
            secondaryIpPh: 'IPv4 ثانویه (اختیاری)',
            ipv6Ph: 'IPv6 (اختیاری)',
            addBtn: 'افزودن',
            invalidIp: 'آدرس IPv4 نامعتبر است (مثال: 8.8.8.8)',
            invalidIp6: 'آدرس IPv6 نامعتبر است',
            requiredField: 'نام و IP اصلی الزامی هستند',
            timeout: 'بی‌پاسخ',
            exact: '✓ دقیق (DoH)',
            approx: '≈ تقریبی',
            pingDisclaimer: 'برای هر سرور، ابتدا به‌صورت خودکار بررسی می‌شود که مرورگر اجازهٔ خواندن پاسخ واقعی DoH را می‌دهد یا نه (به دلیل CORS، این برای اکثر سرورها ممکن نیست). در صورت امکان، برچسب «دقیق» با پاسخ واقعی DNS نمایش داده می‌شود؛ در غیر این‌صورت فقط «زمان اتصال HTTPS» به‌عنوان تقریب گزارش می‌شود.',
            deleteConfirm: 'این DNS از لیست حذف شود؟',
            speedTestError: 'تست سرعت ناموفق بود. اتصال اینترنت یا مسدود بودن CDN را بررسی کنید.',
            speedDisclaimer: 'این آزمون یک اندازه‌گیری تک‌اتصالی و تقریبی با استفاده از شبکهٔ عمومی Cloudflare است؛ جایگزین ابزارهای تخصصی مثل Speedtest نیست.',
            dataLoadError: 'بارگذاری لیست DNS ناموفق بود. فایل dns-data.json در دسترس نیست.',
            protocol4: 'IPv4',
            protocol46: 'IPv4/IPv6',
            countryLabel: 'کشور:',
            autoSortLabel: 'مرتب‌سازی خودکار:',
            autoSortOff: 'مرتب‌سازی خودکار: خاموش',
            autoSortPing: 'مرتب‌سازی خودکار: بر اساس پینگ',
            autoSortConnectivity: 'مرتب‌سازی خودکار: بر اساس اتصال',
            countryAll: 'همه',
            countryGlobal: 'جهانی',
            countryIR: 'ایران',
            countryRU: 'روسیه',
            countryCN: 'چین',
            countryTW: 'تایوان',
            countryCZ: 'جمهوری چک',
            countryFR: 'فرانسه',
            countryEU: 'اتحادیهٔ اروپا',
            countryDE: 'آلمان',
            countryDK: 'دانمارک',
            countryCustom: 'سفارشی من',
            noResultsForCountry: 'برای این کشور موردی یافت نشد.',
            tagGaming: '🎮 گیمینگ',
            tagSecurity: '🛡️ امنیتی',
            tagAdBlock: '🚫 مسدودکنندهٔ تبلیغ',
            tagFamily: '👪 خانواده',
            tagSanctions: '🔓 رفع تحریم',
            localOnlyNote: 'این DNS از رنج آدرس‌های خصوصی (10.x) استفاده می‌کند و فقط از داخل شبکهٔ ایران (زیرساخت ملی) قابل‌دسترسی است — از بیرون کشور همیشه بی‌پاسخ خواهد ماند و این طبیعی است.',
            tagsAreInformational: 'برچسب «گیمینگ»/«رفع تحریم» بر اساس هدف اعلام‌شدهٔ سرویس است، نه اندازه‌گیری واقعی پینگ سرور بازی؛ برای مقایسهٔ واقعی از عدد پینگ بالا استفاده کنید.',
            editDns: 'ویرایش DNS',
            saveBtn: 'ذخیره',
            countryFieldLabel: 'کشور (اختیاری)',
            countryNone: 'بدون کشور (فقط سفارشی)',
            countryAddNew: '+ افزودن کشور جدید…',
            countryCodeTaken: 'این کد کشور قبلاً وجود دارد — از لیست بالا انتخابش کنید یا کد دیگری بگذارید.',
            newCountryCodePh: 'کد کشور (مثلاً DE)',
            newCountryNamePh: 'نام کشور',
            newCountryFlagPh: 'اموجی پرچم (اختیاری)',
            tagsFieldLabel: 'برچسب‌ها (اختیاری)',
            verifiedOn: 'آخرین تأیید آدرس:',
            speedMethodLocal: '✅ اندازه‌گیری واقعی (فایل‌های تست هم‌مبدأ) — پیشرفت زنده و دقیق',
            speedMethodFallback: '⚠️ حالت پشتیبان (Cloudflare، بدون پیشرفت زنده) — فایل‌های تست هم‌مبدأ در دسترس نیستند',
            speedMethodUploadFallback: '⚠️ دانلود واقعی، ولی آپلود از روش پشتیبان (Cloudflare) — میزبان شما درخواست POST به فایل استاتیک را نمی‌پذیرد (طبیعی روی GitHub Pages و مشابه)'
        },
        en: {
            sortByPing: 'Sort by Ping',
            dnsCheckTab: 'DNS Check',
            speedTestTab: 'Speed Test',
            pingLabel: 'Ping',
            downloadLabel: 'Download',
            uploadLabel: 'Upload',
            go: 'GO',
            testing: 'TESTING...',
            addNewDns: 'Add New DNS',
            dnsNamePh: 'DNS Name (e.g., Google)',
            primaryIpPh: 'Primary IPv4',
            secondaryIpPh: 'Secondary IPv4 (optional)',
            ipv6Ph: 'Optional IPv6',
            addBtn: 'Add DNS',
            invalidIp: 'Invalid IPv4 address (e.g. 8.8.8.8)',
            invalidIp6: 'Invalid IPv6 address',
            requiredField: 'Name and primary IP are required',
            timeout: 'Timeout',
            exact: '✓ exact (DoH)',
            approx: '≈ approx',
            pingDisclaimer: 'For each server we first auto-detect whether the browser is allowed to read a real DoH answer (CORS blocks this for most providers). When possible, the "exact" badge means a real DNS answer was received; otherwise only HTTPS connection time is reported as an approximation.',
            deleteConfirm: 'Remove this DNS entry?',
            speedTestError: 'Speed test failed. Check your connection or CDN access.',
            speedDisclaimer: 'This is an approximate, single-connection test using Cloudflare\'s public network — not a replacement for dedicated tools like Speedtest.',
            dataLoadError: 'Could not load DNS list. dns-data.json is unavailable.',
            protocol4: 'IPv4',
            protocol46: 'IPv4/IPv6',
            countryLabel: 'Country:',
            autoSortLabel: 'Auto-sort:',
            autoSortOff: 'Auto-sort: off',
            autoSortPing: 'Auto-sort: by ping',
            autoSortConnectivity: 'Auto-sort: by connectivity',
            countryAll: 'All',
            countryGlobal: 'Global',
            countryIR: 'Iran',
            countryRU: 'Russia',
            countryCN: 'China',
            countryTW: 'Taiwan',
            countryCZ: 'Czech Republic',
            countryFR: 'France',
            countryEU: 'European Union',
            countryDE: 'Germany',
            countryDK: 'Denmark',
            countryCustom: 'My custom',
            noResultsForCountry: 'No entries for this country yet.',
            tagGaming: '🎮 Gaming',
            tagSecurity: '🛡️ Security',
            tagAdBlock: '🚫 Ad-block',
            tagFamily: '👪 Family',
            tagSanctions: '🔓 Sanctions bypass',
            localOnlyNote: 'This server uses a private (10.x) address range and is only reachable from inside Iran\'s national network — it will always time out from outside the country, which is expected.',
            tagsAreInformational: 'The "Gaming"/"Sanctions bypass" tags reflect the service\'s stated purpose, not a measured game-server ping — use the ping number above for real comparisons.',
            editDns: 'Edit DNS',
            saveBtn: 'Save',
            countryFieldLabel: 'Country (optional)',
            countryNone: 'No country (custom only)',
            countryAddNew: '+ Add new country…',
            countryCodeTaken: 'This country code already exists — pick it from the list above, or choose a different code.',
            newCountryCodePh: 'Country code (e.g. DE)',
            newCountryNamePh: 'Country name',
            newCountryFlagPh: 'Flag emoji (optional)',
            tagsFieldLabel: 'Tags (optional)',
            verifiedOn: 'Address last verified:',
            speedMethodLocal: '✅ Real measurement (same-origin test files) — live, accurate progress',
            speedMethodFallback: '⚠️ Fallback mode (Cloudflare, no live progress) — same-origin test files unavailable',
            speedMethodUploadFallback: '⚠️ Real download, but upload used the fallback method (Cloudflare) — your host rejects POST to a static file (normal on GitHub Pages and similar)'
        }
    };

    let currentLang = localStorage.getItem('dnsup_lang') || 'fa';
    const t = (key) => (translations[currentLang] && translations[currentLang][key]) || key;

    const applyLanguage = () => {
        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === 'fa' ? 'rtl' : 'ltr';
        document.querySelectorAll('[data-i18n]').forEach(el => {
            el.textContent = t(el.dataset.i18n);
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            el.placeholder = t(el.dataset.i18nPlaceholder);
        });
        const langBtn = document.getElementById('lang-toggle-btn');
        if (langBtn) langBtn.textContent = currentLang === 'fa' ? 'EN' : 'FA';
        // refresh dynamic bits that depend on language
        renderPingBadges();
        if (!startSpeedTestBtn.disabled) startSpeedTestBtn.textContent = t('go');
        if (typeof rebuildCountryFilterOptions === 'function') rebuildCountryFilterOptions();
    };

    document.getElementById('lang-toggle-btn').addEventListener('click', () => {
        currentLang = currentLang === 'fa' ? 'en' : 'fa';
        localStorage.setItem('dnsup_lang', currentLang);
        applyLanguage();
    });

    /* =========================================================
     * Theme (persisted) — dark is the default now
     * ========================================================= */
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeToggleIcon = themeToggleBtn.querySelector('.material-icons');
    const savedTheme = localStorage.getItem('dnsup_theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
    } else {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
    }
    const updateThemeIcon = () => {
        const isDark = document.body.classList.contains('dark-theme');
        themeToggleIcon.textContent = isDark ? 'light_mode' : 'dark_mode';
    };
    updateThemeIcon();
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');
        localStorage.setItem('dnsup_theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        updateThemeIcon();
    });

    /* =========================================================
     * View switcher — shared between the desktop top-nav and the
     * mobile bottom-nav (both use [data-view], kept in sync)
     * ========================================================= */
    const viewSwitchButtons = document.querySelectorAll('[data-view]');
    const mainViews = {
        'dns-check-view': document.getElementById('dns-check-view'),
        'speed-test-view': document.getElementById('speed-test-view')
    };
    viewSwitchButtons.forEach(item => {
        item.addEventListener('click', () => {
            const viewId = item.getAttribute('data-view');
            viewSwitchButtons.forEach(i => i.classList.toggle('active', i.getAttribute('data-view') === viewId));
            Object.values(mainViews).forEach(view => view.classList.add('hidden'));
            mainViews[viewId].classList.remove('hidden');
        });
    });

    /* =========================================================
     * DNS Check — state (keyed by stable id, NOT array index)
     * ========================================================= */
    const dnsListContainer = document.getElementById('dns-list');
    const favoritesListContainer = document.getElementById('favorites-list');

    let dnsData = [];              // array of dns entry objects (order = display order)
    const tileElements = new Map(); // id -> tile DOM element (created once, reused)
    const charts = new Map();       // id -> Chart.js instance (created once, reused)
    const pingIntervals = new Map();// id -> interval handle
    let countryFilter = localStorage.getItem('dnsup_country_filter') || 'ALL';

    const countryFilterSelect = document.getElementById('country-filter');
    const noResultsEl = document.getElementById('no-country-results');
    if (countryFilterSelect) {
        countryFilterSelect.value = countryFilter;
        countryFilterSelect.addEventListener('change', () => {
            countryFilter = countryFilterSelect.value;
            localStorage.setItem('dnsup_country_filter', countryFilter);
            renderAll();
        });
    }

    const IPV4_RE = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}$/;
    const IPV6_RE = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;

    const generateId = () => (crypto && crypto.randomUUID) ? crypto.randomUUID() : 'id-' + Date.now() + '-' + Math.random().toString(36).slice(2);

    const escapeHtml = (str) => {
        const div = document.createElement('div');
        div.textContent = str ?? '';
        return div.innerHTML;
    };

    const getPingColor = (ping) => {
        if (ping == null || ping < 0) return '#8a94a8';
        if (ping < 100) return 'var(--good-1)';
        if (ping < 200) return 'var(--warn)';
        return 'var(--bad-1)';
    };
    const getPingStatus = (ping) => {
        if (ping == null || ping < 0) return '';
        if (ping < 100) return 'good';
        if (ping < 200) return 'warn';
        return 'bad';
    };

    /* ---------- persistence helpers ---------- */
    const persistFavorites = () => {
        localStorage.setItem('dnsup_favorites', JSON.stringify(dnsData.filter(d => d.isFavorite).map(d => d.id)));
    };
    const persistCustomEntries = () => {
        const custom = dnsData.filter(d => d.isCustom).map(({ id, name, primary_ip, secondary_ip, ipv6, doh_url, country, tags }) =>
            ({ id, name, primary_ip, secondary_ip, ipv6, doh_url, country, tags }));
        localStorage.setItem('dnsup_custom_entries', JSON.stringify(custom));
    };
    const persistDeletedDefaults = (deletedIds) => {
        localStorage.setItem('dnsup_deleted_defaults', JSON.stringify(deletedIds));
    };

    const TAG_LABELS = { gaming: 'tagGaming', security: 'tagSecurity', 'ad-block': 'tagAdBlock', family: 'tagFamily', 'sanctions-bypass': 'tagSanctions' };
    const COUNTRY_FLAGS = { GLOBAL: '🌐', IR: '🇮🇷', RU: '🇷🇺', CN: '🇨🇳', TW: '🇹🇼', CZ: '🇨🇿', FR: '🇫🇷', EU: '🇪🇺', DE: '🇩🇪', DK: '🇩🇰' };

    /* ---------- tile creation (called ONCE per id) ---------- */
    const createDnsTile = (dns) => {
        const tile = document.createElement('div');
        tile.className = 'dns-tile';
        tile.dataset.id = dns.id;
        tile.dataset.country = dns.country || 'CUSTOM';

        const tagsHtml = (dns.tags || []).map(tag =>
            `<span class="tag-badge">${escapeHtml(t(TAG_LABELS[tag] || tag))}</span>`).join('');
        const flag = COUNTRY_FLAGS[dns.country] || (customCountries[dns.country] && customCountries[dns.country].flag) || (dns.country ? '🏳️' : '⚙️');

        tile.innerHTML = `
            <div class="dns-info">
                <div class="dns-name">${flag} <span class="name-text">${escapeHtml(dns.name)}</span> <span class="best-badge hidden">🏆</span></div>
                <div class="dns-meta-row" title="${dns.verified ? escapeHtml(t('verifiedOn') + ' ' + dns.verified) : ''}">
                    <span class="dns-ips">${escapeHtml(dns.primary_ip)}${dns.secondary_ip ? ', ' + escapeHtml(dns.secondary_ip) : ''}</span>
                    <span class="dns-protocol">${dns.ipv6 ? t('protocol46') : t('protocol4')}</span>
                </div>
                ${tagsHtml ? `<div class="tags-row">${tagsHtml}</div>` : ''}
                ${dns.localOnly ? `<div class="local-only-note">${escapeHtml(t('localOnlyNote'))}</div>` : ''}
            </div>
            <div class="dns-actions">
                <div class="ping-wrap">
                    <div class="ping-display">-</div>
                    <span class="ping-badge"></span>
                </div>
                <span class="material-icons favorite-btn ${dns.isFavorite ? 'favorited' : ''}" role="button" tabindex="0" aria-label="favorite">star_border</span>
                ${dns.isCustom ? `<span class="material-icons edit-btn" role="button" tabindex="0" aria-label="edit">edit</span>` : ''}
                <span class="material-icons delete-btn" role="button" tabindex="0" aria-label="delete">delete</span>
            </div>
            <div class="live-chart-container">
                <canvas></canvas>
            </div>
        `;

        tileElements.set(dns.id, tile);

        const ctx = tile.querySelector('canvas').getContext('2d');
        charts.set(dns.id, new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array(20).fill(''),
                datasets: [{
                    data: Array(20).fill(null),
                    borderColor: '#888',
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.4,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { display: false },
                    y: { display: false, min: 0, max: 300 }
                },
                plugins: { legend: { display: false } },
                animation: { duration: 200 }
            }
        }));

        tile.querySelector('.favorite-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(dns.id);
        });
        const editBtn = tile.querySelector('.edit-btn');
        if (editBtn) {
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openEditModal(dns);
            });
        }
        tile.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteDns(dns.id);
        });

        return tile;
    };

    const renderPingBadges = () => {
        dnsData.forEach(dns => {
            const tile = tileElements.get(dns.id);
            if (!tile) return;
            const badge = tile.querySelector('.ping-badge');
            if (badge && dns.pingType) badge.textContent = dns.pingType === 'exact' ? t('exact') : t('approx');

            const protocolEl = tile.querySelector('.dns-protocol');
            if (protocolEl) protocolEl.textContent = dns.ipv6 ? t('protocol46') : t('protocol4');

            const tagsRow = tile.querySelector('.tags-row');
            if (tagsRow) {
                tagsRow.innerHTML = (dns.tags || []).map(tag =>
                    `<span class="tag-badge">${escapeHtml(t(TAG_LABELS[tag] || tag))}</span>`).join('');
            }
            const localNote = tile.querySelector('.local-only-note');
            if (localNote) localNote.textContent = t('localOnlyNote');
        });
        if (noResultsEl) noResultsEl.textContent = t('noResultsForCountry');
    };

    /* ---------- reconcile DOM order WITHOUT destroying tiles/charts ---------- */
    const matchesCountryFilter = (dns) => {
        if (countryFilter === 'ALL') return true;
        if (countryFilter === 'CUSTOM') return !!dns.isCustom;
        if (!dns.country) return false; // no country assigned -> only visible under ALL / CUSTOM
        return dns.country === countryFilter;
    };

    const updateBestBadge = () => {
        let bestDns = null;
        dnsData.forEach(dns => {
            if (!matchesCountryFilter(dns)) return;
            if (dns.ping == null || dns.ping < 0) return;
            if (!bestDns || dns.ping < bestDns.ping) bestDns = dns;
        });
        dnsData.forEach(dns => {
            const tile = tileElements.get(dns.id);
            if (!tile) return;
            const badge = tile.querySelector('.best-badge');
            if (badge) badge.classList.toggle('hidden', !bestDns || bestDns.id !== dns.id);
        });
    };

    const collapsedGroups = new Set(JSON.parse(localStorage.getItem('dnsup_collapsed_groups') || '[]'));
    const persistCollapsedGroups = () => localStorage.setItem('dnsup_collapsed_groups', JSON.stringify([...collapsedGroups]));

    const groupFlag = (key) => COUNTRY_FLAGS[key] || (customCountries[key] && customCountries[key].flag) || (key === 'CUSTOM' ? '⚙️' : '🏳️');
    const groupLabel = (key) => key === 'CUSTOM' ? t('countryCustom') : countryLabelFor(key);

    const createGroupHeader = (key, count) => {
        const header = document.createElement('div');
        header.className = 'country-group-header' + (collapsedGroups.has(key) ? ' collapsed' : '');
        header.setAttribute('role', 'button');
        header.setAttribute('tabindex', '0');
        header.innerHTML = `
            <span class="material-icons chevron" aria-hidden="true">expand_more</span>
            <span class="group-flag">${groupFlag(key)}</span>
            <span class="group-label">${escapeHtml(groupLabel(key))}</span>
            <span class="group-count">${count}</span>
        `;
        const toggle = () => {
            if (collapsedGroups.has(key)) collapsedGroups.delete(key); else collapsedGroups.add(key);
            persistCollapsedGroups();
            renderAll();
        };
        header.addEventListener('click', toggle);
        header.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
        return header;
    };

    const renderAll = () => {
        let visibleCount = 0;
        const groups = new Map(); // country/CUSTOM code -> tiles[], only used when grouping is active
        const flatTiles = [];
        const grouping = countryFilter === 'ALL' && autoSortMode === 'off';

        dnsData.forEach(dns => {
            let tile = tileElements.get(dns.id);
            if (!tile) tile = createDnsTile(dns);
            const favBtn = tile.querySelector('.favorite-btn');
            favBtn.classList.toggle('favorited', !!dns.isFavorite);
            const visible = matchesCountryFilter(dns);
            tile.classList.toggle('hidden', !visible);
            if (!visible) { tile.remove(); return; }
            visibleCount++;
            if (dns.isFavorite) {
                favoritesListContainer.appendChild(tile);
                return;
            }
            if (grouping) {
                const key = dns.country || 'CUSTOM';
                if (!groups.has(key)) groups.set(key, []);
                groups.get(key).push(tile);
            } else {
                flatTiles.push(tile);
            }
        });

        dnsListContainer.innerHTML = '';
        if (grouping) {
            const orderedKeys = [...BASE_COUNTRIES.map((c) => c.code), ...Object.keys(customCountries), 'CUSTOM'];
            orderedKeys.forEach((key) => {
                const tiles = groups.get(key);
                if (!tiles || tiles.length === 0) return;
                dnsListContainer.appendChild(createGroupHeader(key, tiles.length));
                const body = document.createElement('div');
                body.className = 'dns-grid country-group-body';
                if (collapsedGroups.has(key)) body.classList.add('hidden');
                tiles.forEach((t) => body.appendChild(t));
                dnsListContainer.appendChild(body);
            });
        } else {
            flatTiles.forEach((t) => dnsListContainer.appendChild(t));
        }

        if (noResultsEl) noResultsEl.classList.toggle('hidden', visibleCount > 0 || dnsData.length === 0);
        updateFavoritesSeparator();
        updateBestBadge();
    };

    const updateFavoritesSeparator = () => {
        let separator = document.querySelector('.favorite-separator');
        if (favoritesListContainer.children.length > 0 && dnsListContainer.children.length > 0) {
            if (!separator) {
                separator = document.createElement('div');
                separator.className = 'favorite-separator';
                favoritesListContainer.insertAdjacentElement('afterend', separator);
            }
        } else if (separator) {
            separator.remove();
        }
    };

    /* ---------- ping measurement: real DoH round-trip for known providers,
       honest "approximate connection time" fallback otherwise ---------- */
    const updatePing = (dns, ms, type) => {
        dns.ping = ms;
        dns.pingType = type;
        const tile = tileElements.get(dns.id);
        if (!tile) return;
        const pingDisplay = tile.querySelector('.ping-display');
        const badge = tile.querySelector('.ping-badge');
        const chart = charts.get(dns.id);

        if (pingDisplay) {
            pingDisplay.textContent = ms < 0 ? t('timeout') : `${ms} ms`;
            pingDisplay.style.color = getPingColor(ms);
        }
        tile.dataset.status = getPingStatus(ms);
        if (badge) badge.textContent = type === 'exact' ? t('exact') : t('approx');
        if (chart) {
            chart.data.datasets[0].data.shift();
            chart.data.datasets[0].data.push(ms < 0 ? null : ms);
            chart.data.datasets[0].borderColor = getPingColor(ms);
            chart.update();
        }
        updateBestBadge();
        scheduleAutoSort();
    };

    // Per-provider capability cache: some DoH endpoints MAY send Access-Control-Allow-Origin
    // (server configs can change over time, differ by region/CDN edge, etc.) so instead of a
    // single hardcoded assumption we probe once per provider and re-probe periodically —
    // the same adaptive approach used by the open-source DoHSpeedTest project.
    const dohCapability = new Map(); // doh_url -> { cors: bool, checkedAt: number }
    const DOH_CAPABILITY_TTL = 30 * 60 * 1000;

    const checkDohCapability = async (dohUrl) => {
        const cached = dohCapability.get(dohUrl);
        if (cached && (Date.now() - cached.checkedAt) < DOH_CAPABILITY_TTL) return cached.cors;
        let cors = false;
        try {
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), 3000);
            const res = await fetch(`${dohUrl}?name=example.com&type=A&t=${Date.now()}`, {
                mode: 'cors', cache: 'no-store', headers: { Accept: 'application/dns-json' }, signal: controller.signal
            });
            clearTimeout(timer);
            cors = res.ok && res.type === 'cors';
        } catch (e) { cors = false; }
        dohCapability.set(dohUrl, { cors, checkedAt: Date.now() });
        return cors;
    };

    // one timed sample; returns elapsed ms, or null if it failed / (for the 'exact' path)
    // the DNS answer itself indicated an error
    const sampleOnce = async (target, useCors) => {
        const start = performance.now();
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 4000);
        try {
            if (useCors) {
                const res = await fetch(`${target}?name=example.com&type=A&t=${Date.now()}-${Math.random()}`, {
                    mode: 'cors', cache: 'no-store', headers: { Accept: 'application/dns-json' }, signal: controller.signal
                });
                clearTimeout(timer);
                if (!res.ok) return null;
                const elapsed = performance.now() - start;
                const data = await res.json().catch(() => null);
                // Status 0 = NOERROR in the standard DoH JSON format — confirms a real answer,
                // not just "some HTTP response came back"
                if (data && typeof data.Status === 'number' && data.Status !== 0) return null;
                return elapsed;
            }
            await fetch(`${target}?t=${Date.now()}-${Math.random()}`, { mode: 'no-cors', cache: 'no-store', signal: controller.signal });
            clearTimeout(timer);
            return performance.now() - start;
        } catch (err) {
            clearTimeout(timer);
            return null;
        }
    };

    const measurePing = async (dns) => {
        const useCors = dns.doh_url ? await checkDohCapability(dns.doh_url) : false;
        const target = dns.doh_url ? dns.doh_url : `https://${dns.primary_ip}/`;
        // fire a few quick samples and keep the minimum — a single sample is easily skewed
        // by one slow packet or a cold connection; the minimum of several is far more stable
        // (same idea real speed-test tools use for their ping/jitter readings)
        const SAMPLES = 3;
        const results = await Promise.all(Array.from({ length: SAMPLES }, () => sampleOnce(target, useCors)));
        const valid = results.filter((r) => r != null);
        if (valid.length === 0) {
            updatePing(dns, -1, useCors ? 'exact' : 'approx');
            return;
        }
        updatePing(dns, Math.round(Math.min(...valid)), useCors ? 'exact' : 'approx');
    };

    const startPingLoop = (dns) => {
        if (pingIntervals.has(dns.id)) return; // never double-register
        measurePing(dns);
        const handle = setInterval(() => measurePing(dns), 5000);
        pingIntervals.set(dns.id, handle);
    };

    const stopPingLoop = (id) => {
        const handle = pingIntervals.get(id);
        if (handle) clearInterval(handle);
        pingIntervals.delete(id);
    };

    /* ---------- favorite / delete ---------- */
    const toggleFavorite = (id) => {
        const dns = dnsData.find(d => d.id === id);
        if (!dns) return;
        dns.isFavorite = !dns.isFavorite;
        persistFavorites();
        renderAll(); // just moves the existing tile/chart — nothing is recreated
    };

    const deleteDns = (id) => {
        if (!window.confirm(t('deleteConfirm'))) return;
        stopPingLoop(id);
        const chart = charts.get(id);
        if (chart) chart.destroy();
        charts.delete(id);
        const tile = tileElements.get(id);
        if (tile) tile.remove();
        tileElements.delete(id);

        const dns = dnsData.find(d => d.id === id);
        dnsData = dnsData.filter(d => d.id !== id);

        if (dns && dns.isCustom) {
            persistCustomEntries();
        } else if (dns) {
            const deleted = JSON.parse(localStorage.getItem('dnsup_deleted_defaults') || '[]');
            deleted.push(id);
            persistDeletedDefaults(deleted);
        }
        persistFavorites();
        updateFavoritesSeparator();
    };

    /* ---------- sort (id-based state means sorting is now safe) ---------- */
    const compareByPing = (a, b) => {
        if (a.isFavorite && !b.isFavorite) return -1;
        if (!a.isFavorite && b.isFavorite) return 1;
        const pingA = (a.ping ?? Infinity) < 0 ? Infinity : (a.ping ?? Infinity);
        const pingB = (b.ping ?? Infinity) < 0 ? Infinity : (b.ping ?? Infinity);
        return pingA - pingB;
    };

    // connectivity rank: 0 = answered, 1 = not measured yet, 2 = confirmed timeout —
    // this way a server we simply haven't pinged yet isn't lumped in with one that's
    // actually confirmed unreachable
    const connectivityRank = (dns) => {
        if (dns.ping != null && dns.ping >= 0) return 0;
        if (dns.ping == null) return 1;
        return 2;
    };
    const compareByConnectivity = (a, b) => {
        if (a.isFavorite && !b.isFavorite) return -1;
        if (!a.isFavorite && b.isFavorite) return 1;
        const rankDiff = connectivityRank(a) - connectivityRank(b);
        if (rankDiff !== 0) return rankDiff;
        return (a.ping ?? Infinity) - (b.ping ?? Infinity);
    };

    document.getElementById('sort-by-ping').addEventListener('click', () => {
        dnsData.sort(compareByPing);
        renderAll();
    });

    /* auto-sort: continuously keeps the list ordered by the chosen criterion as new
       ping results come in, instead of requiring a manual click every time */
    let autoSortMode = localStorage.getItem('dnsup_auto_sort') || 'off';
    const autoSortSelect = document.getElementById('auto-sort-select');
    if (autoSortSelect) {
        autoSortSelect.value = autoSortMode;
        autoSortSelect.addEventListener('change', () => {
            autoSortMode = autoSortSelect.value;
            localStorage.setItem('dnsup_auto_sort', autoSortMode);
            applyAutoSort();
        });
    }
    const applyAutoSort = () => {
        if (autoSortMode === 'ping') dnsData.sort(compareByPing);
        else if (autoSortMode === 'connectivity') dnsData.sort(compareByConnectivity);
        // always re-render — even for 'off', so the view switches back to the grouped
        // layout instead of staying stuck in the flat auto-sorted arrangement
        renderAll();
    };
    let autoSortDebounceHandle = null;
    const scheduleAutoSort = () => {
        if (autoSortMode === 'off') return;
        clearTimeout(autoSortDebounceHandle);
        autoSortDebounceHandle = setTimeout(applyAutoSort, 600);
    };

    /* =========================================================
     * Add / Edit DNS modal (with real validation + XSS-safe rendering)
     * ========================================================= */
    const modal = document.getElementById('add-dns-modal');
    const modalTitle = document.getElementById('dns-modal-title');
    const submitBtn = document.getElementById('dns-form-submit-btn');
    const addDnsBtn = document.getElementById('add-dns-btn');
    const closeBtn = document.querySelector('.close-btn');
    const addDnsForm = document.getElementById('add-dns-form');
    const nameInput = document.getElementById('dns-name-input');
    const primaryInput = document.getElementById('dns-primary-ip-input');
    const secondaryInput = document.getElementById('dns-secondary-ip-input');
    const ipv6Input = document.getElementById('dns-ipv6-input');
    const countryInput = document.getElementById('dns-country-input');
    const newCountryFields = document.getElementById('new-country-fields');
    const newCountryCodeInput = document.getElementById('new-country-code-input');
    const newCountryNameInput = document.getElementById('new-country-name-input');
    const newCountryFlagInput = document.getElementById('new-country-flag-input');

    let editingId = null; // null = add mode, otherwise id of dns being edited

    /* custom countries the user has defined: { CODE: { label, flag } } */
    let customCountries = JSON.parse(localStorage.getItem('dnsup_custom_countries') || '{}');
    const persistCustomCountries = () => localStorage.setItem('dnsup_custom_countries', JSON.stringify(customCountries));

    /* predefined countries shipped with the dataset — code, translation key, flag */
    const BASE_COUNTRIES = [
        { code: 'GLOBAL', key: 'countryGlobal', flag: '🌐' },
        { code: 'IR', key: 'countryIR', flag: '🇮🇷' },
        { code: 'RU', key: 'countryRU', flag: '🇷🇺' },
        { code: 'CN', key: 'countryCN', flag: '🇨🇳' },
        { code: 'TW', key: 'countryTW', flag: '🇹🇼' },
        { code: 'CZ', key: 'countryCZ', flag: '🇨🇿' },
        { code: 'FR', key: 'countryFR', flag: '🇫🇷' },
        { code: 'EU', key: 'countryEU', flag: '🇪🇺' },
        { code: 'DE', key: 'countryDE', flag: '🇩🇪' },
        { code: 'DK', key: 'countryDK', flag: '🇩🇰' }
    ];

    const countryLabelFor = (code) => {
        const base = BASE_COUNTRIES.find((c) => c.code === code);
        if (base) return t(base.key);
        if (customCountries[code]) return customCountries[code].label;
        return code;
    };

    /* rebuild the FILTER dropdown so newly-added custom countries are selectable */
    const rebuildCountryFilterOptions = () => {
        if (!countryFilterSelect) return;
        const previous = countryFilterSelect.value || countryFilter;
        countryFilterSelect.innerHTML = '';
        const addOpt = (value, label) => {
            const opt = document.createElement('option');
            opt.value = value;
            opt.textContent = label;
            countryFilterSelect.appendChild(opt);
        };
        addOpt('ALL', t('countryAll'));
        BASE_COUNTRIES.forEach((c) => addOpt(c.code, `${c.flag} ${t(c.key)}`));
        Object.keys(customCountries).forEach(code => {
            addOpt(code, `${customCountries[code].flag || '🏳️'} ${customCountries[code].label}`);
        });
        addOpt('CUSTOM', t('countryCustom'));
        countryFilterSelect.value = previous;
        if (countryFilterSelect.value !== previous) countryFilterSelect.value = 'ALL';
    };

    /* rebuild the FORM's country <select> (add/edit modal) the same way */
    const rebuildFormCountryOptions = () => {
        const dynamicOpts = Object.keys(customCountries);
        // remove any previously-injected dynamic options (keep the static 5 defined in HTML)
        countryInput.querySelectorAll('option[data-dynamic]').forEach(o => o.remove());
        const newOpt = countryInput.querySelector('option[value="__new__"]');
        dynamicOpts.forEach(code => {
            const opt = document.createElement('option');
            opt.value = code;
            opt.dataset.dynamic = '1';
            opt.textContent = `${customCountries[code].flag || '🏳️'} ${customCountries[code].label}`;
            countryInput.insertBefore(opt, newOpt);
        });
    };

    countryInput.addEventListener('change', () => {
        newCountryFields.classList.toggle('hidden', countryInput.value !== '__new__');
    });

    rebuildCountryFilterOptions();
    rebuildFormCountryOptions();

    const clearFieldErrors = () => {
        addDnsForm.querySelectorAll('.field-error').forEach(el => el.remove());
        addDnsForm.querySelectorAll('input').forEach(el => el.classList.remove('invalid'));
    };
    const showFieldError = (input, message) => {
        input.classList.add('invalid');
        const err = document.createElement('div');
        err.className = 'field-error';
        err.textContent = message;
        input.insertAdjacentElement('afterend', err);
    };

    const resetCountryAndTagFields = () => {
        countryInput.value = '';
        newCountryFields.classList.add('hidden');
        newCountryCodeInput.value = '';
        newCountryNameInput.value = '';
        newCountryFlagInput.value = '';
        addDnsForm.querySelectorAll('input[name="dns-tag"]').forEach(cb => { cb.checked = false; });
    };

    const openAddModal = () => {
        editingId = null;
        clearFieldErrors();
        addDnsForm.reset();
        resetCountryAndTagFields();
        modalTitle.textContent = t('addNewDns');
        submitBtn.textContent = t('addBtn');
        modal.classList.remove('hidden');
        nameInput.focus();
    };

    const openEditModal = (dns) => {
        editingId = dns.id;
        clearFieldErrors();
        resetCountryAndTagFields();
        nameInput.value = dns.name;
        primaryInput.value = dns.primary_ip;
        secondaryInput.value = dns.secondary_ip || '';
        ipv6Input.value = dns.ipv6 || '';
        countryInput.value = dns.country || '';
        (dns.tags || []).forEach(tag => {
            const cb = addDnsForm.querySelector(`input[name="dns-tag"][value="${tag}"]`);
            if (cb) cb.checked = true;
        });
        modalTitle.textContent = t('editDns');
        submitBtn.textContent = t('saveBtn');
        modal.classList.remove('hidden');
        nameInput.focus();
    };

    const closeModal = () => {
        modal.classList.add('hidden');
        clearFieldErrors();
        addDnsForm.reset();
        editingId = null;
    };

    addDnsBtn.onclick = openAddModal;
    closeBtn.onclick = closeModal;
    closeBtn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') closeModal(); });
    window.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });

    /* keep chart/canvas + ping loop intact; only refresh what's visibly different */
    const refreshTileStaticContent = (dns) => {
        const tile = tileElements.get(dns.id);
        if (!tile) return;
        const flag = COUNTRY_FLAGS[dns.country] || (customCountries[dns.country] && customCountries[dns.country].flag) || (dns.country ? '🏳️' : '⚙️');
        tile.querySelector('.dns-name .name-text').textContent = dns.name;
        tile.querySelector('.dns-name').firstChild.textContent = flag + ' ';
        const ipsEl = tile.querySelector('.dns-ips');
        ipsEl.textContent = `${dns.primary_ip}${dns.secondary_ip ? ', ' + dns.secondary_ip : ''}`;
        tile.querySelector('.dns-protocol').textContent = dns.ipv6 ? t('protocol46') : t('protocol4');
        let tagsRow = tile.querySelector('.tags-row');
        const tagsHtml = (dns.tags || []).map(tag => `<span class="tag-badge">${escapeHtml(t(TAG_LABELS[tag] || tag))}</span>`).join('');
        if (tagsHtml && !tagsRow) {
            tagsRow = document.createElement('div');
            tagsRow.className = 'tags-row';
            tile.querySelector('.dns-info').insertBefore(tagsRow, tile.querySelector('.local-only-note') || null);
        }
        if (tagsRow) tagsRow.innerHTML = tagsHtml;
        if (!tagsHtml && tagsRow) tagsRow.remove();
        tile.dataset.country = dns.country || 'CUSTOM';
    };

    addDnsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearFieldErrors();

        const name = nameInput.value.trim();
        const primary = primaryInput.value.trim();
        const secondary = secondaryInput.value.trim();
        const ipv6 = ipv6Input.value.trim();
        let hasError = false;

        if (!name || !primary) {
            if (!name) showFieldError(nameInput, t('requiredField'));
            if (!primary) showFieldError(primaryInput, t('requiredField'));
            hasError = true;
        }
        if (primary && !IPV4_RE.test(primary)) {
            showFieldError(primaryInput, t('invalidIp'));
            hasError = true;
        }
        if (secondary && !IPV4_RE.test(secondary)) {
            showFieldError(secondaryInput, t('invalidIp'));
            hasError = true;
        }
        if (ipv6 && !IPV6_RE.test(ipv6)) {
            showFieldError(ipv6Input, t('invalidIp6'));
            hasError = true;
        }

        let country = countryInput.value || null;
        if (country === '__new__') {
            const code = newCountryCodeInput.value.trim().toUpperCase();
            const label = newCountryNameInput.value.trim();
            const codeTaken = BASE_COUNTRIES.some((c) => c.code === code) || Object.prototype.hasOwnProperty.call(customCountries, code);
            if (!code || !label) {
                showFieldError(newCountryNameInput, t('requiredField'));
                hasError = true;
            } else if (codeTaken) {
                showFieldError(newCountryCodeInput, t('countryCodeTaken'));
                hasError = true;
            } else {
                customCountries[code] = { label, flag: newCountryFlagInput.value.trim() || '🏳️' };
                persistCustomCountries();
                rebuildCountryFilterOptions();
                rebuildFormCountryOptions();
                country = code;
            }
        }
        if (hasError) return;

        const tags = Array.from(addDnsForm.querySelectorAll('input[name="dns-tag"]:checked')).map(cb => cb.value);

        if (editingId) {
            const dns = dnsData.find(d => d.id === editingId);
            if (dns) {
                dns.name = name;
                dns.primary_ip = primary;
                dns.secondary_ip = secondary;
                dns.ipv6 = ipv6;
                dns.country = country;
                dns.tags = tags;
                refreshTileStaticContent(dns);
                if (dns.isCustom) {
                    persistCustomEntries();
                } else {
                    const overrides = JSON.parse(localStorage.getItem('dnsup_overrides') || '{}');
                    overrides[dns.id] = { name, primary_ip: primary, secondary_ip: secondary, ipv6, country, tags };
                    localStorage.setItem('dnsup_overrides', JSON.stringify(overrides));
                }
                renderAll();
            }
        } else {
            const newDns = {
                id: generateId(),
                name,
                primary_ip: primary,
                secondary_ip: secondary,
                ipv6,
                doh_url: null, // unknown for user-added servers -> honest "approximate" ping
                country,
                tags,
                isFavorite: false,
                isCustom: true,
                ping: null,
                pingType: null
            };
            dnsData.push(newDns);
            createDnsTile(newDns);
            renderAll();
            startPingLoop(newDns);
            persistCustomEntries();
        }
        closeModal();
    });

    /* =========================================================
     * Initial load (with persistence: theme/lang already applied,
     * favorites / custom entries / soft-deleted defaults restored)
     * ========================================================= */
    const dataErrorEl = document.getElementById('data-load-error');

    fetch('dns-data.json')
        .then(response => {
            if (!response.ok) throw new Error('bad response');
            return response.json();
        })
        .then(defaults => {
            const favorites = JSON.parse(localStorage.getItem('dnsup_favorites') || '[]');
            const deletedDefaults = JSON.parse(localStorage.getItem('dnsup_deleted_defaults') || '[]');
            const customEntries = JSON.parse(localStorage.getItem('dnsup_custom_entries') || '[]');

            const overrides = JSON.parse(localStorage.getItem('dnsup_overrides') || '{}');
            const defaultEntries = defaults
                .map(d => ({ ...d, id: 'default-' + d.primary_ip, isCustom: false }))
                .filter(d => !deletedDefaults.includes(d.id))
                .map(d => overrides[d.id] ? { ...d, ...overrides[d.id] } : d);

            const customFull = customEntries.map(d => ({ ...d, isCustom: true }));

            dnsData = [...defaultEntries, ...customFull].map(d => ({
                ...d,
                isFavorite: favorites.includes(d.id),
                ping: null,
                pingType: null
            }));

            dnsData.forEach(dns => createDnsTile(dns));
            renderAll();
            dnsData.forEach(dns => startPingLoop(dns));
        })
        .catch(() => {
            if (dataErrorEl) {
                dataErrorEl.textContent = t('dataLoadError');
                dataErrorEl.classList.remove('hidden');
            }
        });

    /* =========================================================
     * Speed Test — REAL download/upload/latency measurement
     *
     * METHODOLOGY (upgraded): the previous version had to use a no-cors
     * trick against speed.cloudflare.com because that endpoint doesn't
     * send Access-Control-Allow-Origin, so we couldn't read live progress —
     * only a final total. Serving our OWN test files from the SAME origin
     * removes the CORS problem entirely (no cross-origin request = nothing
     * for CORS to block), which is the technique real open-source speed
     * tools like OpenSpeedTest (MIT license) use. That needs two static
     * files deployed alongside this app:
     *   - speedtest-assets/download-payload.bin  (~20MB random data)
     *   - speedtest-assets/upload-target.bin      (0 bytes; just a POST target)
     * Any static host that allows POST to a static path works (plain
     * nginx/Apache do by default). If a host doesn't allow that (some
     * static hosts reject POST outright), we automatically fall back to
     * the earlier Cloudflare no-cors method, which still works everywhere
     * but only reports one final approximate number instead of live progress.
     * ========================================================= */
    const startSpeedTestBtn = document.getElementById('start-speed-test-btn');
    const speedValueEl = document.getElementById('speed-value');
    const pingValueEl = document.getElementById('ping-value');
    const downloadValueEl = document.getElementById('download-value');
    const uploadValueEl = document.getElementById('upload-value');
    const speedErrorEl = document.getElementById('speed-test-error');
    const speedMethodEl = document.getElementById('speed-method-note');
    const speedPhaseLabelEl = document.getElementById('speed-phase-label');

    /* ---------- live line chart (replaces the old rotating gauge) ---------- */
    const SPEED_CHART_POINTS = 50;
    let speedChart = null;
    const getSpeedChart = () => {
        if (speedChart) return speedChart;
        const canvas = document.getElementById('speed-live-chart');
        if (!canvas) return null;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.clientHeight || 220);
        gradient.addColorStop(0, 'rgba(96, 165, 250, 0.45)');
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0.02)');
        speedChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array(SPEED_CHART_POINTS).fill(''),
                datasets: [{
                    data: Array(SPEED_CHART_POINTS).fill(null),
                    borderColor: '#60a5fa',
                    backgroundColor: gradient,
                    fill: true,
                    borderWidth: 3,
                    pointRadius: 0,
                    tension: 0.35,
                    spanGaps: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false,
                scales: {
                    x: { display: false },
                    y: { display: false, min: 0 }
                },
                plugins: { legend: { display: false }, tooltip: { enabled: false } }
            }
        });
        return speedChart;
    };

    const resetSpeedChart = () => {
        const chart = getSpeedChart();
        if (!chart) return;
        chart.data.datasets[0].data = Array(SPEED_CHART_POINTS).fill(null);
        chart.update('none');
    };

    const pushSpeedSample = (mbps) => {
        const chart = getSpeedChart();
        speedValueEl.textContent = mbps.toFixed(2);
        if (!chart) return;
        const data = chart.data.datasets[0].data;
        data.shift();
        data.push(mbps);
        chart.update('none');
    };

    const setPhaseLabel = (key) => {
        if (speedPhaseLabelEl) speedPhaseLabelEl.textContent = key ? t(key) : '';
    };

    // Fallback mode can't stream live per-sample data (see methodology note above), so instead
    // of faking granular chart points we show a simple "measuring…" pulse on the big number
    // and leave the chart flat — honest about what we actually know during that phase.
    let measuringPulseHandle = null;
    const startMeasuringPulse = () => {
        speedValueEl.parentElement.classList.add('is-measuring');
        let dots = 0;
        measuringPulseHandle = setInterval(() => {
            dots = (dots + 1) % 4;
            speedValueEl.textContent = t('testing').replace(/\.*$/, '') + '.'.repeat(dots);
        }, 400);
    };
    const stopMeasuringPulse = () => {
        clearInterval(measuringPulseHandle);
        speedValueEl.parentElement.classList.remove('is-measuring');
    };

    const LOCAL_DOWNLOAD_URL = 'speedtest-assets/download-payload.bin';
    const LOCAL_UPLOAD_URL = 'speedtest-assets/upload-target.bin';
    const DL_THREADS = 4;
    const UL_THREADS = 3;

    let localSupport = null; // cached after first probe: { download: bool, upload: bool }
    const detectLocalSpeedTestSupport = async () => {
        if (localSupport) return localSupport;
        const probe = async (url, opts) => {
            try {
                const controller = new AbortController();
                const timer = setTimeout(() => controller.abort(), 3000);
                const res = await fetch(`${url}?probe=${Math.random()}`, { ...opts, signal: controller.signal });
                clearTimeout(timer);
                return res.ok;
            } catch (e) { return false; }
        };
        const [dl, ul] = await Promise.all([
            probe(LOCAL_DOWNLOAD_URL, { method: 'GET', cache: 'no-store' }),
            probe(LOCAL_UPLOAD_URL, { method: 'POST', cache: 'no-store', body: new Blob([new Uint8Array(1)]) })
        ]);
        localSupport = { download: dl, upload: ul };
        return localSupport;
    };

    const generateRandomBlob = (sizeBytes) => {
        const arr = new Uint32Array(Math.ceil(sizeBytes / 4));
        for (let i = 0; i < arr.length; i++) arr[i] = (Math.random() * 4294967296) >>> 0;
        return new Blob([arr], { type: 'application/octet-stream' });
    };

    /* ---------- LOCAL (same-origin, real live progress) engine ---------- */
    const measureLocalDirection = (url, method, durationMs, onSample) => new Promise((resolve) => {
        const threads = method === 'GET' ? DL_THREADS : UL_THREADS;
        let totalLoaded = 0;
        let stopped = false;
        const start = performance.now();
        const active = [];

        const report = () => {
            const elapsed = (performance.now() - start) / 1000;
            const mbps = elapsed > 0.05 ? (totalLoaded * 8) / (elapsed * 1e6) : 0;
            onSample(mbps);
        };

        const launch = (i) => {
            if (stopped) return;
            const xhr = new XMLHttpRequest();
            active[i] = xhr;
            let lastLoaded = 0;
            if (method === 'GET') {
                xhr.open('GET', `${url}?n=${Math.random()}-${i}`, true);
                xhr.responseType = 'arraybuffer';
                xhr.onprogress = (e) => {
                    const delta = e.loaded - lastLoaded;
                    if (delta > 0) totalLoaded += delta;
                    lastLoaded = e.loaded;
                    report();
                };
                xhr.onload = () => { if (!stopped) launch(i); };
                xhr.onerror = () => { if (!stopped) launch(i); };
                xhr.send();
            } else {
                const chunk = generateRandomBlob(4 * 1024 * 1024);
                xhr.open('POST', `${url}?n=${Math.random()}-${i}`, true);
                xhr.upload.onprogress = (e) => {
                    const delta = e.loaded - lastLoaded;
                    if (delta > 0) totalLoaded += delta;
                    lastLoaded = e.loaded;
                    report();
                };
                xhr.upload.onload = () => { if (lastLoaded === 0) totalLoaded += chunk.size; };
                xhr.onload = () => { if (!stopped) launch(i); };
                xhr.onerror = () => { if (!stopped) launch(i); };
                xhr.setRequestHeader('Content-Type', 'application/octet-stream');
                xhr.send(chunk);
            }
        };

        for (let i = 0; i < threads; i++) launch(i);

        setTimeout(() => {
            stopped = true;
            active.forEach((x) => { try { x.abort(); } catch (e) {} });
            const elapsed = (performance.now() - start) / 1000;
            resolve(elapsed > 0 ? (totalLoaded * 8) / (elapsed * 1e6) : 0);
        }, durationMs);
    });

    const measureLocalLatency = async () => {
        const samples = [];
        for (let i = 0; i < 5; i++) {
            const start = performance.now();
            await fetch(`${LOCAL_DOWNLOAD_URL}?n=${Math.random()}&ping=1`, {
                method: 'GET', cache: 'no-store', headers: { Range: 'bytes=0-0' }
            });
            samples.push(performance.now() - start);
        }
        // report the minimum (least queueing/jitter noise), like real speed-test tools do
        return Math.round(Math.min(...samples));
    };

    /* ---------- FALLBACK (cross-origin no-cors, approximate) engine ---------- */
    const measureRemoteLatency = async () => {
        const samples = [];
        for (let i = 0; i < 4; i++) {
            const start = performance.now();
            await fetch(`https://speed.cloudflare.com/__down?bytes=0&t=${Date.now()}-${i}`, { mode: 'no-cors', cache: 'no-store' });
            samples.push(performance.now() - start);
        }
        return Math.round(samples.reduce((a, b) => a + b, 0) / samples.length);
    };

    const measureRemoteDownload = async (bytes) => {
        await fetch(`https://speed.cloudflare.com/__down?bytes=100000&t=${Date.now()}`, { mode: 'no-cors', cache: 'no-store' });
        const start = performance.now();
        const res = await fetch(`https://speed.cloudflare.com/__down?bytes=${bytes}&t=${Date.now()}`, { mode: 'no-cors', cache: 'no-store' });
        await res.blob();
        const elapsed = (performance.now() - start) / 1000;
        return elapsed > 0 ? (bytes * 8) / (elapsed * 1e6) : 0;
    };

    const measureRemoteUpload = async (bytes) => {
        const makeBlob = (n) => new Blob([new Uint8Array(n)]);
        await fetch('https://speed.cloudflare.com/__up', { method: 'POST', mode: 'no-cors', body: makeBlob(100000) });
        const start = performance.now();
        await fetch('https://speed.cloudflare.com/__up', { method: 'POST', mode: 'no-cors', body: makeBlob(bytes) });
        const elapsed = (performance.now() - start) / 1000;
        return elapsed > 0 ? (bytes * 8) / (elapsed * 1e6) : 0;
    };

    startSpeedTestBtn.addEventListener('click', async () => {
        startSpeedTestBtn.disabled = true;
        startSpeedTestBtn.textContent = t('testing');
        speedErrorEl.classList.add('hidden');
        pingValueEl.textContent = '-';
        downloadValueEl.textContent = '-';
        uploadValueEl.textContent = '-';
        speedValueEl.textContent = '0.00';
        resetSpeedChart();
        setPhaseLabel(null);

        try {
            const support = await detectLocalSpeedTestSupport();

            if (support.download) {
                if (speedMethodEl) { speedMethodEl.textContent = t('speedMethodLocal'); speedMethodEl.classList.remove('hidden'); }
                setPhaseLabel('pingLabel');
                const ping = await measureLocalLatency();
                pingValueEl.textContent = ping;

                setPhaseLabel('downloadLabel');
                const downMbps = await measureLocalDirection(LOCAL_DOWNLOAD_URL, 'GET', 8000, pushSpeedSample);
                downloadValueEl.textContent = downMbps.toFixed(2);

                if (support.upload) {
                    setPhaseLabel('uploadLabel');
                    resetSpeedChart();
                    const upMbps = await measureLocalDirection(LOCAL_UPLOAD_URL, 'POST', 8000, pushSpeedSample);
                    uploadValueEl.textContent = upMbps.toFixed(2);
                } else {
                    // local download works but the host rejects POST to a static file
                    // (e.g. GitHub Pages returns 405) — fall back to the remote approximate
                    // method just for the upload leg instead of leaving it blank
                    if (speedMethodEl) { speedMethodEl.textContent = t('speedMethodUploadFallback'); speedMethodEl.classList.remove('hidden'); }
                    setPhaseLabel('uploadLabel');
                    startMeasuringPulse();
                    const upMbps = await measureRemoteUpload(5_000_000);
                    stopMeasuringPulse();
                    uploadValueEl.textContent = upMbps.toFixed(2);
                    pushSpeedSample(upMbps);
                }
            } else {
                // fallback: same Cloudflare-based approximate method as before — no live
                // per-sample data available, so we're honest about "measuring" instead of
                // faking a granular chart
                if (speedMethodEl) { speedMethodEl.textContent = t('speedMethodFallback'); speedMethodEl.classList.remove('hidden'); }
                setPhaseLabel('pingLabel');
                const ping = await measureRemoteLatency();
                pingValueEl.textContent = ping;

                setPhaseLabel('downloadLabel');
                startMeasuringPulse();
                const downMbps = await measureRemoteDownload(20_000_000);
                stopMeasuringPulse();
                downloadValueEl.textContent = downMbps.toFixed(2);
                pushSpeedSample(downMbps);

                setPhaseLabel('uploadLabel');
                startMeasuringPulse();
                const upMbps = await measureRemoteUpload(5_000_000);
                stopMeasuringPulse();
                uploadValueEl.textContent = upMbps.toFixed(2);
                pushSpeedSample(upMbps);
            }
        } catch (err) {
            speedErrorEl.textContent = t('speedTestError');
            speedErrorEl.classList.remove('hidden');
        } finally {
            stopMeasuringPulse();
            setPhaseLabel(null);
            startSpeedTestBtn.disabled = false;
            startSpeedTestBtn.textContent = t('go');
        }
    });

    /* initial i18n pass */
    applyLanguage();

    /* PWA: register service worker for the app shell only (best-effort, never blocks the UI) */
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('service-worker.js').catch(() => {
                /* offline install just won't be available — the app still works online */
            });
        });
    }
});
