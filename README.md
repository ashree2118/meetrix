🌐 Meetrix
## Meetrix

Meetrix is a modern meeting scheduling platform that combines simplicity, personalization, and powerful features to make collaboration seamless. Designed with an elegant UI and interactive UX, Meetrix enables users to share unique scheduling links, manage meetings with color-coded dashboards, and receive automated email confirmations.

---

### ✨ Features

- **🔗 Unique Scheduling Link**  
    Share a personalized link that allows others to book meetings directly with you.

- **📅 Meeting Dashboard**  
    Access and manage all scheduled meetings in a clean, centralized interface.

- **🌈 Color-Coded Calendar**  
    Instantly identify meetings by category: Work, Personal, Friends, Freelance, and more.

- **📧 Email Notifications**  
    Automatic confirmation emails are sent to both the scheduler and the attendee.

- **🧑‍💻 User Authentication**  
    Secure login/register with JWT-based token authentication and protected routes.

- **⚙️ Profile Management**  
    Update your name, email, username, and timezone easily from the Edit Profile page.

- **🖥️ Responsive UI**  
    Built with Tailwind CSS and Framer Motion for smooth animations and mobile-friendliness.

---

### 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- ShadCN (Radix UI components)
- Framer Motion

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose

**Authentication & Security:**
- JWT (Access + Refresh Tokens)
- Cookie-based auth

**Utilities:**
- Nodemailer / Brevo (for email)
- Multer (for form data handling)

---

### 🚀 Getting Started

#### ✅ Prerequisites

- Node.js (v14 or higher)
- npm or Yarn

#### 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/meetrix.git
cd meetrix
npm install
# or
yarn install
```

Set up environment variables:  
Create a `.env` file in the root of the backend directory:

```env
PORT=5000
ACCESS_TOKEN_SECRET=your-access-token-secret
REFRESH_TOKEN_SECRET=your-refresh-token-secret
MONGO_URI=your-mongodb-uri
BREVO_API_KEY=your-email-api-key
```

#### ▶️ Running the App

**Frontend (React + Vite):**
```bash
cd client
npm run dev
```
App runs on: [http://localhost:3000](http://localhost:3000)

**Backend (Node + Express):**
```bash
cd server
npm run dev
```
API runs on: [http://localhost:5000](http://localhost:5000)

---

### 🧾 Folder Structure

```
/meetrix
├── client/             # React frontend
│   ├── src/
│   ├── public/
│   └── vite.config.js
│
├── server/             # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── middlewares/
│   └── index.js
│
├── README.md
```

---

### 🧠 Upcoming Features

- 🔐 Google Calendar sync
- 📱 PWA support
- 🕹️ Drag and drop calendar view
- 📊 Meeting stats and analytics dashboard

---

### 🤝 Contributing

We welcome all contributions!

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a pull request

Be sure to follow [Conventional Commits](https://www.conventionalcommits.org/) for consistency.

---

### 📄 License

Licensed under the MIT License.  
© 2025 Meetrix Team

---

### 🙌 Acknowledgements

- React
- Tailwind CSS
- ShadCN UI
- Framer Motion
- MongoDB
- Express

> “Where collaboration meets innovation — Meetrix.”
