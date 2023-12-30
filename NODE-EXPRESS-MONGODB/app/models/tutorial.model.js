module.exports = mongoose =>{
    const Tutorial = mongoose.model(
        "tutorial",
    mongoose.Schema(
       { title:String,
        description:String,
        publishef:Boolean
    },
    { timestamps:true }
    )
    );

    return Tutorial;
};