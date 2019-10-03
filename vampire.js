class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numOfVamps = 0;
    let currentVamp = this;

    while (currentVamp.creator) {
      currentVamp = currentVamp.creator;
      numOfVamps++;
    }

    return numOfVamps;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    } else {
      return false;
    }
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    } else {
      if (this.offspring && this.offspring.length > 0) {
        for (let offspring of this.offspring) {
          let child = offspring.vampireWithName(name);
          if (child != null) {
            return child;
          }
        }
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let total = 0; // 1
    for (let offspring of this.offspring) {
      total += offspring.totalDescendents + 1;
    }
    return total;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenials = [];
    if (this.yearConverted > 1980) {
      millenials.push(this);
    } 
    for (let offspring of this.offspring) {
      millenials.push(offspring.allMillennialVampires);
    }
    return millenials = millenials.concat.apply([], millenials);
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  findAncestry() {
    let ancestry = [];
    let currentVamp = this;
    let i = 0;

    while (currentVamp.creator) {
      ancestry.push(currentVamp.creator);
      currentVamp = currentVamp.creator;
      i++;
    }

    return ancestry;
  }

  closestCommonAncestor(vampire) {
    let ancestors1 = this.findAncestry();
    let ancestors2 = vampire.findAncestry();
    
    if (this === vampire || !this.creator || vampire.creator === this) {
      return this;
    } else if (this.creator === vampire || !vampire.creator) {
      return vampire;
    } else {
      let commonAncestors = [];
      for (let ancestor of ancestors1) {
        if (ancestors2.includes(ancestor)) {
          commonAncestors.push(ancestor);
        }
      }
      return commonAncestors[0];
    }
  }

}

module.exports = Vampire;

