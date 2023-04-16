import axios from 'axios';
import { ErgoAddress, OutputBuilder, TransactionBuilder } from '@fleet-sdk/core';

const EXPLORER_API_URL = "https://tn-ergo-explorer.anetabtc.io"; // must support parsing constants in api
const PROXY_ADDRESS = '38qJGm1BqDYQND1YjLcaAJim843LLZJAqaZLnJGdujF9huhmRQmLfj5taSrmkLQovtatJbdLkTibRVNCvVVXjZfJcwSaDB7BDnvVpV7N1y2sS79sA16sKNnk91x3Cd7wTWgqv4SJa7d48NzrmFFWQFavGd5AVwntMfgfuJgvPwZVEfJCyUYSipev6zx2eg';
const API_URL = "https://api.liliumergo.io";

export const getServiceConf = async () => {
    const response = await axios.get(`${API_URL}/serviceConf`);
    return response.data;
};

const getBoxByTokenId = async (tokenID) => {
    const response = await axios.get(`${EXPLORER_API_URL}/api/v1/boxes/unspent/byTokenId/${tokenID}`);
    return response.data.items[0];
};
const isLastStateBox = async (box) => {
    return box.assets.length === 1 && Object.keys(box.additionalRegisters).length === 3;
};

const isHex = (str) => {
    const re = /[0-9A-Fa-f]{6}/g;
    return re.test(str);
};

const getRegex = (index) => new RegExp(`${index}: (.*?)(?=\\n|$)`);

const getBoxByTokenIdWithErrorHandling = async (tokenID) => {
    let box = '';
    try {
        box = await getBoxByTokenId(tokenID);
        if (typeof box === 'undefined') {
            console.log("Singleton may not exist");
            return null;
        }
    } catch (error) {
        console.log('Singleton may not exist')
        return null;
    }

    if (await isLastStateBox(box)) {
        console.log('Collection has sold out!')
        return null;
    }
    return box;
};

const getNFTPrice = (box) => {
    const ergoTreeConstants = box.ergoTreeConstants;

    const match = getRegex(29).exec(ergoTreeConstants);

    if (match) {
        return match[1];
    }
    console.log('Could not parse nft price constant');
    return null;
};

const getMinerFee = (box) => {
    const ergoTreeConstants = box.ergoTreeConstants;

    const match = getRegex(38).exec(ergoTreeConstants);

    if (match) {
        return match[1];
    }
    console.log('Could not parse miner fee price constant');
    return null;
};

const getLiliumFee = (box) => {
    const ergoTreeConstants = box.ergoTreeConstants;

    const match = getRegex(30).exec(ergoTreeConstants);

    if (match) {
        return match[1];
    }
    toast.warn('Could not fetch NFT price', noti_option_close('try-again'));
    console.log('Could not parse lilium fee price constant');
    return null;
};

async function main() {
    const singletonID = "8abe2ea2becca90dae913f519e5152f88392eb7f9f81d90819e05b6ea5e4d966"; // enter singleton id
    if (typeof singletonID === 'undefined') {
        console.log("Enter Singleton ID");
    }
    if (!isHex(singletonID)) {
        console.log("Enter proper ID");
        return;
    }

    const box = await getBoxByTokenIdWithErrorHandling(singletonID);
    if (box === null) {
        return;
    }

    const nftPrice = parseInt(getNFTPrice(box));
    const minerFee = parseInt(getMinerFee(box));
    const liliumFee = parseInt(getLiliumFee(box));
    const boxCreationFee = (0.001 * 10 ** 9);

    let txOperatorFee = '';
    try {
        txOperatorFee = parseInt((await getServiceConf()).minTxOperatorFeeNanoErg); // dynamic so must get from lilium api
    } catch (error) {
        console.log(error);
        console.log('Could not fetch NFT price');
        return;
    }

    if (nftPrice === null || minerFee === null || liliumFee === null) {
        return;
    }
    console.log('nftPrice:', nftPrice);
    console.log('minerFee:', minerFee);
    console.log('liliumFee:', liliumFee);
    console.log('txOperatorFee:', txOperatorFee);
    console.log('boxCreationFee:', boxCreationFee)

    const totalNFTPrice = boxCreationFee + minerFee + nftPrice + liliumFee + minerFee + txOperatorFee;
    console.log('totalNFTPrice:', totalNFTPrice);


    /**

    const inputs = await ergo.get_utxos();
    const creationHeight = await ergo.get_current_height();
    const changeAddress = await ergo.get_change_address();
    let receiverErgoTree = ErgoAddress.fromBase58(String(changeAddress)).ergoTree;
    receiverErgoTree = receiverErgoTree.substring(2);

    const proxyOutbox = new OutputBuilder(totalNFTPrice.toString(), proxyAddress).setAdditionalRegisters({
      R4: receiverErgoTree,
      R5: '0e20' + singletonID,
    });

    const changeAddress = "3WwjcvvVCK29DDFmNCUofUfZXQgaNVx14fTvPPhoeMDHBoLk66Wo"; //buyer address from wallet

    let receiverErgoTree = ErgoAddress.fromBase58(String(changeAddress)).ergoTree;
    receiverErgoTree = receiverErgoTree.substring(2);

    const proxyOutbox = new OutputBuilder(totalNFTPrice.toString(), PROXY_ADDRESS).setAdditionalRegisters({
        R4: receiverErgoTree,
        R5: '0e20' + singletonID,
    });

        const unsignedTransaction = new TransactionBuilder(creationHeight)
          .from(inputs) // add inputs
          .to([proxyOutbox])
          .sendChangeTo(changeAddress) // set change address
          .payMinFee() // set fee
          .build('EIP-12').toEIP12Object();

        const signedTx = await ergo.sign_tx(unsignedTransaction);
        const hash = await ergo.submit_tx(signedTx);
    */


    return;
}

main()

