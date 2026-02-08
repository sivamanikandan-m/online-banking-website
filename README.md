### 🏦 Online Banking Website

A full-stack **Online Banking Web Application** built using  
**Spring Boot (Backend)** and **React + Vite (Frontend)**.

The application provides **separate User and Admin modules**, allowing users to perform banking operations while admins manage users, transactions, and system activity.

---

### 🚀 Features Overview

### 🔐 Authentication
- User Login & Registration
- Admin Login & Admin Registration
- Role-based access (User / Admin)
- Logout clears session data
- Inactive users/admins cannot log in

---

### 👤 User Features

### 🏠 User Dashboard
- Displays:
  - Welcome message with username
  - Current account balance
  - Account number
  - Account status (Active / Inactive)
  - Account type (Savings)

### 💰 Banking Operations
- **Deposit Money**
  - Add money to account using a popup modal
- **Withdraw Money**
  - Withdraw available balance with validation
- **Transfer Money**
  - Transfer money to another registered user
  - Records both sender and receiver transactions

### 📄 Transaction History
- View complete transaction history
- Shows:
  - Transaction type (Deposit / Withdraw / Transfer)
  - Amount
  - Date & time
- Separate page for easy tracking

---

### 🛠 Admin Features

### 📊 Admin Dashboard
- Displays system statistics:
  - Total users
  - Total transactions
  - Today’s deposits
  - Today’s withdrawals
- Shows recent transactions with:
  - User
  - Transaction type
  - Amount
  - Timestamp

---

### 👥 User Management
- View all registered users
- See:
  - User ID
  - Username
  - Account balance
  - Account status
- Activate / Deactivate user accounts
- Deactivated users cannot log in or perform transactions

---

### 💳 Transaction Management
- View all transactions in the system
- Filter transactions by:
  - Username
  - Transaction type
- Sort transactions by date
- Useful for monitoring and auditing

---

### 🧑‍💼 Admin Management
- View all admins
- Activate / Deactivate admin accounts
- Register new admins from admin panel
- Inactive admins cannot access the dashboard

---

### 🎨 UI & UX
- Modern banking-style dark & gold theme
- Clean and consistent navigation bar
- Popup modals for transactions
- Toast notifications for:
  - Success messages
  - Errors
  - Validation feedback
- Responsive layout

---

### 🧰 Tech Stack

### Backend
- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- MySQL
- Maven

### Frontend
- React (Vite)
- React Router DOM
- Axios
- React Toastify
- HTML, CSS, JavaScript

---

### ⚙️ How to Run the Project

### Backend

cd Backend

mvn spring-boot:run

Runs on: http://localhost:8081

### Frontend

cd Frontend

npm install

npm run dev

Runs on: http://localhost:5173

---


### 🧠 Learning Outcomes

- Full-stack application development

- REST API design

- Role-based access control

- React routing and state management

- Spring Boot layered architecture

- Real-world banking workflows

---


### 👨‍💻 Author

### Siva Manikandan M

GitHub: https://github.com/sivamanikandan-m

---


### 📜 License

This project is created for learning and educational purposes.
