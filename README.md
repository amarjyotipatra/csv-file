# CSV File Processing API

This is a Node.js-based API that allows users to upload CSV files, process image URLs from the file, and check the processing status. It utilizes Prisma for database interactions, Multer for file uploads, and Sharp for image processing.

## Features

- Upload CSV files containing product details.
- Extract and process image URLs from the file.
- Store and retrieve the processing status.
- Webhook integration for notifications.

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
sh
Copy
Edit
npm install
3️⃣ Set Up Environment Variables
Create a .env file in the root directory and add:

sh
Copy
Edit
DATABASE_URL=<your_database_connection_string>
WEBHOOK_URL=<your_webhook_endpoint>
4️⃣ Start the Server
sh
Copy
Edit
```sh
npm start
```