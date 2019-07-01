const req = require("supertest");
const server = require("../api/server");
const Games = require("../games/gamesModel");
beforeEach(() => {
  Games.clear();
});

describe("the games router", () => {
  describe("GET /api/games", () => {
    it("should return empty array if there are no games", async () => {
      const res = await req(server).get("/api/games");
      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual([]);
    });

    it("should return a single game ", async () => {
      Games.addGame({
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      });
      const res = await req(server).get("/api/games");
      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual([
        {
          title: "Pacman",
          genre: "Arcade",
          releaseYear: 1980
        }
      ]);
    });

    it("should return an array of games", async () => {
      Games.addGame({
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      });
      Games.addGame({
        title: "Mario",
        genre: "Platformer",
        releaseYear: 1989
      });
      const res = await req(server).get("/api/games");
      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual([
        {
          title: "Pacman",
          genre: "Arcade",
          releaseYear: 1980
        },
        {
          title: "Mario",
          genre: "Platformer",
          releaseYear: 1989
        }
      ]);
    });
  });

  describe("POST /api/games", () => {
    it("should return an added game", async () => {
      const game = {
        title: "Pacman 2",
        genre: "Arcade",
        releaseYear: 1981
      };
      const res = await req(server)
        .post("/api/games")
        .send(game);
      expect(res.status).toBe(201);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual(game);
    });

    it("should return 422 no genre", async () => {
      const game = {
        title: "Pacman",
        releaseYear: 1980
      };
      const res = await req(server)
        .post("/api/games")
        .send(game);
      expect(res.status).toBe(422);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual({
        messsage: "please supply a correct title and genre for the game"
      });
    });

    it("should return 422 for no title", async () => {
      const game = {
        genre: "Arcade",
        releaseYear: 1980
      };
      const res = await req(server)
        .post("/api/games")
        .send(game);
      expect(res.status).toBe(422);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual({
        messsage: "please supply a correct title and genre for the game"
      });
    });

    it("should return 201 without a release year", async () => {
      const game = {
        title: "Pacman",
        genre: "Arcade"
      };
      const res = await req(server)
        .post("/api/games")
        .send(game);
      expect(res.status).toBe(201);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual(game);
    });
  });
});

/* 
Object Schema
  const game = {
    title: "Pacman 2",
    genre: "Arcade",
    releaseYear: 1981
  };  
*/
