# VanMath GTM 設定指南

## 事件追蹤總覽

### GA4 內建事件（不需設定）
- `page_view` - 頁面瀏覽
- `session_start` - 工作階段開始
- `scroll` - 滾動深度 (90%)
- `first_visit` - 首次造訪

### 自訂事件（需要設定）

| 事件 | 用途 | GA4 建議 |
|------|------|---------|
| `calculator_started` | 用戶開始互動 | Key Event (微轉換) |
| `cta_clicked` | 點擊 CTA 按鈕 | Key Event (主轉換) ⭐ |
| `winner_revealed` | 顯示計算結果 | 業務分析 |
| `high_value_user` | 高價值用戶 | 建立 Audience |
| `affiliate_click` | 聯盟連結點擊 | 收益追蹤 |

---

## 快速設定（手動）

### Step 1: 建立 7 個 Data Layer Variables

GTM > Variables > User-Defined Variables > New

| 變數名稱 | Data Layer Variable Name |
|---------|-------------------------|
| DLV - winner | winner |
| DLV - total_cost | total_cost |
| DLV - savings | savings |
| DLV - trip_days | trip_days |
| DLV - trip_distance | trip_distance |
| DLV - affiliate_destination | affiliate_destination |
| DLV - estimated_booking_value | estimated_booking_value |

### Step 2: 建立 5 個 Triggers

GTM > Triggers > New > Custom Event

| Trigger 名稱 | Event name (exactly) |
|-------------|---------------------|
| CE - calculator_started | `calculator_started` |
| CE - cta_clicked | `cta_clicked` |
| CE - winner_revealed | `winner_revealed` |
| CE - high_value_user | `high_value_user` |
| CE - affiliate_click | `affiliate_click` |

### Step 3: 建立 5 個 GA4 Event Tags

GTM > Tags > New > Google Analytics: GA4 Event

---

#### Tag 1: calculator_started
- **Event Name**: `calculator_started`
- **Trigger**: CE - calculator_started
- **Parameters**: (無)

---

#### Tag 2: cta_clicked ⭐主轉換
- **Event Name**: `cta_clicked`
- **Trigger**: CE - cta_clicked
- **Parameters**:
  | Name | Value |
  |------|-------|
  | winner | {{DLV - winner}} |
  | affiliate_destination | {{DLV - affiliate_destination}} |

---

#### Tag 3: winner_revealed
- **Event Name**: `winner_revealed`
- **Trigger**: CE - winner_revealed
- **Parameters**:
  | Name | Value |
  |------|-------|
  | winner | {{DLV - winner}} |
  | total_cost | {{DLV - total_cost}} |
  | savings | {{DLV - savings}} |
  | trip_days | {{DLV - trip_days}} |
  | trip_distance | {{DLV - trip_distance}} |

---

#### Tag 4: high_value_user
- **Event Name**: `high_value_user`
- **Trigger**: CE - high_value_user
- **Parameters**:
  | Name | Value |
  |------|-------|
  | trip_days | {{DLV - trip_days}} |
  | trip_distance | {{DLV - trip_distance}} |
  | estimated_booking_value | {{DLV - estimated_booking_value}} |

---

#### Tag 5: affiliate_click
- **Event Name**: `affiliate_click`
- **Trigger**: CE - affiliate_click
- **Parameters**:
  | Name | Value |
  |------|-------|
  | winner | {{DLV - winner}} |
  | affiliate_destination | {{DLV - affiliate_destination}} |
  | estimated_booking_value | {{DLV - estimated_booking_value}} |

---

## GA4 設定

### 標記 Key Events（轉換）
GA4 > Admin > Events > 找到事件 > 標記為 Key Event

1. `cta_clicked` ⭐ (主要轉換)
2. `calculator_started` (微轉換)

### 建立 Custom Dimensions
GA4 > Admin > Custom definitions > Create custom dimension

| Dimension name | Event parameter | Scope |
|---------------|-----------------|-------|
| Winner | winner | Event |
| Trip Days | trip_days | Event |
| Trip Distance | trip_distance | Event |

### 建立 Audience（再行銷）
GA4 > Admin > Audiences > New audience

**High Value Users:**
- Condition: Event = `high_value_user`
- 用途: Google Ads 再行銷

---

## Debug 測試

1. GTM > Preview (開啟預覽模式)
2. 到網站操作計算器
3. 確認 Tags 正確觸發
4. GA4 > Admin > DebugView 檢查事件
5. 測試完成後 GTM > Submit 發布

---

## 檔案說明

- `vanmath-gtm-minimal.json` - 精簡版 GTM 匯入檔 (5 事件)
- `vanmath-gtm-container.json` - 完整版 GTM 匯入檔 (14 事件)
