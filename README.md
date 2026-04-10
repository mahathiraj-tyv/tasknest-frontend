# 🧠 TaskNest – Smart Task Management App

TaskNest is a full-stack web application that helps users manage their daily tasks efficiently with the support of an AI-powered chatbot.

---

## 🚀 Features

- 🔐 User Authentication (Register & Login using JWT)
- 📝 Create, Edit, Delete Tasks
- ✅ Mark tasks as Complete / Incomplete
- 📂 Filter tasks by category (Work, Personal, Study)
- ⏰ Set and edit due date & time
- 🤖 AI Chatbot for task insights (powered by Groq API)
- 🎨 Light/Dark mode UI
- 📱 Responsive design

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Bootstrap
- CSS

### Backend
- Flask (Python)
- PostgreSQL
- SQLAlchemy ORM
- Flask-JWT-Extended (Authentication)

### Other Tools
- Groq API (AI Chatbot)
- Axios (API calls)
- dotenv (Environment variables)

---

## 📁 Project Structure
---

Flask_Project/
│
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── extensions.py
│   ├── .env
│   ├── migrations/
│   ├── models/
│   │   ├── user.py
│   │   └── task.py
│   ├── routes/
│   │   ├── auth.py
│   │   ├── tasks.py
│   │   └── chat.py
│   └── venv/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── todo1.jpg
│   │   │   ├── todo2.jpg
│   │   │   └── todo3.jpg
│   │   ├── components/
│   │   │   ├── Chat.js / Chat.css
│   │   │   ├── Dashboard.js / Dashboard.css
│   │   │   ├── Navbar.js
│   │   │   ├── Landing.js / Landing.css
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js


---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-link>
cd Flask_project

2. Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt

3. Configure Environment Variables

Create a .env file in backend:

SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_secret
DATABASE_URL=postgresql://username:password@localhost:5432/tasknest
GROQ_API_KEY=your_groq_api_key

4. Run Backend
flask run

5.Frontend Setup
cd ../frontend
npm install
npm start

6. Database
PostgreSQL is used as the database
Two main tables:
User
Task

Relationship:
One User → Many Tasks


(User → Task one-to-many relationship)

Chatbot Functionality

The chatbot uses Groq API to:

Answer questions about tasks
Show completed/pending tasks
Provide smart responses based on user data


Challenges Faced

Fetching user-specific tasks using JWT
Handling date & time format issues
CSS conflicts and UI alignment
Integrating AI chatbot with task data

Solutions

Used JWT for secure authentication
Converted date-time using ISO format
Structured backend routes properly
Customized chatbot responses with task context

Future Enhancements

Task reminders & notifications
Drag-and-drop task management
Advanced chatbot suggestions
Mobile optimization


Author: Mahathi Raj

