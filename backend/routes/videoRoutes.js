const express = require('express');
const router = express.Router();
const {
    getAllVideos,
    getVideo,
    createVideo,
    updateVideo,
    deleteVideo
} = require('../controllers/videoController')
const {secure} = require('../middleware/authenticate')

router.get('/:id', secure, getVideo)
router.put('/:id', secure, updateVideo)
router.delete('/:id', secure, deleteVideo)

router.get('/', secure, getAllVideos)
router.post('/', secure, createVideo)

module.exports = router