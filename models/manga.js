const readTextFileSync = require('../common/readTextFileSync');
class manga {

    constructor () {
        this.manga = null;
        this.allChapters =[]
        this.chapter=null
        this.episodeIndex=0;
        this.episode=null;
        this.episodeContent=null;
    }

    getManga(id) {
        let mangaData =[];
        let mangaJSON ={
            data: []
        };

        let filePath = `./json/manga.json`;
        const readFileSync = new readTextFileSync(filePath);
        if(readFileSync.isFileExist()) {
             mangaJSON =  JSON.parse(readFileSync.readFile());
            if(mangaJSON) {
                mangaData = mangaJSON.data;
                if(mangaData.length) {
                    this.manga = mangaData.find(field => field.mangaid == id);
                    if(typeof this.manga =='object') {
                        const readFileSync = new readTextFileSync(this.manga.episode);
                        if(readFileSync.isFileExist()) {
                            this.allChapters = JSON.parse(readFileSync.readFile());
                        }
                    }
                }
            }
        }

        return this.manga
    }
    getMangaAllChapters() {
        return  this.allChapters;
    }
    getMangaId(){
        return (typeof this.manga =='object') ? this.manga.mangaid : null;
    }

    getChapterByID(id) {
        this.chapter = this.allChapters.data.find(field => field.chapter == id);
        return this.chapter
    }

    getEpisode(id) {
        if(typeof this.chapter =='undefined') {
            return undefined
        }
        this.episodeIndex = this.chapter.data.findIndex(field => field.episode == id);
        if(typeof this.episodeIndex =='undefined') {
            return undefined
        }
        this.episode = this.chapter.data[this.episodeIndex];
        if(typeof this.episode =='undefined') {
            return undefined
        }
        let filePath = `./files/${this.episode.file}.txt`;
        const readFileSync = new readTextFileSync(filePath);
        this.episodeContent = (readFileSync.isFileExist()) ? readFileSync.readFile() : null;
      
        return this.episode
    }

    getEpisodeIndex() {
        return this.episodeIndex ;
    }

    getEpisodeContent() {
        return this.episodeContent ;
    }
}

module.exports = manga