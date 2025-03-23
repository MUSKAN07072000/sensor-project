const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schema/schema');
require('dotenv').config();

const app = express();

// Enable CORS
app.use(cors());

// Get database name from env
const MONGODB_DATABASE_NAME = process.env.MONGODB_DATABASE_NAME || 'seimens-sensor-project';

// Construct MongoDB URI
const MONGODB_URI = `mongodb://localhost:27017/${MONGODB_DATABASE_NAME}`;

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define root route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Sensor Data API!</h1><p>Access GraphQL API at <a href="/graphql">/graphql</a></p>');
});

// GraphQL Endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
});
