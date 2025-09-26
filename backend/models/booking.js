const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cleaner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  service_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  scheduled_date: Date,
  scheduled_time: String,
  status: { type: String, enum: ['pending','confirmed','completed','cancelled'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
