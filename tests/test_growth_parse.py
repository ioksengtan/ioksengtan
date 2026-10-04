import importlib.util
import unittest
from datetime import date
from pathlib import Path

_PATH = Path(__file__).resolve().parents[1] / "scripts" / "build-growth.py"
_SPEC = importlib.util.spec_from_file_location("build_growth", _PATH)
_MODULE = importlib.util.module_from_spec(_SPEC)
_SPEC.loader.exec_module(_MODULE)

article_paths = _MODULE.article_paths
cumulative_weeks = _MODULE.cumulative_weeks
normalize_idea = _MODULE.normalize_idea
parse_numbered_ideas = _MODULE.parse_numbered_ideas
series_counts = _MODULE.series_counts
week_start = _MODULE.week_start


SAMPLE_LIST = """
# 靈感收集點子清單

## 已收集點子

1. 雙手拉線控制傾斜迷宮遊戲機——兩個旋鈕。
   ![圖](assets/idea-collection/idea-01-1.jpg)
2. 公車到站時間鑰匙圈——小螢幕。
## 延伸討論筆記
1. 這條不該算進編號點子。
"""

SAMPLE_INDEX = """
<a class="entry" data-cat="tools" href="docker-explained.html?v=1&amp;start=1">
<a class="entry" href="second-article.html">
<a href="business.html" class="entry">
<a href="https://example.com/skip.html" class="entry">
"""


class GrowthParseTests(unittest.TestCase):
    def test_numbered_ideas_stop_at_next_section(self):
        items = parse_numbered_ideas(SAMPLE_LIST)
        self.assertEqual(
            items,
            [
                "雙手拉線控制傾斜迷宮遊戲機——兩個旋鈕。",
                "公車到站時間鑰匙圈——小螢幕。",
            ],
        )

    def test_normalize_drops_images_and_keeps_link_text(self):
        text = normalize_idea("標題 [延伸](Maker/a.md) ![圖](a.jpg)  結尾")
        self.assertEqual(text, "標題 延伸 結尾")

    def test_article_paths_ignore_query_and_non_files(self):
        self.assertEqual(
            article_paths(SAMPLE_INDEX),
            ["docker-explained.html", "second-article.html", "business.html"],
        )

    def test_week_starts_on_monday(self):
        self.assertEqual(week_start(date(2026, 10, 4)), date(2026, 9, 28))
        self.assertEqual(week_start(date(2026, 9, 28)), date(2026, 9, 28))

    def test_cumulative_weeks_and_recent_window(self):
        events = [
            {"series": "content", "date": "2026-09-27"},
            {"series": "content", "date": "2026-09-28"},
            {"series": "works", "date": "2026-10-04"},
        ]
        weeks = cumulative_weeks(events, date(2026, 10, 4))
        self.assertEqual([item["start"] for item in weeks], ["2026-09-21", "2026-09-28"])
        self.assertEqual(weeks[-1]["content"], 2)
        self.assertEqual(weeks[-1]["works"], 1)
        self.assertFalse(weeks[0]["recent"])
        self.assertTrue(weeks[1]["recent"])
        totals, recent = series_counts(events, date(2026, 10, 4))
        self.assertEqual(totals["content"], 2)
        self.assertEqual(recent["content"], 1)
        self.assertEqual(recent["works"], 1)


if __name__ == "__main__":
    unittest.main()
