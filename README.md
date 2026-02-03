# Exam Seat Planner

A full-stack web application for efficiently allocating exam seats across classrooms using a greedy algorithm that minimizes the number of rooms used while prioritizing lower floors.

## Features

- **Classroom Management**: Add and view classrooms with details like room ID, capacity, floor number, and proximity to washrooms
- **Smart Allocation**: Allocates students to classrooms using a greedy algorithm that:
  - Minimizes the number of rooms used
  - Prioritizes lower floors first
  - Uses larger capacity rooms first
- **Real-time Updates**: Instant feedback on allocation results with visual cards showing seat distribution
- **Responsive UI**: Modern, clean interface built with React and Tailwind CSS

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd exam-planner
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 3. Setup Frontend

```bash
cd client
npm install
```

## Running the Application

### Start Backend Server
```bash
cd server
node index.js
```
Server will run on `http://localhost:5000`

### Start Frontend
```bash
cd client
npm run dev
```
Client will run on `http://localhost:5173`

## Usage

### Adding Classrooms
1. Navigate to the "Manage Rooms" tab
2. Fill in the classroom details:
   - Room ID (e.g., A-101)
   - Capacity
   - Floor Number
   - Near Washroom (checkbox)
3. Click "Add Classroom"

### Allocating Seats
1. Navigate to the "Allocate" tab
2. Enter the total number of students
3. Click "Allocate"
4. View the allocation results showing which classrooms are assigned and how many students per room

## API Endpoints

### POST `/api/classrooms`
Add a new classroom
```json
{
  "roomId": "A-101",
  "capacity": 40,
  "floorNo": 1,
  "nearWashroom": true
}
```

### GET `/api/classrooms`
Retrieve all classrooms (sorted by floor number)

### POST `/api/allocate`
Allocate seats for students
```json
{
  "totalStudents": 150
}
```

Returns allocation result or error if insufficient capacity.

## Project Structure

```
exam-planner/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── App.jsx        # Main application component
│   │   ├── App.css        # Component styles
│   │   ├── index.css      # Global styles
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── vite.config.js
├── server/                 # Backend Express application
│   ├── models/
│   │   └── Classroom.js   # Mongoose schema
│   ├── index.js           # Server entry point
│   ├── package.json
│   └── .env               # Environment variables (create this)
└── README.md
```

## Environment Variables

### Server (.env)
- `MONGO_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)

## Algorithm Details

The allocation algorithm follows these steps:
1. Fetch all available classrooms from the database
2. Sort by floor number (ascending) - prefer lower floors
3. Sort by capacity (descending) - use larger rooms first to minimize total rooms
4. Greedily allocate students to rooms until all are seated
5. Return error if total capacity is insufficient

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue in the repository.
