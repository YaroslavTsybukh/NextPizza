export const calculateTotalWithFees = (totalAmount: number) => {
    const VAT = 15;
    const DELIVERY_PRICE = 100;

    const vatPrice = (totalAmount * VAT) / 100;

    return {
        totalPriceWithFees: totalAmount + vatPrice + DELIVERY_PRICE,
        deliveryPrice: DELIVERY_PRICE,
        vatPrice,
    };
};
