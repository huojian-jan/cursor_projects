# Library Management System API

A FastAPI-based backend service for a library management system with role-based access control.

## Features

- User management with three roles: Super Admin, Admin, and Reader
- Book management (add, update, delete, search)
- Borrowing and returning books
- Role-based access control
- Authentication using JWT tokens

## Requirements

- Python 3.12+
- Dependencies listed in requirements.txt

## Setup and Installation

1. Clone the repository
2. Create a virtual environment:
   ```
   python -m venv venv
   ```
3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Linux/Mac: `source venv/bin/activate`
4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
5. Run migrations:
   ```
   alembic upgrade head
   ```
6. Start the server:
   ```
   uvicorn app.main:app --reload
   ```

## API Documentation

Once the server is running, you can access the API documentation at:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
