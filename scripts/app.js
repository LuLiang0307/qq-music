(function() {
    fetch('/json/rec.json')
        .then(res => res.json())
        .then(render)

    fetch('/json/rank.json')
        .then(res => res.json())
        .then(json => json.topList.data.group)
        .then(renderTopList)

    function render(json) {
        renderOfficialPlaylist(json.homeData.officialPlaylist)
        renderUgcPlaylist(json.homeData.ugcPlaylist)
        renderZoneList(json.homeData.zoneList)
        lazyload(document.querySelectorAll('.lazyload'))
    }
    let search = new Search(document.querySelector("#search-view"))

    function renderOfficialPlaylist(list) {
        document.querySelector('.mod .mui-scroll .officialPlaylist').innerHTML = list.map(list => `
        <li class="mui-lilst-item">
            <div class="mui-list-box">
                <div class="list-media">
                    <img class="lazyload" data-src="${list.cover}">
                    <div class="list-play-cont">
                        <i class="list-play-icon"></i>
                        <span class="list-play-num">${(list.cnt/10000).toFixed(1)}万</span>
                    </div>
                </div>
                <div class="list-bd">
                    <h3 class="mui-list-title">${list.title}</h3>
                </div>
            </div>
        </li>`).join('')
    }

    function renderUgcPlaylist(list) {
        document.querySelector('.mod .mui-scroll .ugcPlaylist').innerHTML = list.map(list => `
        <li class="mui-lilst-item">
            <div class="mui-list-box">
                <div class="list-media">
                    <img class="lazyload" data-src="${list.cover}">
                    <div class="list-play-cont">
                        <i class="list-play-icon"></i>
                        <span class="list-play-num">${(list.cnt/10000).toFixed(1)}万</span>
                    </div>
                </div>
                <div class="list-bd">
                    <h3 class="mui-list-title">${list.title}</h3>
                </div>
            </div>
        </li>`).join('')
    }

    function renderZoneList(list) {
        document.querySelector('.mod .mui-scroll .zoneList').innerHTML = list.map(list => `
        <li class="mui-lilst-item">
            <div class="mui-list-box zone">
                <div class="list-media">
                    <img class="lazyload zone" data-src="${list.cover}">
                    <div class="zone-info">
                      <div class="zone-info-bd">
                         <img class="zone-info-img" src="${list.miscellany.icon}">
                         <span class="zone-info-name">${list.title}</span>
                     </div>
                    </div>
                </div>
                <div class="list-bd">
                     <h3 class="mui-list-title">${list.subtitle}</h3>
                </div>
            </div>
        </li>`).join('')
    }

    function renderTopList(list) {
        document.querySelector('.rank-view .rank-list').innerHTML = list.map(item =>
            item.toplist.map((item1) =>
                `<li class="rank-list-item">
                    <div class="text">
                        <h2>${item1.musichallTitle}</h2>
                        <ol class="song-list">
                        ${songlist(item1.song)}
                        </ol>
                    </div>
                    <div class="media">
                        <img class="rank-list-img lazyload" src="${item1.headPicUrl}">
                        <span class="rank-update">${item1.updateTips}</span>
                        <div class="list-play-cont">
                            <i class="list-play-icon"></i>
                            <span class="list-play-num">${(item1.listenNum/10000).toFixed(1)}万</span>
                        </div>
                    </div>
                </li>`
            )
        )

        lazyload(document.querySelectorAll(".rank-view .rank-list .lazyload"))

        function songlist(song) {
            return song.map(item =>
                `<li class="song-list-item">
                    <strong>${item.rank}.</strong><span class="song-name">${item.title}</span>-<span class="singer">${item.singerName}</span>
                </li>`).join('')
        }
    }
})()