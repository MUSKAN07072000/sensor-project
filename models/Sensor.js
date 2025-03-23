const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  sensorId: { type: String, required: true, unique: true },
  sensorType: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  value: { type: Number, required: true },
  unit: { type: String, required: true },
}, { collection: "mydatabase" });

module.exports = mongoose.model('Sensor', sensorSchema);
