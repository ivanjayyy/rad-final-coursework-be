import mongoose from "mongoose";

export interface IBookmark {
    post: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
}

const bookmarkSchema = new mongoose.Schema<IBookmark>({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

export const BookmarkModel = mongoose.model<IBookmark>("Bookmark", bookmarkSchema);