const chai = require("chai");
const sinon = require("sinon");
const db = require("../models")
const expect = chai.expect;
const user = db.user;
const UserController = require("../controllers/user_controller");

describe("User Controller", function() {
    var firstUser = {
        username: "First Guy",
        ingredients: "one two three",
        equipment: "bowl",
        restrictions: "none"
    };
    var secondUser = {
        username: "Second Girl",
        ingredients: "three two one",
        equipment: "none",
        restrictions: "lactose"
    };

    describe("Testing Get Function", async function() {
        var request = {
          query: {
              uid: 5
          }
        };
        it("Should get different objects based on request input", async function() {
            var mockFind = sinon.stub(user, "findByPk");
            mockFind.withArgs(5).returns(firstUser);
            mockFind.withArgs(1).returns(secondUser);
            
            toCheck = await UserController.get(5);
            expect(toCheck.username).to.be.equal("First Guy");
            expect(toCheck.restrictions).to.be.equal("none");

            request.query.uid = 1;
            toCheck = await UserController.get(1);
            expect(toCheck.username).to.be.equal("Second Girl");
            expect(toCheck.restrictions).to.be.equal("lactose");
        });


    });
    /*
    describe("Testing Post Function", async function() {
        var request = {
            query: {
                uid: 1
            },
            body: {
              data: {
                  username: null,
                  ingredients: null,
                  equipment: null,
                  restrictions: null
              }
            }
        };

        it("Should Call Nothing Due to Bad Request", async function() {
            toCheck = await UserController.post(request);
            expect(toCheck).to.be.equal(undefined);
        });
      
        it("Should Call Create Method", async function() {
            var mockFind = sinon.stub(user, "findOne");
            mockFind.returns("something");

            var mockCreate = sinon.stub(user, "create");
            mockCreate.returns("Create Method was Successfully Called");

            toCheck = await UserController.post(request);
            expect(toCheck).to.be.equal("Create Method was Successfully Called");
        });

        it("Should Call Update Method", async function() {
            request.body.data.ingredients = "what";
            request.body.data.restrictions = "when";
            request.body.data.equipment = "who";

            var mockUpdate = sinon.stub(user, "update");
            mockUpdate.returns("Update Method was Successfully Called");

            toCheck = await UserController.post(request);
            expect(toCheck).to.be.equal("Update Method was Successfully Called");
            sinon.restore();
        });
    });*/
});