const chai = require("chai");
const sinon = require("sinon");
const db = require("../models")
const expect = chai.expect;
const equipment = db.equipment;
const EquipmentController = require("../controllers/equipment_controller");

describe("Equipment Controller", function() {

    describe("Testing Get Function", async function() {
        var request = {
            data: {
                primaryKey: 5
            }
        };
        
        it("Should get different objects based on request input", async function() {
            const mockMethod = sinon.stub(equipment, "findAll");
            mockMethod.returns("Method Find All was Successfully Called");

            let toCheck = await EquipmentController.get(request);
            expect(toCheck).to.be.equal("Method Find All was Successfully Called");
        });
    });
});