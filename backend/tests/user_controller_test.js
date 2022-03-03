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
    
  const request = {
    data: {
        primaryKey: 5
    }
  };


  describe("Testing Get Function", async function() {
    it("Should get different objects based on request input", async function() {
        const mockMethod = sinon.stub(user, "findByPk");
        mockMethod.withArgs(5).returns(firstUser);
        mockMethod.withArgs(1).returns(secondUser);

        toCheck = await UserController.get(request);
        expect(toCheck.username).to.be.equal("First Guy");
        expect(toCheck.restrictions).to.be.equal("none");

        request.data.primaryKey = 1;
        toCheck = await UserController.get(request);
        expect(toCheck.username).to.be.equal("Second Girl");
        expect(toCheck.restrictions).to.be.equal("lactose");
    });
  });
});
//test a connection db