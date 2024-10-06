const { Blog } = require('../models');

module.exports = {
    // Get all blogs
    async index(req, res) {
        try {
            const blogs = await Blog.findAll();
            res.send(blogs);
        } catch (err) {
            res.status(500).send({
                error: 'The blogs information was incorrect'
            });
        }
    },

    // Create blog
async create(req, res) {
    const { name, habitat, food, status } = req.body;

    // ตรวจสอบว่ามีข้อมูลที่จำเป็นทั้งหมด
    if (!name || !habitat || !food || !status) {
        return res.status(400).send({
            error: 'Missing required fields'
        });
    }

    try {
        // สร้าง blog ใหม่
        const blog = await Blog.create(req.body);
        res.status(201).send(blog.toJSON());
    } catch (err) {
        console.error(err); // เพิ่มการแสดงข้อผิดพลาดใน console
        res.status(500).send({
            error: 'Create blog incorrect'
        });
    }
},


    // Edit blog, suspend, active
    async put(req, res) {
        try {
            const [updated] = await Blog.update(req.body, {
                where: {
                    id: req.params.blogId
                }
            });

            if (!updated) {
                return res.status(404).send({
                    error: 'Blog not found'
                });
            }

            res.send(req.body);
        } catch (err) {
            res.status(500).send({
                error: 'Update blog incorrect'
            });
        }
    },

    // Delete blog
    async remove(req, res) {
        try {
            const blog = await Blog.findOne({
                where: {
                    id: req.params.blogId
                }
            });

            if (!blog) {
                return res.status(404).send({
                    error: 'The blog information was incorrect'
                });
            }

            await blog.destroy();
            res.send(blog);
        } catch (err) {
            res.status(500).send({
                error: 'The blog information was incorrect'
            });
        }
    },

    // Get blog by id
    async show(req, res) {
        try {
            const blog = await Blog.findByPk(req.params.blogId);
            if (!blog) {
                return res.status(404).send({
                    error: 'Blog not found'
                });
            }
            res.send(blog);
        } catch (err) {
            res.status(500).send({
                error: 'The blog information was incorrect'
            });
        }
    }
};
