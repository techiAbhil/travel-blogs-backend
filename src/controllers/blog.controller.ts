import {
    addBlog,
    getAllBlog,
    getBlogByUser,
    updateBlog,
    deleteBlog,
    updateBlogPictrues,
} from '#services/blog.service';
import type { Request, Response } from 'express';

export const addBlogHandler = async (req: Request, res: Response) => {
    const response = await addBlog(req);
    res.status(201).json({
        msg: 'Blog has been successfully added',
        success: true,
        response, // blog: response // use this to accomodate frontend
    });
};

export const updateBlogHandler = async (req: Request, res: Response) => {
    const response = await updateBlog(req);
    res.status(200).json({
        msg: 'Blog has been updated!',
        success: true,
        response, // blog: response // use this to accomodate frontend
    });
};

export const deleteBlogHandler = async (req: Request, res: Response) => {
    const deletedBlogDetails = await deleteBlog(req);
    res.status(200).json({
        msg: 'Blog has been deleted',
        success: true,
        deletedBlogDetails,
    });
};

export const getAllBlogHandler = async (req: Request, res: Response) => {
    const blogs = await getAllBlog(req);
    res.status(200).json({
        msg: 'Success',
        success: true,

        blogs,
    });
};

export const getMyBlogsHandler = async (req: Request, res: Response) => {
    const blogs = await getBlogByUser(req);
    res.status(200).json({
        msg: 'Blog has been deleted',
        success: true,
        blogs,
    });
};

export const uploadBlogPicturesHandler = async (
    req: Request,
    res: Response
) => {
    const blogs = await updateBlogPictrues(req);
    res.status(200).json({
        msg: 'Blog images has been updated!',
        success: true,
        blogs,
    });
};
