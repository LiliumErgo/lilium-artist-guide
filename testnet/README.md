# Lilium Artist Docs: Testnet
This will be a guide for working with Lilium!

## Connecting to Testnet
- Open Chrome
- Navigate to [extension settings](chrome://extensions/)
    - Enter `chrome://extensions/` in browser URL
- Enable developer mode
- download [nautilus testnet](https://github.com/capt-nemo429/nautilus-wallet/releases/tag/v0.7.3)
    - unzip
- Go back to [extension settings](chrome://extensions/)
    - Enter `chrome://extensions/` in browser URL
- Select `Load Unpacked` and choose the unzipped nautilus **folder**
- Click the puzzle icon on the top right of the browser view and pin Nautilus Testnet to get easy access
- Create wallet and proceed as usual
- Get some ERG from this [faucet](https://tn-faucet.ergohost.io/)

## Getting Started
- Vist the [site](https://www.liliumergo.io)
- Select Ergo Testnet under the select network dropdown.
- Connect your wallet!
    - The wallet connected will be your artist address
    - All marketplaces will show the artwork comes from this address
    - Navigate to [`Create`](https://www.liliumergo.io/create-collection)
    - Required Fields
        - Collection Name
        - Collection Description
        - Collection Category
        - Collection Logo URL
            - Can be a link to any type of content.
        - Collection Featured Image URL
            - Can be a link to any type of content.
        - Collection Banner Image URL
            - Can be a link to any type of content.
        - Collection Size
            - Must be a number.
        - Mint Price
            - Must be at least 0.1 ERG.
        - Mint Start
        - Mint Expiry
            - Does not matter if the `Never Expire` button is selected.
        - On Sale End
            - Does not matter if the `Never Expire` button is selected.
            - Collection Token Burn
                - If NFTs are not sold within expiry collection tokens will be burned.
            - Collection Token Return
                - If NFTs are not sold within expiry collection tokens will be returned to artist address.
                - [Collection Tokens](https://github.com/ergoplatform/eips/blob/master/eip-0034.md) allow NFTs to be minted as part of a collection. If they are returned, artists can extend the collection with the remaining tokens.
    - Optional Fields
        - Socials
        - Royalties
    - Mint Configuration
        - Set the mint price in ERG.
        - Mint Start Date
        - Mint Expiry Date
            - You can choose that the sale never ends.
        - On Sale End
            - Collection Token Burn
                - When the sale ends, all remaining collection tokens in the state box will be burned.
            - Collection Token Return
                - When the sale ends, all remaining collection tokens in the state box will be returned to you.
        - Pool
            - You can cover the buyer's extra costs associated with minting (the sale tx itself), these include the following:
                - Issuer Box: 0.001 ERG (box from which the NFT token id will be derived)
                - Issuance Box: 0.001 ERG (user pk box where NFT will be held, should be removed in the future, this will go to the miner)
                - Miner Fee: 0.0016 ERG (sale tx)
                - Miner Fee: 0.0016 ERG (mint tx)
                - Lilium Fee: 5% of NFT price
                - Min Tx Operator Fee: 0.001 ERG
            - This feature adds 5% to the base Lilium sale setup fee.
        - Premint Token
            - Allows the buyer to mint an NFT before the sale period begins, however they must still pay full price.
            - This feature adds 5% to the base Lilium sale setup fee.
        - Whitelist Token
            - Allows the buyer to obtain a free NFT mint after the sale has started, however all Lilium fees must still be paid in ERG.
            - This feature adds 5% to the base Lilium sale setup fee.
            - If selected, the following will be displayed:
                - Whitelist Bypass
                    - This lets the user obtain a free NFT mint before the sale period begins.
                    - This is like the Premint Token but also free.
                    - Selecting this does not cost more.
        - Custom Token
            - Allows you to receive payment for the NFT in a token of you choice other than ERG (e.g. SigUSD).
            - This feature adds 5% to the base Lilium sale setup fee.
            - If selected, the following will be displayed:
                - Accept ERG
                    - This lets you receive payment in ERG as well, so the buyer will have the choice of paying the NFT price in the custom token or ERG.
                    - Selecting this does not cost more.

## Uploading Metadata
Check out [examples](/metadata-examples)

- From `Create Collection`, click `Next` and navigate to `Upload Files`
- Upload your metadata file in json format here.
    - Metadata data for a single NFT must include the following:
        - Name (type string)
        - Description (type string)
        - Image (type string)
        - ImageSHA256 (type string)
        - Misc. you may add anything thing else, but it won't be included.
        - Attributes array:
            - Contains an array of objects which must have
                - trait_type (type string)
                - value (type string)
        - Levels array
            -  contains an array of objects which must have
                - trait_type (type string)
                - max_value (type string)
                - value (type string)
        - Stats array
            -  contains an array of objects which must have
                - trait_type (type string)
                - max_value (type string)
                - value (type string)
        - Asset type
            - picture
            - audio
            - video
            - attachment
            - membership
            - The asset type should be provided as a string, i.e. in quotation marks.
        - Explicit
            - `true`
            - `false`
            - These values should not be in quotation marks.
    - The uploaded metadata must be an array of metadata for single NFTs

## Payment
- From `Upload Files`, click `Next` and navigate to `Payment`
- All you do here is click `Pay Now`
    - **Do not** leave this page until everything is complete
    - Large collections of 10k items may take longer than a minute
    - Upon completion, a json receipt will be downloaded **do not delete**
- Receipt **important**
    - Artist Tx
        - Made using the wallet connected to the Lilium website to pay the Lilium sale setup fee.
    - State Contract
        - Contract
            - Address of contract, keeps track of NFTs mints
        - **important** singleton
            - Artists will need to share this singleton id to buyers
        - Token amount
            - The amount of singleton tokens in existence
                - 1 if not using pool
                - 2 if using pool
    - Issuer Contract
        - Contract
            - Address of contract, validates metadata.
    - Proxy Contract
        - Contract
            - Address of contract, buyers send ERG here.
            - Allows for refunds if NFT is not purchased.
            - **Cannot** send ERG to this address directly or it **will** be lost.
    - Sale LP Contract
        - Contract
            - Address of contract, this holds the funds that pays for all Lilium sale fees for the buyer.
        - Singleton
            - This token id is the same as the state box singleton token id, used to verify that the sale lp can only be used for this specific sale.
    - Collection Token
        - ID of collection marketplaces will make use of this info.
        - Analogous to policy id on Cardano.
        - Analogous to ERC-721 contract address on Ethereum.
    - Pre-Mint Token
        - Token Id
        - Amount
            - Amount of premint tokens you wish to mint, this balance will be sent back to you after the sale setup process. You may then distribute these to your fans.
    - Whitelist Token
        - Token Id
        - Amount
            - Amount of whitelist tokens you wish to mint, this balance will be sent back to you after the sale setup process. You may then distribute these to your fans.
    - Custom Payment Token
        - Token Id
        - Token Amount
            - This is the amount you selected in the sale configuration settings, representing the NFT price in units of the custom token.

## Minting/Buying NFT
- From Lilium home page, naviage to [`Buy`](https://www.liliumergo.io/buy)
    - Connect Wallet
    - Proxy Address is the same for all collections currently, this cannot be modified.
    - Singleton ID
        - Enter the id provided by the artist.
    - Buttons
        - These will be rendered once you enter a valid sale singleton token id.
        - There is a possibility of 5 buttons in total being displayed, but only those that correspond to the specific sale configurations you chose during the sale setup process.
        - The possible options will be the following:
            - Pay With Premint Token
                - Must be selected if the buyer wants to mint an NFT before the official public sale period begins.
                - The premint token id does not need to be manually input by the buyer.
                - The premint token must be in the connected wallet of the buyer.
                - Payment method must be selected:
                    - Pay With Custom Token, if applicable.
                    - Pay With ERG, if applicable.
                    - Use Pool, if applicable.
            - Pay With Whitelist Token
                - Must be selected if the buyer wants to mint an NFT for free after the sale period begins, or before if you have enabled Whitelist Bypass as an option in your sale configuration settings during the sale setup process.
                - The whitelist token id does not need to be manually input by the buyer.
                - The whitelist token must be in the connected wallet of the buyer.
                - Payment method must be selected:
                    - Pay With Custom Token cannot be selected (whitelist token implies free mint, i.e. not paying NFT price)
                    - Pay With ERG, will be selected automatically.
                    - Use Pool, if applicable.
                        - If using pool, then Pay With ERG will automatically be unselected since the sale liquidity pool will be paying for the Lilium sale fees.
            - Pay With Custom Token
                - Must be selected if the buyer wants to mint an NFT without paying for the NFT price in ERG.
                - Payment method must be selected:
                    - Pay With ERG, if the buyer is paying for the Lilium fees with their own ERG.
                    - Use Pool, if you will be paying for the Lilium sale fees instead of the buyer.
            - Pay With ERG
                - Selected if the buyer is paying the Lilium sale fees.
                - If the sale only accepts ERG, then this button will not be displayed.
            - Use Pool
                - Selected if the buyer is not paying for the Lilium sale fees, instead being paid for by you through the sale liquidity pool.
        - If Pay With Custom Token is not selected, the NFT price will be paid for in ERG.
        - Pay With ERG is associated with how the Lilium sale fees will be paid for and not the NFT itself.

## Implementing Minting/Buying NFT for Artist's Custom Frontend
This section is for the artist's frontend developers

See node js implementation in [here](/frontend-impl/frontend-payment.js)
- From the singleton ID
    - Query box by token id
        - The below can be hardcoded as well, lilium does this dynamically to support any singleton ids
        - Parse ergoTreeConstants (must use explorer api which supports this)
            - NFT Price
                - Index 29
            - Miner Fee
                - Index 38
            - Lilium Fee
                - Index 30
    - Call lilium api to get the dynamic tx operator Fee
    - Total fee is a sum of
        - Box Creation Fee (0.001 ERG)
        - Miner Fee x2
        - Lilium Fee
        - NFT Price
        - TX Operator Fee
    - Create a TX
        - Output Box must have
            - ReceiverErgoTree in R4
            - Singleton ID in R5

## Help
Reach out to us for any issues on [Discord](https://discord.gg/24rFZWqKY3)
