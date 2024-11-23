    document.addEventListener('DOMContentLoaded', () => {
    // Platform info
    document.getElementById('platform').textContent = navigator.platform;

    // OS info (Browser-specific, not available in all cases)
    const os = navigator.userAgent;
    document.getElementById('os').textContent = getOSInfo(os);

    // CPU / GPU info
    document.getElementById('cpuGpuInfo').textContent = `${navigator.hardwareConcurrency} cores`;

    // Memory info
    if (navigator.deviceMemory) {
        document.getElementById('memoryCapacity').textContent = `${navigator.deviceMemory} GB`;
    } else {
        document.getElementById('memoryCapacity').textContent = 'Unavailable';
    }

    // Storage info
    if (navigator.storage && navigator.storage.estimate) {
        navigator.storage.estimate().then(estimate => {
            document.getElementById('storageCapacity').textContent = `${(estimate.quota / (1024 * 1024 * 1024)).toFixed(2)} GB`;
        });
    } else {
        document.getElementById('storageCapacity').textContent = 'Unavailable';
    }

    // Fetching public IP address
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('ipAddress').textContent = data.ip;
        })
        .catch(() => {
            document.getElementById('ipAddress').textContent = 'Error fetching IP';
        });    

    // Browser info
    document.getElementById('browserInfo').textContent = navigator.userAgent;

    // User Agent
    document.getElementById('userAgent').textContent = navigator.userAgent;
    // Function to extract OS information from User Agent string
    function getOSInfo(userAgent) {
    const os = {
        "Windows": /Windows NT/i,
        "MacOS": /Macintosh/i,
        "Linux": /Linux/i,
        "Android": /Android/i,
        "iOS": /iPhone|iPad/i
    };

    for (let key in os) {
        if (os[key].test(userAgent)) {
            return key;
        }
    }
    return "Unknown";
    }
    
    });

    let startTime = Date.now(); // Waktu mulai halaman
    // Update uptime, date, and time setiap detik
    setInterval(() => {
    // Hitung waktu berlalu untuk uptime
    let elapsed = Date.now() - startTime;
    let seconds = Math.floor(elapsed / 1000) % 60;
    let minutes = Math.floor(elapsed / (1000 * 60)) % 60;
    let hours = Math.floor(elapsed / (1000 * 60 * 60));

    // Format uptime jadi HH:MM:SS
    let formattedUptime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('uptimeValue').textContent = formattedUptime;

    // Tampilkan tanggal real-time
    const now = new Date();
    const dateString = now.toLocaleDateString(); // Format tanggal (MM/DD/YYYY)
    document.getElementById('dateValue').textContent = dateString;

    // Tampilkan waktu real-time
    const timeString = now.toLocaleTimeString(); // Format waktu (HH:MM:SS)
    document.getElementById('timeValue').textContent = timeString;

    }, 1000); // Update setiap 1 detik