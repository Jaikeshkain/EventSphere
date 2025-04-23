const mongoose=require("mongoose")

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },
    content: {
      type: String,
      require: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    images: [
      {
        url: {
          type: String,
          require: true,
        },
        public_id: {
          type: String,
          require: true,
        },
      },
    ],
    club: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    endDate: {
      type: Date,
      require: true,
    },
    registerlink: {
      type: String,
      default: "",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Post=mongoose.model("Post",postSchema);

module.exports=Post