const express = require('express')
const request = require('request-promise')
const app = express()
const PORT = process.env.PORT || 4000
    // curl 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?_=1602580215215&g_tk=5381&uin=&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&g_tk_new_20200303=5381&w=%E6%9D%8E%E8%8D%A3%E6%B5%A9&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all' \
    //   -H 'authority: c.y.qq.com' \
    //   -H 'user-agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4181.9 Mobile Safari/537.36' \
    //   -H 'accept: */*' \
    //   -H 'origin: http://127.0.0.1:8080' \
    //   -H 'sec-fetch-site: cross-site' \
    //   -H 'sec-fetch-mode: cors' \
    //   -H 'sec-fetch-dest: empty' \
    //   -H 'referer: http://127.0.0.1:8080/' \
    //   -H 'accept-language: zh-CN,zh;q=0.9' \
    //   --compressed
const HEADERS = {
    'accept': '*/*',
    'authority': 'c.y.qq.com',
    'origin': 'http://c.y.qq.com',
    'referer': 'http://c.y.qq.com/',
    'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4181.9 Mobile Safari/537.36',
}
app.get('/', async(req, res) => {
    const url = `https://u.y.qq.com/cgi-bin/musicu.fcg?_=${+new Date()}&data={%22comm%22:{%22g_tk%22:5381,%22uin%22:%22%22,%22format%22:%22json%22,%22inCharset%22:%22utf-8%22,%22outCharset%22:%22utf-8%22,%22notice%22:0,%22platform%22:%22h5%22,%22needNewCode%22:1},%22playSongAd%22:{%22module%22:%22SongPlay.SongPlayBaseServer%22,%22method%22:%22GetPlaySongAd%22,%22param%22:{%22channel%22:3,%22app_user%22:1,%22platform%22:1,%22forbid%22:0,%22share_musicid%22:%22%22,%22encodetype%22:1,%22adtype%22:8}}}`
    try {
        res.json(await request({
            uri: url,
            json: true,
            headers: HEADERS
        }))
    } catch (e) {
        res.json({ error: e.massage })
    }
})
app.get('/search', async(req, res) => {
    let { keyword, page = 1 } = req.query
    const url = `https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?_=${+new Date()}&g_tk=5381&uin=&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&g_tk_new_20200303=5381&w=${encodeURIComponent(keyword)}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=${page}&remoteplace=txt.mqq.all`
    try {
        res.json(await request({
            uri: url,
            json: true,
            headers: HEADERS
        }))

    } catch (e) {
        res.json({ error: e.massage })
    }
})
app.listen(PORT)