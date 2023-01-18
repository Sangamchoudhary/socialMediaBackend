const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const should = chai.should();
const expect = chai.expect;
const requestp = require("request-promise");

const server = require("../myApp/app");

chai.use(chaiHttp);

describe("API Testing", function () {
  let response;

  before(function (done) {
    chai
      .request(server)
      .post("/api/authenticate/login")
      .send({ email: "admin1@admin.com", password: "admin1" })
      .end(function (err, resp) {
        response = resp;
        done();
      });
  });

  it("get login", function (done) {
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.all.keys("JWT_token");
    done();
  });

  it("get users", function (done) {
    let cValue = "login=" + response.body.JWT_token;
    chai
      .request(server)
      .get("/api/user")
      .set("cookie", cValue)
      .end((err, res) => {
        expect(res.body).to.have.all.keys(
          "number of followers",
          "number of followings",
          "username"
        );
        done();
      });
  });

  // try to follow a user 2nd time
  it("follow user", function (done) {
    let cValue = "login=" + response.body.JWT_token;
    chai
      .request(server)
      .post("/api/follow/63c6f3b98fddb5be77af3929")
      .set("cookie", cValue)
      .end((err, res) => {
        expect(res.body.success).to.equal(true);
        done();
      });
  });

  // when try to unfollow a user which is not followed
  it("unfollow user", function (done) {
    let cValue = "login=" + response.body.JWT_token;
    chai
      .request(server)
      .post("/api/unfollow/63c6f3b98fddb5be77af3929")
      .set("cookie", cValue)
      .end((err, res) => {
        expect(res.body.success).to.equal(true);
        done();
      });
  });

  // creating a post
  it("creat a post", function (done) {
    let cValue = "login=" + response.body.JWT_token;
    chai
      .request(server)
      .post("/api/posts")
      .send({
        Title: "my 3rd post",
        Description: "Hello guys! I am new description",
      })
      .set("cookie", cValue)
      .end((err, res) => {
        expect(res.body).to.have.all.keys(
          "Post-ID",
          "Title",
          "Description",
          "Created Time(UTC)"
        );
        done();
      });
  });

  // when there is no post with this id
  it("delete a post", function (done) {
    let cValue = "login=" + response.body.JWT_token;
    chai
      .request(server)
      .delete("/api/posts/63c85352579b0dfcb9c93848")
      .set("cookie", cValue)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        done();
      });
  });

  // get a single post with id
  it("get single post", function (done) {
    let cValue = "login=" + response.body.JWT_token;
    chai
      .request(server)
      .get("/api/posts/63c854b0d1015fcf8becc413")
      .set("cookie", cValue)
      .end((err, res) => {
        expect(res.body).to.have.all.keys(
          "id",
          "number of likes",
          "number of comments"
        );
        done();
      });
  });

  // get all posts [with log in]
  it("get all posts", function (done) {
    let cValue = "login=" + response.body.JWT_token;
    chai
      .request(server)
      .get("/api/all_posts")
      .set("cookie", cValue)
      .end((err, res) => {
        expect(res.body).to.be.a("array");
        done();
      });
  });

  // trying to like a already liked post
  it("like a post", function (done) {
    let cValue = "login=" + response.body.JWT_token;
    chai
      .request(server)
      .post("/api/like/63c85352579b0dfcb9c93848")
      .set("cookie", cValue)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        done();
      });
  });

  it("comment on post", function (done) {
    let cValue = "login=" + response.body.JWT_token;
    chai
      .request(server)
      .post("/api/comment/63c85708a7e534556873e33e")
      .send({
        comment: "comment for better reach 24",
      })
      .set("cookie", cValue)
      .end((err, res) => {
        expect(res.body).to.have.all.keys("Comment-Id");
        done();
      });
  });
  it("unlike a post", function (done) {
    let cValue = "login=" + response.body.JWT_token;
    chai
      .request(server)
      .post("/api/unlike/63c85708a7e534556873e33e")
      .set("cookie", cValue)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        done();
      });
  });
});
