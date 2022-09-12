# react-svg-drawer

# mode 一覧

## selector

何もしない。

## line

first click で点を配置
そこから mousemove に対応して preview を表示
second click でもう片方の点を置いて初期状態に戻る

## polyline

first click で点を配置
そこから mousemove に対応して preview を表示
クリックのたびにその点を新たに配置し線を確定
次の点の preview が表示されるようになる

## text

Modal が出現
config から text を設定し OK を押す
クリックしたところに配置

## rect

first click で一箇所確定
そこから mousemove に対応して preview を表示
second click のとき、その点と一つ目の点を対角とする四角を描画して初期状態に戻る

## circle

first click で一箇所確定
そこから mousemove に対応して preview を表示
second click のとき、その点と一つ目の点に接する楕円を描画して初期状態に戻る

# その他

## without snap mode

alt キーを押しながらマウスを操作すると、preview の表示やクリック時の配置が grid に沿わなくなる

## Press Escape

各 mode において、初期状態に戻す。
初期状態で Modal の入力を必要とするものは、Modal が出現。
さらに Escape を押すか Modal の外をクリックすれば元に戻れる。
