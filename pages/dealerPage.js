// src/pages/dealerPage.js

class DealerPage {
    constructor(page) {
      this.page = page;
  
      // Players' base values and card values now use methods instead of direct properties
      this.players = [
        {
          name: 'Player 8',
          totalValueLocator: (page) => page.locator(`//span[text()='Player 8']/following-sibling::span[contains(text(),'Total=>')]`), // Total value on dealer page
          cardValueLocator: (page) => page.locator("//div[24]") // Adjust selector based on the game page structure
        },
        {
          name: 'Player 9',
          totalValueLocator: (page) => page.locator(`//span[text()='Player 9']/following-sibling::span[contains(text(),'Total=>')]`), // Total value on dealer page
          cardValueLocator: (page) => page.locator("//div[28]") // Adjust selector based on game page structure
        },
        {
          name: 'Player 10',
          totalValueLocator: (page) => page.locator(`//span[text()='Player 10']/following-sibling::span[contains(text(),'Total=>')]`), // Total value on dealer page
          cardValueLocator: (page) => page.locator("//div[32]") // Adjust selector based on game page structure
        },
        {
          name: 'Player 11',
          totalValueLocator: (page) => page.locator(`//span[text()='Player 11']/following-sibling::span[contains(text(),'Total=>')]`), // Total value on dealer page
          cardValueLocator: (page) => page.locator("//div[36]") // Adjust selector based on game page structure
        }
      ];
  
      this.winnerAnnouncementSelector = (page) => page.locator("//span[text()='Winner']"); // Selector for the winner announcement on the dealer page
    }
  
    // Method to calculate player totals
    async getPlayerTotals() {
      const playerTotals = [];
  
      for (const player of this.players) {
        // Access the correct locators using the page context
        const baseValue = await player.cardValueLocator(this.page).innerText(); // Example for getting the card value
        const totalValue = await player.totalValueLocator(this.page).innerText(); // Example for getting the total value
  
        playerTotals.push({
          player: player.name,
          baseValue: parseInt(baseValue) || 0,
          totalValue: parseInt(totalValue.replace('Total=>', '').trim()) || 0 // Clean up the value
        });
      }
  
      return playerTotals;
    }
  
    async getDisplayedWinner() {
      await this.page.waitForSelector(this.winnerAnnouncementSelector(this.page));
      return await this.page.locator(this.winnerAnnouncementSelector(this.page)).innerText();
    }
  
    async verifyWinner(expectedPlayer) {
      const displayedWinner = await this.getDisplayedWinner();
      console.log('Expected:', expectedPlayer);
      console.log('Displayed:', displayedWinner);
      return displayedWinner.includes(expectedPlayer);
    }
  }
  
  export default DealerPage;