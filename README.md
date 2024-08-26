# unmineable-cli

> [!CAUTION]
> This CLI tool is a work in progress. Commands may change.  
> Follow [@jibone](https://x.com/jibone) for updates.

## About

A simple CLI interface to check on your unmineable stats.

Visit [unmineable.com](https://unmineable.com/) to know more.

## Usage

```sh
$ npm install -g @jibone/unmineable-cli
$ unmineable --help
```

### Get all stats

Get all the stats on unMineable base on wallet and coin symbol.

example:

```sh
$ export WALLET="1234xx...........xxx2394"
$ unmineable stats $WALLET xmr
```

returns:

```
     Mining Balance: 0.00253285
   Referral Balance: 0.00000677
            Balance: 0.00253962
  Payment Threshold: 0.03
       24h Rewarded: 0.00011467
        7d Rewarded: 0.00072555
       30d Rewarded: 0.00205695
         Total Paid: 0
       Last Payment: -
               coin: XMR
            network: XMR
```

### Get Wallet Balance

Get your wallet balance.

example:

```sh
$ export WALLET="1234xx...........xxx2394"
$ unmineable balance $WALLET xmr
```

returns:

```
            Balance: 0.00210284
    Balance Payable: 0.00210284
  Payment Threshold: 0.03
            Network: XMR
         Mining Fee: 0.75
```

Just return balance

```sh
$ export WALLET="1234xx...........xxx2394"
$ unmineable balance $WALLET xmr -b
```

returns:

```
0.00210284
```

Perhaps you want to always show your balance on your tmux status line or somewhere else, you can write a shell script to priodically run the command.

Do note that there is a 500 requests per minute per IP limit on unMineable. Also every request is cached by 1 second, so there is no need to run the command multiple time in a second.

### Get current worker stats

Shows the number of workers online and their hashrate stats.

example:

```sh
$ export WALLET="1234xx...........xxx2394"
$ unmineable workers $WALLET xmr
```

results:

```
                 Name: Mini01
               Status: online
          Last Online: 2024-08-22T15:00:00.000Z
    Reported Hashrate: 1167
  Calculated Hashrate: 1167
             Referral: 4ayy-vh8c

                 Name: Air01
               Status: online
          Last Online: 2024-08-22T15:00:00.000Z
    Reported Hashrate: 444
  Calculated Hashrate: 444
             Referral: 4ayy-vh8c


```

### Requirements

- node.js

### To Dos

- ✅ balance - Show wallet balance.
- ✅ workers - Show workers status.
- ✅ stats - Show the full stats.
- ⏳ payments - Show the payment list.
- ⏳ each command can return specific fields value. Might be useful to use in shell scripting.
