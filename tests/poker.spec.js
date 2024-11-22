import { test , expect } from '@playwright/test';
import { PokerGamePage } from '../pages/pokerGamePage.js';
import testData from '../testData/testData.json';
const Assertions = require('../utils/assertions');

let pokerGamePage , assertions;
test.beforeEach(async ({ page }) => {
    cardCasinoPage = new CardCasinoPage(page);
    assertions = new Assertions();
    await cardCasinoPage.goto();
  });
  