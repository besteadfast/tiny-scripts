import puppeteer from 'puppeteer'
import { jsPDF } from 'jspdf'

// Configuration

const PAGE_URL = 'https://bauschandlomb.steadfa.st?token=password'
const DEFAULT_WIDTH = 1440
const DEFAULT_HEIGHT = 1000
const HEADLESS_MODE = true

function preSnapshotManipulations() {
	// document.body.style.backgroundColor = 'red'
}

// Script

(async () => {
	console.log(`📸 taking snapshot of: ${PAGE_URL}`)

  const browser = await puppeteer.launch({ headless: HEADLESS_MODE })
  const page = await browser.newPage()
	await page.setViewport({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT })

  await page.goto(PAGE_URL)

	const renderedPageHeight = await page.evaluate(() => {
    return document.documentElement.scrollHeight
  })

	await page.setViewport({ width: DEFAULT_WIDTH, height: renderedPageHeight })

	/*
		Sometimes we want to make changes on the page before taking the snapshot
		This is useful for things like opening accordion items, switching tabs, etc.
	*/
	if(preSnapshotManipulations) {
		await page.evaluate(preSnapshotManipulations)
	}

  const screenshot = await page.screenshot()

	const pdf = new jsPDF({
		orientation: 'portrait',
		unit: 'pt',
		format: [renderedPageHeight, DEFAULT_WIDTH]
	})

	pdf.addImage(screenshot, undefined, 0, 0, DEFAULT_WIDTH, renderedPageHeight)

	pdf.save('snapshot.pdf')

	console.log(`✅ completed snapshot`)

  await browser.close()
})();
