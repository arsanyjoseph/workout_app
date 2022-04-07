const express = require('express');
const router = express.Router();
const {
    getAllVideos,
    getVideo,
    createVideo,
    updateVideo,
    deleteVideo
} = require('../controllers/videoController')

router.route('/').get(getAllVideos).post(createVideo)

router.route('/:id').get(getVideo).put(updateVideo).delete(deleteVideo)

module.exports = router