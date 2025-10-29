// dao/bannerDAO.js
const db = require('../config/db');

class BannerDAO {
    // Get all banners
    async getAllBanner() {
        const rows = await db('banner').select('*');
        return rows;
    }

    // Get banner by ID
    async getBannerByIds(id) {
        const rows = await db('banner').select('*').where('id', id);
        return rows[0];
    }


    // Assuming db is your knex instance
    async createBanner(banner) {
        const [id] = await db('banner').insert({
            heading: banner.heading,
            subheading: banner.subheading,
            content: banner.content,
            number: banner.number,
            image: banner.image,
            status: banner.status || 1
        });

        return id; // Knex returns the inserted ID
    }



    // Update banner
    async updateBannerById(id, banner) {
        const result = await db('banner')
            .where({ id })
            .update({
                heading: banner.heading,
                subheading: banner.subheading,
                content: banner.content,
                number: banner.number,
                image: banner.image,
                status: banner.status || 1
            });

        return result;
    }

    // Delete banner
    async deleteBannerById(id) {
        const result = await db('banner').where({ id }).del();
        return result; // number of deleted rows
    }

}

module.exports = new BannerDAO(); // Export instance
