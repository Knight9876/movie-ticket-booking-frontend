# Movie Ticket Booking - Frontend

Frontend application for the **Movie Ticket Booking System**, built with **React (Vite)**.

---

## Approach

The goal was to build a **clean, responsive, and maintainable frontend** that connects seamlessly with the Express backend.  
I followed a modular architecture — splitting the app into reusable components (Navbar, Loader, Auth Forms, etc.) and page-based routes (Movies, Booking, MyBookings).

Hooks like `useEffect` and `useState` handle API calls and state logic, while Axios interceptors automatically attach JWT tokens for authentication.  
The CSS uses a **central theme** defined in `index.css` for consistency, along with dedicated styles per page for maintainability.

---

## Features

- JWT-based authentication (Login / Signup)
- Browse movies and showtimes from backend API
- Interactive seat selection and booking system
- View user's personal bookings
- Fully responsive modern UI
- Reusable Loader component for smooth UX
- Styled using CSS and global theme variables
- Deployed on **Netlify**

---

## Tech Stack

- React (Vite)
- Axios (with interceptors)
- React Router DOM

---

## Environment Variables

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=https://movie-ticket-booking-p8ne.onrender.com/api
```

---

## Setup Instructions

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

The frontend should be running at http://localhost:5173

---

## Deployment

Deployed on `Netlify` [https://www.netlify.com]

Live Link: https://movie-ticket-booking-assignment.netlify.app

---

## Test Credentials

1. Test User 1

```bash
Email: testuser@example.com
Password: Test@1234
```

2. Test User 2

```bash
Email: test@test.com
Password: testtest
```

---

## Folder Structure

```bash
frontend/
├── src/
│   ├── api/
│   │   └── axiosConfig.js
│   │
│   ├── components/
│   │   ├── Loader/
│   │   │   ├── Loader.jsx
│   │   │   └── Loader.css
│   │   │
│   │   └── Navbar/
│   │       ├── Navbar.jsx
│   │       └── Navbar.css
│   │
│   ├── pages/
│   │   ├── Movies/
│   │   │   ├── Movies.jsx
│   │   │   └── Movies.css
│   │   │
│   │   ├── Booking/
│   │   │   ├── Booking.jsx
│   │   │   └── Booking.css
│   │   │
│   │   ├── MyBookings/
│   │   │   ├── MyBookings.jsx
│   │   │   └── MyBookings.css
│   │   │
│   │   ├── Login/
│   │   │   ├── Login.jsx
│   │   │   └── Login.css
│   │   │
│   │   └── Signup/
│   │       ├── Signup.jsx
│   │       └── Signup.css
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── .gitignore
└── README.md
```
