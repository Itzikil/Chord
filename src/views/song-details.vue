<template>
    <section class="container home text-center">
        <h1>{{ currSong.name }}</h1>
        <!-- <h5 class="text-center">{{ currSong }}</h5> -->
        <div>
            <p v-for="data in songData">{{ currSong[data] }}</p>
        </div>
    </section>
</template>

<script>

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';

export default {
    name: 'login-signup',
    data() {
        return {
            currSong: '',
            songData: ['name', 'artist', 'year', 'genre', 'level', 'lang', "time signature", 'tags']
        }
    },
    created() {
        this.getSong(this.songId)
    },
    computed: {
        songId() {
            return this.$route.params.id
        }
    },
    methods: {
        async getSong(songId) {
            try {
                this.currSong = await this.$store.dispatch({ type: 'getSongById', songId })
            } catch (err) {
                console.log(err);
                showErrorMsg("Cannot remove song");
            }
        }
    },
}
</script>