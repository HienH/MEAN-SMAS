import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Song } from './song.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SongForm } from '../song-form/song-form.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {

    }
    registerUser(user: User) {
        return this.http.post(environment.apiBaseUrl + 'playlist/register', user);
    }

    loginUser(user: User) {
        return this.http.post(environment.apiBaseUrl + 'playlist/login', user);
    }

    logoutUser() {
        localStorage.setItem('token', '');
        return this.http.get(environment.apiBaseUrl + 'playlist/logout')
    }

    isLoggedIn() {
        return !!localStorage.getItem('token');
    }

    getToken() {
        const token = localStorage.getItem('token');
        return token ? token : null;
    }

    getUser() {
        return this.http.get(environment.apiBaseUrl + 'user/info')
    }

    getSongs() {
        return this.http.get(environment.apiBaseUrl + 'song')
    }

    deleteSong(song: Song) {
        return this.http.post(environment.apiBaseUrl + 'song/delete', song);
    }

    addSong(newSong: Song) {
        return this.http.post(environment.apiBaseUrl + 'song/add', newSong);
    }

    createPlaylist(code) {
        return this.http.post(environment.apiBaseUrl + 'spotify/createPlaylist', { code: code });
    }

    // getOtherUserSong(username) {
    //     return this.http.get(environment.apiBaseUrl + 'playlist/otherUser/' + username);
    // }

    sendFriendPlaylist(newSongForm: SongForm) {
        return this.http.post(environment.apiBaseUrl + 'user/addFriendSongs', newSongForm)
    }

    addToPlaylist(songs) {
        return this.http.post(environment.apiBaseUrl + 'spotify/addToPlaylist', songs);
    }

}
