# Blogly 📝

[![Python 3.x](https://img.shields.io/badge/python-3.x-blue.svg)](https://www.python.org/downloads/)
[![Flask](https://img.shields.io/badge/flask-2.1.2-green.svg)](https://flask.palletsprojects.com/)
[![PostgreSQL](https://img.shields.io/badge/postgresql-latest-blue.svg)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A modern, full-featured blogging platform built with Flask and PostgreSQL

![Blogly Screenshot](static/images/screenshot.png)

## ✨ Features

<table>
  <tr>
    <td>🔐 User Management</td>
    <td>📊 Blog Posts</td>
    <td>🏷️ Tags System</td>
  </tr>
  <tr>
    <td>
      • Full CRUD operations<br>
      • Custom profile images<br>
      • User dashboards
    </td>
    <td>
      • Rich text content<br>
      • Timestamp formatting<br>
      • Recent posts feed
    </td>
    <td>
      • Tag management<br>
      • Post categorization<br>
      • Filter by tags
    </td>
  </tr>
</table>

## 🚀 Quick Start

### Prerequisites

- Python 3.x
- PostgreSQL
- pip
- virtualenv (recommended)

### Installation

1. **Clone & Setup Environment**
```bash
git clone <repository-url>
cd part-three
python3 -m venv venv
source venv/bin/activate
```

2. **Install Dependencies**
```bash
pip install -r requirements.txt
```

3. **Configure Database**
```bash
psql
CREATE DATABASE flask_blogly;
\q
```

4. **Environment Setup**
Create `.env`:
```ini
SQLALCHEMY_DATABASE_URI=postgresql://postgres@localhost:5432/flask_blogly
SECRET_KEY=secret
FLASK_ENV=development
FLASK_APP=app.py
```

5. **Initialize & Run**
```bash
flask db upgrade
flask run
```

Visit `http://localhost:8000` 🎉

## 🏗️ Project Structure

```
blogly/
├── 📄 app.py          # Application core
├── 📄 models.py       # Database models
├── 📄 requirements.txt
├── 📂 static/         # Assets
└── 📂 templates/      # View templates
    ├── users/
    ├── posts/
    └── tags/
```

## 🛣️ API Routes

### Users
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/users` | List users |
| GET/POST | `/users/new` | Create user |
| GET | `/users/<id>` | View user |
| GET/POST | `/users/<id>/edit` | Edit user |
| POST | `/users/<id>/delete` | Delete user |

### Posts & Tags
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Recent posts |
| GET/POST | `/posts/<id>/edit` | Edit post |
| GET | `/tags` | List tags |
| GET/POST | `/tags/new` | Create tag |

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📬 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/blogly](https://github.com/yourusername/blogly)

---
<div align="center">
  Made with ❤️ by Your Name
</div>
