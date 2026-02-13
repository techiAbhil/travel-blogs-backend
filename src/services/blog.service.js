import { addBlogSchema, updateBlogSchema } from '#validations/blog.validation';
import { numberSchema } from '#validations/common.validation';

import db from '#db';

export const addBlog = async (req) => {
    const payload = addBlogSchema.parse(req.body);
    const blogDetails = await db.travel_blog.create({
        data: { ...payload, pictures: '' },
    });
    return blogDetails;
};

export const updateBlog = async (req) => {
    const blog_id = numberSchema.parse(req.params.blog_id);
    const payload = updateBlogSchema.parse(req.body);
    const blogDetails = await db.travel_blog.update({
        data: payload,
        where: {
            blog_id, // blog_id: blog_id
        },
    });
    return blogDetails;
};

export const deleteBlog = async (req) => {
    const blog_id = numberSchema.parse(req.params.blog_id);

    const blogDetails = await db.travel_blog.delete({
        where: {
            blog_id, // blog_id: blog_id
        },
    });
    return blogDetails;
};

export const getAllBlog = async () => {
    const allBlogs = await db.travel_blog.findMany();
    return allBlogs;
};

export const getBlogByUser = async (req) => {
    const user_id = req.user;
    const myBlogs = await db.travel_blog.findMany({
        where: {
            user_id,
        },
    });
    return myBlogs;
};
