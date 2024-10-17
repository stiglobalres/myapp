class Pagination {
    constructor(){
    }

    getPagination(options) {
        let prevEpisode = false;
        let nextEpisode = false;

        if(typeof options.chapter.data[options.episodeIndex - 1] !== 'undefined') {
            let prevURL = options.chapter.data[options.episodeIndex - 1];
            prevEpisode = `/manga/${options.mangaid}/chapter/${options.chapter.chapter}/episode/${prevURL.episode}`;
        }

        if(typeof options.chapter.data[options.episodeIndex + 1] !== 'undefined') {
            let nextURL = options.chapter.data[options.episodeIndex + 1];
            nextEpisode = `/manga/${options.mangaid}/chapter/${options.chapter.chapter}/episode/${nextURL.episode}`;
        }

        let pagination ={
            prev: prevEpisode,
            next: nextEpisode,
            home: '/'
        }

        return pagination;
    }
}
module.exports = Pagination