# 可充電 OLED 表情鑰匙圈

更新日期：2026-10-07  
靈感來源：Instagram 帳號 `circuit_digest` 短影片「Built a compact DIY rechargeable OLED keychain using a XIAO ESP32-S3 and 3D-printed enclosure」（影片作者標註：Tech Talkies）  
靈感截圖：`../assets/idea-collection/idea-72-1.png`  
狀態：靈感庫／未選定落地方向  
紀錄者：Maker Idea

## 一句話

用 Seeed XIAO ESP32-S3、小型 OLED 與鋰電池，裝進 3D 列印外殼，做成會顯示表情的可充電鑰匙圈。

## 靈感影片內容

- 白色 3D 列印方形外殼，頂部有橘色吊環，兩側有橘色旋鈕／螺絲柱，整體像一隻小機器人。
- 0.96 吋 I2C OLED（接腳 GND、VCC、SCL、SDA）顯示青色的兩隻眼睛與一條嘴，是動畫表情。
- 內部以可充電鋰電池供電，主控是 XIAO ESP32-S3。

## 想擴充的方向

- 表情隨狀態變化：眨眼、睡覺、低電量時變累（建議）。
- 加加速度計，搖一搖或翻面時換表情（建議）。
- 用 ESP-NOW 讓兩個鑰匙圈靠近時互相打招呼（建議）。
- 顯示簡易資訊，例如時間或電量。

## 相關點子

- 第 2 號公車到站時間鑰匙圈：同為小螢幕鑰匙圈。
- 第 53 號洞洞板鑰匙圈迷你掌機：同為 OLED 鑰匙圈形態。
- 第 59 號 Deskimon 模組化桌面表情機器人：同為表情顯示。
- 第 37 號圓形螢幕虛擬寵物球：同為螢幕表情／寵物。
