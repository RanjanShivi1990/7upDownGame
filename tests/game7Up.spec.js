import { test, expect } from '@playwright/test';
import { GamePage } from '../pages/sevenUpDown.js';
const Assertions = require('../utils/assertions.js');
import testData from '../testData/testData.json';
import { insertCard } from '../utils/upGameApi.js';

let gamePage, assertions;

test.beforeEach(async ({ page }) => {
  gamePage = new GamePage(page);
  assertions = new Assertions();
  await gamePage.goto();
});
//** Total Execution time: 8.9m
//** Total TC in excel : 41 , tc: 36 , covered: 38, pending: 0 ,  , NA: 2 . blockers: 1. blocker impact on: 2 */
test('TC_01 Auto functionality,Validate Number of Rounds field with valid inputs', async ({
  page,
}) => {
  gamePage = new GamePage(page); //navigate to page
  await gamePage.clickButtonByRole('Auto'); // Click the Auto button
  await gamePage.fillPlaceholder('∞', '1'); // Fill '1' in the placeholder
  await expect(await gamePage.infinityInput).toHaveValue('1'); //Validate th field

  });

test('TC_02 Auto functionality(Validate Number of Rounds field with invalid inputs)', async ({
    page,
  }) => {
    gamePage = new GamePage(page); //navigate to page
    await gamePage.clickButtonByRole('Auto'); // Click the Auto button
    await gamePage.fillPlaceholder('∞', '-1'); // Fill '1' in the placeholder
    //Validate the field
    await expect(await gamePage.infinityInput).toHaveValue('', {
      timeout: 1000,
    }); 
  
    });

test('TC_09,Validate Double Button', async ({ page }) => {
  gamePage = new GamePage(page); //navigate to page
  await gamePage.clickButtonByRole('Auto'); //CLick on auto
  await gamePage.clickNumber(100); //Select Bet Amount(Default 100)
  await gamePage.clickBetAmount(100);
  await gamePage.expectTextInBody('100');
  await gamePage.bettingOnSpecificMarketInLoop('Up Market', 2); //Click On Main Market(7 or Up or Down)
  await expect(await gamePage.upMarketChipContainer('200')).toBeVisible();
  await gamePage.clickingOnDoubleButtonInLoop(1); //Click on Double Button
  await expect(await gamePage.upMarketChipContainer('200')).not.toBeVisible();
  await expect(await gamePage.upMarketChipContainer('400')).toBeVisible();
});

test('TC_10 Validate Clear Button', async ({ page }) => {
  gamePage = new GamePage(page); //navigate to page
  await gamePage.clickButtonByRole('Auto'); //CLick on auto
  await gamePage.clickNumber(100); //Select Bet Amount(Default 100)
  await gamePage.clickBetAmount(100);
  await gamePage.expectTextInBody('100');
  await gamePage.bettingOnSpecificMarketInLoop('Down Market', 2); //Click On Main Market(7 or Up or Down)
  await expect(await gamePage.downMarketChipContainer('200')).toBeVisible();
  await gamePage.clickOnClear();
  await expect(await gamePage.downMarketChipContainer('200')).not.toBeVisible();
  await expect(await gamePage.downMarketChipContainer('100')).not.toBeVisible();
});

test('TC_11 Validate Undo Button', async ({ page }) => {
  gamePage = new GamePage(page); //navigate to page
  await gamePage.clickButtonByRole('Auto'); //CLick on auto
  await gamePage.clickNumber(100); //Select Bet Amount(Default 100)
  await gamePage.clickBetAmount(100);
  await gamePage.expectTextInBody('100');
  await gamePage.bettingOnSpecificMarket('Seven Market'); //Click On Main Market(7 or Up or Down)
  await expect(await gamePage.totalBetAmount).toHaveText('₹100.00'); //.Validate Total Bet is 100.
  await gamePage.bettingOnSpecificMarket('Up Market');//Click On Main Market(7 or Up or Down)
  await expect(await gamePage.totalBetAmount).toHaveText('₹200.00');
  await gamePage.clickOnUndo();
  await expect(await gamePage.upMarketChipContainer('100')).not.toBeVisible();
  await expect(await gamePage.sevenMarketChipContainer('100')).toBeVisible();
});

test('TC_12 Validate Shuffle Button', async ({ page }) => {
  const hasDisabledClass = await gamePage.shuffleButton.evaluate((el) => {
    return el.classList.contains('disabled:opacity-40');
  });
  expect(hasDisabledClass).toBe(true);
  await gamePage.validateShufflebutton(2);
});



test('TC_13, Market(Validate bet placement on UP market and locking DOWN market)', async ({ page }) => {
  gamePage = new GamePage(page);
  await insertCard(testData.sevenUpDown.cardSets.Up);
  await gamePage.bettingOnSpecificMarket('Up Market');
  const isLocked = await gamePage.isDownElementLockedToClick();
  console.log('Is the Down Market locked to click?', isLocked);
  expect(isLocked).toBe(true);
  await gamePage.clickOnBetButton();
  await gamePage.validateSpecificBetOptionWon('Up');
});

test('TC_14, Market(Validate bet placement on DOWN market and locking UP)', async ({ page }) => {
  gamePage = new GamePage(page);  
  await insertCard(testData.sevenUpDown.cardSets.Down);
  await gamePage.bettingOnSpecificMarket('Down Market');
  const isLocked = await gamePage.isUpElementLockedToClick();
  console.log('Is the Up Market locked to click?', isLocked);
  expect(isLocked).toBe(true);
  await gamePage.clickOnBetButton();
  await gamePage.validateSpecificBetOptionWon('Down');
});

test('TC_15, Market(Validate bet placement on Even market and locking Odd)', async ({ page }) => {
  gamePage = new GamePage(page);
  await insertCard(testData.sevenUpDown.cardSets.Even);
  await gamePage.bettingOnSpecificMarket('Even Market');
  const isLocked = await gamePage.isOddElementLockedToClick();
  console.log('Is the Odd Market locked to click?', isLocked);
  expect(isLocked).toBe(true);
  await gamePage.clickOnBetButton();
  await gamePage.validateSpecificBetOptionWon('Even');
});

test('TC_16, Market(Validate bet placement on Odd market and locking Even)', async ({page,}) => {
  gamePage = new GamePage(page);
  await insertCard(testData.sevenUpDown.cardSets.Odd);
  await gamePage.bettingOnSpecificMarket('Odd Market');
  const isLocked = await gamePage.isEvenElementLockedToClick();
    console.log('Is the Even Market locked to click?', isLocked);
    expect(isLocked).toBe(true);
  await gamePage.clickOnBetButton();
  await gamePage.validateSpecificBetOptionWon('Odd');
});

test('TC_17, Market(Validate bet placement on Heart Diamond and locking Spades Clubs)', async ({ page }) => {
  gamePage = new GamePage(page);
  await insertCard(testData.sevenUpDown.cardSets.Redcards);
  await gamePage.bettingOnSpecificMarket('Redcards Market');
  const isLocked = await gamePage.isBlackcardsElementLockedToClick();
  console.log('Is the Spades Clubs Market locked to click?', isLocked);
  expect(isLocked).toBe(true);
  await gamePage.clickOnBetButton();
  await gamePage.validateSpecificBetOptionWon('Redcards');
});

test('TC_18, Market(Validate bet placement on Spades Clubs and locking Heart Diamond)', async ({ page }) => {
  gamePage = new GamePage(page);
  await insertCard(testData.sevenUpDown.cardSets.Blackcards);
  await gamePage.bettingOnSpecificMarket('Blackcards Market');
  const isLocked = await gamePage.isRedcardsElementLockedToClick();
  console.log('Is the Heart Diamond Market locked to click?', isLocked);
  expect(isLocked).toBe(true);
  await gamePage.clickOnBetButton();
  await gamePage.validateSpecificBetOptionWon('Blackcards');
});

test('TC_20, Market(validate bet placement on 7)', async ({ page }) => {
  gamePage = new GamePage(page);
  await insertCard(testData.sevenUpDown.cardSets.Seven);
  await gamePage.bettingOnSpecificMarket('Seven Market');
  await gamePage.clickOnBetButton();
  await gamePage.validateSpecificBetOptionWon('Seven');
});

test('TC_21, Market(Validate bet placement on Diamond)', async ({ page }) => {
  gamePage = new GamePage(page);
  await insertCard(testData.sevenUpDown.cardSets.Diamond);
  await gamePage.bettingOnSpecificMarket('Diamondcard Market');
  await gamePage.clickOnBetButton();
  await gamePage.validateSpecificBetOptionWon('Diamond');
});

test('TC_22, Market(Validate bet placement on heart)', async ({ page }) => {
    gamePage = new GamePage(page);
    await insertCard(testData.sevenUpDown.cardSets.Heart);
    await gamePage.bettingOnSpecificMarket('Heartcard Market');
    await gamePage.clickOnBetButton();
    await gamePage.validateSpecificBetOptionWon('Heart');
});

test('TC_23, Market(Validate Bet placement on Spades)', async ({ page }) => {
    gamePage = new GamePage(page);
    await insertCard(testData.sevenUpDown.cardSets.Spades);
    await gamePage.bettingOnSpecificMarket('Spadecard Market');
    await gamePage.clickOnBetButton();
    await gamePage.validateSpecificBetOptionWon('Spades');
});

test('TC_24, Market(Validate Bet placement on Clubs)', async ({ page }) => {
    gamePage = new GamePage(page);
    await insertCard(testData.sevenUpDown.cardSets.Clubs);
    await gamePage.bettingOnSpecificMarket('Clubcard Market');
    await gamePage.clickOnBetButton();
    await gamePage.validateSpecificBetOptionWon('Clubs');
});
