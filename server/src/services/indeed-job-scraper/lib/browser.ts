import dotenv from 'dotenv';
dotenv.config();
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Params } from '../indeedScraper';
puppeteer.use(StealthPlugin());

let browser = puppeteer.launch({ headless: true, args: [
    '--no-sandbox'
] });

//-----------------------------------------------------------------------------

/**
 * A browser page object using Puppeteer.
 */
export default class BrowserPage {
    browser: any;
    page: any;

    constructor() {
        this.browser = null;
        this.page = null;
        this.init();
    }

    init() {
        this.browser = browser;
        this.page = this.createNewBrowserPage();
    }

    createNewBrowserPage() {
        return this.browser.then((browser: any) => browser.newPage());
    }

    getOpendedPages() {
        return this.browser.then((browser: any) => browser.pages());
    }

    navigate(url: URL, params: Params = {}) {
        return this.page.then((page: any) => {
            console.log("GOTO");
            return page.goto(BrowserPage.buildURL(url, params), { waitUntil: 'domcontentloaded', timeout: 90000 }).then(() => page);
        });
    }

    getContent(url: URL, params: Params) {
        return this.navigate(url, params).then((page: any) => {
            console.log("EVALUATE");
            return page.evaluate(() => document.querySelector('*')?.outerHTML);
        });
    }

    exportPDF(url: URL) {
        return this.navigate(url).then((page: any) => {
            return page.pdf({ format: 'A4', landscape: true, timeout: 300000, printBackground: true, margin: { top: 40, left: 20, right: 20, bottom: 40 } });
        });
    }

    closePage() {
        return this.page.then((page: any) => page.close());
    }

    static closeBrowser() {
        return browser.then((browser) => browser.close());
    }

    static buildURL(url: URL, params: Params = {}) {
        Object.getOwnPropertyNames(params).forEach((key) => url.searchParams.append(key, params[key]));
        return url.href;
    }
}