const mangaModel = require('../models/manga')
const Pagination = require('../common/pagination')

const renderManga =async (req, res) =>{
    let mangaid = 1;

    const manga_model = new mangaModel();
    let manga = manga_model.getManga(mangaid);
    let tableContent = manga_model.getMangaAllChapters();

    res.render( 'index', {manga: manga, content: tableContent.data})
    
}

const getEpisode =(req, res) => {

        const mangaid   = req.params.mangaid;
        const chapterid = req.params.chapterid;
        const episodeid = req.params.episodeid;
        let compact = {
            manga:null,
            chapterid: null, 
            info: null, 
            episode: null,
            pagination: null
        }

        const manga_model = new mangaModel();
        compact.manga = manga_model.getManga(mangaid);

        if(typeof compact.manga == 'undefined') {
            res.render('error', {message:'Manga is not available'});
        }
       
        let chapter = manga_model.getChapterByID(chapterid);
        if(typeof chapter == 'undefined') {
            res.render('error', {message:`Chapter ${chapterid} is not available`});
        }   
        
        compact.info = manga_model.getEpisode(episodeid)
        if(typeof compact.info == 'undefined') {
            res.render('error', {message:`Episode ${episodeid} is not available`});
        }      

        compact.chapterid = chapter.chapter
        let episodeIndex = manga_model.getEpisodeIndex();
        compact.episode  = manga_model.getEpisodeContent();


        let navOption = {
            chapter: chapter,
            mangaid: mangaid,
            episodeIndex: episodeIndex
        }
        const pagination = new Pagination();
        compact.pagination = pagination.getPagination(navOption);
       
        res.render('episode', compact)
       

}

module.exports = { renderManga, getEpisode} ;