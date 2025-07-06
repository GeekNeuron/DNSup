document.addEventListener('DOMContentLoaded', () => {
    // Theme switcher
    const header = document.getElementById('header');
    header.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });

    // View switcher
    const footerItems = document.querySelectorAll('.footer-item');
    const mainViews = {
        'dns-check-view': document.getElementById('dns-check-view'),
        'speed-test-view': document.getElementById('speed-test-view')
    };

    footerItems.forEach(item => {
        item.addEventListener('click', () => {
            footerItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const viewId = item.getAttribute('data-view');
            Object.values(mainViews).forEach(view => view.classList.add('hidden'));
            mainViews[viewId].classList.remove('hidden');
        });
    });

    // DNS Check logic
    const dnsListContainer = document.getElementById('dns-list');
    const favoritesListContainer = document.getElementById('favorites-list');
    let dnsData = [];
    let charts = {};

    const getPingColor = (ping) => {
        if (ping < 0) return '#888';
        if (ping < 100) return 'var(--ping-green)';
        if (ping < 200) return 'var(--ping-yellow)';
        return 'var(--ping-red)';
    };
    
    const createDnsTile = (dns, index) => {
        const tile = document.createElement('div');
        tile.className = 'dns-tile';
        tile.dataset.index = index;

        const chartId = `chart-${index}`;
        tile.innerHTML = `
            <div class="dns-info">
                <div class="dns-name">${dns.name}</div>
                <div class="dns-ips">
                    ${dns.primary_ip}<br>
                    ${dns.secondary_ip || ''}
                </div>
                <span class="dns-protocol">${dns.ipv6 ? 'IPv4/IPv6' : 'IPv4'}</span>
            </div>
            <div class="dns-actions">
                <div class="ping-display" id="ping-${index}">-</div>
                <span class="material-icons favorite-btn ${dns.isFavorite ? 'favorited' : ''}" data-index="${index}">star_border</span>
            </div>
            <div class="live-chart-container">
                <canvas id="${chartId}"></canvas>
            </div>
        `;
        
        // Add to correct container
        if(dns.isFavorite) {
            favoritesListContainer.appendChild(tile);
        } else {
            dnsListContainer.appendChild(tile);
        }

        // Initialize Chart.js
        const ctx = document.getElementById(chartId).getContext('2d');
        charts[index] = new Chart(ctx, {
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
        });

        // Add favorite button functionality
        tile.querySelector('.favorite-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(index);
        });
    };
    
    const renderDnsList = () => {
        dnsListContainer.innerHTML = '';
        favoritesListContainer.innerHTML = '';

        dnsData.forEach((dns, index) => createDnsTile(dns, index));
        updateFavoritesSeparator();
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
    
    const measurePing = (dns, index) => {
        const startTime = Date.now();
        // This is a simulated ping. Real ICMP ping is not possible from browser JS.
        // We use an image load from the DNS provider's domain as a proxy.
        const img = new Image();
        img.src = `https://_dns-probe.${dns.primary_ip}.com/favicon.ico?t=${startTime}`; // A trick to bypass cache
        
        const timeout = 2000;
        let timedOut = false;

        const timer = setTimeout(() => {
            timedOut = true;
            updatePing(index, -1); // -1 indicates timeout
        }, timeout);

        img.onload = () => {
            if (timedOut) return;
            clearTimeout(timer);
            const endTime = Date.now();
            const ping = endTime - startTime;
            updatePing(index, ping);
        };
        
        img.onerror = () => {
             if (timedOut) return;
             clearTimeout(timer);
             // Error can still mean the server is reachable, so we measure time
             const endTime = Date.now();
             const ping = endTime - startTime;
             updatePing(index, ping);
        };
    };

    const updatePing = (index, ping) => {
        dnsData[index].ping = ping;
        const pingDisplay = document.getElementById(`ping-${index}`);
        const chart = charts[index];

        if (pingDisplay && chart) {
            pingDisplay.textContent = ping < 0 ? 'Timeout' : `${ping} ms`;
            pingDisplay.style.color = getPingColor(ping);
            
            // Update chart
            chart.data.datasets[0].data.shift();
            chart.data.datasets[0].data.push(ping < 0 ? null : ping);
            chart.data.datasets[0].borderColor = getPingColor(ping);
            chart.update();
        }
    };
    
    const startPingTests = () => {
        dnsData.forEach((dns, index) => {
            measurePing(dns, index);
            setInterval(() => measurePing(dns, index), 5000);
        });
    };

    const toggleFavorite = (index) => {
        dnsData[index].isFavorite = !dnsData[index].isFavorite;
        // Re-render the whole list to move the tile
        renderDnsList(); 
        // We need to re-start the ping test for the moved tile to keep its state
        measurePing(dnsData[index], index);
    };

    // Sort by ping
    document.getElementById('sort-by-ping').addEventListener('click', () => {
        dnsData.sort((a, b) => {
            // Put favorited items first
            if (a.isFavorite && !b.isFavorite) return -1;
            if (!a.isFavorite && b.isFavorite) return 1;

            // Then sort by ping
            const pingA = a.ping ?? Infinity;
            const pingB = b.ping ?? Infinity;
            if (pingA < 0) return 1; // Timeouts go to the end
            if (pingB < 0) return -1;
            return pingA - pingB;
        });
        renderDnsList();
    });

    // Add DNS Modal
    const modal = document.getElementById('add-dns-modal');
    const addDnsBtn = document.getElementById('add-dns-btn');
    const closeBtn = document.querySelector('.close-btn');
    const addDnsForm = document.getElementById('add-dns-form');

    addDnsBtn.onclick = () => modal.classList.remove('hidden');
    closeBtn.onclick = () => modal.classList.add('hidden');
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.classList.add('hidden');
        }
    };

    addDnsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newDns = {
            name: document.getElementById('dns-name-input').value,
            primary_ip: document.getElementById('dns-primary-ip-input').value,
            secondary_ip: document.getElementById('dns-secondary-ip-input').value,
            ipv6: document.getElementById('dns-ipv6-input').value,
            isFavorite: false
        };
        dnsData.push(newDns);
        createDnsTile(newDns, dnsData.length - 1);
        measurePing(newDns, dnsData.length - 1);
        modal.classList.add('hidden');
        addDnsForm.reset();
    });
    
    // Initial load
    fetch('dns-data.json')
        .then(response => response.json())
        .then(data => {
            dnsData = data.map(dns => ({...dns, isFavorite: false, ping: null}));
            renderDnsList();
            startPingTests();
        });

    // Speed Test logic (Simulated)
    const startSpeedTestBtn = document.getElementById('start-speed-test-btn');
    const speedValueEl = document.getElementById('speed-value');
    const pingValueEl = document.getElementById('ping-value');
    const downloadValueEl = document.getElementById('download-value');
    const uploadValueEl = document.getElementById('upload-value');

    startSpeedTestBtn.addEventListener('click', () => {
        startSpeedTestBtn.disabled = true;
        startSpeedTestBtn.textContent = 'TESTING...';

        // Reset values
        pingValueEl.textContent = '-';
        downloadValueEl.textContent = '-';
        uploadValueEl.textContent = '-';
        speedValueEl.textContent = '0.00';
        
        // 1. Ping test (simulated)
        setTimeout(() => {
            const ping = Math.floor(Math.random() * (150 - 10 + 1)) + 10;
            pingValueEl.textContent = ping;
            
            // 2. Download test (simulated)
            runSpeedAnimation('download', (finalDownloadSpeed) => {
                downloadValueEl.textContent = finalDownloadSpeed.toFixed(2);
                
                // 3. Upload test (simulated)
                runSpeedAnimation('upload', (finalUploadSpeed) => {
                    uploadValueEl.textContent = finalUploadSpeed.toFixed(2);
                    startSpeedTestBtn.disabled = false;
                    startSpeedTestBtn.textContent = 'GO';
                });
            });
        }, 500);
    });

    function runSpeedAnimation(type, callback) {
        let currentSpeed = 0;
        const targetSpeed = Math.random() * (type === 'download' ? 100 : 20); // Simulate speeds
        const duration = 2500; // 2.5 seconds
        const steps = 50;
        const increment = targetSpeed / steps;

        const interval = setInterval(() => {
            currentSpeed += increment;
            if (currentSpeed >= targetSpeed) {
                currentSpeed = targetSpeed;
                clearInterval(interval);
                callback(currentSpeed);
            }
            speedValueEl.textContent = currentSpeed.toFixed(2);
        }, duration / steps);
    }
});
