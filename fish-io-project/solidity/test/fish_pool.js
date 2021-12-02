const FishPool = artifacts.require("FishPool");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("FishPool", function (/* accounts */) {
  it("should assert true", async function () {
    await FishPool.deployed();
    return assert.isTrue(true);
  });
});
