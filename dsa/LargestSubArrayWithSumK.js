const nums = [-2, -1, 2, 1]
const k = 1 
// Output : 2 length of sub array [-1, 2]

// const nums = [1, -1, 5, -2, 3]
// const k = 3
// Output: 4 length of subarray [1, -1, 5, -2]



const findLongestSubarrayWithSumEqualsK = (nums, k) => {
    let result = 0
    for (let i =0; i< nums.length;i++) {
        let sum = 0;
        for (let j=i; j<nums.length; j++) {
            sum += nums[j];
            if (sum === k) {
              result = Math.max(result, j - i + 1)
            }
        }
    }
    return result
}


/*
prefixSumMap
{
    [sum]: index
} // Store it only if sum is not present

{ -2 => 0, -3 => 1, -1 => 2, 0 => 3 }

Accessing complement is present in above map
if (sum - k) is present in map, then we have a subarray with sum k
prevIndex = prefixSumMap[sum-k]
Math.max(mathLen, i - prevIndex)

*/

const findLongestSubarrayWithSumEqualsKV2 = (nums, k) => {
    const prefixSumMap = new Map(); // sum -> earliest index
    let sum = 0;
    let maxLen = 0;

    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];

        if (sum === k) {
            maxLen = i + 1; // from 0 to i
        }

        if (prefixSumMap.has(sum - k)) {
            const prevIndex = prefixSumMap.get(sum - k);
            maxLen = Math.max(maxLen, i - prevIndex);
        }

        // store first occurrence of prefix sum only
        if (!prefixSumMap.has(sum)) {
            prefixSumMap.set(sum, i);
        }
    }

    return maxLen;
};

console.log(findLongestSubarrayWithSumEqualsKV2(nums, k))
console.log(findLongestSubarrayWithSumEqualsK(nums, k))









