# Connecting Public Site Form to Local Command Center

This guide explains how to connect your public website's quote form to your local **MasFreight Command Center** to test real-time lead capture.

## Prerequisites

1.  **PocketBase JS SDK**: Your public site must include the PocketBase SDK.
    Add this to your `index.html` or main header:
    ```html
    <script src="https://cdn.jsdelivr.net/gh/pocketbase/js-sdk@master/dist/pocketbase.umd.js"></script>
    ```

2.  **Local Environment**:
    - PocketBase must be running (via Docker or local binary).
    - Caddy (or your reverse proxy) should be active if using the standard dev ports.

## Step-by-Step Integration

### 1. Copy the Integration Snippet
The core logic for mapping your form data to the Command Center schema is located in:
[`docs/public-site-snippet.js`](file:///C:/Users/Hendri%20Coetzer/Desktop/Apps/MasFreight-Dashboard/docs/public-site-snippet.js)

### 2. Configure the URL for Local Testing
In your source code (public site), ensure the `PB_URL` points to your local machine:

```javascript
// Change this to match your local PocketBase/Caddy address
const PB_URL = 'http://localhost:80'; 
```

> [!IMPORTANT]
> **Mobile Testing**: If you are testing the public site from a phone or another device on your network, replace `localhost` with your computer's local IP address (e.g., `http://192.168.1.50:80`).

### 3. Trigger the Submission
In your form's "submit" event handler, call the `submitQuoteToCommandCenter` function:

```javascript
document.querySelector('#quote-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 1. Gather your form data (example mapping)
    const formData = {
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        company_name: document.querySelector('#company').value,
        quote_id: "MF-" + Math.floor(Math.random() * 10000), // Generate a test ref
        product_description: document.querySelector('#description').value,
        collection_address: document.querySelector('#pickup').value,
        delivery_addresses: [document.querySelector('#dropoff').value],
        delivery_deadline_date: new Date().toISOString()
    };

    // 2. Submit to local Command Center
    const success = await submitQuoteToCommandCenter(formData);
    
    if (success) {
        alert('Quote received in Command Center!');
    }
});
```

## Troubleshooting Local Connections

### CORS Errors
If you see a "CORS" error in the browser console, you must ensure PocketBase allows requests from your public site's local origin (e.g., `http://127.0.0.1:5500` if using Live Server).

- Open **PocketBase Admin UI** -> **Settings** -> **Access** -> **Admin UI**.
- Usually, during local development, PocketBase is permissive, but you can explicitly add origins if needed.

### Network Isolation
If the public site is running on a different port than the Command Center, ensure they can communicate.
- **Command Center Dashboard**: `http://localhost:5173`
- **PocketBase API**: `http://localhost:80` (or `8090`)
- **Public Website**: Wherever it is hosted.

## Verifying the Link

1.  Open your **Command Center Dashboard** in one window.
2.  Open your **Public Website Form** in another.
3.  Submit the form.
4.  **Instant Result**: You should see a new Quote Card "pop" into the Command Center feed instantly without refreshing.
