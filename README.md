
# Lilium Artist Docs

This will be a guide for working with Lilium!


## Getting Started

Vist the [site](https://www.liliumergo.io)

- Connect your wallet!
    - The wallet connected will be your artist address
    - All market places will show the artwork comes from this address
    
    - Navigate to [create collection](https://www.liliumergo.io/create-collection)
    - Required Fields
        - Collection Name
        - Collection Description
        - Collection Category
        - Collection Logo URL
            - Can be a link to any type of content
        - Collection Featured Image URL
            - Can be a link to any type of content
        - Collection Banner Image URL
            - Can be a link to any type of content
        - Collection Size
            - Must be a number
        - Mint Price
            - Must be at least 0.1 ERG
        - Mint Start
        - Mint Expiry
            - Does not matter if the `Never Expire` button is selected
        - On Sale End
            - Does not matter if the `Never Expire` button is selected
            - Collection Token Burn
                - If NFTs are not sold within expiry collection tokens will be burned
            - Collection Token Return
                - If NFTs are not sold within expiry collection tokens will be returned to artist address
                - [Collection Tokens](https://github.com/ergoplatform/eips/blob/master/eip-0034.md) allow NFTs to be minted as part of a collection. If they are returned, artists can extend the collection with the remaining tokens
    - Optional Fields
        - Socials
        - Royalties


## Uploading Metadata

Check out [examples](/metadata-examples)

- From `Create Collection`, click `Next` and navigate to `Upload Files`
- Upload your metadata file in json format here
    - Metadata data for a single NFT must include the following
        - name (type string)
        - description (type string)
        - image (type string)
        - imageSHA256 (type string)
        - Misc. you may add anything thing else but it won't be included 
        - attributes array
            - contains an array of objects which must have
                - trait_type (type string)
                - value (type string)
        - levels array 
            -  contains an array of objects which must have
                - trait_type (type string)
                - max_value (type string)
                - value (type string)
        - stats array
            -  contains an array of objects which must have
                - trait_type (type string)
                - max_value (type string)
                - value (type string)
    - The uploaded metadata must be an array of metadata for single NFTs


## Payment

- From `Upload Files`, click `Next` and navigate to `Payment`
- All you do here is click `Pay Now`
    - **Do not** leave this page until everything is complete
    - Large collections of 10k items may take longer than a minute
    - Upon completion, a json receipt will be downloaded **do not delete**
- Receipt **important**
    - State Contract
        - contract
            - address of contract, keeps track of NFTs mints
            - **important** singleton
                - Artists will need to share this singleton id to buyers
    - Issuer Contract
        - contract 
            - address of contract, validates metadata
    - Proxy Contract
        - contract
            - address of contract, buyers send ERG here
            - allows for refunds if NFT is not purchased
            - **cannot** send ERG to this address directly or it **will** be lost
    - Collection Token
        - ID of collection marketplaces will make use of this info
        - Analogous to policy id on Cardano
        - Analogous to ERC-721 contract address on Ethereum


## Minting/Buying NFT

- From Lilium home page, naviage to [`Mint NFT`](https://www.liliumergo.io/pay)
    - Connect Wallet
    - Proxy Address is the same for all collections currently, this cannot be modified
    - Singleton ID
        - Enter the id provided by the artist
    - NFT Price
        - This will be automatically calculated, this cannot be modified
        - The final price includes the sum of
            - NFT Price (set by artist)
            - Miner Fee (internal tx fee required by off-chain bots)
            - Lilum Fee (5% of NFT Price required by contracts)
            - TX Operator Fee (reward for off-chain bots)

## Implementing Minting/Buying NFT for Artist's Custom Frontend

This section is for the artist's frontend developers

See node js implementation in [here](/frontend-impl/frontend-payment.js)

- From the singleton ID
    - Query box by token id 
        - The below can be hardcoded as well, lilium does this dynamically to support any singleton ids
        - parse ergoTreeConstants (must use explorer api which supports this)
            - NFT Price
                - index 29
            - Miner Fee
                - index 38
            - Lilium Fee
                - index 30
    - call lilium api to get the dynamic tx operator Fee
    - Total fee is a sum of 
        - Box Creation Fee (0.001 ERG)
        - Miner Fee x2
        - Lilium Fee
        - NFT Price
        - TX Operator Fee
    - Create a TX
        - Output Box must have
            - receiverErgoTree in R4
            - singleton ID in R5




## Help

Reach out to us for any issues on [discord](https://discord.gg/24rFZWqKY3)

