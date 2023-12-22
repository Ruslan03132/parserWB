const STOCK_KAZAN_ID = 117986;

async function getData() {
    const response = await fetch(
        "https://card.wb.ru/cards/v1/detail?appType=1&curr=rub&dest=-1257786&spp=27&nm=190456385;166416619;189785767;160738996;183270278;183269075;183266945;166417437;146972802;190879343;178144226;178142953;183271022;182770058;160737571;36328331;154611222;190627235;160740830;173462958;67508839"
    );
    const data = await response.json();
    return data.data.products;
}

export async function getQuantityKazanWB() {
    const products = await getData();
    const result = products.map((product) => {
        const itemSizeForResult = product.sizes.reduce((acc, size) => {
            const stockKazan = size.stocks.find((stock) => {
                return stock.wh === STOCK_KAZAN_ID;
            });
            acc[size.origName] = stockKazan?.qty || 0;
            return acc;
        }, {});

        return {
            art: product.id,
            stock: itemSizeForResult,
        };
    });

    return result;
}

getQuantityKazanWB().then((value) => console.log(value));
