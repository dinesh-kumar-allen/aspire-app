/*
    Given a string s and an integer k, find the longest substring with exactly k distinct characters.

    This is a valid sliding window problem

    We need to find the longest substring with exactly k distinct characters

    Maintain a frequency map to keep track of the frequency of the characters in the current window

    - Start with left = 0 and right = 0 & for loop to move the right pointer
    - Add the right character to the frequency map and increment the frequency with existing frequency
    - While the frequency map size is greater than k,
       -- decrement the frequency of the left character
       -- if the frequency of the left character is 0, remove the character from the map
       -- increment the left pointer until the frequency map size is less than or equal to k
    - If the current window length is greater than the maxLen, update the maxLen and the result
    - Return the maxLen and the result
    - If the frequency map size is equal to k, add the current window to the result

    Time Complexity: O(n)
    Space Complexity: O(k)
    
*/
function longestSubstringsWithKDistinct(s, k) {
    let left = 0;
    let maxLen = 0;
    let result = [];

    const freqMap = new Map();

    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];
        freqMap.set(rightChar, (freqMap.get(rightChar) || 0) + 1);

        // Shrink window if we have more than k distinct chars
        while (freqMap.size > k) {
            const leftChar = s[left];
            freqMap.set(leftChar, freqMap.get(leftChar) - 1);
            if (freqMap.get(leftChar) === 0) {
                freqMap.delete(leftChar);
            }
            left++;
        }

        const windowLen = right - left + 1;

        if (windowLen > maxLen) {
            maxLen = windowLen;
            result = [s.slice(left, right + 1)];
        } else if (windowLen === maxLen) {
            result.push(s.slice(left, right + 1));
        }
    }

    return { maxLen, substrings: result };
}



console.log(longestSubstringsWithKDistinct("eceba", 2));
// Output:
// {
//   maxLen: 3,
//   substrings: [ 'ece' ]
// }

console.log(longestSubstringsWithKDistinct("aaabcdefffgh", 2));
// Output:
// {
//   maxLen: 4,
//   substrings: [ 'aaab', 'deff', 'ffff' ]
// }

console.log(longestSubstringsWithKDistinct("aabbcc", 1));
// Output:
// {
//   maxLen: 2,
//   substrings: [ 'aa', 'bb', 'cc' ]
// }

console.log(longestSubstringsWithKDistinct("abcadcacacaca", 3));
// Output:
// {
//   maxLen: 11,
//   substrings: [ 'cadcacacaca' ]
// }
