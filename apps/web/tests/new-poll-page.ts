import type { Page } from "@playwright/test";
import { PollPage } from "tests/poll-page";

export class NewPollPage {
  constructor(public readonly page: Page) {}

  async goto() {
    await this.page.goto("/new");
  }

  async createPollAndCloseDialog({ name }: { name: string }) {
    await this.goto();
    const pollPage = await this.createPoll({ name });
    await pollPage.closeDialog();
    return pollPage;
  }
  async createPoll({ name }: { name: string }) {
    const page = this.page;

    await page.fill('[placeholder="Monthly Meetup"]', name);
    // click on label to focus on input
    await page.click('text="Location"');
    await page.keyboard.type("Online");

    await page.click('text="Description"');

    await page.keyboard.type("Hey everyone, what time can you meet?");

    await page.click('[title="Next month"]');

    // Select a few days
    await page.click("text=/^5$/");
    await page.click("text=/^7$/");
    await page.click("text=/^10$/");
    await page.click("text=/^15$/");

    await page.click('text="Create poll"');

    return new PollPage(page);
  }
}
