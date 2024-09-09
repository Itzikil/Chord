
import { storageService } from './async-storage.service.js'
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
    var songs = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        songs = songs.filter(song => regex.test(song.vendor) || regex.test(song.description))
    }
    if (filterBy.price) {
        songs = songs.filter(song => song.price <= filterBy.price)
    }
    return songs
}

function getById(songId) {
    return storageService.get(STORAGE_KEY, songId)
}

async function remove(songId) {
    await storageService.remove(STORAGE_KEY, songId)
}

async function save(song) {
    var savedSong
    if (song._id) {
        savedSong = await storageService.put(STORAGE_KEY, song)
    } else {
        // Later, owner is set by the backend
        song.owner = userService.getLoggedinUser()
        savedSong = await storageService.post(STORAGE_KEY, song)
    }
    return savedSong
}

async function addSongMsg(songId, txt) {
    // Later, this is all done by the backend
    const song = await getById(songId)
    if (!song.msgs) song.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    song.msgs.push(msg)
    await storageService.put(STORAGE_KEY, song)

    return msg
}

function getEmptySong() {
    return {
        name: '',
        artist: '',
        year: '',
        genre: '',
        level: '',
        lang: '',
        "time signature": '',
        tags: [],
    }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {
//     name: 'Time of your life',
//     artist: 'Green day',
//     year: '2000',
//     genre: 'rock',
//     level: '1',
//     lang: 'en',
//     "time signature": '4/4',
//     tags: [],
// })




