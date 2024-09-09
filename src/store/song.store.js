import { songService } from '../services/song.service.local'

export function getActionRemoveSong(songId) {
    return {
        type: 'removeSong',
        songId
    }
}
export function getActionAddSong(song) {
    return {
        type: 'addSong',
        song
    }
}
export function getActionUpdateSong(song) {
    return {
        type: 'updateSong',
        song
    }
}

export function getActionAddSongMsg(songId) {
    return {
        type: 'addSongMsg',
        songId,
        txt: 'Stam txt'
    }
}

export const songStore = {
    state: {
        songs: []
    },
    getters: {
        songs({ songs }) { return songs },
    },
    mutations: {
        setSongs(state, { songs }) {
            state.songs = songs
        },
        addSong(state, { song }) {
            state.songs.push(song)
        },
        updateSong(state, { song }) {
            const idx = state.songs.findIndex(c => c.id === song._id)
            state.songs.splice(idx, 1, song)
        },
        removeSong(state, { songId }) {
            state.songs = state.songs.filter(song => song._id !== songId)
        },
        addSongMsg(state, { songId, msg }) {
            const song = state.songs.find(song => song._id === songId)
            if (!song.msgs) song.msgs = []
            song.msgs.push(msg)
        },
    },
    actions: {
        async addSong(context, { song }) {
            try {
                song = await songService.save(song)
                context.commit(getActionAddSong(song))
                return song
            } catch (err) {
                console.log('songStore: Error in addSong', err)
                throw err
            }
        },
        async updateSong(context, { song }) {
            try {
                song = await songService.save(song)
                context.commit(getActionUpdateSong(song))
                return song
            } catch (err) {
                console.log('songStore: Error in updateSong', err)
                throw err
            }
        },
        async removeSong(context ,  { songId }) {
            try {
                const songs = await songService.remove(songId)
                context.commit({ type: 'removeSong', songId })
            } catch (err) {
                console.log('songStore: Error in loadSongs', err)
                throw err
            }
        },
        async loadSongs(context) {
            try {
                const songs = await songService.query()
                context.commit({ type: 'setSongs', songs })
            } catch (err) {
                console.log('songStore: Error in loadSongs', err)
                throw err
            }
        },
        async getSongById(context, { songId }) {
            try {
                return await songService.getById(songId)
            } catch (err) {
                console.log('songStore: Error in removeSong', err)
                throw err
            }
        },
        async addSongMsg(context, { songId, txt }) {
            try {
                const msg = await songService.addSongMsg(songId, txt)
                context.commit({ type: 'addSongMsg', songId, msg })
            } catch (err) {
                console.log('songStore: Error in addSongMsg', err)
                throw err
            }
        },

    }
}