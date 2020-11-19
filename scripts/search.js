class Search {
    constructor(el) {
        this.$el = el
        this.$input = this.$el.querySelector("#search")
            //   console.log(this)//Search实例
        this.$input.addEventListener('keyup', this.onKeyUp.bind(this)) //这个this也是Search实例才行
        this.$songs = this.$el.querySelector('.song-list')
        this.keyword = ''
        this.page = 1
        this.perpage = 20
        this.songs = []
    }
    onKeyUp(event) { //监听每一个按键
        let keyword = event.target.value.trim() //获取内容
        if (event.key !== 'enter') return
        this.search(keyword)
    }
    search(keyword) {
        this.keyword = keyword
        fetch(`http://localhost:4000/search?keyword=${this.keyword}$page=${this.page}`)
            .then(res => res.json())
            .then(json => json.data.song.list)
            .then(songs => this.append(songs))
    }
    append(songs) {
        let html = songs.map(song => `
        <li class="song-item">
            <i class="icon icon-music"><i>
            <div class="song-name ellipsis">${song.songname}</div>
            <div class="song-artist ellpsis">${song.singer.map(s=>s.name).join(' ')}</div>
        </li>`).join('')
        this.$songs.insertAdhacentHTML('beforeend', html)
    }
}