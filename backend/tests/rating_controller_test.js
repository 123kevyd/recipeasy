const chai = require("chai");
const sinon = require("sinon");
const db = require("../models")
const expect = chai.expect;
const rating = db.rating;
const RatingController = require("../controllers/rating_controller");
const RecipeController = require("../controllers/recipe_controller");

describe("Rating Controller", function() {
  
    const fiveStarReview = {
        stars: 5,
        review: "Best Movie"
    };

    const oneStarReview = {
      stars: 1,
      review: "Worst Movie"
    }

    describe("Testing Get Function", async function() {
        it("Should get different objects based on request input", async function() {
            var request = {
                body: {
                    data: {
                        primaryKey: 5
                    }
                }
            };

            const mockMethod = sinon.stub(rating, "findByPk");
            mockMethod.withArgs(5).returns(fiveStarReview);
            mockMethod.withArgs(1).returns(oneStarReview);

            toCheck = await RatingController.get(request);
            expect(toCheck.stars).to.be.equal(5);
            expect(toCheck.review).to.be.equal("Best Movie");

            request.body.data.primaryKey = 1;
            toCheck = await RatingController.get(request);
            expect(toCheck.stars).to.be.equal(1);
            expect(toCheck.review).to.be.equal("Worst Movie");
        });
    });
    
    describe("Testing Post Function", async function() {
        it("Should get different objects based on request input", async function() {
            var request = {
                body: {
                    data: {
                        recipeId: 5,
                        stars: 3,
                        review: "Yo"
                    }
                }
            };

            const createMethod = sinon.stub(rating, "create");
            createMethod.returns({
                dataValues: {
                    review: "Yo",
                    id: 1,
                }
            });
            
            const getMethod = sinon.stub(RecipeController, "get");
            getMethod.returns({
                dataValues: {
                    id: 1,
                    name: "name", 
                    instructions: "instr",
                    equipment: [2],
                    ingredients: [3],
                    servings: 2,
                    details: "details",
                    author: 2,
                    ratings: [2]
                }
            });

            const putMethod = sinon.stub(RecipeController, "put");
            
            putMethod.withArgs({ 
                body: {
                    data: {
                        primaryKey: 1,
                        name: "name", 
                        instructions: "instr",
                        equipment: [2],
                        ingredients: [3],
                        servings: 2,
                        details: "details",
                        author: 2,
                        ratings: [1,2]
                    }
                }
            });

            putMethod.withArgs({ 
                body: {
                    data: {
                        primaryKey: 1,
                        name: "name", 
                        instructions: "instr",
                        equipment: [2],
                        ingredients: [3],
                        servings: 2,
                        details: "details",
                        author: 2,
                        ratings: [1]
                    }
                }
            }).throwsException("failed to concat");

            toCheck = await RatingController.post(request);
            expect(toCheck.dataValues.review).to.be.equal("Yo");

            sinon.restore()
        });
    });
    
});