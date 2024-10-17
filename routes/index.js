const { Router} = require('express')
const { renderManga, getEpisode } = require("../controllers/HomeController")
const router = Router();

router.route('/').get(renderManga);
router.route('/manga/:mangaid/chapter/:chapterid/episode/:episodeid').get(getEpisode);

module.exports = router