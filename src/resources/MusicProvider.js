import HttpRequest from './HttpRequest'

class MusicProvider extends HttpRequest {
  getMusics () {
    return this.get('/music')
  }
}

export default MusicProvider
