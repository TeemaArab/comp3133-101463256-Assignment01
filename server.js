const express = require('express');
const connectDB = require('./db/db');  // Import MongoDB connection file
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const schema = require('./graphql/schema');
const { body, validationResult } = require('express-validator');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for JSON
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log(" MongoDB Connected!"))
  .catch(err => console.error(" MongoDB Connection Error:", err));

// GraphQL API Route
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true // Enable GraphiQL for testing
}));

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}/graphql`);
});

