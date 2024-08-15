import mongoose, { Schema } from "mongoose";

const controlSchema = new Schema({
  d1: { 
    x: {type: Number, required: false},
    y: {type: Number, required: false}
   },
  d2: { 
    x: {type: Number, required: false},
    y: {type: Number, required: false}
   }},
   {
    _id: false,
   }
  );

const commandSchema = new Schema(
  {
    commandID: {type: Number, required: true},
    type: {type: String, required: true},
    startPoint: {
      x: {type: Number, required: true},
      y: {type: Number, required: true}
    },
    endPoint: {
        x: {type: Number, required: false},
        y: {type: Number, required: false}
    },
    controlPoints: {
      type: [controlSchema],
      required: false
    }
  },
  {
    timestamps: true
  }
)

const Command = mongoose.models.Command || mongoose.model("Command", commandSchema);

export default Command;