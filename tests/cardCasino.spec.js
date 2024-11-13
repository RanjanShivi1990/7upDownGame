import { test , expect } from '@playwright/test';
import { CardCasinoPage } from '../pages/cardCasinoPage.js';
import testData from '../testData/testData.json';
const Assertions = require('../utils/assertions');

let cardCasinoPage , assertions;
test.beforeEach(async ({ page }) => {
    cardCasinoPage = new CardCasinoPage(page);
    assertions = new Assertions();
    await cardCasinoPage.goto();
  });

test('TC_01, Validate bet placement on Back option for Player8', async ({
    page,
    context,
  }) => {
    cardCasinoPage = new CardCasinoPage(page);
    //const page1Promise = page.waitForEvent('popup');
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await cardCasinoPage.navigateToDelearDevAndLogin(dealerDevPage);
    await cardCasinoPage.clickOnDealerCardCasinoGame(dealerDevPage);
    await dealerDevPage.reload();
    await cardCasinoPage.clickNewGame(dealerDevPage);
    await cardCasinoPage.clickOnSpecificMarket(
      'Player 8 Back'
    );
    await cardCasinoPage.validateBetAmount(cardCasinoPage, '100');
    await cardCasinoPage.waitForTimeout(
      dealerDevPage,
      parseInt(process.env.BET_TIMEOUT),
      'waiting for bet time to complete'
    );
    await cardCasinoPage.selectingCardsInLoop(dealerDevPage,testData.cardCasino.betOption.Player8Back);
    await cardCasinoPage.validatingCongratulationsMessage(cardCasinoPage);
    await cardCasinoPage.validateBetAmountForOneBetMarketAtOnce(cardCasinoPage,'100','Player 8 Back');
    await cardCasinoPage.validateTotalBetAmountForMultipleMarkets(cardCasinoPage,
      '100',
        ['Player 8 Back']
      );
  });

test('TC_02, Validate bet placement on Lay option for Player8', async ({
    page,
    context,
    }) => {
    cardCasinoPage = new CardCasinoPage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await cardCasinoPage.navigateToDelearDevAndLogin(dealerDevPage);
    await cardCasinoPage.clickOnDealerCardCasinoGame(dealerDevPage);
    await dealerDevPage.reload();
    await cardCasinoPage.clickNewGame(dealerDevPage);
    await cardCasinoPage.clickOnSpecificMarket(
      'Player 8 Lay'
      );
      await cardCasinoPage.validateBetAmountForLay(cardCasinoPage, '1270');
      await cardCasinoPage.waitForTimeout(
      dealerDevPage,
      parseInt(process.env.BET_TIMEOUT),
      'waiting for bet time to complete'
      );
    await cardCasinoPage.selectingCardsInLoop(dealerDevPage,testData.cardCasino.betOption.Player8Lay);
    await cardCasinoPage.validatingCongratulationsMessage(cardCasinoPage);
    await cardCasinoPage.validateBetAmountForOneBetMarketAtOnce(cardCasinoPage,'100','Player 8 Lay');
    await cardCasinoPage.validateTotalBetAmountForMultipleMarkets(cardCasinoPage,
      '1270',
        ['Player 8 Lay']
      );
  });

test('TC_03 10, Validate bet placement on Back option for Player9', async ({
  page,
  context,}) => {
    cardCasinoPage = new CardCasinoPage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await cardCasinoPage.navigateToDelearDevAndLogin(dealerDevPage);
    await cardCasinoPage.clickOnDealerCardCasinoGame(dealerDevPage);
    await dealerDevPage.reload();
    await cardCasinoPage.clickNewGame(dealerDevPage);
    await cardCasinoPage.clickOnSpecificMarket(
        'Player 9 Back'
        );
    await cardCasinoPage.validateBetAmount(cardCasinoPage, '100');
    await cardCasinoPage.waitForTimeout(
        dealerDevPage,
        parseInt(process.env.BET_TIMEOUT),
        'waiting for bet time to complete'
            );
    await cardCasinoPage.selectingCardsInLoop(dealerDevPage,testData.cardCasino.betOption.Player9Back);
    await cardCasinoPage.validatingCongratulationsMessage(cardCasinoPage);
    await cardCasinoPage.validateBetAmountForOneBetMarketAtOnce(cardCasinoPage,'100','Player 9 Back');
    await cardCasinoPage.validateTotalBetAmountForMultipleMarkets(cardCasinoPage,
      '100',
        ['Player 9 Back']
      );
  });
    

test('TC_04, Validate bet placement on Lay option for Player9', async ({
  page,
  context,}) => {
    cardCasinoPage = new CardCasinoPage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await cardCasinoPage.navigateToDelearDevAndLogin(dealerDevPage);
    await cardCasinoPage.clickOnDealerCardCasinoGame(dealerDevPage);
    await dealerDevPage.reload();
    await cardCasinoPage.clickNewGame(dealerDevPage);
    await cardCasinoPage.clickOnSpecificMarket(
          'Player 9 Lay'
            );
    await cardCasinoPage.validateBetAmount(cardCasinoPage, '100');
    await cardCasinoPage.waitForTimeout(
            dealerDevPage,
            parseInt(process.env.BET_TIMEOUT),
            'waiting for bet time to complete'
            );
    await cardCasinoPage.selectingCardsInLoop(dealerDevPage,testData.cardCasino.betOption.Player9Lay);
    await cardCasinoPage.validatingCongratulationsMessage(cardCasinoPage);
    await cardCasinoPage.validateBetAmountForOneBetMarketAtOnce(cardCasinoPage,'100','Player 9 Lay');
            //await cardCasinoPage.validatePlayerAndWinningPattern(dealerDevPage,'Player 8','Total=>21');
      });

test('TC_05, Validate bet placement on Back option for Player10', async ({
    page,
    context,
    }) => {
    cardCasinoPage = new CardCasinoPage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await cardCasinoPage.navigateToDelearDevAndLogin(dealerDevPage);
    await cardCasinoPage.clickOnDealerCardCasinoGame(dealerDevPage);
    await dealerDevPage.reload();
    await cardCasinoPage.clickNewGame(dealerDevPage);
    await cardCasinoPage.clickOnSpecificMarket(
        'Player 10 Back'
        );
    await cardCasinoPage.validateBetAmount(cardCasinoPage, '100');
    await cardCasinoPage.waitForTimeout(
        dealerDevPage,
        parseInt(process.env.BET_TIMEOUT),
        'waiting for bet time to complete'
        );
    await cardCasinoPage.selectingCardsInLoop(dealerDevPage,testData.cardCasino.betOption.Player10Back);
    await cardCasinoPage.validatingCongratulationsMessage(cardCasinoPage);
    await cardCasinoPage.validateBetAmountForOneBetMarketAtOnce(cardCasinoPage,'100','Player 10 Back');
    await cardCasinoPage.validateTotalBetAmountForMultipleMarkets(cardCasinoPage,
      '100',
        ['Player 10 Back']
      );
  });
  
test('TC_06, Validate bet placement on Lay option for Player10', async ({
    page,
    context,
    }) => {
    cardCasinoPage = new CardCasinoPage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await cardCasinoPage.navigateToDelearDevAndLogin(dealerDevPage);
    await cardCasinoPage.clickOnDealerCardCasinoGame(dealerDevPage);
    await dealerDevPage.reload();
    await cardCasinoPage.clickNewGame(dealerDevPage);
    await cardCasinoPage.clickOnSpecificMarket(
            'Player 10 Lay'
            );
    await cardCasinoPage.validateBetAmount(cardCasinoPage, '100');
    await cardCasinoPage.waitForTimeout(
            dealerDevPage,
            parseInt(process.env.BET_TIMEOUT),
            'waiting for bet time to complete'
            );
    await cardCasinoPage.selectingCardsInLoop(dealerDevPage,testData.cardCasino.betOption.Player10Lay);
    await cardCasinoPage.validatingCongratulationsMessage(cardCasinoPage);
    await cardCasinoPage.validateBetAmountForOneBetMarketAtOnce(cardCasinoPage,'100','Player 10 Lay');
      });


  test('TC_07, Validate bet placement on Back option for Player11', async ({
        page,
        context,
        }) => {
    cardCasinoPage = new CardCasinoPage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await cardCasinoPage.navigateToDelearDevAndLogin(dealerDevPage);
    await cardCasinoPage.clickOnDealerCardCasinoGame(dealerDevPage);
    await dealerDevPage.reload();
    await cardCasinoPage.clickNewGame(dealerDevPage);
    await cardCasinoPage.clickOnSpecificMarket(
          'Player 11 Back'
          );
    await cardCasinoPage.validateBetAmount(cardCasinoPage, '100');
    await cardCasinoPage.waitForTimeout(
          dealerDevPage,
        parseInt(process.env.BET_TIMEOUT),
        'waiting for bet time to complete'
          );
    await cardCasinoPage.selectingCardsInLoop(dealerDevPage,testData.cardCasino.betOption.Player11Back);
    await cardCasinoPage.validatingCongratulationsMessage(cardCasinoPage);
    await cardCasinoPage.validateBetAmountForOneBetMarketAtOnce(cardCasinoPage,'100','Player 11 Back');
    await cardCasinoPage.validateTotalBetAmountForMultipleMarkets(cardCasinoPage,
      '100',
        ['Player 11 Back']
      );
  });


test('TC_08, Validate bet placement on Lay option for Player11', async ({
    page,
    context,
    }) => {
    cardCasinoPage = new CardCasinoPage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await cardCasinoPage.navigateToDelearDevAndLogin(dealerDevPage);
    await cardCasinoPage.clickOnDealerCardCasinoGame(dealerDevPage);
    await dealerDevPage.reload();
    await cardCasinoPage.clickNewGame(dealerDevPage);
    await cardCasinoPage.clickOnSpecificMarket(
        'Player 11 Lay'
        );
    await cardCasinoPage.validateBetAmount(cardCasinoPage, '100');
    await cardCasinoPage.waitForTimeout(
        dealerDevPage,
        parseInt(process.env.BET_TIMEOUT),
        'waiting for bet time to complete'
        );
    await cardCasinoPage.selectingCardsInLoop(dealerDevPage,testData.cardCasino.betOption.Player11Lay);
    await cardCasinoPage.validatingCongratulationsMessage(cardCasinoPage);
    await cardCasinoPage.validateBetAmountForOneBetMarketAtOnce(cardCasinoPage,'100','Player 11 Lay')
    
        });

test('TC_09 Validate Select the Chip functionality', async ({ page , context, }) => {
    cardCasinoPage = new CardCasinoPage(page);
    await cardCasinoPage.clickNumber(100);
    await cardCasinoPage.clickBetAmount(100);
    await cardCasinoPage.expectTextInBody('100');
    await expect(await cardCasinoPage.chip100).toBeVisible();
    await cardCasinoPage.clickOnSpecificMarket(
      'Player 9 Back'
      );
    });

test('TC_11, Verify Ability to Place Multiple Bets', async ({
      page,
      context,
    }) => {
  cardCasinoPage = new CardCasinoPage(page);
  const dealerDevPagePromise = await context.newPage();
  const dealerDevPage = await dealerDevPagePromise;
  await cardCasinoPage.navigateToDelearDevAndLogin(dealerDevPage);
  await cardCasinoPage.clickOnDealerCardCasinoGame(dealerDevPage);
  await dealerDevPage.reload();
  await cardCasinoPage.clickNewGame(dealerDevPage);
  await cardCasinoPage.clickOnSpecificMarket(
        'Player 8 Back'
      );
  await cardCasinoPage.clickOnSpecificMarket(
        'Player 9 Back'
      );
  await cardCasinoPage.validateBetAmount(cardCasinoPage, '200');
  await cardCasinoPage.waitForTimeout(
        dealerDevPage,
        parseInt(process.env.BET_TIMEOUT),
        'waiting for bet time to complete'
      );
  await cardCasinoPage.selectingCardsInLoop(dealerDevPage,testData.cardCasino.betOption.Player8Back);
  await cardCasinoPage.validatingCongratulationsMessage();
  await cardCasinoPage.validateTotalBetAmountForMultipleMarkets(cardCasinoPage,
      '100',
        ['Player 8 Back']
      );
    });

test('TC_22 24 Verify double & undo button functionality for bets', async ({
  page,
  context,
}) => {
  cardCasinoPage = new CardCasinoPage(page);
  const dealerDevPagePromise = await context.newPage();
  const dealerDevPage = await dealerDevPagePromise;
  await cardCasinoPage.navigateToDelearDevAndLogin(dealerDevPage);
  await cardCasinoPage.clickOnDealerCardCasinoGame(dealerDevPage);
  await dealerDevPage.reload();
  await cardCasinoPage.clickNewGame(dealerDevPage);
  await cardCasinoPage.clickOnSpecificMarket(
    'Player 9 Back'
  );
  await cardCasinoPage.validateBetAmount(cardCasinoPage, '100');
  await cardCasinoPage.clickingOnDoubleButtonInLoop(2);
  await expect(await cardCasinoPage.player9BackMarketChipContainer('100')).not.toBeVisible();
  await expect(await cardCasinoPage.player9BackMarketChipContainer('400')).toBeVisible();
  await cardCasinoPage.clickOnUndo();
  await expect(await cardCasinoPage.player9BackMarketChipContainer('400')).not.toBeVisible();
  await expect(await cardCasinoPage.player9BackMarketChipContainer('200')).toBeVisible();
    });    

test('TC_14 15 Maximum Bet Limit Exceeded', async ({
      page,
      context,
    }) => {
  cardCasinoPage = new CardCasinoPage(page);
  
  const dealerDevPagePromise = await context.newPage();
  const dealerDevPage = await dealerDevPagePromise;
  await cardCasinoPage.navigateToDelearDevAndLogin(dealerDevPage);
  await cardCasinoPage.clickOnDealerCardCasinoGame(dealerDevPage);
  await dealerDevPage.reload();
  await cardCasinoPage.clickNewGame(dealerDevPage);
  await cardCasinoPage.validateMaximumAllowedBet();
  await cardCasinoPage.clickOnSpecificMarket(
    'Player 9 Back');
  await cardCasinoPage.waitForTimeout(
      dealerDevPage,
      parseInt(process.env.BET_TIMEOUT),
      'waiting for bet time to complete'
      );

test('TC_25 26 Verify Correct Payout for Winning Hand', async ({
  page,
  context,
  }) => {
  cardCasinoPage = new CardCasinoPage(page);
  let balanceAmountBeforeBet = await cardCasinoPage.readingBalanceAmount();
  //console.log(balanceAmount, 'balanceAmount');
  const dealerDevPagePromise = await context.newPage();
  const dealerDevPage = await dealerDevPagePromise;
  await cardCasinoPage.navigateToDelearDevAndLogin(dealerDevPage);
  await cardCasinoPage.clickOnDealerCardCasinoGame(dealerDevPage);
  await dealerDevPage.reload();
  await cardCasinoPage.clickNewGame(dealerDevPage);
  await cardCasinoPage.clickOnSpecificMarket(
    'Player 9 Back'
  );
  await cardCasinoPage.validateBetAmount(cardCasinoPage, '100');
  await cardCasinoPage.waitForTimeout(
    dealerDevPage,
    parseInt(process.env.BET_TIMEOUT),
    'waiting for bet time to complete'
  );
  let balanceAmountAfterBetting = await cardCasinoPage.readingBalanceAmount();
  //console.log(balanceAmountAfterBetting, 'balanceAmountAfterBetting');
  await expect(balanceAmount - 100).toBe(parseFloat(balanceAmountAfterBetting));
  await cardCasinoPage.selectingCardsInLoop(dealerDevPage,testData.cardCasino.betOption.Player9Back);
  await cardCasinoPage.validatingCongratulationsMessage();
  let balanceAmountAfterWinning = await cardCasinoPage.readingBalanceAmount();
  console.log(balanceAmountAfterWinning, 'balanceAmountAfterWinning');
  let lastWinAmount = 100 * 5.95;
  console.log(
    parseFloat(balanceAmountAfterBetting) + parseFloat(lastWinAmount)
  );
  await expect(parseFloat(balanceAmountAfterWinning)).toBe(
      parseFloat(balanceAmountAfterBetting) + parseFloat(winningAmount)
  );
  });