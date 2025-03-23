const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLFloat } = require('graphql');
const Sensor = require('../models/Sensor'); // Import Sensor model

// Define SensorType
const SensorType = new GraphQLObjectType({
  name: 'Sensor',
  fields: () => ({
    sensorId: { type: GraphQLString },
    sensorType: { type: GraphQLString },
    value: { type: GraphQLFloat },
    unit: { type: GraphQLString },
    timestamp: { type: GraphQLString }
  })
});

// Define Mutation
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSensor: {
      type: SensorType,
      args: {
        sensorId: { type: GraphQLString },
        sensorType: { type: GraphQLString },
        value: { type: GraphQLFloat },
        unit: { type: GraphQLString }
      },
      async resolve(_, { sensorId, sensorType, value, unit }) {
        try {
          const newSensor = new Sensor({
            sensorId,
            sensorType,
            value,
            unit
          });

          const savedSensor = await newSensor.save(); // Ensure it's properly saved
          console.log('✅ Sensor saved:', savedSensor); // Log successful save
          return savedSensor;
        } catch (err) {
          console.error('❌ MongoDB Save Error:', err);
          throw new Error('Failed to save sensor');
        }
      }
    }
  }
});

// Define Query
const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getSensors: {
      type: SensorType,
      args: { sensorId: { type: GraphQLString } },
      async resolve(_, { sensorId }) {
        try {
          return await Sensor.findOne({ sensorId });
        } catch (err) {
          console.error('❌ MongoDB Query Error:', err);
          throw new Error('Failed to fetch sensor');
        }
      }
    }
  }
});

// Export Schema
module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});
