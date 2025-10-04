# Wakesys Temperature Widget

A minimalistic, vanilla JavaScript widget that displays real-time water temperature data from the Wakesys sensors API. Designed for easy integration into park websites.

## Features

- **No Dependencies**: Pure vanilla JavaScript, no jQuery required
- **Minimalistic Design**: Clean, simple styling that inherits from parent website
- **Cross-Origin Support**: JSONP fallback for cross-origin API requests  
- **Auto-refresh**: Updates temperature data every 30 seconds
- **Easy Integration**: Simple copy-paste integration into any website

## Quick Integration

1. **Copy the files** to your website directory:
   - `wakesys-temperature.js`
   - `wakesys-temperature.css`

2. **Add to your HTML** where you want the temperature display:
```html
<link href="wakesys-temperature.css" rel="stylesheet">

<div class="wakesys-temperature-widget">
    <div class="temperature-display">
        <span class="loading" id="loading">Loading...</span>
        <div class="temperature-info" id="temperatureInfo" style="display: none;">
            Water temperature: 
            <b>
                <span id="temperature">&ndash;</span>
                <span id="temperatureUnit">&ndash;</span>
            </b>
            <br>
            Last update: <span id="temperatureLastUpdate">&ndash;</span>
        </div>
        <div class="error" id="error" style="display: none;">
            Temperature data unavailable
        </div>
    </div>
</div>

<script>
    var WAKESYS_SCHOOL_NAME = 'yourparkname'; // Replace with your park's subdomain
</script>
<script src="wakesys-temperature.js"></script>
```

3. **Configure your park name**: Change `'yourparkname'` to your actual Wakesys subdomain

## API Integration

Connects to: `https://PARKNAME.wakesys.com/api/sensors.php`

Expected response:
```json
{
  "col_value": "23.5",
  "col_unit": "°C", 
  "col_datetime": "2024-01-15 14:30:00"
}
```

## Styling

The widget uses minimal CSS that inherits your website's font family and styling. The CSS is scoped with `.wakesys-temperature-widget` to avoid conflicts.

Key classes:
- `.wakesys-temperature-widget` - Main container
- `.loading` - Loading state (gray, italic)
- `.error` - Error state (red, italic)
- `.temperature-info` - Temperature display (inherits parent styles)

## Browser Support

- Modern browsers with ES6+ support
- Chrome 60+, Firefox 55+, Safari 12+, Edge 79+

## Files

- `index.html` - Example implementation
- `wakesys-temperature.js` - Widget JavaScript
- `wakesys-temperature.css` - Minimal widget styles