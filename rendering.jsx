// 選択されたファイルのプレビューを表示する
function imageFileRendering(file) {
    // 前回表示画像を取り除く
    $('imageContainer').remove();
    // 指定されたファイルが画像じゃない、またはファイルの指定がない場合
    if (file === undefined || !file.type.match('image.*')) {
        // 送信ボタンを非活性にする
        $('#sendAction').prop('disabled', true);
        return false;
    }
    // プレビュー画像のレンダリング
    ReactDOM.render(
        <img id="previewImage" src={URL.createObjectURL(file)} />,
        document.getElementById('imageContainer')
    );

    // 送信ボタンを活性にする
    $('#sendAction').prop('disabled', false);

    return true;
};

// APIのResponseのスコアをレンダリングする
function scoreRendering(score) {
    // TODO: スコアをレンダリングする。
    // 前回表示点数を取り除く
    $('result').remove();
    $("#overlay").fadeOut(300);

    // 点数のレンダリング
    ReactDOM.render(
        <div>
            {((score + 1) * 10).toString().substring( 0, 4 )}点
        </div>,
        document.getElementById('result')
    );
};

function evalRendering(difference) {

    $('eval').remove();
    var evl;
    if (difference === 0) {
        evl = "当たり！！";
    } else if (difference === 1) {
        evl = "おしい！";
    } else {
        evl = "残念はずれ…";
    }
    ReactDOM.render(
        <div>{evl}</div>,
        document.getElementById('eval')

    );
    $('#moodal').click();

};

// 他ファイルからも試用できるようwindowに登録
window.imageFileRendering = imageFileRendering;
window.scoreRendering = scoreRendering;
window.evalRendering = evalRendering;