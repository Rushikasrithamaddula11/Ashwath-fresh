# 🥬 Ashwath Fresh

A modern and user-friendly fresh food e-commerce website for buying fresh fruits, vegetables, and other grocery products online.

## 🌱 About the Project

**Ashwath Fresh** is an online fresh-food shopping platform designed to make it easy for customers to browse products, add items to their cart, place orders, and manage their profiles.

The application also includes an **Admin Dashboard** for managing products, categories, customers, orders, brands, sales, and settings.

---

## ✨ Features

### 🛒 Customer Features

- 🏠 Home page
- 🥦 Fresh vegetables
- 🍎 Fresh fruits
- 🛍️ Product browsing
- 🔎 Product details
- 🛒 Shopping cart
- 💳 Checkout
- 📦 Order confirmation
- 📋 My Orders
- 👤 Customer profile
- 🔐 Customer Login
- 📝 Customer Signup
- 📞 Contact page
- ℹ️ About page

### 👨‍💼 Admin Features

- 🔐 Admin Login
- 📊 Admin Dashboard
- 📦 Product Management
- 🏷️ Category Management
- 🏪 Brand Management
- 👥 Customer Management
- 🛒 Order Management
- 📈 Sales Management
- ⚙️ Admin Settings

---

## 🛠️ Technologies Used

### Frontend

- React.js
- Vite
- JavaScript
- HTML5
- CSS3

### Backend / Services

- Firebase Authentication
- Firebase Firestore
- Firebase Storage

### Development Tools

- Git
- GitHub
- VS Code
- npm

---

## 📁 Project Structure

```text
Ashwath-fresh/
│
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── logo.svg
│
├── src/
│   │
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/
│   │   ├── admin/
│   │   ├── common/
│   │   ├── layout/
│   │   └── product/
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── DataContext.jsx
│   │
│   ├── firebase/
│   │   ├── authService.js
│   │   ├── config.js
│   │   ├── seedData.js
│   │   ├── storageService.js
│   │   └── storeService.js
│   │
│   ├── pages/
│   │   ├── admin/
│   │   └── customer/
│   │
│   ├── utils/
│   │   └── formatters.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .env.example
├── .gitignore
├── firestore.rules
├── storage.rules
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
