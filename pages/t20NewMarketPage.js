const { expect } = require('@playwright/test');
const { name } = require('../playwright.config');
import { allure } from 'allure-playwright';
const { executeStep } = require('../utils/action');
const Assertions = require('../utils/assertions');
require('dotenv').config();

exports.NewMarketT20Page = class NewMarketT20Page {
  constructor(page) {
    this.page = page;
    this.assertions = new Assertions();
    this.body = page.locator('body');
    this.demoLobbyButton = this.page.getByRole('link', { name: 'Demo Lobby' });
    this.teenPattiT20GameCard = (page) =>
      page.getByText('Teen Patti T20').first();
    this.playNowButton = (page) => page.locator("//div[text()='Play Now']");
    this.dealerUsernameInputField = (page) =>
      page.getByPlaceholder('Enter your username');

    this.dealerPasswordInputField = (page) =>
      page.getByPlaceholder('Enter your password');

    this.dealerLoginButton = (page) =>
      page.getByRole('button', { name: 'Login' });

    this.teenPattiT20GameInDealerPortal = (page) =>
      page.getByRole('link', { name: 'TeenpattiT20' });

    this.playerA = (page) => page.getByText('a1.98');
    this.playerB = (page) => page.getByText('b1.98');
    this.AllARed = (page) => page.getByText('All A Red1.98');
    this.AllBRed = (page) => page.getByText('All B Red1.98');
    this.AllABlack = (page) => page.getByText('All A Black1.98');
    this.AllBBlack = (page) => page.getByText('All B Black1.98');
    this.lessThan21A = (page) => page.locator('#lessThan21A div').first();
    this.greaterThan21A = (page) => page.locator('#greaterThan21A div').nth(2);
    this.equalTo21A = (page) => page.getByText('1421').first();
    this.lessThan21B = (page) => page.locator('#lessThan21B div').first();
    this.greaterThan21B = (page) => page.locator('#greaterThan21B div').nth(2);
    this.equalTo21B = (page) => page.getByText('1421').nth(1);
    this.bonus3Plus3 = (page) => page.locator("(//div[contains(@class,'relative w-10 h-10')])[5]");
    this.pleaseWaitForNextRoundMessage = (page) =>
      page.getByText('Please wait for next round');
    this.balanceAmount = page.locator(
      "//div[contains(@class,'flex items-end justify-between w-full')]//div[1]//span[2]");

    this.betTimeText = (page) => page.getByText('Bet Time');
    this.suspendedText = (page) => page.getByText('SUSPENDED');
    this.enterCardInputBox = (page) => page.getByPlaceholder('Enter card');
    this.cardUpdated = (page) => page.getByText('card updated');
    this.closeText = (page) => page.getByText('CLOSE');
    this.drawMessage = (page) => page.getByText('Draw');
    this.lastWinAmount = (page) =>
      page.locator(`//span[text()='Last Win']//span/span`);
    this.totalBetAmount = (page) =>
      page.locator("//span[text()='Total ']//span/span");
    this.totalWinAmount = (page) =>
      page.locator("//span[text()='Total ']//span");
    this.newGameButton = (page) =>
      page.getByRole('button', { name: 'New Game' });

    this.voidRoundButton = (page) =>
      page.getByRole('button', { name: 'Void Round' });
    this.confirmVoidRound = (page) =>
      page.getByRole('button', { name: 'Confirm' });
    this.congratulationsMessage = (page) =>
      page
        .locator('div')
        .filter({ hasText: 'CongratulationsYou Won ₹' })
        .nth(1);
    // this.youWonMessage = (page) => page.getByText('You Won');
  }

  async waitForTimeout(page, timeout, description) {
    await allure.step(description, async () => {
      await page.waitForTimeout(timeout);
    });
  }
  async validatingCongratulationsMessage(page) {
    await this.assertions.assertElementVisible(
      await this.congratulationsMessage(page),
      'Validate congratulations message is visible'
    );
  }
  async validatingCongratulationsMessageShouldNotDisplay(page) {
    await this.assertions.assertElementNotVisible(
      await this.congratulationsMessage(page),
      'Validate congratulations message should not displayed'
    );
  }

  async validateBetAmount(page, betAmount) {
    await this.assertions.assertElementToContainText(
      await this.totalBetAmount(page),
      betAmount,
      `Validate bet amount ${betAmount}`
    );
  }

  async validateTotalWinAmount(page, winAmount) {
    await this.assertions.assertElementToContainText(
      await this.totalWinAmount(page),
      winAmount,
      `Validate bet amount is ${winAmount}`
    );
  }

  async validateBetAmountForOneBetMarketAtOnce(page, betAmount, market) {
    let winAmountMultiplier;
    switch (market) {
      case 'Market A':
        winAmountMultiplier = 1.98;
        break;
      case 'Market B':
        winAmountMultiplier = 1.98;
        break;
      case 'All A Black':
        winAmountMultiplier = 1.98;
        break;
      case 'All B Black':
        winAmountMultiplier = 1.98;
        break;
      case 'All A Red':
        winAmountMultiplier = 1.98;
        break;
      case 'All B Red':
        winAmountMultiplier = 1.98;
        break;
      case 'Less than 21 Player A':
        winAmountMultiplier = 1.95;
        break;
      case 'Greater than 21 Player A':
        winAmountMultiplier = 1.95;
        break;
      case 'Equal to 21 Player A':
        winAmountMultiplier = 14;
        break;
      case 'Less than 21 Player B':
        winAmountMultiplier = 1.95;
        break;
      case 'Greater than 21 Player B':
        winAmountMultiplier = 1.95;
        break;
      case 'Equal to 21 Player B':
        winAmountMultiplier = 14;
        break;
        case 'bonus 3 plus 3':
          winAmountMultiplier = 7;
      }

    let winAmount = parseInt(betAmount * winAmountMultiplier);
    console.log(winAmount);
    console.log(`₹${parseFloat(winAmount)}`);
    let winAmountText = await this.readingWinAmount(page);
    console.log(winAmountText);
    await this.assertions.assertElementToBeEqual(
      parseInt(winAmountText),
      winAmount,
      `Validating Last win amount is matching with expected value  ${winAmountText} and calculated value ${winAmount}`
    );
  }

  async validateTotalBetAmountForMultipleMarkets(page, betAmount, markets) {
    const marketMultipliers = {
      'Market A': 1.98,
      'Market B': 1.98,
      'All A Black': 1.98,
      'All B Black': 1.98,
      'All A Red': 1.98,
      'All B Red': 1.98,
      'Less than 21 Player A': 1.95,
      'Greater than 21 Player A': 1.95,
      'Equal to 21 Player A': 14,
      'Less than 21 Player B': 1.95,
      'Greater than 21 Player B': 1.95,
      'Equal to 21 Player B': 14,
    };

    let totalWinAmount = 0;

    for (const market of markets) {
      const winAmountMultiplier = marketMultipliers[market];

      if (winAmountMultiplier !== undefined) {
        let winAmount = betAmount * winAmountMultiplier;
        totalWinAmount += winAmount; // Add each market's win amount to the total
        console.log(
          `Market: ${market}, Individual Win Amount: ₹${winAmount.toFixed(2)}`
        );
      } else {
        console.warn(`No multiplier found for market: ${market}`);
      }
    }

    console.log(
      `Total Win Amount for all markets: ₹${totalWinAmount.toFixed(2)}`
    );

    // Read the displayed total win amount from the page
    let winAmountText = await this.readingWinAmount(page);
    console.log(`Displayed Total Win Amount: ${winAmountText}`);

    // Validate the total calculated win amount with the displayed value
    await this.assertions.assertElementToBeEqual(
      parseFloat(winAmountText),
      totalWinAmount,
      `Validating total win amount: displayed value ${winAmountText} matches calculated value ₹${totalWinAmount.toFixed(
        2
      )}`
    );
  }

  async validatePlayerAndWinningPattern(page, player, pattern) {
    await this.assertions.assertElementVisible(
      this.closeText(page),
      'Validate close Text is visible'
    );
    if (player === 'both') {
      await this.assertions.assertElementVisible(
        await this.drawMessage(page),
        `Validate ${player} player are win with draw message in dealer dev page `
      );
    } else {
      await this.assertions.assertElementVisible(
        await this.playerAndWinningPattern(page, player, pattern),
        `Validate ${player} is win with pattern ${pattern} in dealer dev page `
      );
      await this.assertions.assertElementVisible(
        await this.winnerTextAndWinningPattern(page, player),
        `Validate ${player} winner Text in dealer dev page`
      );
    }
  }
  async navigateToAuroLobby() {
    await executeStep(this.page, 'navigate', 'Navigate to the game page', [
      process.env.NEWMARKETT20URL,
    ]);
  }

  async navigateToDelearDevAndLogin(page) {
    await executeStep(page, 'navigate', 'Navigate to the game page', [
      process.env.DEALERDEVURL,
    ]);
    await executeStep(
      this.dealerUsernameInputField(page),
      'fill',
      `Filling username ${process.env.DEALERUSERNAME}`,
      [process.env.DEALERUSERNAME]
    );
    await executeStep(
      this.dealerPasswordInputField(page),
      'fill',
      `Filling password ${process.env.DEALERPASSWORD}`,
      [process.env.DEALERPASSWORD]
    );
    await executeStep(
      this.dealerLoginButton(page),
      'click',
      `Click on demo lobby button`,
      []
    );
  }
  async readingWinAmount(page) {
    let winAmount = await this.lastWinAmount(page);
    let winAmountText = await winAmount.innerText();
    winAmountText = await winAmountText.replace(',', '').replace('₹', '');
    console.log('winAmount', winAmountText);
    return winAmountText;
  }

  async clickOnDemoLobbyButton() {
    await executeStep(
      this.demoLobbyButton,
      'click',
      `Click on demo lobby button`,
      []
    );
  }

  async selectingTeenpattiGameAndClickOnPlayNowButton(page) {
    await executeStep(
      this.teenPattiT20GameCard(page),
      'click',
      `Click on teen patti button`,
      []
    );
    await executeStep(
      this.playNowButton(page),
      'click',
      `Click on Play Now button`,
      []
    );
  }

  async clickOnSpecificMarket(page, market) {
    switch (market) {
      case 'Market A':
        await executeStep(this.playerA(page), 'click', 'Clicking on Market A');
        break;
      case 'Market B':
        await executeStep(this.playerB(page), 'click', 'Clicking on Market A');
        break;
      case 'All A Black':
        await executeStep(
          this.AllABlack(page),
          'click',
          'Clicking on All A Black'
        );
        break;
      case 'All B Black':
        await executeStep(
          this.AllBBlack(page),
          'click',
          'Clicking on All B Black'
        );
        break;
      case 'All A Red':
        await executeStep(this.AllARed(page), 'click', 'Clicking on All A Red');
        break;
      case 'All B Red':
        await executeStep(this.AllBRed(page), 'click', 'Clicking on All B Red');
        break;
      case 'Less than 21 Player A':
        await executeStep(
          this.lessThan21A(page),
          'click',
          'Clicking on Less than 21 For Player A'
        );
        break;
      case 'Greater than 21 Player A':
        await executeStep(
          this.greaterThan21A(page),
          'click',
          'Clicking on greater than 21 For Player A'
        );
        break;
      case 'Equal to 21 Player A':
        await executeStep(
          this.equalTo21A(page),
          'click',
          'Clicking on equal to 21 For Player A'
        );
        break;
      case 'Less than 21 Player B':
        await executeStep(
          this.lessThan21B(page),
          'click',
          'Clicking on Less than 21 For Player B'
        );
        break;
      case 'Greater than 21 Player B':
        await executeStep(
          this.greaterThan21B(page),
          'click',
          'Clicking on greater than 21 For Player B'
        );
        break;
      case 'Equal to 21 Player B':
        await executeStep(
          this.equalTo21B(page),
          'click',
          'Clicking on equal to 21 For Player B'
        );
        break;
      case '3 Plus 3 Bonus':
        await executeStep(
          this.bonus3Plus3(page),
          'click',
          'Clicking on 3 plus 3 bonus'
        );
        break;
    }
  }

  async navigatingToTeenPattiT20NewMarketGameAndStartNewGame(page) {
    await this.navigateToDelearDevAndLogin(page);
    await this.clickOnDealerTeenPattiT20Game(page);
    await page.reload();
    await this.clickNewGame(page);
  }
  async clickOnDealerTeenPattiT20Game(page) {
    await executeStep(
      this.teenPattiT20GameInDealerPortal(page),
      'click',
      'Click on teen patti in dealer portal',
      []
    );
  }

  async clickNewGame(page) {
    // Check if the element is disabled
    let element = await page.locator("//button[text()='New Game']");
    if (await element.isDisabled()) {
      await executeStep(
        this.voidRoundButton(page),
        'click',
        'Click on void game button',
        []
      );
      await executeStep(
        this.confirmVoidRound(page),
        'click',
        'Click on confirm void game button',
        []
      );
      await executeStep(
        this.newGameButton(page),
        'click',
        'Click on new game button',
        []
      );
    } else {
      await executeStep(
        this.newGameButton(page),
        'click',
        'Click on new game button',
        []
      );
    }
  }

  async validatePleaseWaitForNextRoundMessage(page) {
    await this.assertions.assertElementVisible(
      this.pleaseWaitForNextRoundMessage(page),
      ' Please wait for next round message should be visible'
    );
  }

  async selectingCardsInLoop(page, cardsArray) {
    await allure.step(`Selecting cards ${cardsArray}`, async () => {
      await this.assertions.assertElementNotVisible(
        this.betTimeText(page),
        'Bet Time Text should be hidden'
      );
      await this.assertions.assertElementVisible(
        this.suspendedText(page),
        'Suspended text should be visible'
      );
      console.log(cardsArray.length, cardsArray[0]);
      for (let i = 0; i < cardsArray.length; i++) {
        await executeStep(
          this.enterCardInputBox(page),
          'click',
          'Click on enter card Input field'
        );
        await executeStep(
          this.enterCardInputBox(page),
          'fill',
          `Enter card ${cardsArray[i]} `,
          [cardsArray[i]]
        );
        await allure.step('Pressing Enter to select card', async () => {
          await page.keyboard.press('Enter');
        });
      }
    });
  }
  async validateBalanceAmount() {
    await this.assertions.assertElementVisible(
      this.balanceAmount(page),
      'Balance Amount should be visible'
    );
    await this.assertions.assertElementToContainText(
      await this.balanceAmount(page),
      balanceAmount,
      `Validate balance amount ${balanceAmount}`
    );
}
  // async voidRoundButtonClick()
};
