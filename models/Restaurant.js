const { default: mongoose } = require("mongoose");

const restaurantSchema = mongoose.Schema({
  rest_id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  rest_name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: 1,
  },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
