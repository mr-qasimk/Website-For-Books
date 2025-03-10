
## Your Favorite Books

A brief description of what this project does and who it's for



### Clone the project

```bash
  git clone https://github.com/mr-qasimk/Website-For-Books.git
```

### Navigate to the project directory

```bash
  cd Website-For-Books
```

### Install dependencies for frontend and backend separately
**Tip:** To efficiently install dependencies for both frontend and backend simultaneously, use split terminals.

Install frontend dependencies
```bash
cd frontend
npm install
```

Install backend dependencies

```bash
cd backend
npm install
```
    
### Environment Variables
**Backend**
- Create a `.env` file in the `backend` directory.
- Add the following variables with appropriate values
```bash
ACCESS_SECRET_KEY=qasim2905
mongooseUrl=mongodb+srv://qasim2905:qasim2905@cluster0.b7lll.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

PORT=8088



## Start the backend server
- Navigate to the `backend` directory: `cd backend`
- Start the server: `npm start` (or npm start)
- You should see a message indicating the server is running, usually on port 8088.
     
#### Start the frontend server:
- Navigate to the `frontend` directory: `cd frontend`
- Start the server: `npm run dev`
- You should see a message indicating the server is running, usually on port 5173.