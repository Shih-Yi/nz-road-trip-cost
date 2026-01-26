# VanMath GTM 設定指南

## 快速匯入

1. 到 GTM > Admin > Import Container
2. 選擇 `vanmath-gtm-container.json`
3. 選擇 "Merge" > "Rename conflicting tags"
4. **重要**: 匯入後需要手動連結你的 GA4 Configuration Tag

---

## 手動設定步驟

如果匯入有問題，可以手動設定：

### Step 1: 建立 Data Layer Variables

在 GTM 中建立以下變數 (Variables > User-Defined Variables > New > Data Layer Variable):

| 變數名稱 | Data Layer Variable Name |
|---------|-------------------------|
| DLV - category | category |
| DLV - label | label |
| DLV - value | value |
| DLV - input_name | input_name |
| DLV - input_value | input_value |
| DLV - vehicle_type | vehicle_type |
| DLV - vehicle_preset | vehicle_preset |
| DLV - fuel_type | fuel_type |
| DLV - trip_days | trip_days |
| DLV - trip_distance | trip_distance |
| DLV - winner | winner |
| DLV - total_cost | total_cost |
| DLV - savings | savings |
| DLV - savings_percent | savings_percent |
| DLV - scroll_percent | scroll_percent |
| DLV - time_seconds | time_seconds |
| DLV - affiliate_destination | affiliate_destination |
| DLV - estimated_booking_value | estimated_booking_value |

### Step 2: 建立 Triggers

為每個事件建立 Custom Event Trigger:

| Trigger 名稱 | Event Name |
|-------------|------------|
| CE - calculator_started | calculator_started |
| CE - calculator_completed | calculator_completed |
| CE - results_viewed | results_viewed |
| CE - cta_clicked | cta_clicked |
| CE - input_changed | input_changed |
| CE - vehicle_selected | vehicle_selected |
| CE - fuel_type_changed | fuel_type_changed |
| CE - accommodation_toggled | accommodation_toggled |
| CE - winner_revealed | winner_revealed |
| CE - affiliate_click | affiliate_click |
| CE - high_value_user | high_value_user |
| CE - scroll_depth | scroll_depth |
| CE - time_on_calculator | time_on_calculator |
| CE - open_feedback | open_feedback |

### Step 3: 建立 GA4 Event Tags

為每個事件建立 GA4 Event Tag，連結到你的 GA4 Configuration：

---

## 事件詳細說明

### Funnel Events (轉換漏斗)

#### calculator_started
- **觸發**: 用戶首次與計算器互動
- **參數**: category
- **GA4 建議**: 標記為 Key Event (微轉換)

#### calculator_completed
- **觸發**: 計算結果首次產生
- **參數**: category
- **GA4 建議**: 標記為 Key Event

#### results_viewed
- **觸發**: 結果區塊進入視窗 (30% 可見)
- **參數**: category

#### cta_clicked ⭐
- **觸發**: 點擊 "Check Rates" 按鈕
- **參數**: affiliate_destination, winner
- **GA4 建議**: 標記為 Key Event (主轉換)

---

### Behavior Events (行為分析)

#### input_changed
- **觸發**: 任何輸入值改變
- **參數**: input_name, input_value, trip_days, trip_distance
- **用途**: 分析用戶偏好設定

#### vehicle_selected
- **觸發**: 選擇車型預設
- **參數**: vehicle_type, vehicle_preset, value
- **用途**: 熱門車型分析

#### fuel_type_changed
- **觸發**: 切換燃油類型
- **參數**: fuel_type, vehicle_preset

#### accommodation_toggled
- **觸發**: 開關住宿選項
- **參數**: label (included/excluded), value

---

### Business Events (商業價值)

#### winner_revealed
- **觸發**: 顯示計算結果贏家
- **參數**: winner, total_cost, savings, savings_percent, trip_days, trip_distance
- **用途**: 分析哪種車型最常勝出

#### affiliate_click
- **觸發**: 點擊聯盟連結
- **參數**: affiliate_destination, winner, estimated_booking_value
- **用途**: 追蹤聯盟行銷收益

#### high_value_user ⭐
- **觸發**: 高價值用戶 (14+天 且 2000+km)
- **參數**: trip_days, trip_distance, estimated_booking_value
- **GA4 建議**: 建立 Audience 用於再行銷

---

### Engagement Events (參與度)

#### scroll_depth
- **觸發**: 滾動到 25%, 50%, 75%, 100%
- **參數**: scroll_percent
- **用途**: 廣告位置優化

#### time_on_calculator
- **觸發**: 停留 30s, 60s, 120s, 300s
- **參數**: time_seconds
- **用途**: 用戶黏著度分析

#### open_feedback
- **觸發**: 點擊回饋按鈕
- **用途**: 收集用戶意見

---

## GA4 建議設定

### Key Events (轉換)
在 GA4 > Admin > Events 中標記為 Key Event:
1. `cta_clicked` - 主轉換
2. `calculator_started` - 微轉換
3. `high_value_user` - 高價值用戶

### Custom Dimensions
在 GA4 > Admin > Custom Definitions 建立:

| Dimension Name | Event Parameter | Scope |
|---------------|-----------------|-------|
| Winner | winner | Event |
| Vehicle Type | vehicle_type | Event |
| Trip Days | trip_days | Event |
| Trip Distance | trip_distance | Event |

### Audiences (再行銷受眾)
1. **High Value Users**: 觸發 `high_value_user` 的用戶
2. **Engaged Users**: `time_on_calculator` >= 60s
3. **CTA Clickers**: 觸發 `cta_clicked` 的用戶

---

## Debug 測試

1. 開啟 GTM Preview Mode
2. 在網站上操作計算器
3. 檢查 Tag Assistant 是否正確觸發事件
4. 確認 GA4 DebugView 收到事件
