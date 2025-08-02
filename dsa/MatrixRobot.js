
/*
    Given a matrix of characters and a query, find all the robots that match the query

    We need to find the robots that match the query

    - For each cell in the matrix, calculate the distance to the blocker in all four directions
    - If the distance to the blocker in all four directions is equal to the query, add the cell to the result
    - Return the result

    - For each cell in the matrix, calculate the distance to the blocker in all four directions
    - If the distance to the closes blocker in all four directions is equal to the query, add the cell to the result
    - Return the result array, if closest blocker in all four directions is equal to the query else return empty array

    Time Complexity: O(n^2)
    Space Complexity: O(1)

    
*/


const matrix = [
    ['O','E','E','E','X'],
    ['E','O','X','X','X'],
    ['E','E','E','E','E'],
    ['X','E','O','E','E'],
    ['X','E','X','E','X']
  ];
  
  const query = [2, 2, 1, 3];
  
  const findMatchingRobots = (matrix, query) => {
   const rows = matrix.length;
    const cols = matrix[0].length;
    const result = [];
      
      const distanceToBlocker = (r, c, dr, dc) => {
      let dist = 1;
      r += dr;
      c += dc;
  
      while (r >= 0 && r < matrix.length && c >= 0 && c < matrix[0].length && matrix[r][c] !== 'X') {
        dist++;
        r += dr;
        c += dc;
      }
  
      // If we go out of bounds, it’s a blocker too (no need to add 1 since we stop before that)
      return dist;
    }
    
      for (let i =0; i<rows; i++) {
          for (let j = 0; j< cols; j++) {
              if (matrix[i][j] === 'O') {
                   const left = distanceToBlocker(i, j, 0, -1);
                const top = distanceToBlocker(i, j, -1, 0);
                const bottom = distanceToBlocker(i, j, 1, 0);
                const right  = distanceToBlocker(i, j, 0, 1);
  
                  const robotQuery = [left, top, bottom, right];
                  if (robotQuery.every((v, i) => v === query[i])) {
                      result.push([i, j]);
                  }
              }
          }
      }
      return result
  }
  
  console.log(findMatchingRobots(matrix, query)); 