function SampleQuestion() {
  return (
    <div className="h-[650px] overflow-hidden">
      <h1 className="text-2xl font-bold text-white/90 mb-6">Two Sum Problem</h1>

      <div className="">
        <h2 className="text-xl font-semibold text-white/80 mb-3 border-b pb-2">
          Problem Description:
        </h2>
        <div className="space-y-4 text-white/80">
          <p className="leading-7">
            Given an array of integers{" "}
            <code className="border px-2 py-1 rounded text-sm text-white font-mono font-semibold">
              nums
            </code>{" "}
            that is already{" "}
            <strong className="font-medium text-white/90">
              sorted in non-decreasing order
            </strong>
            , find two numbers such that they add up to a specific{" "}
            <code className="border px-2 py-1 rounded text-sm text-white font-mono font-semibold">
              target
            </code>{" "}
            number. Return the{" "}
            <strong className="font-medium text-white/90">
              1-based indices
            </strong>{" "}
            of the two numbers,{" "}
            <code className="border px-2 py-1 rounded text-sm text-white font-mono font-semibold">
              index1
            </code>{" "}
            and{" "}
            <code className="border px-2 py-1 rounded text-sm text-white font-mono font-semibold">
              index2
            </code>
            .
          </p>
          <p>
            You may assume that each input would have{" "}
            <strong className="font-medium text-white">
              exactly one solution
            </strong>
            , and you may not use the same element twice.
          </p>
        </div>
      </div>

      <div className="mb-0 mt-2">
        <div className="space-y-6">
          <div className="rounded-lg">
            <h3 className="font-medium text-white mb-2">Example 1:</h3>
            <div className="border border-white tex-white p-3 rounded font-mono text-base font-semibold">
              <p>Input: nums = [2,7,11,15], target = 9</p>
              <p>Output: [1,2]</p>
              <p>
                Explanation: The numbers 2 and 7 add up to 9. Their 1-based
                indices are 1 and 2.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2">
          Constraints:
        </h2>
        <ul className="space-y-2 text-white font-semibold">
          <li className="flex items-start">
            <span className=" mr-2">•</span>
            <code className="px-2 py-1 rounded text-sm font-mono">
              2 {`<= nums.length <= 3 * 10`}
              <sup>4</sup>
            </code>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <code className="px-2 py-1 rounded text-sm font-mono">
              -1000 {`<= nums[i] <= 1000`}
            </code>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <code className="px-2 py-1 rounded text-sm font-mono">nums</code> is
            sorted in{" "}
            <strong className="font-medium text-gray-800">
              non-decreasing order
            </strong>
            .
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <code className="px-2 py-1 rounded text-sm font-mono">
              -1000 {`<= target <= 1000`}
            </code>
          </li>
          <li className="flex items-start">
            <span className="text-gray-500 mr-2">•</span>
            The solution is guaranteed to exist.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SampleQuestion;
