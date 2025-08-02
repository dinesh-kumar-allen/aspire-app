

/*
    Given a string s, find the length of the longest substring without repeating characters.

    This is a valid sliding window problem
    We need to find the longest substring without repeating characters
    - Start with left = 0 and right = 0 & for loop to move the right pointer
    - If the right pointer character is in the set
       -- remove the character at the left pointer from the set and
       -- Move the left pointer to the right until the right pointer character is not in the set
    - If the character is not in the set, add it to the set
    - If current length is greater than the maxLen,
       --u pdate the maxLen and the startIndex as left pointer
    - Return the maxLen and the substring
    
*/

const lengthOfMaxLenAndSubstringWithoutRepeatingCharacters = (s) => {
    let left = 0;
    let maxLen = 0;
    let startIndex = 0;  // start index of max substring
    const seen = new Set();

    for (let right = 0; right < s.length; right++) {
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;
        }

        seen.add(s[right]);

        if (right - left + 1 > maxLen) {
            maxLen = right - left + 1;
            startIndex = left;
        }
    }

    return {
        subString: s.slice(startIndex, startIndex + maxLen),
        maxLen
    }
};



console.log(lengthOfMaxLenAndSubstringWithoutRepeatingCharacters("abcabcbb")); // 3 ("abc")
console.log(lengthOfMaxLenAndSubstringWithoutRepeatingCharacters("bbbbb"));    // 1 ("b")
console.log(lengthOfMaxLenAndSubstringWithoutRepeatingCharacters("pwwkew"));   // 3 ("wke")
console.log(lengthOfMaxLenAndSubstringWithoutRepeatingCharacters("")); 
