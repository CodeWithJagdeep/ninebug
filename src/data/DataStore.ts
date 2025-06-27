import type { Company, ProblemSet } from "@/types/types";

// Add these constants before your component
export const companies: Company[] = [
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    url: "https://google.com",
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    url: "https://amazon.com",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    url: "https://microsoft.com",
  },
  {
    name: "Meta",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Meta_Platforms_Inc._logo.svg",
    url: "https://meta.com",
  },
  {
    name: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    url: "https://apple.com",
  },
  {
    name: "Netflix",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    url: "https://netflix.com",
  },
  {
    name: "Uber",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.svg",
    url: "https://uber.com",
  },
  {
    name: "Airbnb",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg",
    url: "https://airbnb.com",
  },
  {
    name: "Twitter",
    logo: "https://upload.wikimedia.org/wikipedia/en/6/60/Twitter_Logo_as_of_2021.svg",
    url: "https://twitter.com",
  },
  {
    name: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    url: "https://linkedin.com",
  },
];

export const problemSets: ProblemSet[] = [
  {
    title: "Top Interview Questions",
    count: 150,
    difficulty: "Medium",
    companies: [companies[0], companies[1], companies[2]],
  },
  {
    title: "Dynamic Programming",
    count: 75,
    difficulty: "Hard",
    companies: [companies[0], companies[1], companies[4]],
  },
  {
    title: "Graph Algorithms",
    count: 60,
    difficulty: "Hard",
    companies: [companies[0], companies[7], companies[2]],
  },
];

export const lesson = {
  content: {
    video: {
      url: "",
      duration: 0,
      thumbnail: "",
      captions: [],
    },
    text: '<p>Given an array of numbers, your task is to find the largest (maximum) value present in the array.</p><p>For example:</p><ul><li><p>If the input array is <code>[1, 5, 2, 8, 3]</code>, the maximum value is <code>8</code>.</p></li><li><p>If the input array is <code>[100, 10, 50, 200, 75]</code>, the maximum value is <code>200</code>.</p></li></ul><p>You are required to implement a function that takes an array as input and returns the <code>maximum</code> value among its elements. If the array is empty, your function should handle this appropriately (e.g., return negative infinity or throw an error, as per typical expectations for such cases).</p><p>Example 1:</p><pre><code class="language-plaintext">Input: numbers = [1, 5, 2, 8, 3]\nOutput: 8\nExplanation: Among 1, 5, 2, 8, and 3, the largest value is 8.</code></pre><p>Example 2:</p><pre><code class="language-plaintext">Input: temperatures = [-5, -1, -10, -2]\nOutput: -1\nExplanation: In an array of negative numbers, -1 is the largest.</code></pre><p>Example 3:</p><pre><code class="language-plaintext">Input: temperatures = [-5, -1, -10, -2]\nOutput: -1\nExplanation: In an array of negative numbers, -1 is the largest.</code></pre><h3><strong>Constraints</strong></h3><ul><li><p><code>0 &lt;= arr.length &lt;= 10^5</code></p></li><li><p><code>-10^9 &lt;= arr[i] &lt;= 10^9</code></p></li><li><p>The array will only contain numerical values.</p></li></ul><p><strong>Time Complexity:</strong> <code>O(n),</code> where <code>n</code> is the number of elements in the array. We iterate through the array once. <strong>Space Complexity:</strong> <code>O(1)</code>, as we only use a constant amount of extra space for the <code>max</code> variable.</p><p></p>',
    slides: [],
    interactiveElements: [],
  },
  codingChallenge: {
    constraints: [],
    timeLimit: 5000,
    memoryLimit: 256,
    testCases: [],
  },
  progress: {
    checkPointsCompleted: [],
  },
  _id: "6845ca582b6f8c417c56cd9a",
  title: "Find Maximum Value in an Array",
  slug: "find-maximum-value-in-an-array",
  version: 1,
  type: "coding-challenge",
  status: "draft",
  difficulty: 0,
  learningObjectives: [
    "To efficiently identify the largest numerical value within an array using various looping constructs in JavaScript.",
  ],
  explanation:
    "This problem focuses on traversing an array to find its extreme values. We'll explore how to iterate through an array using for loops (including the classic for and the modern for...of loop) while maintaining a variable that keeps track of the largest number encountered so far. This is a fundamental operation in data processing and analysis.",
  preCode: "",
  extraTopic: "",
  extraResources: [],
  mcqs: [],
  checkPoints: [],
  solutions: [],
  programmingLanguage: "JavaScript",
  contentLanguage: "",
  author: "680bb9c581aa1f607b2e7ca2",
  reviewers: [],
  categories: [],
  prerequisites: [],
  prevLessons: "",
  nextLessons: "",
  ratings: [],
  averageRating: 0,
  likes: [],
  comments: [],
  completions: [],
  viewCount: 0,
  createdAt: "2025-06-08T17:33:53.677Z",
  updatedAt: "2025-06-08T17:33:53.677Z",
  __v: 0,
  duration: 2,
  likeCount: 0,
  commentCount: 0,
  completionRate: 0,
  id: "6845ca582b6f8c417c56cd9a",
};

export const sampleSolutions = `function riverSizes(matrix: number[][]): number[] {
  const sizes: number[] = [];
  const visited = matrix.map(row => row.map(_ => false));

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (visited[i][j]) continue;
      traverseNode(i, j, matrix, visited, sizes);
    }
  }

  return sizes;
}

function traverseNode(
  i: number,
  j: number,
  matrix: number[][],
  visited: boolean[][],
  sizes: number[]
) {
  let currentRiverSize = 0;
  const stack = [[i, j]];

  while (stack.length) {
    const [currI, currJ] = stack.pop()!;
    if (visited[currI][currJ]) continue;
    visited[currI][currJ] = true;

    if (matrix[currI][currJ] === 0) continue;
    currentRiverSize++;

    const neighbors = getUnvisitedNeighbors(currI, currJ, matrix, visited);
    for (const neighbor of neighbors) {
      stack.push(neighbor);
    }
  }

  if (currentRiverSize > 0) sizes.push(currentRiverSize);
}

function getUnvisitedNeighbors(
  i: number,
  j: number,
  matrix: number[][],
  visited: boolean[][]
): [number, number][] {
  const neighbors: [number, number][] = [];

  if (i > 0 && !visited[i - 1][j]) neighbors.push([i - 1, j]);
  if (i < matrix.length - 1 && !visited[i + 1][j]) neighbors.push([i + 1, j]);
  if (j > 0 && !visited[i][j - 1]) neighbors.push([i, j - 1]);
  if (j < matrix[0].length - 1 && !visited[i][j + 1]) neighbors.push([i, j + 1]);

  return neighbors;
}
`;
