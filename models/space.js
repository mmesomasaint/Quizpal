import mongoose from 'mongoose'
import validator from 'validator'

const spaceSchema = new mongoose.Schema(
  {
    creator: {
      type: Object,
      required: [true, 'Creator object needed.'],
      validate: {
        validator: function (creator) {
          return validator.isJSON(JSON.stringify(creator))
        },
        message: 'creator may only be a json-like object',
      },
    },
    buddies: {
      type: [Object],
    },
    quizIds: {
      type: [Number],
    },
    course: {
      type: String,
    },
    active: {
      type: Boolean,
    },
  },
  { timestamps: true }
)

mongoose.models = {}
const Space = mongoose.model('Space', spaceSchema)

export default Space
