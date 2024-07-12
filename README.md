# Sealcoin Warpcast

**Author:** cleanerzkp

**Description:**
Participate in archiving Warpcast content by running this task. Help preserve data and earn SealCoin in this Proof of Concept Hackathon Project. The base bounty per round is 10 SEAL, divided among participants.

**Repository URL:** [GitHub - cleanerzkp/Sealcoin-Warpcast](https://github.com/cleanerzkp/Sealcoin-Warpcast)

**Image URL:** [ipfs://bafybeibf6o3xospzjum6r46oweynwbt5vwsk77znkja3fotmgfs24zojni/](ipfs://bafybeibf6o3xospzjum6r46oweynwbt5vwsk77znkja3fotmgfs24zojni/)

**Task ID:** 9qAs2EqfsGyrUGULQRLTNgfuLbBLU4PFM48N6XFxg76M

**KPL Token:** [KPL Token on Koii Explorer](https://explorer.koii.live/address/FRW5UnyyniEachmKrPk5eDo8MNcuhwTro4Y1hwuNKgXp)

## Project Overview

Sealcoin Warpcast is a pioneering project aimed at archiving valuable content from Warpcast. By running this task, you can help preserve important data and earn SealCoin as a reward. This initiative is part of the Proof of Concept Hackathon Project and aims to demonstrate the potential of decentralized content archiving on the Koii Network.

## Features

- **Decentralized Archiving:** Utilize the Koii Network to securely archive Warpcast content.
- **Earn SealCoin:** Participants are rewarded with SealCoin based on their contribution to the task.
- **Community Driven:** Encourages community participation and collaboration.

## Available Scripts

### `npm test`
Runs tests using Jest.

### `npm run webpack`
Builds the project and generates the main script: `dist/main.js`.

## Task Flow

Tasks operate within a periodic structure known as 'rounds'. Each round consists of the following steps:

1. **Perform the Task:** Execute the necessary actions for the round.
2. **Audit Work:** Review the work completed by other nodes.
3. **Rewards and Penalties:** Distribute rewards and apply stack slash as necessary.

Rounds are defined by specific time periods, with nodes participating through actions such as uploading data to IPFS, posting CIDs to the K2 settlement layer, and communicating via REST APIs and WebSockets.

For detailed insights into the task flow and its operations, refer to [the runtime environment documentation](https://docs.koii.network/develop/microservices-and-tasks/what-are-tasks/gradual-consensus#why-is-it-gradual).

## Development Guide

Feeling lost at the start? Curious about our template structure or the specifics of certain functions? Wondering how to test your task locally? Interested in learning how to upload data to Spheron via IPFS? Unsure about the process for whitelisting your task or selecting the right cluster? Start with the [Development Guide](https://docs.koii.network/develop/write-a-koii-task/task-development-guide/).

Looking to bring better structure to your task? Explore our [Task Organizer](https://www.figma.com/community/file/1220194939977550205/Task-Outline) for better organization.

## Environment Requirements

- [Node >=16.0.0](https://nodejs.org)
- [Docker Compose](https://docs.docker.com/get-started/08_using_compose/)

## Tool Requirements

- [Koii CLI Suite](https://docs.koii.network/develop/command-line-tool/koii-cli/install-cli)
- [Create Task CLI](https://docs.koii.network/develop/command-line-tool/create-task-cli/install)

## Runtime Options

There are two ways to run your task during development:

1. With `GLOBAL_TIMERS="true"` (refer to `.env.local.example`) - When this option is enabled, IPC calls are made by calculating the average time slots of all tasks running on your node.

2. With `GLOBAL_TIMERS="false"` - This option allows for manual calls to K2 and disables the automatic triggers for round management on K2. Transactions are only accepted during the correct time period. Instructions for manual calls can be found in `index.js`.

## Environment Variables

Rename the `.env.local.example` file to `.env.local` and make the necessary modifications. Here, you can include environment variables that your task requires. This is particularly useful if you're utilizing [custom secrets](https://docs.koii.network/develop/write-a-koii-task/task-development-kit-tdk/using-the-task-namespace/keys-and-secrets).

## Tips

- Always ensure your secret files, such as `.env` files, are secure! Implement a robust `.gitignore` strategy.
- Continue innovating with Koii!

Should you encounter any issues, don't hesitate to reach out by opening a ticket on [Discord](https://discord.gg/koii-network).

## About

Our mission is to improve access to decentralized technology, which is why Koii tasks are written and configured entirely in JavaScript (NodeJS 16, to be exact) and support the majority of popular NPM Modules.

For more information, visit [koii.network](https://koii.network).
