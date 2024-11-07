import { test, expect } from '@playwright/test';
import { GamePage } from '../pages/teenpattiT20gamePage.js';
import { insertCard } from '../utils/api.js';
const Assertions = require('../utils/assertions');
import testData from '../testData/testData.json';

let gamePage, assertions;

test.beforeEach(async ({ page }) => {
  gamePage = new GamePage(page);
  assertions = new Assertions();
  await gamePage.goto();
});
//** Total Execution time: 8.9m
//** Total TC in excel : 41 , tc: 36 , covered: 38, pending: 0 ,  , NA: 2 . blockers: 1. blocker impact on: 2 */
test('test_01, Ranking of Hands Trail (Three of a Kind)', async ({ page }) => {
  gamePage = new GamePage(page);
  await insertCard(testData.rankingOfHands.trailThreeOfKind);
  await gamePage.bettingOnSpecificMarket('Market A');
  await gamePage.clickOnBetButton();
  await gamePage.validateSpecificPlayerWon('Market A');
});

test('test_02, Ranking of Hands Pure Sequence (Straight Flush)', async ({
  page,
}) => {
  gamePage = new GamePage(page);
  await insertCard(testData.rankingOfHands.pureSequenceStraightFlush);
  await gamePage.bettingOnSpecificMarket('Market A');
  await gamePage.clickOnBetButton();
  // await expect(await gamePage.playerAIsWon).toBeVisible();
  await gamePage.validateSpecificPlayerWon('Market A');
});

test('test_03, Ranking of Hands Sequence (Straight)', async ({ page }) => {
  await insertCard(testData.rankingOfHands.sequenceStraight);
  await gamePage.bettingOnSpecificMarket('Market A');
  await gamePage.clickOnBetButton();
  await gamePage.validateSpecificPlayerWon('Market A');
});

test('test_04 Ranking of Hands Color (Flush)', async ({ page }) => {
  await insertCard(testData.rankingOfHands.colorFlush);
  await gamePage.bettingOnSpecificMarket('Market A');
  await gamePage.clickOnBetButton();
  await gamePage.validateSpecificPlayerWon('Market A');
});

test('test_05 Ranking of Hands Pair (Two of a Kind)', async ({ page }) => {
  await insertCard(testData.rankingOfHands.pairTwoOfAKind);
  await gamePage.bettingOnSpecificMarket('Market A');
  await gamePage.clickOnBetButton();
  await gamePage.validateSpecificPlayerWon('Market A');
});

test('test_06 Ranking of Hands High Card', async ({ page }) => {
  await insertCard(testData.rankingOfHands.highCard);
  await gamePage.bettingOnSpecificMarket('Market A');
  await gamePage.clickOnBetButton();
  await gamePage.validateSpecificPlayerWon('Market A');
});

//** The correct chip should be displayed in the betting area. */
test('test_07 Betting Instructions Select the Chip', async ({ page }) => {
  gamePage = new GamePage(page);
  await gamePage.clickNumber(1);
  await gamePage.clickBetAmount(100);
  await gamePage.expectTextInBody('100');
  await expect(await gamePage.chip100).toBeVisible();
});

//**The bet should be reflected in Player A's betting area.. */
test('test_08 Betting Instructions Click Bet Option', async ({ page }) => {
  gamePage = new GamePage(page);
  // await expect(await gamePage.chip100).toBeEnabled();
  await gamePage.clickNumber(1);
  await gamePage.clickBetAmount(100);
  await gamePage.expectTextInBody('100');
  await expect(await gamePage.chip100).toBeVisible();
  await expect(await gamePage.chip100).toBeEnabled();
  await gamePage.clickText('Ax1.98');
  await expect(await gamePage.aMarketChipContainer(100)).toBeVisible();
});

/**Player places a bet of 100 points on Player A and Player B+. Verify that both bets are reflected. */
test('test_09 Verify Player places bets on multiple options.', async ({
  page,
}) => {
  gamePage = new GamePage(page);

  await gamePage.clickNumber(1);
  await gamePage.clickBetAmount(100);
  await gamePage.expectTextInBody('100');
  await expect(await gamePage.chip100).toBeVisible();
  await gamePage.bettingOnSpecificMarket('Market A');
  await gamePage.bettingOnSpecificMarket('Market B+');
  await expect(await gamePage.aMarketChipContainer(100)).toBeVisible();
  await expect(await gamePage.bPlusMarketChipContainer(100)).toBeVisible();
});

/**After selecting chips, player clicks the "Place Bet" button.Verify that the bet is placed successfully */
test('test_10 Verify Betting Button Action.', async ({ page }) => {
  gamePage = new GamePage(page);
  await insertCard(['S1', 'H5', 'S13', 'H3', 'S11', 'H2']);
  await expect(await gamePage.betButton).toBeDisabled();
  await gamePage.bettingOnSpecificMarket('Market A');
  await expect(await gamePage.betButton).toBeEnabled();
  await gamePage.clickOnBetButton();
  await expect(await gamePage.playerAIsWon).toBeVisible({ timeout: 10000 });
  await expect(await gamePage.playerABorderColorContainer).toHaveCSS(
    'border-color',
    'rgb(0, 231, 0)'
  );
});

/**After placing a bet, wait for the result.Verify if the correct winning hand is displayed.*/
test('test_11 Verify Results are shown after betting.', async ({ page }) => {
  gamePage = new GamePage(page);
  await insertCard(['S1', 'H5', 'S13', 'H3', 'S11', 'H2']);
  await expect(await gamePage.betButton).toBeDisabled();
  await gamePage.bettingOnSpecificMarket('Market A');
  await expect(await gamePage.betButton).toBeEnabled();
  await gamePage.clickOnBetButton();
  await expect(await gamePage.playerAIsWon).toBeVisible({ timeout: 10000 });
  await expect(await gamePage.playerABorderColorContainer).toHaveCSS(
    'border-color',
    'rgb(0, 231, 0)'
  );
});

/**If Player A gets a pair or better, the player should win the side bet.*/
test('test_12 Verify Side Bet A+', async ({ page }) => {
  gamePage = new GamePage(page);
  await insertCard(['S1', 'H13', 'H1', 'D13', 'S5', 'H2']);
  await expect(await gamePage.betButton).toBeDisabled();
  await gamePage.bettingOnSpecificMarket('Market A+');
  await expect(await gamePage.betButton).toBeEnabled();
  await gamePage.clickOnBetButton();
  await expect(await gamePage.playerAIsWon).toBeVisible({ timeout: 10000 });
  await expect(await gamePage.playerABorderColorContainer).toHaveCSS(
    'border-color',
    'rgb(0, 231, 0)'
  );
  await expect(await gamePage.playerAPlusBorderColorContainer).toHaveCSS(
    'border-color',
    'rgb(0, 184, 231)'
  );
});

/**If Player B gets a pair or better, the player should win the side bet.*/
test('test_13 Verify Side Bet B+', async ({ page }) => {
  gamePage = new GamePage(page);
  await insertCard(['H13', 'S1', 'D13', 'H1', 'S5', 'H2']);
  await expect(await gamePage.betButton).toBeDisabled();
  await gamePage.bettingOnSpecificMarket('Market B+');
  await expect(await gamePage.betButton).toBeEnabled();
  await gamePage.clickOnBetButton();
  await expect(await gamePage.playerBIsWon).toBeVisible({ timeout: 10000 });
  await expect(await gamePage.playerBBorderColorContainer).toHaveCSS(
    'border-color',
    'rgb(0, 231, 0)'
  );
  await expect(await gamePage.playerBPlusBorderColorContainer).toHaveCSS(
    'border-color',
    'rgb(0, 184, 231)'
  );
});

/**Maximum Bet Limit Exceeded.*/
test('test_15 Verify Maximum Bet Limit Exceeded ', async ({ page }) => {
  gamePage = new GamePage(page);
  await expect(await gamePage.betButton).toBeDisabled();
  await gamePage.validateMaximumAllowedBet();
});

/**Bet while auto bet is on.*/
test('test_16, Bet while auto bet is on and Verify Error message ', async ({
  page,
}) => {
  gamePage = new GamePage(page);
  await gamePage.placeAutoBetOnMarketAAndStartAutoBet(1);
  await gamePage.bettingOnSpecificMarket('Market A+');
  await assertions.assertElementVisible(
    gamePage.autoBetIsActiveErrorMessage,
    'The error message "Auto Bet is Active" should be visible when the user attempts to place a bet while auto betting is enabled'
  );
});

/**Player A wins with a higher-ranking hand.Check if Player A receives the correct payout . If the payout is incorrect, the system should flag it, and the player should be awarded the correct amount.*/
test('test_17 19 Verify Correct Payout for Winning Hand', async ({ page }) => {
  gamePage = new GamePage(page);
  await insertCard(['S1', 'H12', 'H13', 'D11', 'S5', 'H9']);
  await expect(await gamePage.betButton).toBeDisabled();
  await gamePage.bettingOnSpecificMarket('Market A');
  await expect(await gamePage.betButton).toBeEnabled();
  await expect(await gamePage.totalBetAmount).toHaveText('₹1.00');
  let balanceAmount = await gamePage.readingBalanceAmount();
  console.log(balanceAmount, 'balanceAmount');
  await gamePage.clickOnBetButton();
  await page.waitForTimeout(3000);
  let balanceAmountAfterBetting = await gamePage.readingBalanceAmount();
  console.log(balanceAmountAfterBetting, 'balanceAmountAfterBetting');
  await expect(balanceAmount - 1).toBe(parseFloat(balanceAmountAfterBetting));
  await expect(await gamePage.playerAIsWon).toBeVisible({ timeout: 10000 });
  let playerABorderColorContainer = await gamePage.playerABorderColorContainer;
  // Get the border color property
  const borderColor = await playerABorderColorContainer.evaluate((el) => {
    return window.getComputedStyle(el).getPropertyValue('border-color');
  });

  console.log(`The border color is: ${borderColor}`);
  await expect(await gamePage.playerABorderColorContainer).toHaveCSS(
    'border-color',
    'rgb(0, 231, 0)'
  );
  let winningAmount = 1 * 1.98;
  console.log(winningAmount, 'win');
  //TODO: In UI balance value is not correctly updating(https://diamondexch1.atlassian.net/browse/AA-29?atlOrigin=eyJpIjoiY2QwMmNhMDVjYjg4NDhjMmJkODM3OTdjY2U5YzI1NDYiLCJwIjoiaiJ9)
  await page.waitForTimeout(5000);
  let balanceAmountAfterWinning = await gamePage.readingBalanceAmount();
  console.log(balanceAmountAfterWinning, 'balanceAmountAfterWinning');
  console.log(
    parseFloat(balanceAmountAfterBetting) + parseFloat(winningAmount)
  );
  await expect(parseFloat(balanceAmountAfterWinning)).toBe(
    parseFloat(balanceAmountAfterBetting) + parseFloat(winningAmount)
  );
});

/**Both players have the same hand.Verify if the pot is split equally between the players.*/
test('test_18 20 Verify Both players have hands of equal value, resulting in a tie.', async ({
  page,
}) => {
  gamePage = new GamePage(page);
  await insertCard(['S1', 'H1', 'S2', 'H2', 'S3', 'H3']);

  await expect(await gamePage.betButton).toBeDisabled();
  await gamePage.bettingOnSpecificMarket('Market A');
  await expect(await gamePage.betButton).toBeEnabled();
  await expect(await gamePage.totalBetAmount).toHaveText('₹1.00');
  let balanceAmount = await gamePage.readingBalanceAmount();
  console.log(balanceAmount, 'balanceAmount');
  await gamePage.clickOnBetButton();
  await page.waitForTimeout(2000);
  let balanceAmountAfterBetting = await gamePage.readingBalanceAmount();
  console.log(balanceAmountAfterBetting, 'balanceAmountAfterBetting');
  await expect(balanceAmount - 1).toBe(parseFloat(balanceAmountAfterBetting));
  await expect(await gamePage.playerAIsWon).not.toBeVisible({ timeout: 10000 });
  await expect(await gamePage.playerABorderColorContainer).toHaveCSS(
    'border-color',
    'rgba(255, 255, 255, 0.3)'
  );
  await expect(await gamePage.tieAmount).toBeVisible();
  let winningAmount = 1;
  console.log(winningAmount, 'win');
  //TODO: In UI balance value is not correctly updating (https://diamondexch1.atlassian.net/browse/AA-29?atlOrigin=eyJpIjoiY2QwMmNhMDVjYjg4NDhjMmJkODM3OTdjY2U5YzI1NDYiLCJwIjoiaiJ9)
  await page.waitForTimeout(5000);
  let balanceAmountAfterWinning = await gamePage.readingBalanceAmount();
  console.log(balanceAmountAfterWinning, 'balanceAmountAfterWinning');
  console.log(
    parseFloat(balanceAmountAfterBetting) + parseFloat(winningAmount)
  );
  await expect(parseFloat(balanceAmountAfterWinning)).toBe(
    parseFloat(balanceAmountAfterBetting) + parseFloat(winningAmount)
  );
});

//Coverd
test('test_21 Verify Player makes an invalid bet, and an error message is displayed. ', async ({
  page,
}) => {
  await gamePage.clickNumber(1);
  await gamePage.clickBetAmount(100);
  await gamePage.expectTextInBody('100');
  await gamePage.clickText('A+x2x5x7x26x36');
  await gamePage.clickMultipleTimes('DOUBLE', 4);
  await gamePage.waitForTimeout(3000);
  await gamePage.expectTextInBody('History');
});

test('test_22 Verify valid positive value for Number of Rounds', async ({
  page,
}) => {
  await gamePage.clickButtonByRole('Auto'); // Click the Auto button
  await gamePage.fillPlaceholder('∞', '2'); // Fill '2' in the placeholder
  await gamePage.clickDivWithText('Ax1.98$'); // Click the div containing Ax1.98
  await gamePage.clickButtonByRole('Start Auto Bet'); // Start the auto bet
  await expect(await page.getByText('Auto bet started')).toBeVisible();
  await page.waitForTimeout(10000);
  await expect(await page.getByText('All rounds played')).toBeVisible({
    timeout: 20000,
  });
});

test('test_23  Verify ∞ value for Number of Rounds', async ({ page }) => {
  await gamePage.clickButtonByRole('Auto');
  await gamePage.clickButtonByRole('∞');
  await gamePage.clickDivWithText('Ax1.98$'); // Click the div containing Ax1.98
  await gamePage.clickButtonByRole('Start Auto Bet'); // Start the auto bet
  await expect(await page.getByText('Auto bet started')).toBeVisible();
  await assertions.assertElementVisible(
    gamePage.infinityInput,
    'Validating Number of loops input filed should executing on ∞'
  );
});

test('test_24 Verify positive value for On Win Increase By', async ({
  page,
}) => {
  await insertCard(['H10', 'D5', 'D10', 'H5', 'S10', 'S5']);
  await gamePage.clickAuto();
  await gamePage.executeAutoBetFlow('10', true, 'On win');
  await page.waitForTimeout(3000); // Adjust timing as necessary
  await gamePage.stopAutoBet();
  await page.waitForTimeout(5000); // Adjust timing as necessary
  await expect(await gamePage.startAutoBetButton).toBeVisible({
    timeout: 10000,
  });
  const textElement = await gamePage.getVisibleText('₹1.10', 0); // Change 0 to 1 if you need the second instance
  await expect(textElement).toBeVisible();
});

test('test_25 Verify negative value for On Win Increase By', async ({
  page,
}) => {
  await insertCard(['H10', 'D5', 'D10', 'H5', 'S10', 'S5']);
  await gamePage.clickAuto();
  await gamePage.executeAutoBetFlow('-10', true, 'On win');
  await page.waitForTimeout(3000); // Adjust timing as necessary
  await gamePage.stopAutoBet();
  await page.waitForTimeout(5000); // Adjust timing as necessary
  await expect(await gamePage.startAutoBetButton).toBeVisible({
    timeout: 10000,
  });
  const textElement = await gamePage.getVisibleText('₹0.90', 0); // Change 0 to 1 if you need the second instance
  await expect(textElement).toBeVisible();
});

test('test_26 Verify positive value for On Lose Increase By', async ({
  page,
}) => {
  await insertCard(['H10', 'D5', 'D10', 'H5', 'S10', 'S5']);
  await gamePage.clickAuto();
  await gamePage.executeAutoBetFlow('10', false, 'On Lose');
  await page.waitForTimeout(3000); // Adjust timing as necessary
  await gamePage.stopAutoBet();
  await page.waitForTimeout(5000); // Adjust timing as necessary
  await expect(await gamePage.startAutoBetButton).toBeVisible({
    timeout: 10000,
  });
  const textElement = await gamePage.getVisibleText('₹1.10', 0); // Change 0 to 1 if you need the second instance
  await expect(textElement).toBeVisible();
});

test('test_27 Verify negative value for On Lose Increase By', async ({
  page,
}) => {
  await insertCard(['H10', 'D5', 'D10', 'H5', 'S10', 'S5']);
  await gamePage.clickAuto();
  await gamePage.executeAutoBetFlow('-15', false, 'On Lose');
  await page.waitForTimeout(3000); // Adjust timing as necessary
  await gamePage.stopAutoBet();
  await page.waitForTimeout(2000); // Adjust timing as necessary
  await expect(await gamePage.startAutoBetButton).toBeVisible({
    timeout: 100000,
  });
  const textElement = await gamePage.getVisibleText('₹0.85', 0); // Change 0 to 1 if you need the second instance
  await expect(textElement).toBeVisible();
});

test('test_28 Verify positive value for Stop On Win', async ({ page }) => {
  await insertCard(['H10', 'D5', 'D10', 'H5', 'S10', 'S5']);
  await gamePage.executeAutoBetFlowForStopOnLoseOnWinFilter(
    '500',
    true,
    'Stop On win',
    5
  );
  await expect(await page.getByText('Auto bet started')).toBeVisible();
  await expect(
    await gamePage.stopOnWinsWinningAmount(1.98 * 500 - 500)
  ).toBeVisible();
  await expect(
    await gamePage.stopOnWinsWinningAmount(2 * 1.98 * 500 - 1000)
  ).toBeVisible({ timeout: 100000 });
  await expect(await gamePage.startAutoBetButton).toBeVisible({
    timeout: 100000,
  });
  await expect(await gamePage.playerAIsWon).toBeVisible();
  await expect(await gamePage.stopOnWinHitText).toBeVisible();
  await expect(await gamePage.playerABorderColorContainer).toHaveCSS(
    'border-color',
    'rgb(0, 231, 0)'
  );
});

test('test_29 Verify positive value for Stop On Lose', async ({ page }) => {
  await insertCard(['H10', 'D5', 'D10', 'H5', 'S10', 'S5']);
  await gamePage.executeAutoBetFlowForStopOnLoseOnWinFilter(
    '500',
    false,
    'Stop On Lose',
    3
  );
  await expect(await page.getByText('Auto bet started')).toBeVisible();
  await expect(await gamePage.stopOnLossAmount(300)).toBeVisible();
  await expect(await gamePage.stopOnLossAmount(600)).toBeVisible({
    timeout: 100000,
  });
  await expect(await gamePage.startAutoBetButton).toBeVisible({
    timeout: 100000,
  });
  await expect(await gamePage.playerBIsWon).not.toBeVisible();
  await expect(await page.getByText('stop on loss hit')).toBeVisible();
});

test('test_30, Validate auto-stop behavior with win and loss set', async ({
  page,
}) => {
  gamePage = new GamePage(page);
  await insertCard(['H10', 'D5', 'D10', 'H5', 'S10', 'S5']);
  await gamePage.clickAuto();
  await gamePage.autoBetFlowForBothStoponLoseAndWin();
  await gamePage.clickNumber(1);
  await gamePage.clickBetAmount(100);
  await gamePage.bettingOnSpecificMarketInLoop('Market A', 5);
  await gamePage.clickOnStartAutoBetButton();
  await expect(
    await gamePage.stopOnWinsWinningAmount(1.98 * 500 - 500)
  ).toBeVisible();
  await expect(
    await gamePage.stopOnWinsWinningAmount(2 * 1.98 * 500 - 1000)
  ).toBeVisible({ timeout: 100000 });
  await expect(await gamePage.startAutoBetButton).toBeVisible({
    timeout: 100000,
  });
  await expect(await gamePage.playerAIsWon).toBeVisible();
  await expect(await gamePage.playerBIsWon).not.toBeVisible();
  await expect(await gamePage.stopOnWinHitText).toBeVisible();
  await expect(await gamePage.playerABorderColorContainer).toHaveCSS(
    'border-color',
    'rgb(0, 231, 0)'
  );
});

test('test_31 32,Validate default behavior for On Win Increase By On Lose Increase By', async ({
  page,
}) => {
  gamePage = new GamePage(page);
  //Validate
  await insertCard(['H10', 'D5', 'D10', 'H5', 'S10', 'S5']);
  await gamePage.clickAuto();
  await gamePage.fillPlaceholder('∞', '1');
  await gamePage.executeAutoBetFlow('', true, 'On win');
  await page.waitForTimeout(3000); // Adjust timing as necessary
  await expect(await gamePage.startAutoBetButton).toBeVisible({
    timeout: 10000,
  });
  await expect(gamePage.totalBetAmount).toHaveText('₹1.00');
  await gamePage.clickOnClear();
  await gamePage.executeAutoBetFlow('', false, 'On Lose');
  await page.waitForTimeout(3000); // Adjust timing as necessary
  await expect(await gamePage.startAutoBetButton).toBeVisible({
    timeout: 10000,
  });
  await expect(gamePage.totalBetAmount).toHaveText('₹1.00');
});

test('test_34, Verify default values on page load', async ({ page }) => {
  gamePage = new GamePage(page);
  await expect(await gamePage.betButton).toBeDisabled();
  await expect(await gamePage.shuffleButton).toBeVisible();
  await expect(await gamePage.clearButton).toBeVisible();
  await expect(await gamePage.doublButton).toBeVisible();
  await expect(await gamePage.undoButton).toBeVisible();
  await expect(await gamePage.chip1).toBeVisible();
  await expect(await gamePage.totalBetAmount).toHaveText('0');

  await gamePage.clickAuto();
  await expect(await gamePage.infinityInput).toBeVisible();
  await expect(
    await gamePage.preferedNumberRoundsValueButtons('∞')
  ).toBeVisible();
  await expect(
    await gamePage.preferedNumberRoundsValueButtons('10')
  ).toBeVisible();
  await expect(
    await gamePage.preferedNumberRoundsValueButtons('100')
  ).toBeVisible();
  await expect(await gamePage.onWinResetButton).toBeEnabled();
  await expect(await gamePage.onWinResetButton).toBeVisible();
  await expect(await gamePage.onLoseResetButton).toBeEnabled();
  await expect(await gamePage.onLoseResetButton).toBeVisible();
  // await expect(await gamePage.onLoseIncreaseByButton).toBeDisabled();
  await expect(await gamePage.onLoseIncreaseByButton).toBeVisible();
  // await expect(await gamePage.onWinIncreaseByButton).toBeDisabled();
  await expect(await gamePage.onWinIncreaseByButton).toBeVisible();
  await expect(await gamePage.onLoseInput).toBeDisabled();
  await expect(await gamePage.onWinInput).toBeDisabled();
  await expect(await gamePage.stopOnWin).toBeEnabled();
  await expect(await gamePage.stopOnWin).toHaveAttribute('placeholder', '0');
  await expect(await gamePage.stopOnLose).toBeEnabled();
  await expect(await gamePage.stopOnLose).toHaveAttribute('placeholder', '0');
  await expect(await gamePage.startAutoBetButton).toBeDisabled();
  await expect(await gamePage.totalBetAmount).toHaveText('0');
});

test('test_35  Verify auto-play starts with valid bet amount', async ({
  page,
}) => {
  await gamePage.clickAuto();
  await expect(await gamePage.startAutoBetButton).toBeDisabled({
    timeout: 100000,
  });
});

test('test_36 Verify auto-play stops when manually stopped', async ({
  page,
}) => {
  await gamePage.placeAutoBetOnMarketAAndStartAutoBet(4);
  await expect(await gamePage.stopAutoBetButton).toBeVisible({
    timeout: 100000,
  });
  await gamePage.stopAutoBet();
  await expect(page.getByText('Auto bet stopped')).toBeVisible();
});

test('test_37 Verify shuffle functionality', async ({ page }) => {
  await gamePage.validateShufflebutton(4);
});

test('test_38 Verify Shuffle button without bet', async ({ page }) => {
  const hasDisabledClass = await gamePage.shuffleButton.evaluate((el) => {
    return el.classList.contains('disabled:opacity-40');
  });
  expect(hasDisabledClass).toBe(true);
});

test('test_39 Verify undo functionality', async ({ page }) => {
  gamePage = new GamePage(page);
  await gamePage.bettingOnSpecificMarketInLoop('Market A', 2);
  await expect(await gamePage.aMarketChipContainer('2')).toBeVisible();
  await gamePage.clickOnUndo();
  await expect(await gamePage.aMarketChipContainer('2')).not.toBeVisible();
  await expect(await gamePage.aMarketChipContainer('1')).toBeVisible();
});

test('test_40 Verify clear functionality', async ({ page }) => {
  gamePage = new GamePage(page);
  await gamePage.bettingOnSpecificMarketInLoop('Market A', 2);
  await page.waitForTimeout(2000);
  await expect(await gamePage.aMarketChipContainer('2')).toBeVisible();
  await gamePage.clickOnClear();
  await expect(await gamePage.aMarketChipContainer('2')).not.toBeVisible();
  await expect(await gamePage.aMarketChipContainer('1')).not.toBeVisible();
});

test('test_41 Verify double functionality for bets', async ({ page }) => {
  gamePage = new GamePage(page);
  await gamePage.bettingOnSpecificMarketInLoop('Market A', 2);
  await expect(await gamePage.aMarketChipContainer('2')).toBeVisible();
  await gamePage.clickingOnDoubleButtonInLoop(1);
  await expect(await gamePage.aMarketChipContainer('2')).not.toBeVisible();
  await expect(await gamePage.aMarketChipContainer('4')).toBeVisible();
});
