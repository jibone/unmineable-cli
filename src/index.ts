#!/usr/bin/env node

import { Command } from "commander";
import { getBalance } from "./command/balance";
import { getUUID } from "./command/uuid";
import { getWorkers } from "./command/workers";
import { getStats } from "./command/stats";

const program = new Command();

async function getWalletUUID(wallet: string, coin: string) {
  const { error, errorMsg, data } = await getUUID(wallet, coin);
  if (error) {
    console.log(`Error: ${errorMsg}`);
  }

  return {
    walletUUIDError: error,
    uuid: data.uuid,
  };
}

program
  .name("unmineable-cli")
  .description("CLI tool to query unMineable mining pool")
  // eslint-disable-next-line
  .version(require("./../package.json").version);

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
         Mining Fee: ${data.miningFee}`);
    }
  });

program
  .command("workers")
  .description("Get the worker stats from wallet")
  .argument("<wallet>", "The wallet address")
  .argument("<coin>", "The coin symbol")
  .showHelpAfterError()
  .action(async (wallet, coin) => {
    const { walletUUIDError, uuid } = await getWalletUUID(wallet, coin);

    if (walletUUIDError) return;

    const { error, errorMsg, data } = await getWorkers(uuid);
    if (error) {
      console.log(`Error: ${errorMsg}`);
    }

    for (const worker of data.workers) {
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

program
  .command("stats")
  .description("Get all wallet stats")
  .argument("<wallet>", "The wallet address")
  .argument("<coin>", "The coin symbol")
  .showHelpAfterError()
  .action(async (wallet, coin) => {
    const { walletUUIDError, uuid } = await getWalletUUID(wallet, coin);

    if (walletUUIDError) return;

    const { error, errorMsg, data } = await getStats(uuid);
    if (error) {
      console.log(`Error: ${errorMsg}`);
    }

    const stats = data.stats;
    const last = new Date(stats.lastPayment);

    console.log(`
     Mining Balance: ${stats.miningBalance}
   Referral Balance: ${stats.referralBalance}
            Balance: ${stats.balance}
  Payment Threshold: ${stats.paymentThreshold}
       24h Rewarded: ${stats.reward24h}
        7d Rewarded: ${stats.reward7d}
       30d Rewarded: ${stats.reward30d}
         Total Paid: ${stats.paid}
       Last Payment: ${stats.paid === "0" ? "-" : last.toISOString()}
               coin: ${stats.coin}
            network: ${stats.network}`);
  });

program.parse(process.argv);
