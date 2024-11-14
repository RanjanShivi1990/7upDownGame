const { expect } = require('@playwright/test');
const { name } = require('../playwright.config');
import { allure } from 'allure-playwright';
const { executeStep } = require('../utils/action');
const Assertions = require('../utils/assertions');
require('dotenv').config();

exports.CardCasinoPage = class CardCasinoPage {
  constructor(page) {
    this.page = page;
    this.assertions = new Assertions();
    this.body = page.locator('body');
    this.playerTotalsSelectors = [
      page.locator(`//span[contains(text(), 'Player ${8}') and contains(text(), 'Total=>')]`),
      page.locator(`//span[contains(text(), 'Player ${9}') and contains(text(), 'Total=>')]`),
      page.locator(`//span[contains(text(), 'Player ${10}') and contains(text(), 'Total=>')]`),
      page.locator(`//span[contains(text(), 'Player ${11}') and contains(text(), 'Total=>')]`)
    ];
    this.winnerAnnouncementSelector = this.page.locator
    ("(//span[@class='absolute top-0 left-0 z-50 p-3 text-xl font-semibold text-center bg-yellow-500 rounded-br-xl rounded-tl-xl '])[1]");
    this.dealerUsernameInputField = (page) =>
      page.getByPlaceholder('Enter your username');

    this.dealerPasswordInputField = (page) =>
      page.getByPlaceholder('Enter your password');

    this.dealerLoginButton = (page) =>
      page.getByRole('button', { name: 'Login' });

    this.cardCasinoPageDealerPage = (page) =>
      page.getByRole('link', { name: 'Casino32' });
    this.MarketExceedsLimitMesg = this.page.getByText(
      'Bet amount exceeds the maximum bet limit'
    );
    this.MarketProfitLimitMesg = this.page.getByText(
      'Max Profit Limit is 600000'
    );
    this.MarketMaxBetLimitMesg = this.page.getByText(
      'Max bet Limit is Exceeded'
    )
    this.player8Back = this.page.locator("#player8-back");
    this.player8Lay = this.page.locator("#player8-lay");
    this.player9Back = this.page.locator("#player9-back");
    this.player9Lay = this.page.locator("#player9-lay");
    this.player10Back = this.page.locator("#player10-back");
    this.player10Lay = this.page.locator("#player10-lay");
    this.player11Back = this.page.locator("#player11-back");
    this.player11Lay = this.page.locator("#player11-lay");
    this.doublButton = this.page.locator("(//span[normalize-space()='double'])[1]");
    this.undoButton = this.page.locator("(//span[normalize-space()='undo'])[1]");
    this.closeLayGameRule =this.
      page.locator("(//*[name()='path'][@fill-rule='evenodd'])[12]");
    this.player9BackMarketChipContainer = (chipAmount) =>
      this.player9Back.getByText(chipAmount);
    this.player11LayMarketChipContainer = (chipAmount) =>
      this.player11Lay.getByText(chipAmount);
    this.chip100 = this.page
      .locator("//div[contains(@class,'coin')]//span[text()='100'] ")
      .first();
      this.chip500 = this.page
      .locator("//div[contains(@class,'coin')]//span[text()='500'] ")
      .first();
      this.chip10000 = this.page
      .locator("//div[contains(@class,'coin')]//span[text()='10K'] ")
      .first();

    this.pleaseWaitForNextRoundMessage = this.page.getByText('Please wait for next round');
    this.balanceAmount = this.page.locator(
      "(//span[contains(@class,'flex items-center gap-1')])[2]");

    this.betTimeText = this.page.getByText('Bet Time');
    this.suspendedText = (page) => page.getByText('SUSPENDED');
    this.enterCardInputBox = (page) => page.getByPlaceholder('Enter card');
    this.cardUpdated = (page) => page.getByText('card updated');
    this.closeText = (page) => page.getByText('CLOSE');
    this.winnerTextAndWinningPattern = (page, player) =>
      page.locator(
        `//span[text()='${player}']/following-sibling::span[text()='WINNER']`
      );
    this.drawMessage = (page) => page.getByText('Draw');
    this.lastWinAmount =this.page.locator(`//span[text()='Last Win']//span/span`);
    this.totalBetAmount =this.page.locator("(//span[contains(@class,'flex items-center gap-1')])[1]");
    this.totalWinAmount =this.page.locator("//span[text()='Total ']//span");
    this.newGameButton = (page) =>
      page.getByRole('button', { name: 'New Game' });

    this.voidRoundButton = (page) =>
      page.getByRole('button', { name: 'Void Round' });
    this.confirmVoidRound = (page) =>
      page.getByRole('button', { name: 'Confirm' });
    this.congratulationsMessage =this.
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
    );
  }
  

  async validateTotalWinAmount(page, winAmount) {
    await this.assertions.assertElementToContainText(
      await this.totalWinAmount,
      winAmount,
      `Validate bet amount is ${winAmount}`
    );
  }

  async validateBetAmountForOneBetMarketAtOnce(page, betAmount, market) {
    let winAmountMultiplier;
    switch (market) {
      case 'Player 8 Back':
        winAmountMultiplier = 12.2;
        break;
      case 'Player 9 Back':
        winAmountMultiplier = 5.95;
        break;
      case 'Player 10 Back':
        winAmountMultiplier = 3.2;
        break;
      case 'Player 11 Back':
        winAmountMultiplier = 2.08;
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
  async validateWinAmountForOneBetMarketAtOnceForLay(page, betAmount, market) {
    let winAmountMultiplierForLay;
    switch (market) {
      case 'Player 8 Lay':
        winAmountMultiplierForLay = 2;
        break;
      case 'Player 9 Lay':
        winAmountMultiplierForLay = 2;
        break;
      case 'Player 10 Lay':
        winAmountMultiplierForLay = 2;
        break;
      case 'Player 11 Lay':
        winAmountMultiplierForLay = 2;
        break;
      
      }

    let winAmountForLay = parseInt(betAmount * winAmountMultiplierForLay);
    console.log(winAmountForLay);
    console.log(`₹${parseFloat(winAmountForLay)}`);
    let winAmountTextForLay = await this.readingWinAmount(page);
    console.log(winAmountTextForLay);
    await this.assertions.assertElementToBeEqual(
      parseInt(winAmountTextForLay),
      winAmountForLay,
      `Validating Last win amount is matching with expected value  ${winAmountTextForLay}`
    );
    };

  async validateTotalBetAmountForMultipleMarkets(page, betAmount, markets) {
    const marketMultipliers = {
      'Player 8 Back': 12.2,
      'Player 8 Lay': 2,
      'Player 9 Back': 5.95,
      'Player 9 Lay': 2,
      'Player 10 Back': 3.2,
      'Player 10 Lay': 2,
      'Player 11 Back': 2.08,
      'Player 11 Lay': 2,
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
      case 'Player 8 Back':
        await executeStep(this.player8Back, 'click', 'Clicking on Player 8 Back');
        break;
      case 'Player 8 Lay':
        await executeStep(this.player8Lay, 'click', 'Clicking on Player 8 Lay');
        break;
      case 'Player 9 Back':
        await executeStep(this.player9Back, 'click', 'Clicking on Player 9 Back');
        break;
      case 'Player 9 Lay':
        await executeStep(this.player9Lay, 'click', 'Clicking on Player 9 Lay');
        break;
      case 'Player 10 Back':
        await executeStep(this.player10Back,'click','Clicking on Player 10 Back');
        break;
      case 'Player 10 Lay':
        await executeStep(this.player10Lay,'click','Clicking on Player 10 Lay');
        break;
      case 'Player 11 Back':
        await executeStep(this.player11Back,'click','Clicking on Player 11 Back');
        break;
      case 'Player 11 Lay':
        await executeStep(this.player11Lay,'click','Clicking on Player 11 Lay');
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

  async validatePleaseWaitForNextRoundMessage(page) {
    await this.assertions.assertElementVisible(
      this.pleaseWaitForNextRoundMessage(page),
      ' Please wait for next round message should be visible'
    );
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
    process.env.CARDCASINOURL,
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

async validateTotalBetAmountForLay() {
  const totalBetText = await this.page.textContent(this.totalBetAmount); // Fetch total bet display
  return parseFloat(totalBetText);
}
async clickingOnDoubleButtonInLoop(numberOfLoop) {
  for (let i = 0; i < numberOfLoop; i++) {
    await executeStep(this.doublButton, 'click', 'click on double button');
  }
}
  async readingBalanceAmount() {
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
  await this.bettingOnSpecificPlayerInLoop('Player 11 Back', 5);
  await this.assertions.assertElementVisible(
    await this.MarketExceedsLimitMesg,
    'Bet amount exceeds the maximum bet limit'
  );
  await this.bettingOnSpecificPlayerInLoop('Player 8 Back',6);
  await this.assertions.assertElementVisible(
    await this.MarketProfitLimitMesg,
    'Max Profit Limit is 600000 should be visible'
  );
}
// Method to retrieve the total value (base + card value) for each player
async getPlayerTotals(_page) {
  const playerTotals = [];
  for (let i = 0; i < this.playerTotalsSelectors.length; i++) {
    const totalLocator = this.playerTotalsSelectors[i];
    const total = await totalLocator.textContent();
    playerTotals.push({ player: `Player ${i + 1}`, total: parseInt(total, 10) });
  }
  return playerTotals;
}
// Method to find the player with the highest total value
getWinningPlayer(_page,playerTotals) {
  return playerTotals.reduce((max, player) => player.total > max.total ? player : max, playerTotals[0]);
}
// Method to verify that the winning player is correctly declared in the UI
async verifyWinner(_page , winningPlayer) {
  const displayedWinner = await this.page.$eval(this.winnerAnnouncementSelector, el => el.textContent);
  expect(displayedWinner).toContain(winningPlayer.player);
}
async validateTotalLossAmountForMultipleMarkets(page, betAmount, markets) {
  const marketMultipliers = {
    'Player 8 Lay': 12.7,
    'Player 9 Lay': 5.45,
    'Player 10 Lay': 2.45,
    'Player 11 Lay': 1.18,
  };

  let totalLossAmount = 0;

  for (const market of markets) {
    const lossAmountMultiplier = marketMultipliers[market];

    if (lossAmountMultiplier !== undefined) {
      let lossAmount = betAmount * lossAmountMultiplier;
      totalLossAmount += lossAmount; // Add each market's win amount to the total
      console.log(
        `Market: ${market}, Individual loss Amount: ₹${lossAmount.toFixed(2)}`
      );
    } else {
      console.warn(`No multiplier found for market: ${market}`);
    }
  }

  console.log(
    `Total loss Amount for all markets: ₹${totalLossAmount.toFixed(2)}`
  );

}
};
