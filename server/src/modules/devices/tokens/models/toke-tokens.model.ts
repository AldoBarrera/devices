import { mongoose } from "../../../../config/database";
import { Document, Model, Schema } from "mongoose";

var tokens = {
    took_code: { 
type:String, 
unique:true, 
required:true, 
}, 
took_qr: { 
    type:String
    }


}

var tokensSchema = new Schema(tokens);
export const TokensModel = mongoose.model("toke_tokens", tokensSchema);