const Axios = require('axios');
const cheerio = require('cheerio');

exports.fetchData = async (productid) => {
    try {
        const result = await Axios.get('https://www.ebay.com/itm/' + productid);
        const $ = cheerio.load(result.data);
        const title = $('title').text().split('|')[0];
        const url = $('meta[property="og:url"]').attr('content')
        const img = $('#icImg').attr('src')
        const thumbnails = []
        $('#vi_main_img_fs').find($('.tdThumb img')).each(function(f) {
            thumbnails.push($(this).attr('src'))
        })
        return {
            title,
            url,
            img,
            thumbnails,
        }
    } catch(e) {
        return Promise.reject(e);
    }
}