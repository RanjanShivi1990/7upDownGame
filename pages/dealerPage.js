const { expect } = require('@playwright/test');
const { name } = require('../playwright.config');
import { allure } from 'allure-playwright';
const { executeStep } = require('../utils/action');
const Assertions = require('../utils/assertions');
require('dotenv').config();

exports.DealerPage = class DealerPage {
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
    
        this.cardCasinoPageDealerPage = (page) =>
          page.getByRole('link', { name: 'Casino32' });
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
        this.newGameButton = (page) =>
            page.getByRole('button', { name: 'New Game' });
      
        this.voidRoundButton = (page) =>
            page.getByRole('button', { name: 'Void Round' });
        this.confirmVoidRound = (page) =>
            page.getByRole('button', { name: 'Confirm' });
    }
    async waitForTimeout(page, timeout, description) {
        await allure.step(description, async () => {
        await page.waitForTimeout(timeout);
            });
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
          
          this.playerNameSelectors = [
            "//span[contains(text(), 'Player 8')]",
            "//span[contains(text(), 'Player 9')]",
            "//span[contains(text(), 'Player 10')]",
            "//span[contains(text(), 'Player 11')]"
          ];
      
          this.playerTotalSelectors = [
            "//span[contains(text(), 'Total=>') and contains(text(), 'Player 8')]",
            "//span[contains(text(), 'Total=>') and contains(text(), 'Player 9')]",
            "//span[contains(text(), 'Total=>') and contains(text(), 'Player 10')]",
            "//span[contains(text(), 'Total=>') and contains(text(), 'Player 11')]"
          ];
          this.winnerAnnouncement = page.locator("//span[text()='Winner']");
}
        async getPlayerTotals(page) {
          const playerTotals = await Promise.all(
            this.playerTotalSelectors.map(async (selector, index) => {
              const totalText = await this.page.$eval(`xpath=${selector}`, el => parseFloat(el.textContent.replace('Total=>', '')));
              return { player: `Player ${index + 1}`, total: totalText || 0 };
            })
          );
          return playerTotals;
        }
      
        async getDisplayedWinner(page) {
          return this.page.$eval(this.winnerAnnouncement, el => el.textContent);
        }
      
        async verifyWinner(page,expectedPlayer) {
          const displayedWinner = await this.getDisplayedWinner();
          expect(displayedWinner).toContain(`Player ${expectedPlayer}`);
        } 
};
