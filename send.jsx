// API呼び出し時にひつようなパラメータを受ける。
async function send(file, predict) {

    // APIキーとURL
    var API_KEY = 'DZZ2gMQrsiVreHBQqPgTQXczoJieyebo';
    var END_POINT = 'https://api.a3rt.recruit-tech.co.jp/image_influence/v1/meat_score';

    console.log(file)

    // https://github.com/Donaldcwl/browser-image-compression　画像ファイル圧縮ライブラリ
    // 画像ファイル圧縮のためのオプション
    const options = {
        maxSizeMB: 3,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    }

    const compressedFile = await imageCompression(file, options);
    console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); 
    console.log(compressedFile)

    // TODO: API呼び出し
    var formdata = new FormData();
    formdata.append('apikey', API_KEY);
    formdata.append('imagefile', compressedFile);
    formdata.append('predict', predict);
    $("#overlay").fadeIn(300);
    $.ajax({
    type: 'POST',
    url: END_POINT,
    processData: false,
    contentType: false,
    data: formdata,
    timeout: 30000
    }).done(function(data, textStatus, jqXHR) {
        var api_reply = data.result.score;
        console.log(api_reply);

        // 小数点第二位未満を四捨五入
        var score = Math.round(api_reply * 100) / 100;
        console.log(score)
        scoreRendering(score);
        // 予想と結果の差の絶対値,四捨五入
        var difference = Math.round(Math.abs(score - predict));
        evalRendering(difference);

    }).fail(function(data, textStatus, error) {
        if (textStatus){
            $("#overlay").fadeOut(300);
            alert('読み込めませんでした。')
        }
        alert(jqXHR.status);
        console.log('失敗');
    });

    // Responseとして返却されたスコアを引数に渡す。
};



window.send = send;