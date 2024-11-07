const { expect } = require('@playwright/test');
const { name } = require('../playwright.config');
const { executeStep } = require('../utils/action');
const Assertions = require('../utils/assertions');
require('dotenv').config();

exports.GamePage = class GamePage {
  constructor(page) {
    this.page = page;
    this.assertions = new Assertions();
    this.body = page.locator('body');
    this.virtualGamesContainer = page.locator('#virtual-games-container');

    this.autoButton = this.page.getByRole('button', { name: 'Auto' });
    this.onWinResetButton = this.page.locator(
      "//span[text()='On win']//..//..//button[@value='Reset']"
    );
    this.onWinIncreaseByButton = this.page.locator(
      "//span[text()='On win']//..//..//button[@value='Increase By']"
    );
    this.onLoseResetButton = this.page.locator(
      "//span[text()='On Lose']//..//..//button[@value='Reset']"
    );
    this.onLoseIncreaseByButton = this.page.locator(
      "//span[text()='On Lose']//..//..//button[@value='Increase By']"
    );
    this.increaseByButton = this.page.getByRole('button', {
      name: 'Increase By',
    });

    this.onWinInput = this.page
      .locator('div')
      .filter({ hasText: /^On winResetIncrease By%$/ })
      .getByPlaceholder('0');

    this.onLoseInput = this.page
      .locator('div')
      .filter({ hasText: /^On LoseResetIncrease By%$/ })
      .getByPlaceholder('0');
    this.ax1Button = this.page
      .locator('div')
      .filter({ hasText: /^Ax1/ })
      .locator('div')
      .first();
    this.bx1Button = this.page
      .locator('div')
      .filter({ hasText: /^Bx1/ })
      .locator('div')
      .first();
    this.aPlusMarketButton = this.page.getByText('A+x');
    this.bPlusMarketButton = this.page.getByText('B+x');
    this.betButton = this.page.getByRole('button', {
      name: 'Bet',
    });
    this.startBet = this.page.getByRole('button', { name: 'Bet' });
    this.shuffleButton = this.page.locator('button:has-text("SHUFFLE")');
    this.doublButton = this.page.getByRole('button', { name: 'DOUBLE' });
    this.clearButton = this.page.getByRole('button', { name: 'CLEAR' });
    this.undoButton = this.page.getByRole('button', { name: 'UNDO' });
    this.startAutoBetButton = this.page.getByRole('button', {
      name: 'Start Auto Bet',
    });
    this.stopAutoBetButton = this.page.getByRole('button', {
      name: 'Stop Auto Bet',
    });
    this.infinityInput = this.page.getByPlaceholder('∞');
    this.preferedNumberRoundsValueButtons = (button) =>
      this.page.locator(
        `//span[text()="Number of rounds"]//parent::div//button[text()="${button}"]`
      );
    this.stopOnWin = this.page.locator(
      '//span[text()="Stop On win"]//..//..//input'
    );
    this.stopOnLose = this.page.locator(
      '//span[text()="Stop On Lose"]//..//..//input'
    );
    this.stopOnWinHitText = this.page.getByText('stop on win hit');
    this.autoBetIsActiveErrorMessage =
      this.page.getByText('Auto bet is active');
    this.chip1 = this.page
      .locator("//div[contains(@class,'coin')]//span[text()='1'] ")
      .first();
    this.chip100 = this.page
      .locator("//div[contains(@class,'coin')]//span[text()='100'] ")
      .first();
    this.stopOnWinsWinningAmount = (amount) =>
      this.page.locator('span').filter({ hasText: `${amount}/500` });
    this.stopOnLossAmount = (amount) =>
      this.page.locator('span').filter({ hasText: `${amount}/500` });
    this.playerAIsWon = this.page
      .locator("//span[text()='Player A']//span[text()='WINNER']")
      .first();
    this.playerBIsWon = this.page
      .locator("//span[text()='Player B']//span[text()='WINNER']")
      .first();
    this.playerABorderColorContainer = this.page.locator(
      "//span[text()='A']/parent::div"
    );
    this.playerAPlusBorderColorContainer = this.page.locator(
      "//span[text()='A+']/parent::div"
    );
    this.playerBBorderColorContainer = this.page.locator(
      "//span[text()='B']/parent::div"
    );
    this.playerBPlusBorderColorContainer = this.page.locator(
      "//span[text()='B+']/parent::div"
    );
    this.balanceAmount = this.page.locator(
      'div[id="balanceAmountContainer"] span'
    );
    this.chip100 = this.page.getByText('100').nth(1);
    this.aMarketChipContainer = (chipAmount) =>
      this.ax1Button.getByText(chipAmount);
    this.bMarketChipContainer = (chipAmount) =>
      this.bx1Button.getByText(chipAmount);
    this.bPlusMarketChipContainer = (chipAmount) =>
      this.bPlusMarketButton.getByText(chipAmount);
    this.playerInWinHistory = this.page.getByText('Player A').first();
    this.plainMarketExceedsLimitMesg = this.page.getByText(
      'Bet amount exceeds plain market limit of 4000'
    );
    this.plusMarketExceedsLimitMesg = this.page.getByText(
      'Bet amount exceeds plus market limit of 1000'
    );
    this.totalBetAmount = this.page.locator(
      "//span[text()='Total Bet']/following-sibling::span"
    );
    this.tieAmount = this.page.getByText('x1₹1.00');
  }
  async validateSpecificPlayerWon(player) {
    switch (player) {
      case 'Market A':
        await this.assertions.assertElementVisible(
          this.playerAIsWon,
          ' Validate Winner Tag is visible on Player A or Market A  '
        );
        await this.assertions.assertElementToHaveCSS(
          this.playerABorderColorContainer,
          'border-color',
          'rgb(0, 231, 0)',
          ' Validate Player A or Market A  card border is in Green color '
        );
        break;
      case 'Market B':
        await this.assertions.assertElementVisible(
          this.playerBIsWon,
          ' Validate Winner Tag is visible on Player B or Market B  '
        );
        await this.assertions.assertElementToHaveCSS(
          this.playerBBorderColorContainer,
          'border-color',
          'rgb(0, 231, 0)',
          ' Validate Player B or Market B card border is in Green color '
        );
        break;
    }
  }

  async goto() {
    await executeStep(this.page, 'navigate', 'Navigate to the game page', [
      process.env.Url,
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

  async clickText(text) {
    const textLocator = this.page.getByText(text);
    await executeStep(textLocator, 'click', `Click on text: ${text}`, []);
  }

  async clickButtonByRole(name) {
    const buttonLocator = this.page.getByRole('button', { name });
    await executeStep(
      buttonLocator,
      'click',
      `Click button with role: ${name}`,
      []
    );
  }

  async fillPlaceholder(placeholder, value) {
    const inputLocator = this.page.getByPlaceholder(placeholder);
    await executeStep(
      inputLocator,
      'click',
      `Click on placeholder: ${placeholder}`,
      []
    );
    await executeStep(
      inputLocator,
      'fill',
      `Fill ${value} in placeholder: ${placeholder}`,
      [value]
    );
  }
  // locator('div').filter({ hasText: /^Ax1\.98$/ }).locator('div')
  async clickDivWithText(text) {
    const divLocator = this.page
      .locator('div')
      .filter({ hasText: new RegExp(text) })
      .locator('div');
    await executeStep(
      divLocator,
      'click',
      `Click on div with text: ${text}`,
      []
    );
  }

  async waitForVisible(selector) {
    const locator = this.page.locator(selector);
    await executeStep(
      locator,
      'scroll',
      `Scroll to make ${selector} visible`,
      []
    );
    await executeStep(
      locator,
      'toBeVisible',
      `Wait for ${selector} to be visible`,
      []
    );
  }

  async waitForTimeout(timeout) {
    await executeStep(this.page, 'waitForTimeout', `Wait for ${timeout} ms`, [
      timeout,
    ]);
  }

  async clickMultipleTimes(selector, times) {
    for (let i = 0; i < times; i++) {
      const buttonLocator = this.page.getByRole('button', {
        name: selector,
      });
      await executeStep(
        buttonLocator,
        'click',
        `Click button ${selector} - Attempt ${i + 1}`,
        []
      );
    }
  }

  // async executeAutoBetFlow( increaseValue) {
  //   await this.page.pause()
  //   await executeStep(this.autoButton, 'click', 'Click Auto button');
  //   await executeStep(this.increaseByButton, 'click', 'Click Increase By button');
  //   await executeStep(this.onWinInput, 'fill', 'Fill On win Reset Increase', [increaseValue]);
  //   await executeStep(this.ax1Button, 'click', 'Click Ax1.98 button');
  //   await executeStep(this.startAutoBetButton, 'click', 'Click Start Auto Bet button');
  //   await this.page.waitForTimeout(parseInt(process.env.small_ui_timeout))
  //   await executeStep(this.stopAutoBetButton, 'click', 'Click Stop Auto Bet button');
  // }

  async stopAutoBet() {
    await executeStep(
      this.stopAutoBetButton,
      'click',
      'Click Stop Auto Bet button'
    );
  }
  async getVisibleText(text, index = 0) {
    const elements = this.page.getByText(text);
    return elements.nth(index); // Use nth to get the specific instance
  }

  async executeAutoBetFlow(increaseValue, isOnWin = true, filter) {
    // await executeStep(this.autoButton, 'click', 'Click Auto button');
    // await executeStep(this.infinityInput, 'click', 'Click Infinity input');
    // await executeStep(this.infinityInput, 'fill','fill no.of rounds', ['1']);
    switch (filter) {
      case 'On win':
        await executeStep(
          this.increaseByButton.first(),
          'click',
          'Click Increase By button'
        );
        break;
      case 'On Lose':
        await executeStep(
          this.increaseByButton.nth(1),
          'click',
          'Click Increase By button'
        );
        break;
      default:
        console.log('no filters are applied');
    }

    const inputElement = isOnWin ? this.onWinInput : this.onLoseInput;
    await executeStep(inputElement, 'fill', 'fill increseby value', [
      increaseValue,
    ]);

    const actionButton = isOnWin ? this.ax1Button : this.bx1Button;
    await executeStep(
      actionButton,
      'click',
      `Click ${isOnWin ? 'Ax1.98' : 'Bx1.98'} button`
    );
    await executeStep(
      this.startAutoBetButton,
      'click',
      'Click Start Auto Bet button'
    );
  }
  as;

  async clickOnStartAutoBetButton() {
    await executeStep(
      this.startAutoBetButton,
      'click',
      'Click Start Auto Bet button'
    );
  }

  async addAutoAmount(isOnWin) {
    await this.clickNumber(1);
    await this.clickBetAmount(100);
    await executeStep(
      this.ax1Button,
      'click',
      `Click ${isOnWin ? 'Ax1.98' : 'Bx1.98'} button`
    );
    await expect(await this.aMarketChipContainer(100)).toBeVisible();
  }
  async clickOnUndo() {
    await expect(this.undoButton).toBeVisible();
    await executeStep(this.undoButton, 'click', 'Click undo button');
  }
  async clickOnClear() {
    await expect(this.clearButton).toBeVisible();
    await executeStep(this.clearButton, 'click', 'Click clear button');
  }

  async executeAutoBetFlowForStopOnLoseOnWinFilter(
    amount,
    isOnWin = true,
    filter,
    chipsMultipuler
  ) {
    await executeStep(this.autoButton, 'click', 'Click Auto button');
    switch (filter) {
      case 'Stop On win':
        await executeStep(this.stopOnWin, 'fill', 'fill stop on win amount', [
          amount,
        ]);
        await this.clickNumber(1);
        await this.clickBetAmount(100);
        break;
      case 'Stop On Lose':
        await executeStep(this.stopOnLose, 'fill', 'Click Increase By button', [
          amount,
        ]);
        await this.clickNumber(1);
        await this.clickBetAmount(100);
        break;
      default:
        console.log('no filters are applied');
    }
    for (let i = 0; i < chipsMultipuler; i++) {
      const actionButton = isOnWin ? this.ax1Button : this.bx1Button;
      await executeStep(
        actionButton,
        'click',
        `Click ${isOnWin ? 'Ax1.98' : 'Bx1.98'} button`
      );
    }
    await executeStep(
      this.startAutoBetButton,
      'click',
      'Click Start Auto Bet button'
    );
  }

  async autoBetFlowForBothStoponLoseAndWin() {
    await executeStep(this.stopOnWin, 'fill', 'fill stop on win amount', [
      '500',
    ]);
    await executeStep(this.stopOnLose, 'fill', 'Click Increase By button', [
      '500',
    ]);
  }
  async clickAuto() {
    await executeStep(this.autoButton, 'click', 'Click Auto button');
  }

  async placeAutoBetOnMarketAAndStartAutoBet(chipsMultipuler) {
    await executeStep(this.autoButton, 'click', 'Click Auto button');
    for (let i = 0; i < chipsMultipuler; i++) {
      const actionButton = this.ax1Button;
      await executeStep(actionButton, 'click', `Click Ax1.98button`);
    }
    await executeStep(
      this.startAutoBetButton,
      'click',
      'Click Start Auto Bet button'
    );
  }

  async validateShufflebutton(chipsMultipuler) {
    for (let i = 0; i < chipsMultipuler; i++) {
      const actionButton = this.ax1Button;
      await executeStep(actionButton, 'click', `Click Ax1.98button`);
    }
    await executeStep(this.startBet, 'click', 'Click Start  Bet button');
    await this.page.waitForTimeout(5000);
    await executeStep(
      this.shuffleButton,
      'click',
      'Click shuffle button button'
    );
    await this.page.waitForTimeout(5000);
  }

  async bettingOnSpecificMarket(market) {
    switch (market) {
      case 'Market A':
        await executeStep(this.ax1Button, 'click', 'Clicking on Market A');
        break;
      case 'Market B':
        await executeStep(this.bx1Button, 'click', 'Clicking on Market B');
        break;
      case 'Market A+':
        await executeStep(
          this.aPlusMarketButton,
          'click',
          'Clicking on Market A+'
        );
        break;
      case 'Market B+':
        await executeStep(
          this.bPlusMarketButton,
          'click',
          'Clicking on Market B+'
        );
        break;
      default:
        console.log('Invalid market');
    }
  }

  async bettingOnSpecificMarketInLoop(market, numberOfLoop) {
    for (let i = 0; i < numberOfLoop; i++) {
      await this.bettingOnSpecificMarket(market);
    }
  }

  async clickOnBetButton() {
    await executeStep(this.betButton, 'click', 'Clicking on Bet button');
  }

  async readingBalanceAmount() {
    let balanceAmount = await this.balanceAmount.innerText();
    balanceAmount = balanceAmount.replaceAll(',', '').replaceAll('₹', '');
    console.log('balanceAmount', balanceAmount);
    return balanceAmount;
  }

  async clickingOnDoubleButtonInLoop(numberOfLoop) {
    for (let i = 0; i < numberOfLoop; i++) {
      await executeStep(this.doublButton, 'click', 'click on double button');
    }
  }
  async validateMaximumAllowedBet() {
    await this.clickNumber(1);
    await this.clickBetAmount(100);
    await this.bettingOnSpecificMarketInLoop('Market A', 5);
    await this.clickingOnDoubleButtonInLoop(4);
    await this.assertions.assertElementVisible(
      await this.plainMarketExceedsLimitMesg,
      'Bet amount exceeds plain market limit of 4000 Message should be visible'
    );
    await this.bettingOnSpecificMarketInLoop('Market A+', 11);
    await this.assertions.assertElementVisible(
      await this.plusMarketExceedsLimitMesg,
      'Bet amount exceeds plus market limit of 1000 Message should be visible'
    );
    await this.bettingOnSpecificMarketInLoop('Market B+', 11);
    await this.assertions.assertElementVisible(
      await this.plusMarketExceedsLimitMesg,
      'Bet amount exceeds plus market limit of 1000 Message should be visible'
    );
  }
};
