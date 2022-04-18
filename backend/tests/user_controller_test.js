const chai = require("chai");
const sinon = require("sinon");
const db = require("../models")
const expect = chai.expect;
const user = db.user;
const UserController = require("../controllers/user_controller");

describe("User Controller", function() {
    const firstUser = {
        username: "First Guy",
        ingredients: "one two three",
        equipment: "bowl",
        restrictions: "none"
    };
    const secondUser = {
        username: "Second Girl",
        ingredients: "three two one",
        equipment: "none",
        restrictions: "lactose"
    };

    describe("Testing Get Function", async function() {
        var request = 5;
        it("Should get different objects based on request input", async function() {
            var mockFind = sinon.stub(user, "findByPk");
            mockFind.withArgs(5).returns(firstUser);
            mockFind.withArgs(1).returns(secondUser);

            let toCheck = await UserController.get(request);
            expect(toCheck.username).to.be.equal("First Guy");
            expect(toCheck.restrictions).to.be.equal("none");

            request = 1;
            toCheck = await UserController.get(request);
            expect(toCheck.username).to.be.equal("Second Girl");
            expect(toCheck.restrictions).to.be.equal("lactose");
        });
    });

    describe("Testing Put Function", async function() {

        var badRequest = {
            query: {
                user: 1
            }
        };

        var request = {
            query: {
                user: 1
            },
            body: { 
                username: null,
                ingredients: null,
                equipment: null,
                restrictions: null,
                recipes: null
            }
        };

        it("Should Call Nothing Due to Bad Request", async function() {
            let toCheck = await UserController.put(badRequest);
            expect(toCheck).to.be.equal(undefined);
        });
      
        it("User DNE, Should Call Create Method", async function() {
            var mockFindOrCreate = sinon.stub(user,"findOrCreate");
            mockFindOrCreate.returns(["Create Method was Successfully Called", true]);
            let username = "notFoundUser";

            let toCheck = await UserController.login(username);
            expect(toCheck).to.be.equal("Create Method was Successfully Called");
            sinon.restore();
        });

        it("User Exists, Should Not Call Create Method", async function() {
            var mockFindOrCreate = sinon.stub(user,"findOrCreate");
            mockFindOrCreate.withArgs({
                where: {
                    username: "foundUser"
                }
            }).returns(["User Exists", false]);
            let username = "foundUser";

            let toCheck = await UserController.login(username);
            expect(toCheck).to.be.equal("User Exists");
            sinon.restore();
        });

        it("Should Call Update Method", async function() {
            request.body = JSON.stringify({
                ingredients: "what",
                restrictions: "when",
                equipment: "who",
                recipes: "why"
            })

            var mockUpdate = sinon.stub(user.prototype, "save");
            

            let toCheck = await UserController.put(request);
            sinon.assert.callCount(mockUpdate, 4);
            expect(toCheck).to.be.equal(true);
        });
    });
});