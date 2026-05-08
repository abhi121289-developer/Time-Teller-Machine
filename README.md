# ⏰ Time Teller Machine

A beautiful, interactive digital clock application that displays the current time across multiple time zones simultaneously. Perfect for tracking time across different global locations!

## 🌟 Features

- **🕐 Real-Time Updates** - Clock updates every second automatically
- **🌍 20+ Time Zones** - Support for major cities worldwide including:
  - North America (New York, Los Angeles, Chicago, Denver)
  - Europe (London, Paris, Berlin, Madrid, Moscow)
  - Asia (Dubai, India, Bangkok, Shanghai, Hong Kong, Tokyo, Singapore)
  - Australia/Pacific (Sydney, Melbourne, Auckland)
  - UTC

- **🔄 Format Toggle** - Click on any clock to switch between 12-hour and 24-hour formats
- **➕ Dynamic Management** - Easily add or remove time zones with a simple dropdown
- **📅 Complete Information** - Each clock displays:
  - Current date (MM/DD/YYYY format)
  - Time with seconds precision
  - AM/PM indicator (12-hour format)
  - UTC offset
  - Current time zone name
  - Current format (24-hour or 12-hour)

- **🎨 Modern UI** - Glassmorphism design with:
  - Beautiful gradient background
  - Smooth animations and transitions
  - Hover effects and interactive elements
  - Professional typography

- **📱 Fully Responsive** - Works seamlessly on:
  - Desktop computers
  - Tablets
  - Mobile devices

## 🚀 Quick Start

1. **Open the application:**
   - Simply open `index.html` in your web browser

2. **Add time zones:**
   - Select a time zone from the dropdown menu
   - Click the "Add" button (or press Enter)
   - The new clock will appear instantly

3. **Toggle time format:**
   - Click on any clock card to toggle between 12-hour and 24-hour formats

4. **Remove time zones:**
   - Click the "Remove" button on any clock card to delete it

5. **Default zones:**
   - The app loads with 4 default zones: UTC, New York, London, and Tokyo

## 📁 Project Structure

```
Time-Teller-Machine/
├── index.html       # Main HTML structure
├── styles.css       # Styling and animations
├── script.js        # JavaScript logic
└── README.md        # This file
```

## 💻 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Glassmorphism UI, CSS Grid, Flexbox, Animations
- **Vanilla JavaScript** - No dependencies required
  - Intl.DateTimeFormat API for accurate timezone conversions
  - Object-oriented programming with TimeTellerMachine class
  - Event-driven architecture

## 🎯 How It Works

The application uses JavaScript's `Intl.DateTimeFormat` API to accurately convert times to different time zones. Here's the process:

1. **Timezone Detection** - Gets current time formatted for specified timezone
2. **Format Conversion** - Converts 24-hour time to 12-hour format if needed
3. **UTC Offset Calculation** - Computes the UTC offset for each timezone
4. **Real-Time Updates** - Updates all clocks every second
5. **User Interactions** - Allows adding, removing, and format toggling

## 🎨 Customization

You can customize the application by:

1. **Adding more time zones:**
   - Edit the `<option>` elements in `index.html` within the `#timezone-select` dropdown

2. **Changing the color scheme:**
   - Modify the gradient colors in `styles.css` (currently purple gradient: #667eea to #764ba2)
   - Update the background and hover colors

3. **Adjusting layout:**
   - Modify the `grid-template-columns` in `.clocks-grid` to change the number of columns
   - Adjust gap spacing for different card spacing

## 🔧 Browser Compatibility

- Chrome/Edge 24+
- Firefox 29+
- Safari 10+
- Opera 15+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Code Example

```javascript
// Create a new instance of Time Teller Machine
const timeTeller = new TimeTellerMachine();

// Add a timezone
timeTeller.addTimezone('America/Los_Angeles');

// Toggle between 12 and 24-hour format
timeTeller.toggleFormat('America/Los_Angeles');

// Remove a timezone
timeTeller.removeTimezone('America/Los_Angeles');
```

## 🐛 Known Limitations

- Daylight Saving Time (DST) is handled automatically by the browser's timezone database
- Time zones must be valid IANA timezone identifiers
- The app requires JavaScript to be enabled

## 🔮 Future Enhancements

- Save favorite time zones in localStorage
- Dark/Light theme toggle
- Analog clock display option
- 12-hour format by default
- Search functionality for time zones
- Timezone conversion calculator
- Alarm functionality

## 📄 License

Free to use for personal and commercial projects.

## 👨‍💻 Author

Created as a modern web application for tracking time across global locations.

---

**Enjoy tracking time across the world! ⏰🌍**
