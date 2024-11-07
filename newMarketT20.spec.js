import { test, expect } from '@playwright/test';
import { NewMarketT20Page } from '../pages/t20NewMarketPage.js';
import testData from '../testData/testData.json';

let newMarketT20Page;
test.beforeEach(async ({ page }) => {
  newMarketT20Page = new NewMarketT20Page(page);
  await newMarketT20Page.navigateToAuroLobby();
});

//TODO: Should validate Total Balance before betting , after betting , after win
//** Player A receives all Red cards (Hearts/Diamonds) and player wins A with Color Pattern and A+ with all Red cards */
test('test_01, Color Market: Bet on All A Red Market getting all Red cards', async ({
  page,
  context,
}) => {
  newMarketT20Page = new NewMarketT20Page(page);
  const page1Promise = page.waitForEvent('popup');
  await newMarketT20Page.clickOnDemoLobbyButton();
  const newMarketT20GamePage = await page1Promise;
  await newMarketT20Page.selectingTeenpattiGameAndClickOnPlayNowButton(
    newMarketT20GamePage
  );
  const dealerDevPagePromise = await context.newPage();
  const dealerDevPage = await dealerDevPagePromise;
  await newMarketT20Page.navigateToDelearDevAndLogin(dealerDevPage);
  await newMarketT20Page.clickOnDealerTeenPattiT20Game(dealerDevPage);
  await dealerDevPage.reload();
  await newMarketT20Page.clickNewGame(dealerDevPage);
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'All A Red'
  );
  await newMarketT20Page.validateBetAmount(newMarketT20GamePage, '100');
  await newMarketT20Page.waitForTimeout(
    dealerDevPage,
    parseInt(process.env.BET_TIMEOUT),
    'waiting for bet time to complete'
  );
  await newMarketT20Page.selectingCardsInLoop(
    dealerDevPage,
    testData.newMarket.colorMarket.AllARedMarket
  );
  await newMarketT20Page.validatingCongratulationsMessage(newMarketT20GamePage);
  await newMarketT20Page.validateBetAmountForOneBetMarketAtOnce(
    newMarketT20GamePage,
    '100',
    'All A Red'
  );
  await newMarketT20Page.validatePlayerAndWinningPattern(
    dealerDevPage,
    'Player A',
    'COLOR'
  );
});

//** Player B receives all Red cards (Hearts/Diamonds) and player wins B with Color Pattern and B+ with all Red cards  */
test('test_02, Color Market: Bet on All A Red Market getting all Red cards', async ({
  page,
  context,
}) => {
  newMarketT20Page = new NewMarketT20Page(page);
  const page1Promise = page.waitForEvent('popup');
  await newMarketT20Page.clickOnDemoLobbyButton();
  const newMarketT20GamePage = await page1Promise;
  await newMarketT20Page.selectingTeenpattiGameAndClickOnPlayNowButton(
    newMarketT20GamePage
  );
  const dealerDevPagePromise = await context.newPage();
  const dealerDevPage = await dealerDevPagePromise;
  await newMarketT20Page.navigateToDelearDevAndLogin(dealerDevPage);
  await newMarketT20Page.clickOnDealerTeenPattiT20Game(dealerDevPage);
  await dealerDevPage.reload();
  await newMarketT20Page.clickNewGame(dealerDevPage);
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'All B Red'
  );
  await newMarketT20Page.validateBetAmount(newMarketT20GamePage, '100');
  await newMarketT20Page.waitForTimeout(
    dealerDevPage,
    parseInt(process.env.BET_TIMEOUT),
    'waiting for bet time to complete'
  );
  await newMarketT20Page.selectingCardsInLoop(
    dealerDevPage,
    testData.newMarket.colorMarket.AllBRedMarket
  );
  await newMarketT20Page.validatingCongratulationsMessage(newMarketT20GamePage);
  await newMarketT20Page.validateBetAmountForOneBetMarketAtOnce(
    newMarketT20GamePage,
    '100',
    'All B Red'
  );
  await newMarketT20Page.validatePlayerAndWinningPattern(
    dealerDevPage,
    'Player B',
    'COLOR'
  );
});

//** Player A receives all Black cards (Spades/Clubs) and player wins A with high card and A+ with all Black cards  */
test('test_03, Color Market: Bet on All A Black Market getting all Black cards', async ({
  page,
  context,
}) => {
  newMarketT20Page = new NewMarketT20Page(page);
  const page1Promise = page.waitForEvent('popup');
  await newMarketT20Page.clickOnDemoLobbyButton();
  const newMarketT20GamePage = await page1Promise;
  await newMarketT20Page.selectingTeenpattiGameAndClickOnPlayNowButton(
    newMarketT20GamePage
  );
  const dealerDevPagePromise = await context.newPage();
  const dealerDevPage = await dealerDevPagePromise;
  await newMarketT20Page.navigateToDelearDevAndLogin(dealerDevPage);
  await newMarketT20Page.clickOnDealerTeenPattiT20Game(dealerDevPage);
  await dealerDevPage.reload();
  await newMarketT20Page.clickNewGame(dealerDevPage);
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'All A Black'
  );
  await newMarketT20Page.validateBetAmount(newMarketT20GamePage, '100');
  await newMarketT20Page.waitForTimeout(
    dealerDevPage,
    parseInt(process.env.BET_TIMEOUT),
    'waiting for bet time to complete'
  );
  await newMarketT20Page.selectingCardsInLoop(
    dealerDevPage,
    testData.newMarket.colorMarket.AllBlackPlayerA
  );
  await newMarketT20Page.validatingCongratulationsMessage(newMarketT20GamePage);
  await newMarketT20Page.validateBetAmountForOneBetMarketAtOnce(
    newMarketT20GamePage,
    '100',
    'All A Black'
  );
  await newMarketT20Page.validatePlayerAndWinningPattern(
    dealerDevPage,
    'Player A',
    'COLOR'
  );
});

//** Player B receives all Black cards (Spades/Clubs) and player wins B with high card and B+ with all Black cards  */
test('test_04, Color Market: Bet on All B Black Market getting all Black cards', async ({
  page,
  context,
}) => {
  newMarketT20Page = new NewMarketT20Page(page);
  const page1Promise = page.waitForEvent('popup');
  await newMarketT20Page.clickOnDemoLobbyButton();
  const newMarketT20GamePage = await page1Promise;
  await newMarketT20Page.selectingTeenpattiGameAndClickOnPlayNowButton(
    newMarketT20GamePage
  );
  const dealerDevPagePromise = await context.newPage();
  const dealerDevPage = await dealerDevPagePromise;
  await newMarketT20Page.navigateToDelearDevAndLogin(dealerDevPage);
  await newMarketT20Page.clickOnDealerTeenPattiT20Game(dealerDevPage);
  await dealerDevPage.reload();
  await newMarketT20Page.clickNewGame(dealerDevPage);
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'All B Black'
  );
  await newMarketT20Page.validateBetAmount(newMarketT20GamePage, '100');
  await newMarketT20Page.waitForTimeout(
    dealerDevPage,
    parseInt(process.env.BET_TIMEOUT),
    'waiting for bet time to complete'
  );
  await newMarketT20Page.selectingCardsInLoop(
    dealerDevPage,
    testData.newMarket.colorMarket.AllBlackPlayerB
  );
  await newMarketT20Page.validatingCongratulationsMessage(newMarketT20GamePage);
  await newMarketT20Page.validateBetAmountForOneBetMarketAtOnce(
    newMarketT20GamePage,
    '100',
    'All B Black'
  );
  await newMarketT20Page.validatePlayerAndWinningPattern(
    dealerDevPage,
    'Player B',
    'COLOR'
  );
});

//** Both Player A and Player B receive all Red cards and both players wins  with Draw message  */
test('test_05, Color Market: Bet on both Player A and Player B getting Red cards', async ({
  page,
  context,
}) => {
  newMarketT20Page = new NewMarketT20Page(page);
  const page1Promise = page.waitForEvent('popup');
  await newMarketT20Page.clickOnDemoLobbyButton();
  const newMarketT20GamePage = await page1Promise;
  await newMarketT20Page.selectingTeenpattiGameAndClickOnPlayNowButton(
    newMarketT20GamePage
  );
  const dealerDevPagePromise = await context.newPage();
  const dealerDevPage = await dealerDevPagePromise;
  await newMarketT20Page.navigateToDelearDevAndLogin(dealerDevPage);
  await newMarketT20Page.clickOnDealerTeenPattiT20Game(dealerDevPage);
  await dealerDevPage.reload();
  await newMarketT20Page.clickNewGame(dealerDevPage);
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'All A Red'
  );
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'All B Red'
  );
  await newMarketT20Page.validateBetAmount(newMarketT20GamePage, '200');
  await newMarketT20Page.waitForTimeout(
    dealerDevPage,
    parseInt(process.env.BET_TIMEOUT),
    'waiting for bet time to complete'
  );
  await newMarketT20Page.selectingCardsInLoop(
    dealerDevPage,
    testData.newMarket.colorMarket.BothAAndBRed
  );
  await newMarketT20Page.validatingCongratulationsMessage(newMarketT20GamePage);
  await newMarketT20Page.validateTotalBetAmountForMultipleMarkets(
    newMarketT20GamePage,
    '100',
    ['All A Red', 'All B Red']
  );
  await newMarketT20Page.validatePlayerAndWinningPattern(
    dealerDevPage,
    'both',
    ''
  );
  let betamount = 100;
  let winAmount = betamount * 1.98 * 2;

  await expect(
    await newMarketT20GamePage.locator(
      `//span[text()='Last Win']//span[contains(text(),'₹${parseFloat(
        winAmount
      )}')]`
    )
  ).toBeVisible;
  // await expect(await newMarketT20Page.drawMessage(dealerDevPage)).toBeVisible();
});

//** Both Player A and Player B receive all Black cards and both players wins  with Draw message  */
test('test_06, Color Market: Bet on both Player A and Player B getting Black cards', async ({
  page,
  context,
}) => {
  newMarketT20Page = new NewMarketT20Page(page);
  const page1Promise = page.waitForEvent('popup');
  await newMarketT20Page.clickOnDemoLobbyButton();
  const newMarketT20GamePage = await page1Promise;
  await newMarketT20Page.selectingTeenpattiGameAndClickOnPlayNowButton(
    newMarketT20GamePage
  );
  const dealerDevPagePromise = await context.newPage();
  const dealerDevPage = await dealerDevPagePromise;
  await newMarketT20Page.navigateToDelearDevAndLogin(dealerDevPage);
  await newMarketT20Page.clickOnDealerTeenPattiT20Game(dealerDevPage);
  await dealerDevPage.reload();
  await newMarketT20Page.clickNewGame(dealerDevPage);
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'All A Black'
  );
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'All B Black'
  );
  await newMarketT20Page.validateBetAmount(newMarketT20GamePage, '200');
  await newMarketT20Page.waitForTimeout(
    dealerDevPage,
    parseInt(process.env.BET_TIMEOUT),
    'waiting for bet time to complete'
  );
  await newMarketT20Page.selectingCardsInLoop(
    dealerDevPage,
    testData.newMarket.colorMarket.BothAAndBBlack
  );
  await newMarketT20Page.validatingCongratulationsMessage(newMarketT20GamePage);
  await newMarketT20Page.validateTotalBetAmountForMultipleMarkets(
    newMarketT20GamePage,
    '100',
    ['All A Black', 'All B Black']
  );
  await newMarketT20Page.validatePlayerAndWinningPattern(
    dealerDevPage,
    'both',
    ''
  );
});

//** Player B will not receives all Red cards (Hearts/Diamonds) & all Black cards (Spades/Clubs). Players B should loss the bet */
test('test_07, Color Market: Bet on Player B getting both "All Black cards" and "all Red cards"', async ({
  page,
  context,
}) => {
  newMarketT20Page = new NewMarketT20Page(page);
  const page1Promise = page.waitForEvent('popup');
  await newMarketT20Page.clickOnDemoLobbyButton();
  const newMarketT20GamePage = await page1Promise;
  await newMarketT20Page.selectingTeenpattiGameAndClickOnPlayNowButton(
    newMarketT20GamePage
  );
  const dealerDevPagePromise = await context.newPage();
  const dealerDevPage = await dealerDevPagePromise;
  await newMarketT20Page.navigateToDelearDevAndLogin(dealerDevPage);
  await newMarketT20Page.clickOnDealerTeenPattiT20Game(dealerDevPage);
  await dealerDevPage.reload();
  await newMarketT20Page.clickNewGame(dealerDevPage);
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'All B Red'
  );
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'All B Black'
  );
  await newMarketT20Page.validateBetAmount(newMarketT20GamePage, '200');
  await newMarketT20Page.waitForTimeout(
    dealerDevPage,
    parseInt(process.env.BET_TIMEOUT),
    'waiting for bet time to complete'
  );
  await newMarketT20Page.selectingCardsInLoop(
    dealerDevPage,
    testData.newMarket.colorMarket.BothBlackAndRed
  );
  await newMarketT20Page.validatingCongratulationsMessageShouldNotDisplay(
    newMarketT20GamePage
  );
  await newMarketT20Page.validateTotalWinAmount(newMarketT20GamePage, '0');
  await newMarketT20Page.validatePlayerAndWinningPattern(
    dealerDevPage,
    'Player A',
    'High Card'
  );
});

//** Player A will not receives all Red cards (Hearts/Diamonds) & all Black cards (Spades/Clubs). Players A should loss the bet */
test('test_08, Color Market: Bet on Player A getting both "All Black cards" and "all Red cards"', async ({
  page,
  context,
}) => {
  newMarketT20Page = new NewMarketT20Page(page);
  const page1Promise = page.waitForEvent('popup');
  await newMarketT20Page.clickOnDemoLobbyButton();
  const newMarketT20GamePage = await page1Promise;
  await newMarketT20Page.selectingTeenpattiGameAndClickOnPlayNowButton(
    newMarketT20GamePage
  );
  const dealerDevPagePromise = await context.newPage();
  const dealerDevPage = await dealerDevPagePromise;
  await newMarketT20Page.navigateToDelearDevAndLogin(dealerDevPage);
  await newMarketT20Page.clickOnDealerTeenPattiT20Game(dealerDevPage);
  await dealerDevPage.reload();
  await newMarketT20Page.clickNewGame(dealerDevPage);
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'All A Red'
  );
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'All A Black'
  );
  await newMarketT20Page.validateBetAmount(newMarketT20GamePage, '200');
  await newMarketT20Page.waitForTimeout(
    dealerDevPage,
    parseInt(process.env.BET_TIMEOUT),
    'waiting for bet time to complete'
  );
  await newMarketT20Page.selectingCardsInLoop(
    dealerDevPage,
    testData.newMarket.colorMarket.BothBlackAndRed
  );
  await newMarketT20Page.validatingCongratulationsMessageShouldNotDisplay(
    newMarketT20GamePage
  );
  await newMarketT20Page.validateTotalWinAmount(newMarketT20GamePage, '0');
  await newMarketT20Page.validatePlayerAndWinningPattern(
    dealerDevPage,
    'Player A',
    'High Card'
  );
});

//** Player A getting all Black cards and Player B getting all Red cards */
test('test_09, Color Market: Bet on Multiple bet options', async ({
  page,
  context,
}) => {
  newMarketT20Page = new NewMarketT20Page(page);
  const page1Promise = page.waitForEvent('popup');
  await newMarketT20Page.clickOnDemoLobbyButton();
  const newMarketT20GamePage = await page1Promise;
  await newMarketT20Page.selectingTeenpattiGameAndClickOnPlayNowButton(
    newMarketT20GamePage
  );
  const dealerDevPagePromise = await context.newPage();
  const dealerDevPage = await dealerDevPagePromise;
  await newMarketT20Page.navigateToDelearDevAndLogin(dealerDevPage);
  await newMarketT20Page.clickOnDealerTeenPattiT20Game(dealerDevPage);
  await dealerDevPage.reload();
  await newMarketT20Page.clickNewGame(dealerDevPage);
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'All A Black'
  );
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'All B Red'
  );
  await newMarketT20Page.validateBetAmount(newMarketT20GamePage, '200');
  await newMarketT20Page.waitForTimeout(
    dealerDevPage,
    parseInt(process.env.BET_TIMEOUT),
    'waiting for bet time to complete'
  );
  await newMarketT20Page.selectingCardsInLoop(
    dealerDevPage,
    testData.newMarket.colorMarket.ABlackAndBRed
  );
  await newMarketT20Page.validatingCongratulationsMessage(newMarketT20GamePage);
  await newMarketT20Page.validateTotalBetAmountForMultipleMarkets(
    newMarketT20GamePage,
    '100',
    ['All A Black', 'All B Red']
  );
  await newMarketT20Page.validatePlayerAndWinningPattern(
    dealerDevPage,
    'Player A',
    'High Card'
  );
});

//**Player A receives cards that sum exactly to 21 */
test('test_10, Sum 21 Market: Bet on Player A card sum = 21 ', async ({
  page,
  context,
}) => {
  newMarketT20Page = new NewMarketT20Page(page);
  const page1Promise = page.waitForEvent('popup');
  await newMarketT20Page.clickOnDemoLobbyButton();
  const newMarketT20GamePage = await page1Promise;
  await newMarketT20Page.selectingTeenpattiGameAndClickOnPlayNowButton(
    newMarketT20GamePage
  );
  const dealerDevPagePromise = await context.newPage();
  const dealerDevPage = await dealerDevPagePromise;
  await newMarketT20Page.navigateToDelearDevAndLogin(dealerDevPage);
  await newMarketT20Page.clickOnDealerTeenPattiT20Game(dealerDevPage);
  await dealerDevPage.reload();
  await newMarketT20Page.clickNewGame(dealerDevPage);
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'Equal to 21 Player A'
  );
  await newMarketT20Page.validateBetAmount(newMarketT20GamePage, '100');
  await newMarketT20Page.waitForTimeout(
    dealerDevPage,
    parseInt(process.env.BET_TIMEOUT),
    'waiting for bet time to complete'
  );
  await newMarketT20Page.selectingCardsInLoop(
    dealerDevPage,
    testData.newMarket.colorMarket.EqualTO21AndTrioForPlayerA
  );
  await newMarketT20Page.validatingCongratulationsMessage(newMarketT20GamePage);
  await newMarketT20Page.validateBetAmountForOneBetMarketAtOnce(
    newMarketT20GamePage,
    '100',
    'Equal to 21 Player A'
  );
  await newMarketT20Page.validatePlayerAndWinningPattern(
    dealerDevPage,
    'Player A',
    'TRIO'
  );
});

//**Player B receives cards with a sum greater than 21*/
test('test_11, Sum 21 Market: Bet on Player B card sum > 21 ', async ({
  page,
  context,
}) => {
  newMarketT20Page = new NewMarketT20Page(page);
  const page1Promise = page.waitForEvent('popup');
  await newMarketT20Page.clickOnDemoLobbyButton();
  const newMarketT20GamePage = await page1Promise;
  await newMarketT20Page.selectingTeenpattiGameAndClickOnPlayNowButton(
    newMarketT20GamePage
  );
  const dealerDevPagePromise = await context.newPage();
  const dealerDevPage = await dealerDevPagePromise;
  await newMarketT20Page.navigateToDelearDevAndLogin(dealerDevPage);
  await newMarketT20Page.clickOnDealerTeenPattiT20Game(dealerDevPage);
  await dealerDevPage.reload();
  await newMarketT20Page.clickNewGame(dealerDevPage);
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'Greater than 21 Player B'
  );
  await newMarketT20Page.validateBetAmount(newMarketT20GamePage, '100');
  await newMarketT20Page.waitForTimeout(
    dealerDevPage,
    parseInt(process.env.BET_TIMEOUT),
    'waiting for bet time to complete'
  );
  await newMarketT20Page.selectingCardsInLoop(
    dealerDevPage,
    testData.newMarket.colorMarket.GreaterTO21ForPlayerB
  );
  await newMarketT20Page.validatingCongratulationsMessage(newMarketT20GamePage);
  await newMarketT20Page.validateBetAmountForOneBetMarketAtOnce(
    newMarketT20GamePage,
    '100',
    'Greater than 21 Player B'
  );
  await newMarketT20Page.validatePlayerAndWinningPattern(
    dealerDevPage,
    'Player B',
    'STRAIGHT_FLUSH'
  );
});

//**Player A receives cards with a sum Less than 21*/
test('test_12, Sum 21 Market: Player A receives cards that sum to less than 21 ', async ({
  page,
  context,
}) => {
  newMarketT20Page = new NewMarketT20Page(page);
  const page1Promise = page.waitForEvent('popup');
  await newMarketT20Page.clickOnDemoLobbyButton();
  const newMarketT20GamePage = await page1Promise;
  await newMarketT20Page.selectingTeenpattiGameAndClickOnPlayNowButton(
    newMarketT20GamePage
  );
  const dealerDevPagePromise = await context.newPage();
  const dealerDevPage = await dealerDevPagePromise;
  await newMarketT20Page.navigateToDelearDevAndLogin(dealerDevPage);
  await newMarketT20Page.clickOnDealerTeenPattiT20Game(dealerDevPage);
  await dealerDevPage.reload();
  await newMarketT20Page.clickNewGame(dealerDevPage);
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'Less than 21 Player A'
  );
  await newMarketT20Page.validateBetAmount(newMarketT20GamePage, '100');
  await newMarketT20Page.waitForTimeout(
    dealerDevPage,
    parseInt(process.env.BET_TIMEOUT),
    'waiting for bet time to complete'
  );
  await newMarketT20Page.selectingCardsInLoop(
    dealerDevPage,
    testData.newMarket.colorMarket.LessTO21ForPlayerA
  );
  await newMarketT20Page.validatingCongratulationsMessage(newMarketT20GamePage);
  await newMarketT20Page.validateBetAmountForOneBetMarketAtOnce(
    newMarketT20GamePage,
    '100',
    'Less than 21 Player A'
  );
  await newMarketT20Page.validatePlayerAndWinningPattern(
    dealerDevPage,
    'Player A',
    'PAIR'
  );
});

//**Player B receives cards that sum exactly to 21 */
test('test_13, Sum 21 Market: Bet on Player B card sum = 21 ', async ({
  page,
  context,
}) => {
  newMarketT20Page = new NewMarketT20Page(page);
  const page1Promise = page.waitForEvent('popup');
  await newMarketT20Page.clickOnDemoLobbyButton();
  const newMarketT20GamePage = await page1Promise;
  await newMarketT20Page.selectingTeenpattiGameAndClickOnPlayNowButton(
    newMarketT20GamePage
  );
  const dealerDevPagePromise = await context.newPage();
  const dealerDevPage = await dealerDevPagePromise;
  await newMarketT20Page.navigateToDelearDevAndLogin(dealerDevPage);
  await newMarketT20Page.clickOnDealerTeenPattiT20Game(dealerDevPage);
  await dealerDevPage.reload();
  await newMarketT20Page.clickNewGame(dealerDevPage);
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'Equal to 21 Player B'
  );
  await newMarketT20Page.validateBetAmount(newMarketT20GamePage, '100');
  await newMarketT20Page.waitForTimeout(
    dealerDevPage,
    parseInt(process.env.BET_TIMEOUT),
    'waiting for bet time to complete'
  );
  await newMarketT20Page.selectingCardsInLoop(
    dealerDevPage,
    testData.newMarket.colorMarket.EqualTO21AndTrioForPlayerB
  );
  await newMarketT20Page.validatingCongratulationsMessage(newMarketT20GamePage);
  await newMarketT20Page.validateBetAmountForOneBetMarketAtOnce(
    newMarketT20GamePage,
    '100',
    'Equal to 21 Player B'
  );
  await newMarketT20Page.validatePlayerAndWinningPattern(
    dealerDevPage,
    'Player B',
    'TRIO'
  );
});

//**Player A and B receives cards that sum exactly to 21*/
test('test_14, Sum 21 Market: Bet on both Player B and A card sum = 21 ', async ({
  page,
  context,
}) => {
  newMarketT20Page = new NewMarketT20Page(page);
  const page1Promise = page.waitForEvent('popup');
  await newMarketT20Page.clickOnDemoLobbyButton();
  const newMarketT20GamePage = await page1Promise;
  await newMarketT20Page.selectingTeenpattiGameAndClickOnPlayNowButton(
    newMarketT20GamePage
  );
  const dealerDevPagePromise = await context.newPage();
  const dealerDevPage = await dealerDevPagePromise;
  await newMarketT20Page.navigateToDelearDevAndLogin(dealerDevPage);
  await newMarketT20Page.clickOnDealerTeenPattiT20Game(dealerDevPage);
  await dealerDevPage.reload();
  await newMarketT20Page.clickNewGame(dealerDevPage);
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'Equal to 21 Player A'
  );
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'Equal to 21 Player B'
  );
  await newMarketT20Page.validateBetAmount(newMarketT20GamePage, '200');
  await newMarketT20Page.waitForTimeout(
    dealerDevPage,
    parseInt(process.env.BET_TIMEOUT),
    'waiting for bet time to complete'
  );
  await newMarketT20Page.selectingCardsInLoop(
    dealerDevPage,
    testData.newMarket.colorMarket.BothEqualTO21
  );
  await newMarketT20Page.validatingCongratulationsMessage(newMarketT20GamePage);
  await newMarketT20Page.validateTotalBetAmountForMultipleMarkets(
    newMarketT20GamePage,
    '100',
    ['Equal to 21 Player B', 'Equal to 21 Player A']
  );
  await newMarketT20Page.validatePlayerAndWinningPattern(
    dealerDevPage,
    'both',
    ''
  );
});

//**Player A receives cards with a sum greater than 21*/
test('test_15, Sum 21 Market: Bet on Player A card sum > 21 ', async ({
  page,
  context,
}) => {
  newMarketT20Page = new NewMarketT20Page(page);
  const page1Promise = page.waitForEvent('popup');
  await newMarketT20Page.clickOnDemoLobbyButton();
  const newMarketT20GamePage = await page1Promise;
  await newMarketT20Page.selectingTeenpattiGameAndClickOnPlayNowButton(
    newMarketT20GamePage
  );
  const dealerDevPagePromise = await context.newPage();
  const dealerDevPage = await dealerDevPagePromise;
  await newMarketT20Page.navigateToDelearDevAndLogin(dealerDevPage);
  await newMarketT20Page.clickOnDealerTeenPattiT20Game(dealerDevPage);
  await dealerDevPage.reload();
  await newMarketT20Page.clickNewGame(dealerDevPage);
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'Greater than 21 Player A'
  );
  await newMarketT20Page.validateBetAmount(newMarketT20GamePage, '100');
  await newMarketT20Page.waitForTimeout(
    dealerDevPage,
    parseInt(process.env.BET_TIMEOUT),
    'waiting for bet time to complete'
  );
  await newMarketT20Page.selectingCardsInLoop(
    dealerDevPage,
    testData.newMarket.colorMarket.GreaterTO21ForPlayerA
  );
  await newMarketT20Page.validatingCongratulationsMessage(newMarketT20GamePage);
  await newMarketT20Page.validateBetAmountForOneBetMarketAtOnce(
    newMarketT20GamePage,
    '100',
    'Greater than 21 Player A'
  );
  await newMarketT20Page.validatePlayerAndWinningPattern(
    dealerDevPage,
    'Player A',
    'STRAIGHT'
  );
});

//**Both Players receives cards with a sum greater than 21*/
test('test_16, Sum 21 Market: Bet on both Player A & B card sum >21 ', async ({
  page,
  context,
}) => {
  newMarketT20Page = new NewMarketT20Page(page);
  const page1Promise = page.waitForEvent('popup');
  await newMarketT20Page.clickOnDemoLobbyButton();
  const newMarketT20GamePage = await page1Promise;
  await newMarketT20Page.selectingTeenpattiGameAndClickOnPlayNowButton(
    newMarketT20GamePage
  );
  const dealerDevPagePromise = await context.newPage();
  const dealerDevPage = await dealerDevPagePromise;
  await newMarketT20Page.navigateToDelearDevAndLogin(dealerDevPage);
  await newMarketT20Page.clickOnDealerTeenPattiT20Game(dealerDevPage);
  await dealerDevPage.reload();
  await newMarketT20Page.clickNewGame(dealerDevPage);
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'Greater than 21 Player A'
  );
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'Greater than 21 Player B'
  );
  await newMarketT20Page.validateBetAmount(newMarketT20GamePage, '200');
  await newMarketT20Page.waitForTimeout(
    dealerDevPage,
    parseInt(process.env.BET_TIMEOUT),
    'waiting for bet time to complete'
  );
  await newMarketT20Page.selectingCardsInLoop(
    dealerDevPage,
    testData.newMarket.colorMarket.BothGreaterTO21
  );
  await newMarketT20Page.validatingCongratulationsMessage(newMarketT20GamePage);
  await newMarketT20Page.validateTotalBetAmountForMultipleMarkets(
    newMarketT20GamePage,
    '100',
    ['Greater than 21 Player A', 'Greater than 21 Player B']
  );
  await newMarketT20Page.validatePlayerAndWinningPattern(
    dealerDevPage,
    'Player B',
    'STRAIGHT_FLUSH'
  );
});

//**Player B receives cards with a sum Less than 21*/
test('test_17, Sum 21 Market: Player B receives cards that sum to less than 21 ', async ({
  page,
  context,
}) => {
  newMarketT20Page = new NewMarketT20Page(page);
  const page1Promise = page.waitForEvent('popup');
  await newMarketT20Page.clickOnDemoLobbyButton();
  const newMarketT20GamePage = await page1Promise;
  await newMarketT20Page.selectingTeenpattiGameAndClickOnPlayNowButton(
    newMarketT20GamePage
  );
  const dealerDevPagePromise = await context.newPage();
  const dealerDevPage = await dealerDevPagePromise;
  await newMarketT20Page.navigateToDelearDevAndLogin(dealerDevPage);
  await newMarketT20Page.clickOnDealerTeenPattiT20Game(dealerDevPage);
  await dealerDevPage.reload();
  await newMarketT20Page.clickNewGame(dealerDevPage);
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'Less than 21 Player B'
  );
  await newMarketT20Page.validateBetAmount(newMarketT20GamePage, '100');
  await newMarketT20Page.waitForTimeout(
    dealerDevPage,
    parseInt(process.env.BET_TIMEOUT),
    'waiting for bet time to complete'
  );
  await newMarketT20Page.selectingCardsInLoop(
    dealerDevPage,
    testData.newMarket.colorMarket.LessTO21ForPlayerB
  );
  await newMarketT20Page.validatingCongratulationsMessage(newMarketT20GamePage);
  await newMarketT20Page.validateBetAmountForOneBetMarketAtOnce(
    newMarketT20GamePage,
    '100',
    'Less than 21 Player B'
  );
  await newMarketT20Page.validatePlayerAndWinningPattern(
    dealerDevPage,
    'Player B',
    'PAIR'
  );
});

//**Both Players receives cards with a sum less than 21*/
test('test_18, Sum 21 Market: Bet on both Player A & B card sum less than 21 ', async ({
  page,
  context,
}) => {
  newMarketT20Page = new NewMarketT20Page(page);
  const page1Promise = page.waitForEvent('popup');
  await newMarketT20Page.clickOnDemoLobbyButton();
  const newMarketT20GamePage = await page1Promise;
  await newMarketT20Page.selectingTeenpattiGameAndClickOnPlayNowButton(
    newMarketT20GamePage
  );
  const dealerDevPagePromise = await context.newPage();
  const dealerDevPage = await dealerDevPagePromise;
  await newMarketT20Page.navigateToDelearDevAndLogin(dealerDevPage);
  await newMarketT20Page.clickOnDealerTeenPattiT20Game(dealerDevPage);
  await dealerDevPage.reload();
  await newMarketT20Page.clickNewGame(dealerDevPage);
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'Less than 21 Player A'
  );
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'Less than 21 Player B'
  );
  await newMarketT20Page.validateBetAmount(newMarketT20GamePage, '200');
  await newMarketT20Page.waitForTimeout(
    dealerDevPage,
    parseInt(process.env.BET_TIMEOUT),
    'waiting for bet time to complete'
  );
  await newMarketT20Page.selectingCardsInLoop(
    dealerDevPage,
    testData.newMarket.colorMarket.BothLessTO21
  );
  await newMarketT20Page.validatingCongratulationsMessage(newMarketT20GamePage);
  await newMarketT20Page.validateTotalBetAmountForMultipleMarkets(
    newMarketT20GamePage,
    '100',
    ['Less than 21 Player A', 'Less than 21 Player B']
  );
  await newMarketT20Page.validatePlayerAndWinningPattern(
    dealerDevPage,
    'Player A',
    'High Card'
  );
});

//**Player A card sum less than 21 and player B card sum greater than 21*/
test('test_19, Sum 21 Market: Bet on multiple bet options for sum 21 market ', async ({
  page,
  context,
}) => {
  newMarketT20Page = new NewMarketT20Page(page);
  const page1Promise = page.waitForEvent('popup');
  await newMarketT20Page.clickOnDemoLobbyButton();
  const newMarketT20GamePage = await page1Promise;
  await newMarketT20Page.selectingTeenpattiGameAndClickOnPlayNowButton(
    newMarketT20GamePage
  );
  const dealerDevPagePromise = await context.newPage();
  const dealerDevPage = await dealerDevPagePromise;
  await newMarketT20Page.navigateToDelearDevAndLogin(dealerDevPage);
  await newMarketT20Page.clickOnDealerTeenPattiT20Game(dealerDevPage);
  await dealerDevPage.reload();
  await newMarketT20Page.clickNewGame(dealerDevPage);
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'Less than 21 Player A'
  );
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'Greater than 21 Player B'
  );
  await newMarketT20Page.validateBetAmount(newMarketT20GamePage, '200');
  await newMarketT20Page.waitForTimeout(
    dealerDevPage,
    parseInt(process.env.BET_TIMEOUT),
    'waiting for bet time to complete'
  );
  await newMarketT20Page.selectingCardsInLoop(
    dealerDevPage,
    testData.newMarket.colorMarket.ALessTO21AndBGreaterTo21
  );
  await newMarketT20Page.validatingCongratulationsMessage(newMarketT20GamePage);
  await newMarketT20Page.validateTotalBetAmountForMultipleMarkets(
    newMarketT20GamePage,
    '100',
    ['Less than 21 Player A', 'Greater than 21 Player B']
  );
  await newMarketT20Page.validatePlayerAndWinningPattern(
    dealerDevPage,
    'Player B',
    'PAIR'
  );
});

//**User will win if any of the Player has three cards of the same rank.*/
test('test_20, Sum 21 Market: Bet on Bonus 3 plus 3', async ({ page, context }) => {
  newMarketT20Page = new NewMarketT20Page(page);
  const page1Promise = page.waitForEvent('popup');
  await newMarketT20Page.clickOnDemoLobbyButton();
  const newMarketT20GamePage = await page1Promise;
  await newMarketT20Page.selectingTeenpattiGameAndClickOnPlayNowButton(
    newMarketT20GamePage
  );
  const dealerDevPagePromise = await context.newPage();
  const dealerDevPage = await dealerDevPagePromise;
  await newMarketT20Page.navigateToDelearDevAndLogin(dealerDevPage);
  await newMarketT20Page.clickOnDealerTeenPattiT20Game(dealerDevPage);
  await dealerDevPage.reload();
  await newMarketT20Page.clickNewGame(dealerDevPage);
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    '3 Plus 3 Bonus'
  );
  await newMarketT20Page.validateBetAmount(newMarketT20GamePage, '100');
  await newMarketT20Page.waitForTimeout(
    dealerDevPage,
    parseInt(process.env.BET_TIMEOUT),
    'waiting for bet time to complete'
  );
  await newMarketT20Page.selectingCardsInLoop(
    dealerDevPage,
    testData.newMarket.colorMarket.Bonus3plus3
  );
  await newMarketT20Page.validatingCongratulationsMessage(newMarketT20GamePage);
  await newMarketT20Page.validateBetAmountForOneBetMarketAtOnce(
    newMarketT20GamePage,
    '100',
    'bonus 3 plus 3'
  );
  await newMarketT20Page.validatePlayerAndWinningPattern(
    dealerDevPage,
    'Player B',
    'Trio'
  );
});

test('test_21 Balance: verify the balance after every action performed', async ({ page, context }) => {
  newMarketT20Page = new NewMarketT20Page(page);
  //Initial Balance amount
  const initialBalance = await newMarketT20Page.validateBalanceAmount(); 
  console.log('Before bet place:', initialBalance);
  const page1Promise = page.waitForEvent('popup');
  await newMarketT20Page.clickOnDemoLobbyButton();
  const newMarketT20GamePage = await page1Promise;
  await newMarketT20Page.selectingTeenpattiGameAndClickOnPlayNowButton(
    newMarketT20GamePage
  );
  const dealerDevPagePromise = await context.newPage();
  const dealerDevPage = await dealerDevPagePromise;
  await newMarketT20Page.navigateToDelearDevAndLogin(dealerDevPage);
  await newMarketT20Page.clickOnDealerTeenPattiT20Game(dealerDevPage);
  await dealerDevPage.reload();
  await newMarketT20Page.clickNewGame(dealerDevPage);
  await newMarketT20Page.clickOnSpecificMarket(
    newMarketT20GamePage,
    'bonus'
  );
  await newMarketT20Page.validateBetAmount(newMarketT20GamePage, '100');
  await newMarketT20Page.waitForTimeout(
    dealerDevPage,
    parseInt(process.env.BET_TIMEOUT),
    'waiting for bet time to complete'
  );
  const afterBetBalance = await newMarketT20Page.validateBalanceAmount(); //After placing bet Balance amount
  console.log('Before bet place:', afterBetBalance);
  await newMarketT20Page.selectingCardsInLoop(
    dealerDevPage,
    testData.newMarket.colorMarket.EqualTO21AndTrioForPlayerA
  );
  await newMarketT20Page.validatingCongratulationsMessage(newMarketT20GamePage);
  await newMarketT20Page.validateBetAmountForOneBetMarketAtOnce(
    newMarketT20GamePage,
    '100',
    'bonus'
  );
  await newMarketT20Page.validatePlayerAndWinningPattern(
    dealerDevPage,
    'Player A',
    'TRIO'
  );
  const finalBalance = await newMarketT20Page.validateBalanceAmount(); //Final balance amount
  console.log('Before bet place:', finalBalance);
});