// https://neetcode.io/problems/buy-and-sell-crypto/question

We want to buy at a low price and sell at a higher price that comes after it.
Using two pointers helps us track this efficiently:

l is the buy day (looking for the lowest price)
r is the sell day (looking for a higher price)
If the price at r is higher than at l, we can make a profit — so we update the maximum.
If the price at r is lower, then r becomes the new l because a cheaper buying price is always better.

By moving the pointers this way, we scan the list once and always keep the best buying opportunity.

Algorithm
Set two pointers:
   l = 0 (buy day)
   r = 1 (sell day)
   maxP = 0 to track maximum profit
While r is within the array:
If prices[r] > prices[l], compute the profit and update maxP.
Otherwise, move l to r (we found a cheaper buy price).
Move r to the next day.
Return maxP at the end.


class Solution {
    /**
     * @param {number[]} prices
     * @return {number}
     */
    maxProfit(prices) {
        let l = 0,
            r = 1;
        let maxP = 0;

        while (r < prices.length) {
            if (prices[l] < prices[r]) {
                let profit = prices[r] - prices[l];
                maxP = Math.max(maxP, profit);
            } else {
                l = r;
            }
            r++;
        }
        return maxP;
    }
}
