const chai = require("chai");
const sinon = require("sinon");
const db = require("../models")
const expect = chai.expect;
const equipment = db.equipment;
const EquipmentController = require("../controllers/equipment_controller");

describe("Equipment Controller", function() {

    const request = {
        data: {
            primaryKey: 5
        }
    };

    describe("Testing Get Function", async function() {
        it("Should get different objects based on request input", async function() {
            const mockMethod = sinon.stub(equipment, "findAll");
            mockMethod.returns("Method Find All was Successfully Called");

            toCheck = await EquipmentController.get(request);
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
            toCheck = await EquipmentController.post(request);
            expect(toCheck).to.be.equal(undefined);
        });
    
        it("Should Call Create Method", async function() {
            const mockMethod = sinon.stub(equipment, "create");
            mockMethod.returns("Create Method was Successfully Called");
            request.body.data.name = "username";

            toCheck = await EquipmentController.post(request);
            expect(toCheck).to.be.equal("Create Method was Successfully Called");
        });
    });
});