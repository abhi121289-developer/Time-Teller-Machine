/**
 * Time Teller Machine - Digital Clock with Multiple Time Zones
 * A beautiful application that displays current time across different time zones
 */

class TimeTellerMachine {
    constructor() {
        this.clocks = new Map();
        this.container = document.getElementById('clocks-container');
        this.selectElement = document.getElementById('timezone-select');
        this.addBtn = document.getElementById('add-btn');
        
        this.init();
    }

    init() {
        // Set up event listeners
        this.addBtn.addEventListener('click', () => this.handleAddTimezone());
        this.selectElement.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleAddTimezone();
        });

        // Add default timezones
        this.addTimezone('UTC');
        this.addTimezone('America/New_York');
        this.addTimezone('Europe/London');
        this.addTimezone('Asia/Tokyo');

        // Start the clock update loop
        this.startClockUpdates();
    }

    handleAddTimezone() {
        const timezone = this.selectElement.value;
        if (timezone) {
            this.addTimezone(timezone);
        }
    }

    addTimezone(timezone) {
        if (this.clocks.has(timezone)) {
            alert('This timezone is already added!');
            return;
        }

        // Create clock object
        const clockData = {
            timezone: timezone,
            format24: true,
            element: null
        };

        // Add to map
        this.clocks.set(timezone, clockData);

        // Create DOM element
        this.createClockElement(timezone, clockData);

        // Reset select
        this.selectElement.value = '';

        // Update the clock immediately
        this.updateClock(timezone);
    }

    removeTimezone(timezone) {
        if (this.clocks.has(timezone)) {
            const clockData = this.clocks.get(timezone);
            if (clockData.element) {
                clockData.element.remove();
            }
            this.clocks.delete(timezone);
        }
    }

    createClockElement(timezone, clockData) {
        const card = document.createElement('div');
        card.className = 'clock-card';
        card.dataset.timezone = timezone;

        card.innerHTML = `
            <div class="clock-header">
                <div class="timezone-name"></div>
                <div class="utc-offset"></div>
            </div>
            <div class="time-display"></div>
            <div class="date-display"></div>
            <div class="format-indicator"></div>
            <div class="clock-footer">
                <button class="remove-btn">Remove</button>
            </div>
        `;

        // Add event listener for format toggle
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('remove-btn')) {
                this.toggleFormat(timezone);
            }
        });

        // Add event listener for remove button
        const removeBtn = card.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => {
            this.removeTimezone(timezone);
        });

        this.container.appendChild(card);
        clockData.element = card;
    }

    toggleFormat(timezone) {
        if (this.clocks.has(timezone)) {
            const clockData = this.clocks.get(timezone);
            clockData.format24 = !clockData.format24;
            this.updateClock(timezone);
        }
    }

    getUTCOffset(timezone) {
        try {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });

            const parts = formatter.formatToParts(now);
            const tzDate = new Date(
                parseInt(parts.find(p => p.type === 'year').value),
                parseInt(parts.find(p => p.type === 'month').value) - 1,
                parseInt(parts.find(p => p.type === 'day').value),
                parseInt(parts.find(p => p.type === 'hour').value),
                parseInt(parts.find(p => p.type === 'minute').value),
                parseInt(parts.find(p => p.type === 'second').value)
            );

            const offset = now.getTime() - tzDate.getTime();
            const hours = Math.floor(offset / 3600000);
            const minutes = Math.abs(Math.floor((offset % 3600000) / 60000));
            const sign = hours > 0 ? '+' : '-';
            const absHours = Math.abs(hours);
            
            return `${sign}${String(absHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        } catch (e) {
            return 'UTC';
        }
    }

    formatTime(timezone, use24Hour) {
        try {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: !use24Hour
            });

            return formatter.format(now);
        } catch (e) {
            return 'Invalid';
        }
    }

    formatDate(timezone) {
        try {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });

            const parts = formatter.formatToParts(now);
            const month = parts.find(p => p.type === 'month').value;
            const day = parts.find(p => p.type === 'day').value;
            const year = parts.find(p => p.type === 'year').value;

            return `${month}/${day}/${year}`;
        } catch (e) {
            return 'Invalid';
        }
    }

    getTimezoneAbbr(timezone) {
        const parts = timezone.split('/');
        if (parts.length === 2) {
            return parts[1];
        }
        return timezone;
    }

    updateClock(timezone) {
        if (!this.clocks.has(timezone)) return;

        const clockData = this.clocks.get(timezone);
        const card = clockData.element;

        if (!card) return;

        const time = this.formatTime(timezone, clockData.format24);
        const date = this.formatDate(timezone);
        const offset = this.getUTCOffset(timezone);
        const tzName = this.getTimezoneAbbr(timezone);
        const formatText = clockData.format24 ? '24-hour' : '12-hour';

        // Update elements
        card.querySelector('.timezone-name').textContent = `${tzName}`;
        card.querySelector('.utc-offset').textContent = `UTC ${offset}`;
        card.querySelector('.time-display').textContent = time;
        card.querySelector('.date-display').textContent = date;
        card.querySelector('.format-indicator').textContent = `${formatText} format`;
    }

    startClockUpdates() {
        // Update all clocks immediately
        this.clocks.forEach((clockData, timezone) => {
            this.updateClock(timezone);
        });

        // Update every second
        setInterval(() => {
            this.clocks.forEach((clockData, timezone) => {
                this.updateClock(timezone);
            });
        }, 1000);
    }
}

// Initialize the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new TimeTellerMachine();
    });
} else {
    new TimeTellerMachine();
}