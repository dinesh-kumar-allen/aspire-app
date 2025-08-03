const minSubArrayLen = (target, nums) => {
    let left = 0;
    let sum = 0;
    let minLength = Infinity;

    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];

        // Shrink the window from the left while the sum is enough
        while (sum >= target) {
            minLength = Math.min(minLength, right - left + 1);
            sum -= nums[left];
            left++;
        }
    }

    return minLength === Infinity ? 0 : minLength;
};

// Example test cases
console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])); // Output: 2
console.log(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1])); // Output: 0