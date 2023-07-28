# Terra Classic Finder

![banner](banner.png)

Terra Classic Finder is a tool to search through blocks, transactions, and accounts on the Terra blockchain.

Finder is derived from the [Cosmos Explorer](https://github.com/cosmos/explorer).

## Project setup

```
** NOTE: Make sure you are using Node 16 **
```
```
npm install
```

### Configure the environment variables

If required, edit `.env.development`.
For local development, you might want to use the following configuration:

```
HOST=localhost
HTTPS=false
BROWSER=none
REACT_APP_DEFAULT_NETWORK=localterra
```

`REACT_APP_DEFAULT_NETWORK` is the default selected network that Terra Classic Finder will use.
See [https://assets.terraclassic.community/chains.json](https://assets.terraclassic.community/chains.json) for the list of available networks.


### Run in Dev Mode with Hot Reloading
```
npm start
```
