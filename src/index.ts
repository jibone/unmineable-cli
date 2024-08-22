#!/usr/bin/env node

import { Command } from "commander";
import { getBalance } from "./command/balance";
import { getUUID } from "./command/uuid";
import { getWorkers } from "./command/workers";

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

program
  .command("workers")
  .description("Get the worker stats from wallet")
  .argument("<wallet>", "The wallet address")
  .argument("<coin>", "The coin symbol")
  .showHelpAfterError()
  .action(async (wallet, coin) => {
    const getWalletUUID = async () => {
      const { error, errorMsg, data } = await getUUID(wallet, coin);
      if (error) {
        console.log(`Error: ${errorMsg}`);
      }

      return {
        walletUUIDError: error,
        uuid: data.uuid,
      };
    };
    const { walletUUIDError, uuid } = await getWalletUUID();

    if (walletUUIDError) return;

    const { error, errorMsg, data } = await getWorkers(uuid);
    if (error) {
      console.log(`Error: ${errorMsg}`);
    }

    for (let worker of data.workers) {
      const last = new Date(worker.last);

      console.log(`
                 Algo: ${worker.algo}
                 Name: ${worker.name}
               Status: ${worker.status}
          Last Online: ${last.toISOString()}
    Reported Hashrate: ${worker.rhr}
  Calculated Hashrate: ${worker.chr}
             Referral: ${worker.referral}`);
    }
  });

program.parse(process.argv);
