
/*
prefixSumMap

{
    [sum]: count
}

For each loop item
 -> add sum
 -> calculate complement -> sum - k
 -> prefixSumMap[complement] exists
 -> Increase count -> count += prefixSumMap[complement] 

-> Store 
    prefixSumMap[sum] = ((prefixSumMap[sum] || 0) + 1);
    // To maintain previous count


*/

const countSubarraysWithSumK = (nums, k) => {
    let count = 0;
    let prefixSum = 0;
    const prefixSumMap = new Map();  // Map<prefixSum, frequency>

    prefixSumMap.set(0, 1); // Base case: sum 0 has occurred once

    for (let i = 0; i < nums.length; i++) {
        prefixSum += nums[i];

        // Check if (prefixSum - k) has been seen before
        const complement = prefixSum - k;
        if (prefixSumMap.has(complement)) {
            count += prefixSumMap.get(complement); // Add all matching subarrays
        }

        // Record the current prefixSum in the map
        prefixSumMap.set(prefixSum, (prefixSumMap.get(prefixSum) || 0) + 1);
    }

    return count;
};


console.log(countSubarraysWithSumK([1, 1, 1], 2));     // Output: 2
console.log(countSubarraysWithSumK([1, 2, 3], 3));     // Output: 2 ([1,2] and [3])
console.log(countSubarraysWithSumK([3, 4, 7, 2, -3, 1, 4, 2], 7)); // Output: 4