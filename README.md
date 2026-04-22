# 💈 Nexus Barber Lounge

### ✨ Premium Salon Booking Platform (MVP)

A **modern, luxury-grade salon booking website** built with cutting-edge web technologies, designed to deliver a seamless and premium user experience for both customers and business owners.

---

## 🚀 Live Demo

👉 https://nexus-barber-lounge.vercel.app/

---

## 🌟 Overview

Nexus Barber Lounge is a **high-performance booking platform** tailored for local salons, enabling customers to effortlessly book appointments while maintaining a premium brand identity.

This project focuses on:

* ⚡ Speed
* 🎨 Luxury UI/UX
* 📱 Mobile-first experience
* 💰 Zero-cost MVP architecture

---

## ✨ Key Features

### 🎨 Premium User Experience

* Dark luxury theme (Black + Gold)
* Smooth animations & clean layout
* Fully responsive across all devices

### 📅 Smart Booking System

* Multi-step booking flow
* Real-time form handling
* Structured appointment capture

### 🔒 Booking Logic

* Duplicate slot prevention
* Clean data validation
* Structured booking storage

### 📲 WhatsApp Integration

* Instant booking confirmation via WhatsApp
* Auto-generated booking summary
* Zero external API cost

### ⚡ Performance

* Built on Next.js App Router
* Optimized rendering
* Lightweight and fast

---

## 🧠 Tech Stack

| Layer       | Technology              |
| ----------- | ----------------------- |
| Frontend    | Next.js 14 (App Router) |
| Language    | TypeScript              |
| Styling     | Tailwind CSS            |
| Backend     | Next.js API Routes      |
| Storage     | JSON (MVP)              |
| Integration | WhatsApp (wa.me)        |
| Deployment  | Vercel                  |

---

## 📁 Project Architecture

```id="arch1"
nexus-barber/
│
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main UI (Landing + Booking)
│   ├── globals.css         # Global styles
│   └── api/
│       └── book/
│           └── route.ts    # Booking API
│
├── components/
│   ├── Navbar.tsx
│   ├── ServiceCard.tsx
│   └── BookingForm.tsx
│
├── data/
│   └── bookings.json       # Local storage (MVP)
│
├── public/
├── tailwind.config.ts
├── package.json
└── tsconfig.json
```

---

## ⚙️ Getting Started

### 1️⃣ Clone Repository

```bash id="cmd1"
git clone https://github.com/YOUR_USERNAME/nexus-salon.git
cd nexus-salon
```

---

### 2️⃣ Install Dependencies

```bash id="cmd2"
npm install
```

---

### 3️⃣ Run Development Server

```bash id="cmd3"
npm run dev
```

---

### 4️⃣ Open in Browser

```id="url1"
http://localhost:3000
```

---

## 🔁 Booking Flow

```id="flow1"
User → Select Service → Choose Date/Time → Enter Details → Submit
     ↓
API stores booking
     ↓
WhatsApp opens with booking details
```

---

## 🔗 API Endpoints

| Method | Endpoint  | Description        |
| ------ | --------- | ------------------ |
| POST   | /api/book | Create new booking |
| GET    | /api/book | Retrieve bookings  |

---

## 📞 Configuration

Update WhatsApp number:

```id="cfg1"
/components/BookingForm.tsx
/app/api/book/route.ts
```

Replace:

```id="cfg2"
916376530417
```

---

## ⚠️ MVP Limitations

* JSON storage (not persistent on serverless)
* No authentication system
* No payment gateway

---

## 🚀 Future Roadmap

* Database integration (PostgreSQL / Supabase)
* Admin dashboard (booking management)
* Razorpay payment integration
* Multi-salon SaaS model
* Notifications (SMS / Email)

---

## 🧩 Scalability Vision

This project can evolve into:
👉 **A full-scale salon marketplace (like BookMyShow for grooming services)**

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork, improve, and submit a PR.

---

## 📍 Business Info

**Nexus Barber Lounge**
Jhotwara, Jaipur, India

---

## ⭐ Support

If you found this project helpful:

👉 Give it a ⭐ on GitHub
👉 Share it with others

---

## 🧠 Author Note

This project was built as a **real-world MVP startup foundation**, focusing on practicality, speed, and scalability.

---
