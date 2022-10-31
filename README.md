# react-svg-drawer

# mode

## selector

Object を選択できる。
選択されたオブジェクトは青くなる。
以下、いくつかの機能・モードがある。
- 範囲選択
 
  マウスで範囲を囲うようにドラッグすれば、そのエリア内にあるオブジェクトをまとめて選択できる

- マルチセレクトモード
 
  Shiftキーを押しながらクリック　または　範囲選択

- 移動
  
  選択したものを掴んでドラッグ&ドロップ

- コピー
  
  移動時にControlキーを押し、そのままドロップすればCopyが可能

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

# Function

## undo

一つ前の状態に遷移する

## redo

（undo 後に）一つ後の状態に遷移する

## grouping

選択された object を group 化する

## ungrouping

group 化された object の group 化を解除する

## newFile

ファイル（状態）をリセットする

## saveFile

ファイル（状態）をローカルに保存する

## loadFile

ファイル（状態）をローカルから復元する

## importFile

対応する json ファイルを渡せば、読み込み可能

## exportFile

画面上にあるオブジェクトの情報を全て吐き出す

## log

画面上にあるオブジェクトの情報を全てconsoleに出力する

## showAreaMode

画面上にあるオブジェクト全ての領域を赤枠で表示する

# その他

## without snap mode

alt キーを押しながらマウスを操作すると、preview の表示やクリック時の配置が grid に沿わなくなる

## Press Escape

各 mode において、初期状態に戻す。
初期状態で Modal の入力を必要とするものは、Modal が出現。
さらに Escape を押すか Modal の外をクリックすれば元に戻れる。
