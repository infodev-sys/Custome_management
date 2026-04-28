# Customer Management Dashboard

## Features

- Add new customers
- View customer list in table
- Delete customers with confirmation popup
- Duplicate email/phone validation
- Form validation with inline error messages
- Customer data stored in `db.json`
- Express MVC architecture
- SweetAlert confirmations and success alerts
- Responsive UI

---

## Tech Stack

### Frontend
- React.js
- Axios
- SweetAlert2
- CSS

### Backend
- Node.js
- Express.js
- File-based storage (`db.json`)
- MVC Architecture

---

## Project Structure

customer-management/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   ├── db.json
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── App.js
    │   └── App.css

## Installation

## Clone Repository
git clone https://github.com/yourusername/customer-management.git
cd customer-management

## Backend Setup
cd backend
npm install
npm run dev

Server runs on:
http://localhost:5000
## Frontend Setup
cd frontend
npm install
npm start
Frontend runs on:

http://localhost:3000

## API Endpoints

### Get Customers
GET /customers

### Create Customer
POST /customers
Request:

```json
{
 "name":"John Doe",
 "email":"john@example.com",
 "phone":"9876543210"
}
```

---

### Delete Customer

DELETE /customers/:id


## Validation Rules

- Name required
- Valid email required
- Phone must be numeric and 10 digits
- Duplicate email not allowed
- Duplicate phone not allowed

---

## Deployment

Backend deployed on Render.

## Scripts

Backend:
npm start
npm run dev

Frontend:
npm start
npm run build

## Future Improvements

- Edit customer
- Search and filters
- Pagination
- Authentication
- Database integration (MongoDB/PostgreSQL)

---

## Author

Dev Vrat  
Full Stack Developer