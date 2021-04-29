import axios from 'axios';
const KEY = 'AIzaSyC9xLGs2WNWFEDBg-jWXBfAx9TQMCn-P9w';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 10,
        key: KEY
    }
})