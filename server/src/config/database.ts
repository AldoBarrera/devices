
import mongoose from "mongoose";


(mongoose as any).Promise = global.Promise;

  mongoose.connect("mongodb://127.0.0.1:27017/device", {
    useNewUrlParser: true,
    useCreateIndex: true
  });

export { mongoose };
