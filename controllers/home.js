'use strict'
const { data } = require("autoprefixer");
const fs = require("fs")
const path = require("path")

function readFile(filePath) {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return data.toString();
    } catch (error) {
      console.error(`Got an error trying to read the file: ${error.message}`);
    }
  }

const getManga =async (req, res) =>{
    const mangaJSON = require("../data/manga.json")
    let manga = mangaJSON.data[0];
    const tableContent = require(manga.episode)
    res.render( 'index', {manga: manga, content: tableContent.data})
}

const getEpisode =(req, res) => {
    try {
        const mangaid   = req.params.mangaid;
        const chapterid = req.params.chapterid;
        const episodeid = req.params.episodeid;
        const mangaJSON = require("../data/manga.json")
        let manga = mangaJSON.data.find(field => field.mangaid == mangaid);
        const tableContent = require(manga.episode)

        let chapter = tableContent.data.find(field => field.chapter == chapterid);
        let episodeIndex = chapter.data.findIndex(field => field.episode == episodeid);

        let episode = chapter.data[episodeIndex];

        let filePath = `./files/${episode.file}.txt`;

        let content = readFile(filePath);

        let prevEpisode = false;
        let nextEpisode = false;

        if(typeof chapter.data[episodeIndex - 1] !== 'undefined') {
            let prevURL = chapter.data[episodeIndex - 1];
            prevEpisode = `/manga/${mangaid}/chapter/${chapter.chapter}/episode/${prevURL.episode}`;
        }

        if(typeof chapter.data[episodeIndex + 1] !== 'undefined') {
            let nextURL = chapter.data[episodeIndex + 1];
            nextEpisode = `/manga/${mangaid}/chapter/${chapter.chapter}/episode/${nextURL.episode}`;
        }

        let pagination ={
            prev: prevEpisode,
            next: nextEpisode,
            home: '/'
        }
   
        res.render('episode', 
        {
            manga:manga,
            chapterid:chapter.chapter, 
            info: episode, 
            episode: content,
            pagination: pagination
        })
    } catch (err) {
        res.status(404).send('Page not found!')
    }
}

module.exports = { getManga, getEpisode} ;