const chai = require("chai");
const sinon = require("sinon");
const db = require("../models")
const expect = chai.expect;
const ingredient = db.ingredient;
const IngredientController = require("../controllers/ingredient_controller");

describe("Equipment Controller", function() {
    describe("Testing Get Function", async function() {
        var request = {
            data: {
                primaryKey: 5
            }
        };
        
        it("Should get different objects based on request input", async function() {
            const mockFind = sinon.stub(ingredient, "findByPk");
            mockFind.returns("Method Find By Pk was Successfully Called");

            toCheck = await IngredientController.get(request);
            expect(toCheck).to.be.equal("Method Find All was Successfully Called");
        });
    });

    describe("Testing Post Function", async function() {
        var request = {
            body: {
                data: {
                    name: null
                }
            }
        };

        it("Should Call Nothing Due to Bad Request", async function() {
            toCheck = await IngredientController.post(request);
            expect(toCheck).to.be.equal(undefined);
        });
    
        it("Should Call Create Method", async function() {
            const mockCreate = sinon.stub(ingredient, "create");
            mockCreate.returns("Create Method was Successfully Called");
            request.body.data.name = "username";

            toCheck = await EquipmentController.post(request);
            expect(toCheck).to.be.equal("Create Method was Successfully Called");
        });
    });
});