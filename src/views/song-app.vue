<template>
  <div class="song-app">
    <ul class="song-list">
      <li v-for="song in songs" :key="song._id" class="song-card">
        <router-link :to="`/song/${song._id}`" class="song-link">
          <div class="song-info">
            <p class="song-title">{{ song.title }}</p>
            <div class="song-tags">
              <span class="tag">{{ song.key }}</span>
              <span class="tag">{{ song.difficulty }}</span>
              <span class="tag">{{ song.tempo }}</span>
            </div>
          </div>
          <!-- <button @click.prevent="removeSong(song._id)" class="remove-btn">×</button> -->
        </router-link>
      </li>
    </ul>

    <button @click="openAddCmp = !openAddCmp" class="toggle-add-btn">
      {{ !openAddCmp ? 'Add Song' : 'Close Add Song' }}
    </button>

    <section v-if="openAddCmp" class="add-song-container">
      <form @submit.prevent="addSong()" class="add-song-form">
        <h2>Add Song</h2>
        <label v-for="data in songData" :key="data" class="data-label">
          <p>{{ data }}</p>
          <input type="text" v-model="songToAdd[data]" />
        </label>
        <button type="submit" class="save-btn">Save</button>
      </form>
    </section>
  </div>
</template>


<script>
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { songService } from "../services/song.service.local";
import { getActionUpdateSong } from "../store/song.store";

export default {
  data() {
    return {
      songToAdd: songService.getEmptySong(),
      songData: ['name', 'artist', 'year', 'genre', 'level', 'lang', "time signature", 'tags'],
      openAddCmp: false,
    };
  },
  computed: {
    songs() {
      return this.$store.getters.songs;
    },
  },
  created() {
    this.$store.dispatch({ type: "loadSongs" });
  },
  methods: {
    async addSong() {
      try {
        await this.$store.dispatch({ type: "addSong", song: this.songToAdd });
        showSuccessMsg("Song added");
        this.songToAdd = songService.getEmptySong();
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot add song");
      }
    },
    async removeSong(songId) {
      try {
        await this.$store.dispatch({ type: 'removeSong', songId });
        showSuccessMsg("Song removed");
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot remove song");
      }
    },
    async updateSong(song) {
      try {
        song = { ...song };
        song.price = +prompt("New price?", song.price);
        await this.$store.dispatch(getActionUpdateSong(song));
        showSuccessMsg("Song updated");
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot update song");
      }
    },
  },
};
</script>
