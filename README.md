# 📧 EchoMailer

EchoMailer is a full-stack web app that lets users **compose, schedule, and manage emails** effortlessly.  
With a **React frontend** and a **Node.js + Express backend**, it integrates **MongoDB** for storing email data and uses **cron jobs** to send emails automatically at scheduled times.  

🌐 **Live Demo:** [EchoMailer on Vercel](https://echo-mailer.vercel.app/)  

---

## ✨ Features

- 📝 **Compose Emails** – Create and format emails with ease  
- ⏰ **Email Scheduler** – Schedule messages with cron-based automation  
- 📂 **Manage Emails** – View sent, scheduled, and pending emails  
- 🗑️ **One-Click Deletion** – Remove scheduled tasks anytime  
- ⚡ **Automated Delivery** – Emails are reliably sent at the right time  
- 🎨 **Responsive UI** – Clean and modern design with React + CSS

---

## 🛠 Tech Stack

**Frontend**
- [React.js](https://reactjs.org/) – User Interface
- [JavaScript (ES6)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) – Functionality  
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) – Styling  

**Backend**
- [Node.js](https://nodejs.org/) – Runtime Environment
- [Express.js](https://expressjs.com/) – Web Framework  
- [MongoDB](https://www.mongodb.com/) – Database for users & emails

---

## 📂 Project Structure

```
echo-mailer/
│
├── client/                 # React frontend
│   ├── public/             # Static assets
│   ├── src/                # Components, pages, styles
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express routes
│   ├── utils/              # Helper functions (mailer, scheduler)
│   └── server.js           # Entry point
│
├── .env                    # Environment variables
├── package.json
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/send` | Send a new email |
| `POST` | `/api/schedule` | Schedule an email |
| `GET` | `/api/emails` | Fetch all emails |
| `DELETE` | `/api/:id` | Delete an email by ID |

---

## 🚀 Getting Started

Follow these steps to run EchoMailer locally:

### 1. Clone the repository
```bash
git clone https://github.com/Mercy036/EchoMailer.git
cd EchoMailer
```

### 2. Install dependencies
```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 4. Run the application
```bash
# Start the server (from root directory)
npm run dev

# In a new terminal, start the client
cd client
npm start
```

### 5. Open your browser
Navigate to `http://localhost:3000` to use the application.

---

## 📧 Email Configuration

This app uses **Gmail SMTP** for sending emails. To set it up:

1. Enable **2-Factor Authentication** on your Gmail account
2. Generate an **App Password** for the application
3. Use your Gmail address as `EMAIL_USER`
4. Use the app password as `EMAIL_PASS` in your `.env` file

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Mercy036** - [GitHub Profile](https://github.com/Mercy036)

---

## 🙏 Acknowledgments

- Thanks to all contributors who helped improve this project
- Built with modern web technologies for reliable email automation
- Inspired by the need for simple, effective email scheduling solutions
