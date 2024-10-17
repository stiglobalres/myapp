const request = require('supertest')
const app = require('../app');

const readTextFileSync = require('../common/readTextFileSync');
const mangaModel = require('../models/manga')

describe('Checking models', ()=>{
    let id = 1;
    const manga = new mangaModel();
    describe('Search existing manga', () => {
        test(`Should return the info of manga-id=${id}`,async ()=>{
            let actualResult =await manga.getManga(id);
            let mangaID = manga.getMangaId();
            expect(id).toBe(mangaID)
        })     

        test('Shoud return  all episode of chapter-id= 1',async()=>{
            let actualResult = manga.getChapterByID(1);
        })

        test('Shoud return the content of episode-id=1',async()=>{
            let actualResult = manga.getEpisode(1)
        })
    })
    describe('Search non-existing manga', () => {
        
        test('Shoud return null of episode is not found',async()=>{
            let actualResult = manga.getEpisode(0)
            expect(actualResult).toBeUndefined()
        })

        test('Shoud return null of chapter is not found',async()=>{
            let actualResult = manga.getChapterByID(0);
            expect(actualResult).toBeUndefined()
           
        })
        
        test(`Should return null if mangaid not found`,async ()=>{
            id=2
            let actualResult =await manga.getManga(id);
            let mangaID = manga.getMangaId();
            expect(mangaID).toBeNull()
        }) 
    }) 

})
describe('Checking readTextFileSync Class', () => {
    let path1 = `./files/ch1/ep1.txt`;
    let path2 = `./files/ch1/ep1.1txt`;
    const readFileSync_exist = new readTextFileSync(path1);
    const readFileSync_dontexist = new readTextFileSync(path2);
    describe('Test isFileExist()', () => {
        test('Should return true if file exist', async() => {
            let  actualResult =  await readFileSync_exist.isFileExist();
            expect(actualResult).toEqual(true);
        })

        test('Should return false if file dont exist', () => {
            let  actualResult =  readFileSync_dontexist.isFileExist();
            expect(actualResult).toEqual(false);
        })
    })
    describe('Test readFile()', () => {
        test('Should return the file content', async() => {
            let  actualResult =  readFileSync_exist.readFile();
            expect(actualResult.length ).toBeGreaterThan(1);
        });
    })
})

describe('Home Controller', () => {
    it('Home Page', async () => {
        const res = await request(app).get('/')
        expect(res.statusCode).toEqual(200)
    })
    test('Detail Page', async () => {
        const res = await request(app).get('/manga/1/chapter/1/episode/1')
        expect(res.statusCode).toEqual(200)
    })
})
