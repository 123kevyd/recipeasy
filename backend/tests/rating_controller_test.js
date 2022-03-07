const chai = require("chai");
const sinon = require("sinon");
const db = require("../models")
const expect = chai.expect;
const rating = db.rating;
const RatingController = require("../controllers/rating_controller");

describe("Rating Controller", function() {
  
    const fiveStarReview = {
        stars: 5,
        review: "Best Movie"
    };

    const oneStarReview = {
      stars: 1,
      review: "Worst Movie"
    }
  
    const request = {
        data: {
            primaryKey: 5
        }
    };


    describe("Testing Get Function", async function() {
        it("Should get different objects based on request input", async function() {
            const mockMethod = sinon.stub(rating, "findByPk");
            mockMethod.withArgs(5).returns(fiveStarReview);
            mockMethod.withArgs(1).returns(oneStarReview);

            toCheck = await RatingController.get(request);
            expect(toCheck.stars).to.be.equal(5);
            expect(toCheck.review).to.be.equal("Best Movie");

            request.data.primaryKey = 1;
            toCheck = await RatingController.get(request);
            expect(toCheck.stars).to.be.equal(1);
            expect(toCheck.review).to.be.equal("Worst Movie");
        });
    });

    describe("Testing Post Function", async function() {
        it("Should get different objects based on request input", async function() {
            const mockMethod = sinon.stub(rating, "findByPk");
            mockMethod.withArgs(5).returns(fiveStarReview);
            mockMethod.withArgs(1).returns(oneStarReview);

            toCheck = await RatingController.get(request);
            expect(toCheck.stars).to.be.equal(5);
            expect(toCheck.review).to.be.equal("Best Movie");

            request.data.primaryKey = 1;
            toCheck = await RatingController.get(request);
            expect(toCheck.stars).to.be.equal(1);
            expect(toCheck.review).to.be.equal("Worst Movie");
        });
    });
});