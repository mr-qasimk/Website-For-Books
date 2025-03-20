
## Website-For-Books
is a modern web application designed for book enthusiasts to explore and manage their favorite literature. Built with React and Material-UI, it offers a sleek interface with secure user authentication, seamless navigation, and personalized features. Users can log in/sign up via elegant modal popovers, save their preferred books to a dedicated favorites section, and enjoy a smooth UI.

The app prioritizes simplicity and security, using JWT token storage for authentication and protected routes for user-specific content. Ideal for both casual readers and avid bibliophiles, BookShop combines clean design with intuitive functionality to create a delightful book-browsing experience.




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
mongooseUrl=Your Own MongoDb URl

PORT=8088



## Start the backend server
- Navigate to the `backend` directory: `cd backend`
- Start the server: `npm start` (or npm start)
- You should see a message indicating the server is running, usually on port 8088.
     
#### Start the frontend server:
- Navigate to the `frontend` directory: `cd frontend`
- Start the server: `npm run dev`
- You should see a message indicating the server is running, usually on port 5173.
