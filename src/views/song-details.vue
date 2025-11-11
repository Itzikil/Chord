<template>
  <section class="home-container">
    <div class="song-card">
      <h1 class="song-title">{{ currSong.title }}</h1>

      <div class="song-details">
        <div v-for="data in songData" :key="data" class="detail-row">
          <p class="detail-key">{{ (data) }}</p>
          <p class="detail-value">{{ currSong[data] }}</p>
        </div>
      </div>
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
            songData: ['title', 'artist', 'language', 'rhythm', 'genre', "tempo", 'key', 'scale',
                'numChordChanges', 'tags', 'difficulty', 'year'],
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