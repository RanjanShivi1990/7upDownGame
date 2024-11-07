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

      //locators for all the elements options
    this.evenButton = this.page.locator("(//div[contains(@class,'relative w-10 h-10')])[1]");
    this.oddButton = this.page.locator("(//div[contains(@class,'relative w-10 h-10')])[3]");
    this.upButton = this.page.locator("(//div[contains(@class,'relative w-10 h-10')])[2]");
    this.downButton = this.page.locator("(//div[contains(@class,'relative w-10 h-10')])[10]");
    this.sevenButton = this.page.locator("(//div[contains(@class,'relative w-10 h-10')])[6]");
    this.diamondCardButton =this.page.locator("(//div[contains(@class,'relative w-10 h-10')])[4]");
    this.heartCardButton = this.page.locator("(//div[contains(@class,'relative w-10 h-10')])[5]");
    this.redCardsButton =this.page.locator("(//div[contains(@class,'relative w-10 h-10')])[9]");
    this.spadesCardButton = this.page.locator("(//div[contains(@class,'relative w-10 h-10')])[7]");
    this.clubCardButton = this.page.locator("(//div[contains(@class,'relative w-10 h-10')])[8]");
    this.blackCardsButton = this.page.locator("(//div[contains(@class,'relative w-10 h-10')])[11]");
    this.autoButton = this.page.getByRole('button', { name: 'Auto' });
    this.betButton = this.page.getByRole('button', {name: 'Bet',});
    this.startBet = this.page.getByRole('button', { name: 'Bet' });
    this.shuffleButton = this.page.locator('button:has-text("SHUFFLE")');
    this.doublButton = this.page.getByRole('button', { name: 'DOUBLE' });
    this.clearButton = this.page.getByRole('button', { name: 'CLEAR' });
    this.undoButton = this.page.getByRole('button', { name: 'UNDO' });
    this.startAutoBetButton = this.page.getByRole('button', {name: 'Start Auto Bet',});
    this.stopAutoBetButton = this.page.getByRole('button', {name: 'Stop Auto Bet',});
    this.infinityInput = this.page.getByPlaceholder('∞');
    this.preferedNumberRoundsValueButtons = (button) =>
      this.page.locator(
        `//span[text()="Number of rounds"]//parent::div//button[text()="${button}"]`
      );
      this.chip100 = this.page
      .locator("//div[contains(@class,'coin')]//span[text()='100'] ")
      .first();
      this.chip500 = this.page
      .locator("//div[contains(@class,'coin')]//span[text()='500'] ")
      .first();
      this.chip10000 = this.page
      .locator("//div[contains(@class,'coin')]//span[text()='10K'] ")
      .first();

      //locators for validating green color of border
    this.evenBorderColorContainer = this.page.locator("//span[text()='Even']/parent::div");
    this.oddBorderColorContainer = this.page.locator("//span[text()='Odd']/parent::div");
    this.upBorderColorContainer = this.page.locator("//span[text()='UP']/parent::div");
    this.downBorderColorContainer = this.page.locator("//span[text()='DOWN']/parent::div");
    this.sevenBorderColorContainer =this.page.locator("//span[text()='7']/parent::div");
    this.diamondBorderColorContainer = this.page.locator("//span[text()='♦']/parent::div");
    this.heartsBorderColorContainer = this.page.locator("//span[text()='♥']/parent::div");
    this.redCardsBorderColorContainer = this.page.locator("//span[text()='♥ ♦']/parent::div");
    this.spadesBoarderColorContainer = this.page.locator("//span[text()='♠']/parent::div");
    this.clubsBorderColorContainer = this.page.locator("//span[text()='♣']/parent::div");
    this.blackCardsBorderColorContainer = this.page.locator("//span[text()='♠ ♣']/parent::div");

      //balance amount
    this.balanceAmount = this.page.locator(
      'div[id="balanceAmountContainer"] span'
    );
    // locator for chip and market chip container
    this.chip10000 = this.page.getByText('10K').nth(1);

    this.evenMarketChipContainer = (chipAmount) =>
      this.evenButton.getByText(chipAmount);
    this.oddMarketChipContainer = (chipAmount) =>
      this.oddButton.getByText(chipAmount);
    this.upMarketChipContainer = (chipAmount) =>
      this.upButton.getByText(chipAmount);
    this.downMarketChipContainer = (chipAmount) =>
      this.downButton.getByText(chipAmount);
    this.sevenMarketChipContainer = (chipAmount) =>
      this.sevenButton.getByText(chipAmount);
    this.oddEvenMarketExceedsLimitMesg = this.page.getByText(
      'Bet amount exceeds oddeven market limit of 200000'
    );
    this.mainMarketExceedsLimitMesg = this.page.getByText(
      'Bet amount exceeds main market limit of 200000'
    );
    this.suitMarketExceedsLimitMesg = this.page.getByText(
      'Bet amount exceeds SUIT market limit of 200000'
    );
    /*this.colorMarketExceedsLimitMesg = this.page.getByText(
      'Bet amount exceeds color market limit of 200000'
    );*/
    this.totalBetAmount = this.page.locator(
      "//span[text()='Total Bet']/following-sibling::span"
    );
    
  }
  async validateSpecificBetOptionWon(betoption) {
    switch (betoption) {
      case 'Even':
        await this.assertions.assertElementToHaveCSS(
          this.evenBorderColorContainer,
          'border-color',
          'rgb(0, 231, 0)',
          ' Validate Even Market border is in Green color '
        );
        break;
      case 'Odd':
        await this.assertions.assertElementToHaveCSS(
          this.oddBorderColorContainer,
          'border-color',
          'rgb(0, 231, 0)',
          ' Validate Odd Market border is in Green color '
        );
        break;
      case 'Up':
        await this.assertions.assertElementToHaveCSS(
            this.upBorderColorContainer,
              'border-color',
              'rgb(0, 231, 0)',
              ' Validate Up Market border is in Green color '
            );
        break;
      case 'Down':
        await this.assertions.assertElementToHaveCSS(
            this.downBorderColorContainer,
              'border-color',
              'rgb(0, 231, 0)',
              ' Validate Down Market border is in Green color '
            );
        break;
      case 'Seven':
        await this.assertions.assertElementToHaveCSS(
            this.sevenBorderColorContainer,
                'border-color',
                'rgb(0, 231, 0)',
                ' Validate Up Market border is in Green color '
            );
        break;
      case 'Diamond':
        await this.assertions.assertElementToHaveCSS(
            this.diamondBorderColorContainer,
            'border-color',
            'rgb(0, 231, 0)',
            ' Validate Diamond Card Market border is in Green color '
            );
        break;
      case 'Hearts':
        await this.assertions.assertElementToHaveCSS(
            this.heartsBorderColorContainer,
            'border-color',
            'rgb(0, 231, 0)',
            ' Validate Heart card Market border is in Green color '
            );
        break;
       case 'Redcards':
        await this.assertions.assertElementToHaveCSS(
          this.redCardsBorderColorContainer,
          'border-color',
          'rgb(0, 231, 0)',
          ' Validate Redcards Market border is in Green color '
        );
        break;
      case 'Spades':
        await this.assertions.assertElementToHaveCSS(
          this.spadesBoarderColorContainer,
          'border-color',
          'rgb(0, 231, 0)',
          ' Validate Spade card Market border is in Green color '
        );
        break;
      case 'Clubs':
        await this.assertions.assertElementToHaveCSS(
            this.clubsBorderColorContainer,
              'border-color',
              'rgb(0, 231, 0)',
              ' Validate club card Market border is in Green color '
            );
      case 'Blackcards':
        await this.assertions.assertElementToHaveCSS(
            this.blackCardsBorderColorContainer,
              'border-color',
              'rgb(0, 231, 0)',
              ' Validate Black card Market border is in Green color '
            );  
    }
  }

  async goto() {
    await executeStep(this.page, 'navigate', 'Navigate to the game page', [
      process.env.UPGAMEURL,
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


  async getVisibleText(text, index = 0) {
    const elements = this.page.getByText(text);
    return elements.nth(index); // Use nth to get the specific instance
  }

  async clickOnStartAutoBetButton() {
    await executeStep(
      this.startAutoBetButton,
      'click',
      'Click Start Auto Bet button'
    );
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
    filter  ) {
    await executeStep(this.autoButton, 'click', 'Click Auto button');
    switch (filter) {
      case 'Stop On win':
        await executeStep(this.stopOnWin, 'fill', 'fill stop on win amount', [
          amount,
        ]);
        await this.clickNumber(100);
        await this.clickBetAmount(100);
        break;
      case 'Stop On Lose':
        await executeStep(this.stopOnLose, 'fill', 'Click Increase By button', [
          amount,
        ]);
        await this.clickNumber(100);
        await this.clickBetAmount(100);
        break;
      default:
        console.log('no filters are applied');
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
      const actionButton = this.oddButton;
      await executeStep(actionButton, 'click', `Click oddButton`);
    }
    await executeStep(
      this.startAutoBetButton,
      'click',
      'Click Start Auto Bet button'
    );
  }

  async validateShufflebutton(chipsMultipuler) {
    for (let i = 0; i < chipsMultipuler; i++) {
      const actionButton = this.evenButton;
      await executeStep(actionButton, 'click', `Click evenbutton`);
    }
    await executeStep(
      this.shuffleButton,
      'click',
      'Click shuffle button'
    );
    await this.page.waitForTimeout(5000);
  }

  async bettingOnSpecificMarket(market) {
    switch (market) {
      case 'Even Market':
        await executeStep(this.evenButton, 'click', 'Clicking on Even Market');
        break;
      case 'Odd Market':
        await executeStep(this.oddButton, 'click', 'Clicking on Odd Market');
        break;
      case 'Up Market':
        await executeStep(this.upButton, 'click', 'Clicking on Up Market');
        break;
      case 'Down Market':
        await executeStep(this.downButton, 'click', 'Clicking on Down Market');
        break;
      case 'Seven Market':
        await executeStep(this.sevenButton, 'click', 'Clicking on Exact Seven Market');
        break;
      case 'Diamondcard Market':
        await executeStep(this.diamondCardButton, 'click', 'Clicking on Diamondcard Market');
        break;
      case 'Heartcard Market':
        await executeStep(this.heartCardButton, 'click', 'Clicking on Haertcard Market');
        break;
      case 'Redcards Market':
        await executeStep(this.redCardsButton, 'click', 'Clicking on Redacrds Market');
        break;
      case 'Spadecard Market':
        await executeStep(this.spadesCardButton, 'click', 'Clicking on Spadecard Market');
        break;
      case 'Clubcard Market':
        await executeStep(this.clubCardButton, 'click', 'Clicking on clubcard Market');
        break;
      case 'Blackcards Market':
        await executeStep(this.blackCardsButton, 'click', 'Clicking on Blackcard Market');
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
    return balanceAmount;
  }

  async clickingOnDoubleButtonInLoop(numberOfLoop) {
    for (let i = 0; i < numberOfLoop; i++) {
      await executeStep(this.doublButton, 'click', 'click on double button');
    }

  async function insertcard(page, card) {
    await insertcard([card], GAME_ID);
  }
}
async isEvenElementLockedToClick() {
  // Check if the element has pointer-events: none
  const isPointerEventsNone = await this.evenButton.evaluate(element => {
      return window.getComputedStyle(element).pointerEvents === 'none';
  });

  return isPointerEventsNone;
}
async isOddElementLockedToClick() {
  // Check if the element has pointer-events: none
  const isPointerEventsNone = await this.oddButton.evaluate(element => {
      return window.getComputedStyle(element).pointerEvents === 'none';
  });

  return isPointerEventsNone;
}
async isUpElementLockedToClick() {
  // Check if the element has pointer-events: none
  const isPointerEventsNone = await this.upButton.evaluate(element => {
      return window.getComputedStyle(element).pointerEvents === 'none';
  });

  return isPointerEventsNone;
}
async isDownElementLockedToClick() {
  // Check if the element has pointer-events: none
  const isPointerEventsNone = await this.downButton.evaluate(element => {
      return window.getComputedStyle(element).pointerEvents === 'none';
  });

  return isPointerEventsNone;
}
async isRedcardsElementLockedToClick() {
  // Check if the element has pointer-events: none
  const isPointerEventsNone = await this.redCardsButton.evaluate(element => {
      return window.getComputedStyle(element).pointerEvents === 'none';
  });

  return isPointerEventsNone;
}
async isBlackcardsElementLockedToClick() {
  // Check if the element has pointer-events: none
  const isPointerEventsNone = await this.blackCardsButton.evaluate(element => {
      return window.getComputedStyle(element).pointerEvents === 'none';
  });

  return isPointerEventsNone;
}
};

