#!/usr/bin/env node

import { Command } from "commander";
import { getBalance } from "./command/balance";

let { version } = require("./../package.json");

const program = new Command();

program
  .name("unmineable-cli")
  .description("CLI tool to query unMineable mining pool")
  .version(version);

program.addHelpText(
  "after",
  `
  Warning: this CLI app is in early development.
  `
);

program
  .command("balance")
  .description("Get the balance from the wallet.")
  .argument("<wallet>", "The wallet address.")
  .argument("<coin>", "The coin symbol.")
  .option("-b, --balance", "Only return the balance.")
  .showHelpAfterError()
  .action(async (wallet, coin, options) => {
    const { error, errorMsg, data } = await getBalance(wallet, coin);

    if (error) {
      console.log(`Error: ${errorMsg}`);
    }

    if (options.balance) {
      console.log(data.balance);
    } else {
      console.log(`
            Balance: ${data.balance}
    Balance Payable: ${data.balancePayable}
  Payment Threshold: ${data.paymentThreshold}
            Network: ${data.network}
         Mining Fee: ${data.miningFee}
      `);
    }
  });

program.parse(process.argv);
