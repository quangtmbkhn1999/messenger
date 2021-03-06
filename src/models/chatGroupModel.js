import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ChatGroupSchema =new Schema({
	name: String,
	userAmount: {type:Number,min:3,max:200},
	messageAmount:{type:Number,default:0},
	userId:String,
	members:[{userId:String}],
	createdAt:{type:Number,default:Date.now},
	updatedAt:{type:Number,default:Date.now},
	deletedAt:{type:Number,default:null}
});

ChatGroupSchema.statics={
	getChatGroups(userId,limit){
		return this.find({"members":{$elemMatch:{"userId":userId}}}).sort({"updatedAt":-1}).limit(limit).exec();
	},
	getChatGroupById(id){
		return this.findById(id).exec();
	},
	updateWhenHasNewMessage(id,messageAmount){
		return this.findByIdAndUpdate(id,{
			"messageAmount":messageAmount,
			"updatedAt":Date.now()
		}).exec();
	}
}

module.exports =mongoose.model("chat-group",ChatGroupSchema);