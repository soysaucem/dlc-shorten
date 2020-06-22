import { Schema, model } from 'mongoose';

const schema = new Schema({
  _id: { type: String },
  url: { type: String },
  createdAt: { type: Date },
});

const itemModel = model('Item', schema, 'items');

export default itemModel;
