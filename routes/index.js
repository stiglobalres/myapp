const { Router} = require('express')
const { getManga, getEpisode } = require("../controllers/home")
const router = Router();


router.route('/').get(getManga);
router.route('/chapter/:chapterid/episode/:episodeid').get(getEpisode);

module.exports = router