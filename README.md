# 📚 QuoteBook - Project Setup Guide

QuoteBook is a full-stack web app where users can create, share, and interact with quotes.  
It is built using **Laravel (API backend)** and **React with Vite (frontend)**.

---

## 🚀 Features

- User Authentication (Register/Login)  
- Create, Edit, and Delete Quotes  
- Public/Private Quotes  
- Like/Unlike Quotes (real-time like count)  
- Search & Filter Quotes  
- Copy & Share Quotes (WhatsApp supported)  
- Light/Dark Mode Toggle  
- Profile Section (Created Quotes & Liked Quotes)  

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Axios, Tailwind/Bootstrap  
- **Backend:** Laravel, Sanctum (Auth), MySQL  

---

## ⚡ Setup Instructions

### 🔧 Backend (Laravel API)

1. Clone the repo and go into backend folder:  
   ```bash
   git clone https://github.com/Abdulwaheed78/quotebook-react.git
   cd quotebook/backend
   ```

2. Install dependencies:  
   ```bash
   composer install
   ```

3. Create `.env` file (copy from `.env.example`) and  update DB credentials:  
   ```env
   DB_DATABASE=quotebook
   DB_USERNAME=root
   DB_PASSWORD=
   ```

4. Run migrations and seeders (for initial random data):  
   ```bash
   php artisan migrate --seed
   ```

5. Start the server:  
   ```bash
   php artisan serve
   ```  
   API will run at: `http://127.0.0.1:8000/api`  

---

### 🎨 Frontend (React with Vite)

1. Go into frontend folder:  
   ```bash
   cd ../frontend
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Create `.env` file in frontend with API base URL:  
   ```env
   VITE_API_URL=http://127.0.0.1:8000/api
   ```
4. create gemini.js file inside components folder and define the constant and export like :
   ```bash
   export const GEMINI_API_KEY ="use your gemini api key ";
   ```
   
6. Start the React app:  
   ```bash
   npm run dev
   ```  
   App will run at: `http://localhost:5173`  

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to add.

---

## 📌 License

This project is open-source under the MIT License.
