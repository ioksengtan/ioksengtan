const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const base = path.resolve(__dirname, "..");
(async () => {
  const server = http.createServer((req, res) => {
    const p = path.join(base, decodeURIComponent(req.url.split("?")[0]));
    try {
      res.setHeader(
        "Content-Type",
        p.endsWith(".js")
          ? "text/javascript"
          : p.endsWith(".css")
            ? "text/css"
            : "text/html",
      );
      res.end(fs.readFileSync(p));
    } catch {
      res.statusCode = 404;
      res.end();
    }
  });
  await new Promise((r) => server.listen(4188, "127.0.0.1", r));
  let browser;
  try {
    browser = await chromium.launch({
      channel: process.env.BROWSER_CHANNEL || "msedge",
      headless: true,
    });
    const page = await browser.newPage({
      viewport: { width: 1280, height: 1000 },
    });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("http://127.0.0.1:4188/ideas.html");
    assert.equal(await page.locator("[data-seed]").count(), 13);
    assert.equal(await page.locator("#it-sources a").count(), 12);
    assert.match(
      await page.locator("#it-result").innerText(),
      /會記得鳥訪客的咖啡店/,
    );
    await page.locator("#it-feed").click();
    assert.equal(await page.locator("#it-count").innerText(), "1 次不同碰撞");
    await page.locator("#it-feed").click();
    assert.equal(await page.locator("#it-count").innerText(), "1 次不同碰撞");
    await page.locator("#it-a").selectOption("9");
    await page.locator("#it-b").selectOption("2");
    await page.locator("#it-feed").click();
    assert.equal(await page.locator("#it-count").innerText(), "1 次不同碰撞");
    await page.reload();
    assert.equal(await page.locator("#it-count").innerText(), "1 次不同碰撞");
    await page.locator("#it-b").selectOption("9");
    assert.equal(await page.locator("#it-feed").isDisabled(), true);
    await page.locator("#it-a").selectOption("3");
    await page.locator("#it-b").selectOption("4");
    await page.locator("#it-feed").click();
    assert.equal(await page.locator("#it-count").innerText(), "2 次不同碰撞");
    await page.screenshot({
      path: path.join(require("node:os").tmpdir(), "ideas-desktop.png"),
      fullPage: true,
    });
    for (const width of [320, 375, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        true,
        "overflow at " + width,
      );
    }
    await page.setViewportSize({ width: 375, height: 900 });
    await page.screenshot({
      path: path.join(require("node:os").tmpdir(), "ideas-mobile.png"),
      fullPage: true,
    });
    await page.evaluate(() =>
      localStorage.setItem("ioksengtan.idea-terrarium.v1", "bad json"),
    );
    await page.reload();
    assert.equal(await page.locator("#it-count").innerText(), "0 次不同碰撞");
    await page.evaluate(() =>
      localStorage.setItem(
        "ioksengtan.idea-terrarium.v1",
        JSON.stringify({
          version: 1,
          a: "removed",
          pairs: [
            [null, null],
            ["gone", "gone"],
          ],
        }),
      ),
    );
    await page.reload();
    assert.equal(await page.locator("#it-count").innerText(), "0 次不同碰撞");
    await page.addInitScript(() => {
      Storage.prototype.setItem = () => {
        throw new Error("blocked");
      };
    });
    await page.reload();
    await page.locator("#it-feed").click();
    assert.match(await page.locator("#it-storage").innerText(), /未允許儲存/);
    await page.locator("#it-feed").focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.locator("#it-count").innerText(), "1 次不同碰撞");
    assert.deepEqual(errors, []);
    console.log(
      "PASS: 13 seeds, 12 source links, recipes, feed, duplicate and reversed pairs, reload persistence, same-seed guard, corrupt and stale storage, blocked storage, keyboard activation, 320/375/768/1280px layout, no page errors.",
    );
  } finally {
    if (browser) await browser.close();
    server.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
