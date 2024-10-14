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
    const tableContent = require("../data/files.json")
    res.render( 'index', {manga: mangaJSON, content: tableContent.data})
}

const getEpisode =(req, res) => {
    const chapterid = req.params.chapterid;
    const episodeid = req.params.episodeid;
    const tableContent = require("../data/files.json")
    let chapter = tableContent.data.find(field => field.chapter == chapterid);
    let episodeIndex = chapter.data.findIndex(field => field.episode == episodeid);
    
    let episode = chapter.data[episodeIndex];
    console.log(chapter.data[episodeIndex]);

    let filePath = `./files/${episode.file}.txt`;
    let content = readFile(filePath);


    let prevEpisode = false;
    let nextEpisode = false;

    if(typeof chapter.data[episodeIndex - 1] !== 'undefined') {
        let prevURL = chapter.data[episodeIndex - 1];
        prevEpisode = `/chapter/${chapter.chapter}/episode/${prevURL.episode}`;
    }

    if(typeof chapter.data[episodeIndex + 1] !== 'undefined') {
        let nextURL = chapter.data[episodeIndex + 1];

        nextEpisode = `/chapter/${chapter.chapter}/episode/${nextURL.episode}`;
    }

    let pagination ={
        prev: prevEpisode,
        next: nextEpisode,
        home: '/'
    }
    
    res.render('episode', 
    {
        chapter:chapter.chapter, 
        info: episode, 
        episode: content,
        pagination: pagination
    })
}

module.exports = { getManga, getEpisode} ;