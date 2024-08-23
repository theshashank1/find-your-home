const express = require('express');
const cookieParser = require('cookie-parser');

// Routers

const usersRouter = require('./routes/users');
const propertiesRouter = require('./routes/properties');
const chatRouter = require('./routes/chat');
const rentalsRouter = require('./routes/rentals');
const searchRouter = require('./routes/search');

const {connectDB} = require('./config/db')
connectDB()



const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', usersRouter);
app.use('/api/properties', propertiesRouter);
app.use('/api/chat', chatRouter);
app.use('/api/rentals', rentalsRouter);
app.use('/api/search', searchRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));