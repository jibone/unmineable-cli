#!/usr/bin/env node

import { Command } from "commander";

let { version } = require("./../package.json");

const program = new Command();

program
  .name("unmineable-cli")
  .description("CLI tool to query unMineable mining pool")
  .version(version);

program
  .action(() => {
    console.log("This CLI application is still a work in progress.\n");
    console.log("checkout the repo for updates:");
    console.log("https://github.com/jibone/unmineable-cli");
  })
  .description("CLI tool to query unmineable pool");

program.parse(process.argv);
