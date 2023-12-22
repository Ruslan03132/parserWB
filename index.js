async function getData() {
    const response = await fetch(
        "https://card.wb.ru/cards/v1/detail?appType=1&curr=rub&dest=-1257786&spp=27&nm=190456385;166416619;189785767;160738996;183270278;183269075;183266945;166417437;146972802;190879343;178144226;178142953;183271022;182770058;160737571;36328331;154611222;190627235;160740830;173462958;67508839"
    );
    const data = await response.json();
    return data.data.products;
}
async function makeResult() {
    const result = [];
    const products = await getData();
    for (const itemProducts of products) {
        const itemSizeForResult = {};
        for (const itemSize of itemProducts.sizes) {
            let countQty = 0;
            countQty = itemSize.stocks.reduce((accum, value) => {
                return accum + value.qty;
            }, 0);
            itemSizeForResult[itemSize.origName] = countQty;
        }
        result.push({
            art: itemProducts.id,
            stock: itemSizeForResult,
        });
    }
    return result;
}

async function checkResult() {
    const result = await makeResult();
    for (const item of result) {
        console.log(item);
        for (const itemSize of Object.entries(item.stock)) {
            console.log(itemSize);
        }
    }
}

checkResult();
