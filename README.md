
# Url-Shortner

## URL Shortener

###  Setup Instructions

---

####  Backend (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate
pip install -r requirements.txt  
python manage.py migrate

python manage.py runserver 0.0.0.0:8000
```

>  Tip: If you’re testing on a physical device, your Django backend must be accessible via your **local IP**. Find it using:
```bash
ipconfig  # Windows
ifconfig  # macOS/Linux
```

Look for the IP under your Wi-Fi adapter. It usually looks like `192.168.x.x`.

---

####  Frontend (React Native with Expo)

```bash
cd frontend/frontend
npm install
npm start
```

- Scan the QR code using **Expo Go** (Android/iOS)
- Make sure your phone and computer are on the **same Wi-Fi network**

---

###  React Native Backend IP Configuration

By default, the React Native app uses a hardcoded API endpoint like:

```js
axios.post('http://192.168.85.13:8000/api/shorten/', { original_url: url });
```

You must replace `192.168.85.13` with your own IP (found via `ipconfig`) where the Django server is running.

This step is required for the mobile app to communicate with the backend.


---

###  API Example

#### POST `/api/shorten/`
**Request:**
```json
{
  "url": "https://www.google.com"
}
```
**Response:**
```json
{
  "short_url": "http://192.168.85.13:8000/jPrGor"
}
```

#### GET `/jPrGor/`
- Redirects (302) to the original URL

#### GET `/api/analytics/jPrGor/`
**Response:**
```json
{
  "click_count": 2
}
```

---

### ✅ Tests

#### Backend:
- Located in `shortener/tests.py`
- Verifies POST generates a unique short code

#### Frontend:
- Simple logic test in `frontend/__tests__/App.test.js`
- Verifies button press triggers shortening logic
