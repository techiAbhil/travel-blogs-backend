import { addBlogSchema, updateBlogSchema } from '#validations/blog.validation';
import { numberSchema } from '#validations/common.validation';

import db from '#db';
import { deleteFile } from '#utils/hlper';

export const addBlog = async (req) => {
    const payload = addBlogSchema.parse(req.body);
    const blogDetails = await db.travel_blog.create({
        data: { ...payload, pictures: '', user_id: req.user.user_id },
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
            user_id: req.user.user_id,
        },
    });
    return blogDetails;
};

export const deleteBlog = async (req) => {
    const blog_id = numberSchema.parse(req.params.blog_id);

    const blogDetails = await db.travel_blog.delete({
        where: {
            blog_id, // blog_id: blog_id
            user_id: req.user.user_id,
        },
    });
    return blogDetails;
};

export const getAllBlog = async () => {
    // const queryString = req.query;
    const allBlogs = await db.travel_blog.findMany({
        include: {
            users: {
                select: {
                    user_id: true,
                    first_name: true,
                    last_name: true,
                    profile_pic: true,
                },
            },
        },
    });
    // const table = `travel-blog`;
    // const allBlogs = await db.$queryRaw`select * from ${table}`;
    return allBlogs;
};

export const getBlogByUser = async (req) => {
    const user = req.user;
    const myBlogs = await db.travel_blog.findMany({
        where: {
            user_id: user.user_id,
        },
    });
    return myBlogs;
};

export const updateBlogPictrues = async (req) => {
    const previousBlogDetails = await db.travel_blog.findFirst({
        where: {
            blog_id: req.blog_id,
        },
    });

    if (previousBlogDetails.pictures) {
        previousBlogDetails.pictures
            .split(', ')
            .forEach((pic) => deleteFile(`./public/images/${pic}`));
    }

    const blogDetails = await db.travel_blog.update({
        data: {
            pictures: req.uniqueName,
        },
        where: {
            blog_id: req.blog_id, // blog_id: blog_id
            user_id: req.user.user_id,
        },
    });
    return blogDetails;
};
