# react-svg-drawer

# mode

## selector

Object を選択できる。

選択されたオブジェクトは縁が青くなる。

選択されたオブジェクトの style は右上に現れる style Window で編集ができる。詳細は[こちら](#style-window)

複数選択している場合、それらの値をまとめて変更する。

以下、いくつかの機能・モードがある。

- 範囲選択

  マウスで範囲を囲うようにドラッグすれば、そのエリア内にあるオブジェクトをまとめて選択できる

- マルチセレクトモード

  Shift キーを押しながらクリック　または　範囲選択

- 移動

  選択したものを掴んでドラッグ&ドロップ

- コピー

  移動時に Control キーを押し、そのままドロップすれば Copy が可能

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

## delete

selector モードのように object をクリックすると、クリックしたオブジェクトが消える

削除は deep であり、Group 化している場合は Group の構成要素全てが削除される

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

## import

クリックすると下にメニューが出現する

- objects

  json ファイルを選択するポップアップが出現

  選択した json ファイルを「object のリスト」として読み込む（画面上の既存のオブジェクトは上書きされない）

  同名のオブジェクトが既にある場合、新規の ID が割り振られる

- file

  json ファイルを選択するポップアップが出現

  選択した json ファイルを「ファイル」として読み込む（画面上の既存のオブジェクトは上書きされる）

## export

クリックすると下にメニューが出現する

- objects

  選択されている object の情報をすべて json ファイルとして吐き出す

  このファイルは file, objects どちらのモードでも import 可能である

- file

  存在する全ての object の情報をすべて json ファイルとして吐き出す

  このファイルは file, objects どちらのモードでも import 可能である

## log

画面上にあるオブジェクトの情報を全て console に出力する

# style window

グループ化したオブジェクト以外に対し、以下のパラメータを設定できる

### stroke

縁の色

default: black

指定できる値は[このリンクを参照](https://www.w3.org/TR/SVG/painting.html#SpecifyingPaint)

カラーコード(例：#ffffff)、カラーネーム(例：white)、その他の指定(例：none（枠なし）)などが使える。

### strokeWidth

縁の幅。

default: 1

指定できる値は自然数(0 以上の整数)

### fill

オブジェクト内部の色

default: none

指定できる値は[stroke](#stroke)と同じ

###

# ショートカット

Mac では Ctrl, Command どちらも Ctrl とみなす

### Ctrl + C

選択されたオブジェクトの情報をクリップボードに書き込む（≒ exportObjects）

### Ctrl + V

クリップボードに書き込まれた情報を object のリストとして読み込む（≒ importObjects）

### Ctrl + Z

[undo](#undo) と同じ

### Ctrl + Shift + Z

[redo](#redo) と同じ

# その他

## without snap mode

alt キーを押しながらマウスを操作すると、preview の表示やクリック時の配置が grid に沿わなくなる

## Press Escape

各 mode において、初期状態に戻す。

初期状態で Modal の入力を必要とするものは、Modal が出現。

さらに Escape を押すか Modal の外をクリックすれば元に戻れる。
