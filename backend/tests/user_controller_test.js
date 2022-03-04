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
    var request = {
      query: {
          uid: 5
      }
    };
    it("Should get different objects based on request input", async function() {
        const mockMethod = sinon.stub(user, "findByPk");
        mockMethod.withArgs(5).returns(firstUser);
        mockMethod.withArgs(1).returns(secondUser);

        toCheck = await UserController.get(request);
        expect(toCheck.username).to.be.equal("First Guy");
        expect(toCheck.restrictions).to.be.equal("none");

        request.query.uid = 1;
        toCheck = await UserController.get(request);
        expect(toCheck.username).to.be.equal("Second Girl");
        expect(toCheck.restrictions).to.be.equal("lactose");
    });
  });

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
        request.body.data.username = "username";

        const mockMethod = sinon.stub(user, "create");
        mockMethod.returns("Success");

        toCheck = await UserController.post(request);
        expect(toCheck).to.be.equal("Success");

    });

    it("Should Call Update Method", async function() {
        request.body.data.ingredients = "what";
        request.body.data.restrictions = "when";
        request.body.data.equipment = "who";

        const mockMethod = sinon.stub(user, "update");
        mockMethod.returns("Success");

        toCheck = await UserController.post(request);
        expect(toCheck).to.be.equal("Success");
    });
  });
  
});