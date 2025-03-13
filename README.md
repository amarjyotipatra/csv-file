# CSV File Processing API

This is a Node.js-based API that allows users to upload CSV files, process image URLs from the file, and check the processing status. It utilizes Prisma for database interactions, Multer for file uploads, and Sharp for image processing.

## Features

- Upload CSV files containing product details.
- Extract and process image URLs from the file.
- Store and retrieve the processing status.
- Webhook integration for notifications.
- Real-time status updates
- Error handling and validation

---

## 📌 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** Prisma with PostgreSQL/MySQL
- **File Handling:** Multer
- **Image Processing:** Sharp
- **Webhook Integration:** Axios

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/amarjyotipatra/csv-file.git
cd csv-file
```

2️⃣ Install Dependencies
```bash
   npm install
   ```

3️⃣ Set Up Environment Variables
Create a .env file in the root directory and add:
```env
   DATABASE_URL="postgresql://username:password@localhost:5432/csv_db"
   WEBHOOK_URL="https://your-webhook-endpoint.com"
   PORT=3000
   ```

4️⃣ Start the Server
```sh
npm start
```

## 📡 API Endpoints

- `POST /api/upload` - Upload CSV file
- `GET /api/status/:id` - Check processing status
- `GET /api/products` - List processed products
- `POST /api/webhook` - Configure webhook