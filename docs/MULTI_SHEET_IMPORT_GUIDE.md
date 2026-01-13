# Multi-Sheet CSV Import Guide

## Overview

This guide explains how to import your entire unit inventory from a single spreadsheet, even if it contains multiple part types mixed together.

---

## Method 1: Single CSV with Category Column (RECOMMENDED)

Instead of multiple CSVs, use **one CSV file** with a "category" column:

### Format:
```csv
category,name,manufacturer,part_number,quantity,weight_g,cost_usd,notes,link
airframe,5" Racing Frame,GEPRC,GEP-MK4,2,95,45,Carbon fiber frame,https://example.com/frame
motor,2207 1750KV,T-Motor,F60-PRO-IV,8,31,25,4S compatible,https://example.com/motor
battery,4S 1300mAh,CNHL,MiniStar-4S-1300,10,165,22,100C discharge,https://example.com/battery
esc,35A BLHeli_32,Tekko32,F3-35A,4,5,18,DShot1200 support,https://example.com/esc
radio,ELRS 915MHz,ExpressLRS,EP2-915,2,3,25,1W output power,https://example.com/radio
```

### Valid Categories:
- `airframe` or `airframes`
- `motor` or `motors`
- `esc` or `escs`
- `battery` or `batteries`
- `flight_controller` or `flight_controllers` or `fc`
- `radio` or `radios`
- `sensor` or `sensors`
- `accessory` or `accessories`

### Required Columns (Minimum):
- `category` - Part type (see list above)
- `name` - Part name/description
- `quantity` - How many you have

### Optional Columns (Highly Recommended):
- `manufacturer` - Brand/maker
- `part_number` - Model number
- `weight_g` - Weight in grams
- `cost_usd` - Price in USD
- `link` - Purchase URL
- `notes` - Any additional info

---

## Method 2: Minimal Import with Web Lookup

If you only have part names and links, the system can help fill in missing data:

### Minimal CSV Format:
```csv
category,name,quantity,link
motor,T-Motor F60 PRO IV 2207,8,https://store.tmotor.com/product/f60-pro-iv.html
battery,CNHL MiniStar 4S 1300mAh,10,https://chinahobbyline.com/ministar-1300
```

### How It Works:
1. Import your minimal CSV
2. System parses part names to extract:
   - Motor KV (e.g., "1750KV")
   - Battery cell count (e.g., "4S")
   - Battery capacity (e.g., "1300mAh")
3. You can manually fill in missing fields later in the Parts Library UI

---

## Method 3: Excel Multi-Sheet Support (FUTURE)

**Coming in v0.5.0:** Direct import of `.xlsx` files with multiple tabs/worksheets:

```
📄 Unit_Inventory.xlsx
├── 📑 Airframes (worksheet 1)
├── 📑 Motors (worksheet 2)
├── 📑 Batteries (worksheet 3)
└── 📑 Radios (worksheet 4)
```

Each worksheet will be imported as a separate category automatically.

---

## Smart Column Mapping

The importer automatically recognizes common column name variations:

| Standard Field | Recognized Variations |
|---------------|----------------------|
| `name` | name, part_name, item_name, description, nomenclature |
| `manufacturer` | manufacturer, mfg, maker, brand, vendor |
| `part_number` | part_number, part#, pn, mpn, model |
| `weight_g` | weight_g, weight, weight_grams, mass, weight_kg |
| `cost_usd` | cost_usd, cost, price, price_usd, unit_price |
| `quantity` | quantity, qty, count, stock |
| `link` | link, url, purchase_link, order_link, source |

**Example:** If your spreadsheet has columns named "Qty", "Price", and "URL", the importer will automatically map them to `quantity`, `cost_usd`, and `link`.

---

## Real-World Example: Unit Property Book

### What You Have:
```csv
NSN,Nomenclature,Qty,Unit Price,Vendor Link
5895-01-600-1234,"RADIO SET, TACTICAL",4,$2500,https://harris.com/falcon-iii
5841-01-650-5678,"DRONE, QUADCOPTER, 5IN",6,$850,https://dji.com/mavic-3
```

### How to Import:
1. Add a `category` column at the beginning
2. Map your columns:

```csv
category,part_number,name,quantity,cost_usd,link
radio,5895-01-600-1234,Harris Falcon III Tactical Radio,4,2500,https://harris.com/falcon-iii
airframe,5841-01-650-5678,DJI Mavic 3 Quadcopter,6,850,https://dji.com/mavic-3
```

---

## Common Scenarios

### Scenario 1: Mixed Part Types in One CSV
✅ Add `category` column
✅ Use single import operation
✅ All parts go to correct category

### Scenario 2: Minimal Data Available
✅ Import with just `category`, `name`, `quantity`
✅ System extracts specs from name (KV, cells, capacity)
✅ Manually fill remaining fields later

### Scenario 3: Vendor-Specific Format
✅ Use column mapping templates
✅ System recognizes common variations
✅ Preview before import

---

## Import Process (Enhanced)

1. **Prepare CSV:**
   - Add `category` column if missing
   - Ensure column headers are in first row
   - Save as `.csv` format (not `.xlsx` yet)

2. **Import:**
   - Click "Import CSV Inventory" in Parts Library
   - Select your file
   - System detects columns automatically
   - Preview import (shows category breakdown)

3. **Review:**
   - Check category assignment
   - Verify required fields populated
   - Fix any warnings

4. **Confirm:**
   - Import all parts at once
   - System distributes to correct categories

---

## Tips for Success

### ✅ DO:
- Use lowercase category names
- Include `quantity` even if it's "1"
- Add `link` for future reference/reordering
- Keep manufacturer names consistent

### ❌ DON'T:
- Mix units (use grams for weight, USD for cost)
- Leave category column blank
- Use special characters in category names
- Include header rows mid-file

---

## Troubleshooting

### "Category not recognized"
**Fix:** Check spelling - must be one of: airframe, motor, esc, battery, flight_controller, radio, sensor, accessory (singular or plural)

### "Missing required fields"
**Minimum required:** category, name, quantity
**Fix:** Add these columns even with placeholder values

### "Weight/cost not imported"
**Fix:** Ensure numeric values (no "$" or "g" symbols in data cells)

---

## Future Enhancements (Roadmap)

### v0.5.0:
- [ ] Direct `.xlsx` multi-sheet import
- [ ] Web scraping for missing specs (from `link` column)
- [ ] Bulk edit after import
- [ ] Import templates for common vendors

### v0.6.0:
- [ ] NATO Stock Number (NSN) lookup integration
- [ ] Manufacturer API integration (T-Motor, CNHL, etc.)
- [ ] Automatic duplicate detection

---

## Need Help?

**Can't get your spreadsheet to import?**
1. Share a sanitized sample (first 5 rows)
2. Open an issue: https://github.com/nbschultz97/COTS-Architect/issues
3. We'll create a custom import template for your format

**Common formats we support:**
- Unit property books
- NSN catalogs
- Vendor order histories
- Custom inventory tracking sheets
