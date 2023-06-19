import React, { Component } from "react";
import config from "./config";

export default class ActorList extends Component {
  state = {
    existingActors: [],
    existingMovies: [],
    reevesIsToggled: false,
    cageIsToggled: false,
  };

  componentDidMount() {
    this.getAllActors();
    this.getAllMovies();
  }

  getAllActors() {
    const url = `${config.API_ENDPOINT}/actors`;

    fetch(url, {
      method: "GET",
      headers: {
        "x-chmura-cors": "e17d6164-e140-4c18-b61f-7366dc8c686c",
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((responseJson) => {
        //  console.log(responseJson);
        this.setState({
          existingActors: responseJson,
        });
      })
      .catch((error) => console.log({ error }));
  }

  getAllMovies() {
    const url = `${config.API_ENDPOINT}/movies`;

    fetch(url, {
      method: "GET",
      headers: {
        "x-chmura-cors": "e17d6164-e140-4c18-b61f-7366dc8c686c",
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((responseJson) => {
        //console.log(responseJson);
        this.setState({
          existingMovies: responseJson,
        });
      })
      .catch((error) => console.log({ error }));
  }

  toggleReeves = (event) => {
    if (this.state.reevesIsToggled == false) {
      this.setState({
        reevesIsToggled: true,
      });
    } else if (this.state.reevesIsToggled === true) {
      this.setState({
        reevesIsToggled: false,
      });
    }
  };

  displayReevesCostars = (event) => {
    event.preventDefault();
    this.toggleReeves();
    console.log(this.state)
    console.log("staring Keanue Reeves");
    const allActors = this.state.existingActors; // {name: 'actorName', age: 0, movies: [], id: 0}
    const movies = this.state.existingMovies; // {name: 'movieName', year: 0, actors: [], id: 0}
    if (this.state.reevesIsToggled === !false) {
      const moviesWithReeves = movies.filter((movie) => {
        // console.log(movie)
        return movie.actors.includes(206);
      });

      console.log(moviesWithReeves);
      const reevesCoactorIds = [
        ...new Set(
          moviesWithReeves
            .map((movie) => movie.actors)
            .flat()
            .filter((actor) => actor !== 206)
        ),
      ];
      console.log(reevesCoactorIds);

      const reevesCoactors = allActors.filter((actor) =>
        reevesCoactorIds.includes(actor.actorId)
      );
      console.log(reevesCoactors);
      this.setState({
        existingActors: reevesCoactors,
      });
    }
  };

  toggleCage = (event) => {
    if (this.state.cageIsToggled == false) {
      this.setState({
        cageIsToggled: true,
      });
    } else if (this.state.cageIsToggled == true) {
      this.setState({
        cageIsToggled: false,
      });
    }
  };

  displayCageCostars = (event) => {
    console.log("staring Nicholas Cage");
    console.log(this.state);
    this.toggleCage()
    const allActors = this.state.existingActors; // {name: 'actorName', age: 0, movies: [], id: 0}
    const movies = this.state.existingMovies; // {name: 'movieName', year: 0, actors: [], id: 0}

    if (this.state.cageIsToggled === !false) {
      //console.log(allActors)
      //console.log(movies)

      const moviesWithCage = movies.filter((movie) => {
        // console.log(movie)
        return movie.actors.includes(115);
      });

      console.log(moviesWithCage);
      const cageCoactorIds = [
        ...new Set(
          moviesWithCage
            .map((movie) => movie.actors)
            .flat()
            .filter((actor) => actor !== 115)
        ),
      ];
      console.log(cageCoactorIds);

      const cageCoactors = allActors.filter((actor) =>
        cageCoactorIds.includes(actor.actorId)
      );
      console.log(cageCoactors);
      this.setState({
        existingActors: cageCoactors,
      });
    }
  };

  handleSearch = (event) => {
    event.preventDefault();
    const data = event.target.value;
    let termLowerCased = data.toLowerCase();
    if (data === "") {
      this.getAllActors();
    } else {
      let filteredActors = [];
      for (let i = 0; i < this.state.existingActors.length; i++) {
        let actorNameLowerCased =
          this.state.existingActors[i].name.toLowerCase();
        if (actorNameLowerCased.indexOf(termLowerCased) > -1) {
          console.log("found", this.state.existingActors[i]);
          filteredActors.push(this.state.existingActors[i]);
        }
      }
      //if no results display an error
      if (filteredActors.length === 0) {
        this.setState({
          existingActors: [],
        });
      } else {
        console.log(filteredActors);
        this.setState({
          existingActors: filteredActors,
        });
      }
    }
  };

  render() {
    let actorData = "NothingHere";
    if (this.state.existingActors.length > 0) {
      actorData = this.state.existingActors.map((actor, idx) => {
        return (
          <div>
            <div key={actor.actorId} className="actor-card">
              <span>
                <p className="actorId">{actor.actorId}</p>
                <h1>{actor.name}</h1>
              </span>

              {/* //<span>{JSON.stringify({existingMovies: this.state.existingMovies })}</span> */}
            </div>
          </div>
        );
      });
    }
    return (
      <div>
        <section className="search-section">
          <form>

          <input
          className="actor-search"
            type="text"
            name="filter"
            onChange={this.handleSearch}
            placeholder="Search for Actor:"
          />
        </form>
        <label htmlFor="Keanue Reeves">
          <input
          className="checkbox"
            type="checkbox"
            onClick={this.displayReevesCostars}
            value="check"
            id="206"
          />
          <span>Keanue Reeves</span>
        </label>
        <label htmlFor="Nicholas Cage">
          <input
          className="checkbox"
            type="checkbox"
            onClick={this.displayCageCostars}
            value="check"
            id="115"
          />
          <span>Nicholas Cage</span>
        </label>
        </section>
        
        {actorData}
      </div>
    );
  }
}
