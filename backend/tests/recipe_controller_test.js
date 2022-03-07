const chai = require("chai");
const sinon = require("sinon");
const db = require("../models")
const expect = chai.expect;
const recipe = db.recipe;
const RecipeController = require("../controllers/recipe_controller");

describe("Recipe Controller", function() {

    const recipe1 = {
        dataValues: {
            id: 1,
            name: "Chili", 
            instructions: "instr",
            equipment: [2],
            ingredients: [3],
            servings: 2,
            details: "details",
            author: 2,
            ratings: [2]
        }
    }

    const recipe2 = {
        dataValues: {
            id: 1,
            name: "Fries", 
            instructions: "instr",
            equipment: [2],
            ingredients: [3],
            servings: 2,
            details: "details",
            author: 2,
            ratings: [2]
        }
    }
  
    const request = {
        body: { 
            data: {
                primaryKey: 5,
                name: "name1", 
                instructions: "name1",
                equipment: "name1",
                ingredients: "name1",
                servings: "name1",
                details: "name1",
                author: "name1"
            }
        }
    };
    
    describe("Testing Get Function", async function() {
        it("Should get different objects based on request input", async function() {
            const mockMethod = sinon.stub(recipe, "findByPk");
            mockMethod.withArgs(5).returns(recipe1);
            mockMethod.withArgs(1).returns(recipe2);

            toCheck = await RecipeController.get(request);
            console.log(toCheck);
            expect(toCheck.dataValues.name).to.be.equal("Chili");

            request.body.data.primaryKey = 1;
            toCheck = await RecipeController.get(request);
            expect(toCheck.dataValues.name).to.be.equal("Fries");
        });
    });
    
    describe("Testing Post Function", async function() {
    
        it("Should Call Create Method", async function() {
            const mockMethod = sinon.stub(recipe, "create");
            mockMethod.returns("Create Method was Successfully Called");

            toCheck = await RecipeController.post(request);
            expect(toCheck).to.be.equal("Create Method was Successfully Called");
        });
    });

    describe("Testing Put Function", async function() {
    
        it("Should Call Update Method", async function() {
            const mockMethod = sinon.stub(recipe, "update");
            mockMethod.returns("Update Method was Successfully Called");

            toCheck = await RecipeController.put(request);
            expect(toCheck).to.be.equal("Update Method was Successfully Called");
        });
    });

    
});