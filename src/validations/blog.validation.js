import z from 'zod';

export const addBlogSchema = z.object({
    place_name: z.string().trim().min(3).max(45),
    review: z.string().trim().min(3).max(45),
});

// export const updateBlogSchema = z.object({
//     place_name: z.string().trim().min(3).max(45).optional(),
//     review: z.string().trim().min(3).max(45).optional(),
// });

export const updateBlogSchema = addBlogSchema.partial();
