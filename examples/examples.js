#!/usr/bin/env node
const Sep6Client = require('../lib/index');

async function main() {

    const client = new Sep6Client(
        'sep6.whalestack.com'
    );

    let response1 = await client.get('/info');

    console.log(response1.data);

    // let response2 = await client.get('/deposit', {
    //     'asset_code': 'BTC',
    //     'account': 'GDONUHZKLSYLDOZWR2TDW25GFXOBWCCKTPK34DLUVSOMFHLGURX6FNU6',
    //     'memo': 'Sent via SEP-6',
    //     'memo_type': 'text'
    // });
    //
    // console.log(response2.data);

    // let response3 = await client.get('/withdraw', {
    //     'asset_code': 'BTC',
    //     'dest': 'bc1qj633nx575jm28smgcp3mx6n3gh0zg6ndr0ew23'
    // });
    //
    // console.log(response3.data);

}

main();










