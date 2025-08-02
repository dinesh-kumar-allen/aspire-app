// TWO SUM

const nums = [2, 7, 11, 15, 6]
const target = 13  

const findTwoSum = (nums, target) => {
    const result = []
    for (let i = 0; i< nums.length; i++) {
        for (let j = i+1; j< nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                result.push([i, j])
            }
        }
    }
    return result
    
}

/*
{
    7: [],
    1: 2,
    2: 4,
    3: 8
}
Store Map in [target - nums[i]]: [i] (Complement : [index])
So when a num which matches value in map, those are exact results of target
*/

const findTwoSumV2 = (nums, target) => {
    const result = []
    const map = {
        [target-nums[0]]: [0]
    }
    for (let i = 1; i< nums.length; i++) {
       if (map[nums[i]]) {
           map[nums[i]].forEach(j => {
                result.push([j, i])       
           })
       }
       const complement = target - nums[i]
       map[complement] = (map[complement] || []).concat(i)    
    }
    return result
    
}

console.log(findTwoSum(nums, target))
console.log(findTwoSumV2(nums, target))