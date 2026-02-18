import {
    addBlog,
    getAllBlog,
    getBlogByUser,
    updateBlog,
    deleteBlog,
    updateBlogPictrues,
} from '#services/blog.service';

export const addBlogHandler = async (req, res) => {
    const response = await addBlog(req);
    res.status(201).json({
        msg: 'Blog has been successfully added',
        success: true,
        response, // blog: response // use this to accomodate frontend
    });
};

export const updateBlogHandler = async (req, res) => {
    const response = await updateBlog(req);
    res.status(200).json({
        msg: 'Blog has been updated!',
        success: true,
        response, // blog: response // use this to accomodate frontend
    });
};

export const deleteBlogHandler = async (req, res) => {
    const deletedBlogDetails = await deleteBlog(req);
    res.status(200).json({
        msg: 'Blog has been deleted',
        success: true,
        deletedBlogDetails,
    });
};

export const getAllBlogHandler = async (req, res) => {
    const blogs = await getAllBlog();
    res.status(200).json({
        msg: 'Success',
        success: true,
        blogs,
    });
};

export const getMyBlogsHandler = async (req, res) => {
    const blogs = await getBlogByUser(req);
    res.status(200).json({
        msg: 'Blog has been deleted',
        success: true,
        blogs,
    });
};

export const uploadBlogPicturesHandler = async (req, res) => {
    const blogs = await updateBlogPictrues(req);
    res.status(200).json({
        msg: 'Blog images has been updated!',
        success: true,
        blogs,
    });
};
