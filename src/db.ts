import { config } from "dotenv";
import mongoose from "mongoose";
config();

//#region Models
interface IPost {
    title: string,
    author: string,
    body: string,
    date: Date,
    hidden: boolean,
}

const postSchema = new mongoose.Schema<IPost>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: Date, default: Date.now },
    hidden: { type: Boolean, default: true },
});

const Post = mongoose.model<IPost>("Post", postSchema, "posts");
//#endregion

const connectionString = process.env.MONGODB_CONNECTION_STRING;

export const addPost = async (
    title: string,
    author: string,
    body: string,
    hidden: boolean) => {

    try {
        await mongoose.connect(connectionString!, { dbName: "blog" });

        const post = new Post();
        post.title = title;
        post.body = body;
        post.author = author;
        post.hidden = hidden;

        return await post.save();
    } catch (error) {
        console.log(error);
    }
    finally {
        await mongoose.disconnect();
    }
}

export const getPosts = async () => {

    try {
        await mongoose.connect(connectionString!, { dbName: "blog" });

        return await Post.find();
    } catch (error) {
        console.log(error);
    }
    finally {
        await mongoose.disconnect();
    }
}

export const deletePost = async (id: string) => {

    try {
        await mongoose.connect(connectionString!, { dbName: "blog" });

        return await Post.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }
    finally {
        await mongoose.disconnect();
    }
}

export const updatePost = async (
    id: string,
    title: string | undefined,
    author?: string,
    body?: string,
    hidden?: boolean,
) => {

    try {
        await mongoose.connect(connectionString!, { dbName: "blog" });

        const post = await Post.findById(id);

        if (!post) {
            throw new Error("Post non trovato.");
        }

        if (title) post.title = title;
        if (author) post.author = author;
        if (body) post.body = body;
        if (hidden) post.hidden = hidden;

        return await post.save();
    } catch (error) {
        console.log(error);
    }
    finally {
        await mongoose.disconnect();
    }
}