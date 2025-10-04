// Wakesys Temperature Widget - Vanilla JavaScript Implementation
// No jQuery required - uses native fetch API with JSONP fallback

class TemperatureMonitor {
    constructor() {
        // Get school name from global variable set in HTML
        this.schoolName = window.WAKESYS_SCHOOL_NAME || 'wakelake';
        this.apiUrl = '';
        this.refreshInterval = null;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        // Initial setup
        this.updateApiUrl();
        this.fetchTemperature();

        // Auto-refresh every 30 minutes
        this.startAutoRefresh(1800000);
    }

    updateApiUrl() {
        this.apiUrl = `https://${this.schoolName}.wakesys.com/api/sensors.php`;
    }

    startAutoRefresh(interval = 1800000) {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
        this.refreshInterval = setInterval(() => {
            this.fetchTemperature();
        }, interval);
    }

    stopAutoRefresh() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
    }

    showLoading() {
        document.getElementById('loading').style.display = 'block';
        document.getElementById('temperatureInfo').style.display = 'none';
        document.getElementById('error').style.display = 'none';
    }

    showError() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('temperatureInfo').style.display = 'none';
        document.getElementById('error').style.display = 'block';
    }

    showTemperature(data) {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').style.display = 'none';
        document.getElementById('temperatureInfo').style.display = 'block';

        // Update temperature display
        const temperature = data.col_value ? data.col_value.replace('.', ',') : '–';
        const unit = data.col_unit || '–';
        const lastUpdate = data.col_datetime || '–';

        document.getElementById('temperature').textContent = temperature;
        document.getElementById('temperatureUnit').textContent = unit;
        document.getElementById('temperatureLastUpdate').textContent = lastUpdate;
    }

    // JSONP implementation for cross-origin requests
    fetchWithJSONP(url, callback) {
        return new Promise((resolve, reject) => {
            // Create unique callback name
            const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
            
            // Create script element
            const script = document.createElement('script');
            
            // Set up global callback
            window[callbackName] = function(data) {
                // Clean up
                delete window[callbackName];
                document.body.removeChild(script);
                resolve(data);
            };

            // Handle errors
            script.onerror = function() {
                delete window[callbackName];
                document.body.removeChild(script);
                reject(new Error('JSONP request failed'));
            };

            // Set script source with callback parameter
            script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
            
            // Add script to document
            document.body.appendChild(script);
        });
    }

    async fetchTemperature() {
        if (!this.schoolName || this.schoolName.trim() === '') {
            this.showError();
            return;
        }

        this.showLoading();

        try {
            // Try modern fetch first (may fail due to CORS)
            let data;
            try {
                const response = await fetch(this.apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                data = await response.json();
            } catch (fetchError) {
                // Fallback to JSONP for cross-origin requests
                data = await this.fetchWithJSONP(this.apiUrl);
            }

            this.showTemperature(data);

        } catch (error) {
            console.error('Error fetching temperature:', error);
            this.showError();
        }
    }

    // Public method to get current temperature data
    getCurrentData() {
        return {
            temperature: document.getElementById('temperature').textContent,
            unit: document.getElementById('temperatureUnit').textContent,
            lastUpdate: document.getElementById('temperatureLastUpdate').textContent
        };
    }
}

// Initialize the temperature monitor when the script loads
const temperatureMonitor = new TemperatureMonitor();

// Make it globally accessible for debugging/external use
window.temperatureMonitor = temperatureMonitor;
