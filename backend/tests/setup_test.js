const chai = require("chai");
const sinon = require("sinon");
const db = require("../models")
const expect = chai.expect;
const rating = db.rating;
const RatingController = require("../controllers/rating_controller");
describe("Rating Controller", function() {
  const stubValue = {
    stars: 5,
    review: "Blah test"
  };
  describe("create", async function() {
    it("should add a new user to the db", async function() {
        sinon.stub(rating, "findByPk").returns(stubValue);
    });
    var response = await RatingController.get();
    chai.assert.equal(5, response.stars);
    chai.assert.equal("Blah test", response.review);
  });
});
//test a connection db