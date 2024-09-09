
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'song'

export const songService = {
    query,
    getById,
    save,
    remove,
    getEmptySong,
    addSongMsg
}
window.cs = songService


async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(STORAGE_KEY, filterBy)

    // var songs = await storageService.query(STORAGE_KEY)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     songs = songs.filter(song => regex.test(song.vendor) || regex.test(song.description))
    // }
    // if (filterBy.price) {
    //     songs = songs.filter(song => song.price <= filterBy.price)
    // }
    // return songs

}
function getById(songId) {
    // return storageService.get(STORAGE_KEY, songId)
    return httpService.get(`song/${songId}`)
}

async function remove(songId) {
    // await storageService.remove(STORAGE_KEY, songId)
    return httpService.delete(`song/${songId}`)
}
async function save(song) {
    var savedSong
    if (song._id) {
        // savedSong = await storageService.put(STORAGE_KEY, song)
        savedSong = await httpService.put(`song/${song._id}`, song)

    } else {
        // Later, owner is set by the backend
        song.owner = userService.getLoggedinUser()
        // savedSong = await storageService.post(STORAGE_KEY, song)
        savedSong = await httpService.post('song', song)
    }
    return savedSong
}

async function addSongMsg(songId, txt) {
    const savedMsg = await httpService.post(`song/${songId}/msg`, {txt})
    return savedMsg
}


function getEmptySong() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}





