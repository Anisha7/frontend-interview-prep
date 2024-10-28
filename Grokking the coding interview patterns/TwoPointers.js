// **** Introduction **** 
// This file demonstrates common algorithmic problems using the two-pointer technique, 
// useful when finding two or more elements in an array that satisfy a given condition.
// We will also cover basic array manipulations like reversing, moving elements, and summing pairs.

// **** Practice Problem Set 1 **** 

// Helper: Given an array and two indices, swap the elements in place
const swap = (arr, a, b) => {
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

// Problem 1: Reverse an array in place
// Given an array of integers, reverse it in place.
// Time complexity: O(N), Space complexity: O(1)
const arrayReverse = (arr) => {
    let start = 0;
    let end = arr.length - 1;

    // Continue swapping elements from the start and end until the pointers meet
    while (start < end) {
        swap(arr, start, end); // Use helper function to swap
        start++;
        end--;
    }
    return arr;
};

// Problem 2: Find two numbers that sum to a target in a sorted array
// Given a sorted array of integers, find a pair in the array that sums to a number T.
// If no such pair exists, return an empty string.
// Two-pointer approach: One pointer starts at the beginning, the other at the end.
const twoSum = (arr, t) => {
    let start = 0;
    let end = arr.length - 1;

    // Continue until the two pointers cross each other
    while (start < end) {
        const currSum = arr[start] + arr[end]; // Calculate current sum of the two pointers
        
        if (currSum === t) {
            return `${arr[start]} , ${arr[end]}`; // Found the pair
        }

        // Move pointers based on the sum
        if (currSum < t) {
            start++; // Move the start pointer to the right if sum is too small
        } else {
            end--; // Move the end pointer to the left if sum is too large
        }
    }

    return ''; // No valid pair found
};

// Problem 3: Move all zeroes to the end of the array
// Given an array of integers, move all zeroes to the end while maintaining the order of non-zero elements.
// Time complexity: O(N), Space complexity: O(1)
const moveZeroes = (arr) => {
    let start = 0;
    let end = arr.length - 1;

    // Process the array using two pointers: start for non-zero, end for zero
    while (start < end) {
        if (arr[end] === 0) {
            end--; // Decrement end pointer for zeroes
        } else if (arr[start] === 0) {
            swap(arr, start, end); // Swap zero with non-zero
            start++; // Increment start pointer for next check
        } else {
            start++; // Move start pointer for non-zero elements
        }
    }

    return arr;
};

// Problem 4: Find three numbers that sum to a target (e.g., 825) in a sorted array
// Find any three values in a sorted array that sum up to the target.
// This uses the twoSum helper function to find pairs for each element.
const threeSum = (arr, t) => {
    // Iterate through the array, fixing one element at a time
    for (let i = 0; i < arr.length; i++) {
        // Find two numbers that sum to (target - arr[i]) using twoSum
        const res = twoSum(arr.slice(i + 1), t - arr[i]);
        if (res.length > 0) {
            return res + ' , ' + arr[i]; // Return the valid triplet if found
        }
    }
    return ''; // No valid triplet found
};

// **** Test Cases for each function **** 

// Tests for arrayReverse function
const testArrayReverse = () => {
    console.log("Running testArrayReverse...");
    const arr1 = [0, 1, 2, 3, 4];
    arrayReverse(arr1);
    console.assert(arr1.toString() === '4,3,2,1,0', 'Test failed: arrayReverse 1');

    const arr2 = [];
    arrayReverse(arr2);
    console.assert(arr2.toString() === '', 'Test failed: arrayReverse 2 (Empty array)');

    const arr3 = [1];
    arrayReverse(arr3);
    console.assert(arr3.toString() === '1', 'Test failed: arrayReverse 3 (Single element)');

    const arr4 = [2, -5, 7, 0];
    arrayReverse(arr4);
    console.assert(arr4.toString() === '0,7,-5,2', 'Test failed: arrayReverse 4 (Mixed elements)');
};

// Tests for twoSum function
const testTwoSum = () => {
    console.log("Running testTwoSum...");
    console.assert(twoSum([0, 2, 1, 3, 4], 5) === '2 , 3', 'Test failed: twoSum 1');
    console.assert(twoSum([0, 2, 1, 3, 4], 1) === '0 , 1', 'Test failed: twoSum 2');
    console.assert(twoSum([0, 2, 8, 3, 4], 8) === '', 'Test failed: twoSum 3 (No pair)');
    
    // Additional test cases
    console.assert(twoSum([2, 7, 11, 15], 9) === '2 , 7', 'Test failed: twoSum 4 (Basic test)');
    console.assert(twoSum([-2, -1, 3, 6], 1) === '-2 , 3', 'Test failed: twoSum 5 (Negative numbers)');
    console.assert(twoSum([5, 5, 5, 5], 10) === '5 , 5', 'Test failed: twoSum 6 (Duplicates)');
};

// Tests for moveZeroes function
const testMoveZeroes = () => {
    console.log("Running testMoveZeroes...");
    console.assert(moveZeroes([0, 0, 1, 2, 0, 4, 5, 0, 1]).toString() === '1,5,1,2,4,0,0,0,0', 'Test failed: moveZeroes 1');
    
    // Additional test cases
    console.assert(moveZeroes([1, 2, 3]).toString() === '1,2,3', 'Test failed: moveZeroes 2 (No zeroes)');
    console.assert(moveZeroes([0, 0, 0]).toString() === '0,0,0', 'Test failed: moveZeroes 3 (All zeroes)');
    console.assert(moveZeroes([0, 1, 0, 2, 0, 3]).toString() === '3,1,2,0,0,0', 'Test failed: moveZeroes 4 (Mixed elements)');
};

// Tests for threeSum function
const testThreeSum = () => {
    console.log("Running testThreeSum...");
    console.assert(threeSum([1, 2, 3, 4, 5, 6], 7) === '2 , 4 , 1', 'Test failed: threeSum 1');
    
    // Additional test cases
    console.assert(threeSum([1, 2, 3, 4, 5], 9) === '3 , 5 , 1', 'Test failed: threeSum 2 (Valid triplet)');
    console.assert(threeSum([10, 20, 30, 40, 50], 100) === '40 , 50 , 10', 'Test failed: threeSum 3');
    console.assert(threeSum([5, 5, 5, 5], 15) === '5 , 5 , 5', 'Test failed: threeSum 4 (Triplet of the same number)');
    console.assert(threeSum([1, 2, 4], 10) === '', 'Test failed: threeSum 5 (No valid triplet)');
};

// Main function to run all tests
const main = () => {
    testArrayReverse();
    testTwoSum();
    testMoveZeroes();
    testThreeSum();
};

main(); // Execute all tests
