# Wakesys Temperature Widget

A minimalistic, vanilla JavaScript widget that displays real-time water temperature data from the Wakesys sensors API. Designed for easy integration into park websites.

## Features

- **No Dependencies**: Pure vanilla JavaScript, no jQuery required
- **CDN Hosted**: Available via jsDelivr CDN for instant integration
- **Minimalistic Design**: Clean, simple styling that inherits from parent website
- **Cross-Origin Support**: JSONP fallback for cross-origin API requests  
- **Auto-refresh**: Updates temperature data every 30 seconds
- **Easy Integration**: Simple copy-paste integration into any website

## CDN Integration (Recommended)

**Super simple - just add this to your HTML:**

```html
<!-- CSS -->
<link href="https://cdn.jsdelivr.net/gh/WakeSys/wakesys-temperature@main/wakesys-temperature.css" rel="stylesheet">

<!-- HTML Widget -->
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

<!-- Configuration & JavaScript -->
<script>
    var WAKESYS_SCHOOL_NAME = 'yourparkname'; // Replace with your park's subdomain
</script>
<script src="https://cdn.jsdelivr.net/gh/WakeSys/wakesys-temperature@main/wakesys-temperature.js"></script>
```

### CDN Benefits
- ✅ **No file downloads** - Just copy/paste HTML
- ✅ **Always up-to-date** - Automatically gets latest version
- ✅ **Fast loading** - Served from global CDN
- ✅ **Reliable** - jsDelivr has 99.9% uptime

## Local Installation (Alternative)

If you prefer to host the files yourself:

1. **Download the files**:
   - `wakesys-temperature.js`
   - `wakesys-temperature.css`

2. **Add to your HTML**:
```html
<link href="wakesys-temperature.css" rel="stylesheet">

<div class="wakesys-temperature-widget">
    <!-- Same HTML structure as above -->
</div>

<script>
    var WAKESYS_SCHOOL_NAME = 'yourparkname';
</script>
<script src="wakesys-temperature.js"></script>
```

## GitHub Setup for CDN

The widget is hosted on GitHub and served via jsDelivr CDN for global availability.

### CDN URL Format
```
https://cdn.jsdelivr.net/gh/WakeSys/wakesys-temperature@BRANCH/FILE
```

**Available CDN Links:**
```html
<!-- CSS -->
<link href="https://cdn.jsdelivr.net/gh/WakeSys/wakesys-temperature@main/wakesys-temperature.css" rel="stylesheet">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/gh/WakeSys/wakesys-temperature@main/wakesys-temperature.js"></script>
```

### Versioning
- Use `@main` for latest version (always up-to-date)
- Use `@v1.0.0` for specific version (stable, won't change)
- Use `@latest` for latest release tag

## Configuration

**Required:** Set your park's Wakesys subdomain:
```javascript
var WAKESYS_SCHOOL_NAME = 'yourparkname'; // Replace with your actual subdomain
```

**Examples:**
- `'wakelake'` → connects to `https://wakelake.wakesys.com/api/sensors.php`
- `'tngcablepark'` → connects to `https://tngcablepark.wakesys.com/api/sensors.php`

## API Integration

**Endpoint:** `https://PARKNAME.wakesys.com/api/sensors.php`

**Expected Response:**
```json
{
  "col_value": "23.5",
  "col_unit": "°C", 
  "col_datetime": "2024-01-15 14:30:00"
}
```

**Data Processing:**
- Decimal separator converted from `.` to `,` (European format)
- Auto-refresh every 30 seconds
- JSONP fallback for cross-origin requests

## Styling

Minimal CSS that inherits your website's styling:

```css
.wakesys-temperature-widget {
    font-family: inherit;  /* Uses your site's font */
    font-size: 14px;
    line-height: 1.4;
}
```

**Key Classes:**
- `.wakesys-temperature-widget` - Main container
- `.loading` - Loading state (gray, italic)
- `.error` - Error state (red, italic)  
- `.temperature-info` - Temperature display (inherits parent styles)

## Browser Support

- **Modern browsers** with ES6+ support
- Chrome 60+, Firefox 55+, Safari 12+, Edge 79+

## Live Example

See `integration-example.html` for a complete example of how the widget integrates into a real park website.

## Repository Structure

```
wakesys-temperature/
├── index.html                 # Basic widget demo
├── integration-example.html   # Complete park website example
├── wakesys-temperature.js     # Widget JavaScript
├── wakesys-temperature.css    # Minimal widget styles
├── package.json              # Package metadata
├── README.md                  # This documentation
├── LICENSE                    # License file
└── .gitignore                # Git ignore rules
```

## Development

**Local Development:**
1. Clone the repository
2. Edit files locally
3. Test with `index.html`
4. Commit and push changes
5. CDN automatically updates within minutes

**File Hosting:**
- GitHub repository hosts the source files
- jsDelivr CDN serves files globally
- No build process required