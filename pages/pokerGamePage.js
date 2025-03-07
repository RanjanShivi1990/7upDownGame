const { expect } = require('@playwright/test');
const { name } = require('../playwright.config');
import { allure } from 'allure-playwright';
const { executeStep } = require('../utils/action');
const Assertions = require('../utils/assertions');
require('dotenv').config();

exports.PokerGamePage = class PokerGamePage {
  constructor(page) {
    this.page = page;
    this.assertions = new Assertions();
    this.body = page.locator('body');
    this.dealerUsernameInputField = (page) =>
      page.getByPlaceholder('Enter your username');

    this.dealerPasswordInputField = (page) =>
      page.getByPlaceholder('Enter your password');

    this.dealerLoginButton = (page) =>
      page.getByRole('button', { name: 'Login' });

    this.poker2020PageDealerPage = (page) =>
      page.getByRole('link', { name: 'Poker2020' });

    this.MarketExceedsLimitMesg = this.page.getByText(
      'Bet amount exceeds the maximum bet limit'
    );
    this.MarketProfitLimitMesg = this.page.getByText(
      'Max Profit Limit is 600000'
    );
    this.MarketMaxBetLimitMesg = this.page.getByText(
      'Max bet Limit is Exceeded'
    )
    this.playerAMarket = this.page.locator("#Player-A");
    this.playerBMarket = this.page.locator("#Player-B");
    this.onePairAMarket = this.page.locator("#One-Pair_A");
    this.onePairBMarket = this.page.locator("#One-Pair_B");
    this.twoPairAMarket = this.page.locator("#Two-Pair_A");
    this.twoPairBMarket = this.page.locator("#Two-Pair_B");
    this.trioAMarket = this.page.locator("#Trio_A");
    this.trioBMarket = this.page.locator("#Trio_B");
    this.straightAMarket = this.page.locator("#Straight_A");
    this.straightBMarket = this.page.locator("#Straight_B");
    this.flushAMarket = this.page.locator("#Flush_A");
    this.flushBMarket = this.page.locator("#Flush_B");
    this.fullHouseAMarket= this.page.locator("#Full-House_A");
    this.fullHouseBMarket= this.page.locator("#Full-House_B");
    this.fourOfAKindAMarket= this.page.locator("#Four-of-a-Kind_A");
    this.fourOfAKindBMarket= this.page.locator("#Four-of-a-Kind_B");
    this.straightFlushAMarket= this.page.locator("#Straight-Flush_A");
    this.straightFlushBMarket= this.page.locator("#Straight-Flush_B");
    this.autoBetButton = this.page.locator(".w-2 h-2");
    this.playerAndWinningPattern = (page, player, pattern) =>
        page.locator(`//span[text()='${player}']//span[text()='${pattern}']`);
    this.winnerTextAndWinningPattern = (page, player) =>
        page.locator(
          `//span[text()='${player}']/following-sibling::span[text()='WINNER']`
        );

    this.doublButton = this.page.locator("(//span[normalize-space()='double'])[1]");
    this.undoButton = this.page.locator("(//span[normalize-space()='undo'])[1]");

    this.playerAMarketChipContainer = (chipAmount) =>
      this.playerAMarket.getByText(chipAmount);
    this.playerBMarketChipContainer = (chipAmount) =>
      this.playerBMarket.getByText(chipAmount);
    this.chip100 = this.page
      .locator("//div[contains(@class,'coin')]//span[text()='100'] ")
      .first();
      this.chip500 = this.page
      .locator("//div[contains(@class,'coin')]//span[text()='500'] ")
      .first();
      this.chip10000 = this.page
      .locator("//div[contains(@class,'coin')]//span[text()='10K'] ")
      .first();

    this.balanceAmount = this.page.locator
    (" //div[contains(@class,'flex items-end justify-between w-full')]//div[1]//span[2]");
     

    this.betTimeText = this.page.getByText('Bet Time');
    this.suspendedText = (page) => page.getByText('SUSPENDED');
    this.enterCardInputBox = (page) => page.getByPlaceholder('Enter card');
    this.cardUpdated = (page) => page.getByText('card updated');
    this.closeText = (page) => page.getByText('CLOSE');
    this.lastWinAmount =this.page.locator(`//span[text()='Last Win']//span/span`);
    this.totalBetAmount = this.page.locator(
      "(//span[contains(@class,'flex items-center gap-1')])[1]");
    this.totalWinAmount = (page) =>
      page.locator("//span[text()='Total ']//span");
    this.newGameButton = (page) =>
      page.getByRole('button', { name: 'New Game' });
    this.playerALock = page.locator("(//div[@class='relative w-10 h-10'])[1]")
    this.voidRoundButton = (page) =>
      page.getByRole('button', { name: 'Void Round' });
    this.confirmVoidRound = (page) =>
      page.getByRole('button', { name: 'Confirm' });
    this.congratulationsMessage =this.
      page
        .locator('div')
        .filter({ hasText: 'CongratulationsYou Won ₹' })
        .nth(1);
  }
  async isPlayerALockedToClick() {
    // Check if the element has pointer-events: none
    const isPointerEventsNone = await this.playerAMarket.evaluate(element => {
        return window.getComputedStyle(element).pointerEvents === 'none';
    });
  
    return isPointerEventsNone;
  }
  async isPlayerBLockedToClick() {
    // Check if the element has pointer-events: none
    const isPointerEventsNone = await this.playerBMarket.evaluate(element => {
        return window.getComputedStyle(element).pointerEvents === 'none';
    });
  
    return isPointerEventsNone;
  }
  async waitForTimeout(page, timeout, description) {
    await allure.step(description, async () => {
      await page.waitForTimeout(timeout);
    });
  }
  async validatingCongratulationsMessage(page) {
    await this.assertions.assertElementVisible(
      await this.congratulationsMessage,
      'Validate congratulations message is visible'
    );
  }
  async validatingCongratulationsMessageShouldNotDisplay(page) {
    await this.assertions.assertElementNotVisible(
      await this.congratulationsMessage,
      'Validate congratulations message should not displayed'
    );
  }

  async validateBetAmount(page, betAmount) {
    await this.assertions.assertElementToContainText(
      await this.totalBetAmount,
      betAmount,
      `Validate bet amount ${betAmount}`
    )
    console.log('Total Bet Amount',betAmount);
  }

  async validateBetAmountForOneBetMarketAtOnce(page, betAmount, market) {
    let winAmountMultiplier;
    switch (market) {
      case 'Player A':
        winAmountMultiplier = 1.98;
        break;
      case 'Player B':
        winAmountMultiplier = 1.98;
        break;
      case 'Player A One Pair':
        winAmountMultiplier = 2;
        break;
      case 'Player B One Pair':
        winAmountMultiplier = 2;
        break;
      case 'Player A Two Pair':
        winAmountMultiplier = 3.75;
        break;
      case 'Player B Two Pair':
        winAmountMultiplier = 3.75;
        break;
      case 'Player A Three Of A Kind':
        winAmountMultiplier = 16;
        break;
      case 'Player B Three Of A Kind':
        winAmountMultiplier = 16;
        break;
      case 'Player A Straight':
        winAmountMultiplier = 16;
        break;
      case 'Player B Straight':
        winAmountMultiplier = 16;
        break;
      case 'Player A Flush':
        winAmountMultiplier = 26;
        break;
      case 'Player B Flush':
        winAmountMultiplier = 26;
        break;
      case 'Player A FullHouse':
        winAmountMultiplier = 29;
        break;
      case 'Player B FullHouse':
        winAmountMultiplier = 29;
        break;
      case 'Player A Four Of A Kind':
        winAmountMultiplier = 251;
        break;
      case 'Player B Four Of A Kind':
        winAmountMultiplier = 251;
        break;
      case 'Player A Straight Flush':
        winAmountMultiplier = 501;
        break;
      case 'Player B Straight Flush':
        winAmountMultiplier = 501;
        break;
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
    let winAmount = await this.lastWinAmount;
    let winAmountText = await winAmount.innerText();
    winAmountText = await winAmountText.replace(',', '').replace('₹', '');
    console.log('winAmount', winAmountText);
    return winAmountText;
  }

  async clickOnSpecificMarket(player) {
    switch (player) {
      case 'Player A':
        await executeStep(this.playerAMarket, 'click', 'Clicking on Player 8 Back');
        break;
      case 'Player B':
        await executeStep(this.playerBMarket, 'click', 'Clicking on Player 8 Lay');
        break;
      case 'Player A One Pair':
        await executeStep(this.onePairAMarket, 'click', 'Clicking on Player 9 Back');
        break;
      case 'Player B One Pair':
        await executeStep(this.onePairBMarket, 'click', 'Clicking on Player 9 Lay');
        break;
      case 'Player A Two Pair':
        await executeStep(this.twoPairAMarket,'click','Clicking on Player 10 Back');
        break;
      case 'Player B Two Pair':
        await executeStep(this.twoPairBMarket,'click','Clicking on Player 10 Lay');
        break;
      case 'Player A Three Of A Kind':
        await executeStep(this.twoPairAMarket,'click','Clicking on Player 11 Back');
        break;
      case 'Player B Three Of A Kind':
        await executeStep(this.trioBMarket,'click','Clicking on Player 11 Lay');
        break;
      case 'Player A Straight':
        await executeStep(this.straightAMarket,'click','Clicking on Player 11 Lay');
        break;
      case 'Player B Straight':
        await executeStep(this.straightBMarket, 'click', 'Clicking on Player 9 Back');
        break;
      case 'Player A Flush':
        await executeStep(this.flushAMarket, 'click', 'Clicking on Player 9 Lay');
        break;
      case 'Player B Flush':
        await executeStep(this.flushBMarket,'click','Clicking on Player 10 Back');
        break;
      case 'Player A Full House':
        await executeStep(this.fullHouseAMarket,'click','Clicking on Player 10 Lay');
        break;
      case 'Player B Full House':
        await executeStep(this.fullHouseBMarket,'click','Clicking on Player 11 Back');
        break;
      case 'Player A Four Of A Kind':
        await executeStep(this.fourOfAKindAMarket,'click','Clicking on Player 11 Lay');
        break;
      case 'Player B Four Of A Kind':
        await executeStep(this.fourOfAKindBMarket,'click','Clicking on Player 11 Lay');
        break;
      case 'Player A Straight FLush':
        await executeStep(this.straightFlushAMarket,'click','Clicking on Player 11 Lay');
        break;
      case 'Player B Straight Flush':
        await executeStep(this.straightFlushBMarket,'click','Clicking on Player 11 Lay');
        break;
    
    }
  }

  async clickOnDealerCardCasinoGame(page) {
    await executeStep(
      this.cardCasinoPageDealerPage(page),
      'click',
      'Click on CardCasinoPage in dealer portal',
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

  async selectingCardsInLoop(page, cardsArray) {
    await allure.step(`Selecting cards ${cardsArray}`, async () => {
      await this.assertions.assertElementNotVisible(
        this.betTimeText,
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
      this.balanceAmount,
      'Balance Amount should be visible'
    );
    await this.assertions.assertElementToContainText(
      await this.balanceAmount,
      balanceAmount,
      `Validate balance amount ${balanceAmount}`
    );
}
async goto() {
  await executeStep(this.page, 'navigate', 'Navigate to the game page', [
    process.env.POKER2020URL,
  ]);
}
async clickNumber(value) {
  const numberLocator = this.page
    .locator('div')
    .filter({ hasText: new RegExp(`^${value}$`) })
    .nth(4);
  await executeStep(numberLocator, 'click', `Click on number ${value}`, []);
}

async clickBetAmount(amount) {
  const betAmountLocator = this.page
    .locator('div')
    .filter({ hasText: new RegExp(`^${amount}$`) })
    .nth(1);
  await executeStep(
    betAmountLocator,
    'click',
    `Click on bet amount ${amount}`,
    []
  );
}
async expectTextInBody(text) {
  await executeStep(
    this.body,
    'toContainText',
    `Expect text in body: ${text}`,
    [text]
  );
}
async clickOnUndo() {
  await expect(this.undoButton).toBeVisible();
  await executeStep(this.undoButton, 'click', 'Click undo button');
}


async clickingOnDoubleButtonInLoop(numberOfLoop) {
  for (let i = 0; i < numberOfLoop; i++) {
    await executeStep(this.doublButton, 'click', 'click on double button');
  }
}
  async readingBetAmount(page) {
    let betAmount = await this.totalBetAmount.innerText();
    betAmount = betAmount.replaceAll(',', '').replaceAll('₹', '');
    return betAmount;
  } 

  async readingBalanceAmount(page) {
    let balanceAmount = await this.balanceAmount.innerText();
    balanceAmount = balanceAmount.replaceAll(',', '').replaceAll('₹', '');
    console.log('balanceAmount', balanceAmount);
    return balanceAmount;
  }
  async bettingOnSpecificPlayerInLoop(player, numberOfLoop) {
    for (let i = 0; i < numberOfLoop; i++) {
      await this.clickOnSpecificMarket(player);
    }
  }
async validateMaximumAllowedBet() {
  await this.clickNumber(100);
  await this.clickBetAmount("10K");
  await this.bettingOnSpecificPlayerInLoop('Player 11 Back', 4);
  await this.clickingOnDoubleButtonInLoop(3);
  await this.assertions.assertElementVisible(
    await this.MarketMaxBetLimitMesg,
    'Max bet Limit is Exceeded should be visible'
  );
  await this.bettingOnSpecificPlayerInLoop('Player 8 Back',6);
  await this.assertions.assertElementVisible(
    await this.MarketProfitLimitMesg,
    'Max Profit Limit is 600000 should be visible'
  );
}

async validatePlayerAndTotalValue(page, player, value) {
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
      await this.playerAndTotalValueInDealerPage(page,player, value),
      `Validate ${player} is win with pattern ${value} in dealer dev page `
    );
  }
}
async attemptToPlaceBet() {
  const buttons = this.page.locator(this.player10Back);

  for (let i = 0; i < await buttons.count(); i++) {
    try {
      await buttons.nth(i).click();
      console.log(`Clicked on market button ${i + 1}`);
    } catch (error) {
      console.log(`Market button ${i + 1} is unclickable or disabled.`);
    }
  }
}
async verifyMarketButtonsDisabled() {
    const buttons = this.page.locator(this.player10Back);
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const isEnabled = await buttons.nth(i).isEnabled();
      expect(isEnabled).toBe(false, `Market button ${i + 1} should be disabled.`);
    }
  }
  
async verifyMarketReopensAfterTie(dealerDevPage) {
  // Wait for the market to become clickable again after the tie
  const marketButton = await dealerDevPage.getByText('Bet Time'); // Adjust selector as necessary
  await marketButton.waitFor({ state: 'attached', timeout: 10000 });
  await expect(marketButton).toBeEnabled();  // Assert that the market button is now enabled and can be clicked again
}

}