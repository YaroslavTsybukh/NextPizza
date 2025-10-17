export const calculateTotalWithFees = (totalAmount: number) => {
    const VAT = 15;
    const DELIVERY_PRICE = totalAmount > 0 ? 100 : 0;

    const vatPrice = (totalAmount * VAT) / 100;

    return {
        totalPriceWithFees: totalAmount + vatPrice + DELIVERY_PRICE,
        deliveryPrice: DELIVERY_PRICE,
        vatPrice,
    };
};
