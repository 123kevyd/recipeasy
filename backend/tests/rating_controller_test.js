const chai = require("chai");
const sinon = require("sinon");
const db = require("../models")
const expect = chai.expect;
const rating = db.rating;
const RatingController = require("../controllers/rating_controller");
const RecipeController = require("../controllers/recipe_controller");

describe("Rating Controller", function() {
    describe("Testing Get Function", async function() {
        var request = {
            body: {
                data: {
                    primaryKey: 5
                }
            }
        };

        it("Should get different objects based on request input", async function() {
            var fiveStarReview = {
                stars: 5,
                review: "Best Movie"
            };
        
            var oneStarReview = {
              stars: 1,
              review: "Worst Movie"
            }

            const mockFind = sinon.stub(rating, "findByPk");
            mockFind.withArgs(5).returns(fiveStarReview);
            mockFind.withArgs(1).returns(oneStarReview);

            toCheck = await RatingController.get(request);
            expect(toCheck.stars).to.be.equal(5);
            expect(toCheck.review).to.be.equal("Best Movie");

            request.body.data.primaryKey = 1;
            toCheck = await RatingController.get(request);
            expect(toCheck.stars).to.be.equal(1);
            expect(toCheck.review).to.be.equal("Worst Movie");
        });

        it("Should return nothing due to bad request", async function() {
            request.body.data.primaryKey = null
            toCheck = await RatingController.get(request);
            expect(toCheck).to.be.equal(undefined);
        });
    });
    
    describe("Testing Post Function", async function() {
        it("Should call create Rating as well as insert itself into a Recipe object", async function() {
            var request = {
                body: {
                    data: {
                        recipeId: 5,
                        stars: 3,
                        review: "Yo"
                    }
                }
            };

            var createMethod = sinon.stub(rating, "create");
            createMethod.returns({
                dataValues: {
                    review: "Yo",
                    id: 1,
                }
            });
            
            var getMethod = sinon.stub(RecipeController, "get");
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

            var putMethod = sinon.stub(RecipeController, "put");
            
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

            sinon.restore();
        });
        
        it("Should do nothing as request is not valid", async function() {
            var request = {
                body: {
                    data: {
                        recipeId: 5,
                        review: "Yo",
                        stars: null
                    }
                }
            };

            toCheck = await RatingController.post(request);
            expect(toCheck).to.be.equal(undefined);

            request.body.data.recipeId = null;
            request.body.data.stars = 5;

            toCheck = await RatingController.post(request);
            expect(toCheck).to.be.equal(undefined);

            request.body.data.review = null;
            request.body.data.recipeId = 5;
            
            toCheck = await RatingController.post(request);
            expect(toCheck).to.be.equal(undefined);
        });
        
    });
    
});