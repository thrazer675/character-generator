var elem = document.querySelector('.collapsible.expandable');
var instance = M.Collapsible.init(elem, { accordion: false });
var generateBtn = document.querySelector('#generate');
var randomRace = 'https://www.dnd5eapi.co/api/races';
var randomClass = 'https://www.dnd5eapi.co/api/classes';
var charList = document.querySelector(".character-results")

//pulls random race and class
function generateCharacter() {
  for (var j = 0; j < 5; j++) {
    var counter = 0
    fetch(randomRace)
      .then(function (response) {
        return response.json();
      })
      .then(function (races) {
        var raceName = races.results[Math.floor(Math.random() * races.results.length)]

        return fetch(randomClass)
          .then(function (response) {
            return response.json();
          })
          .then(function (classes) {
            var className = classes.results[Math.floor(Math.random() * classes.results.length)]
            var raceAndClass = document.querySelector("[data-char-header='" + counter + "']");
            raceAndClass.textContent = raceName.name + "  " + className.name

            // fetch the random class details
            return fetch(randomClass + "/" + className.index)
          })
          .then(function (response) {
            return response.json();
          })
          .then(function (classDetails) {
            //calls hit die information
            var hitDie = document.querySelector("[data-char-hit-die='" + counter + "']")
            hitDie.innerHTML = "<strong>Hit Die: </strong>" 
            var classEl = document.createElement('p');
            classEl.classList = "class features"
            classEl.textContent = "1d" + classDetails.hit_die;
            hitDie.appendChild(classEl);

            // calls skill proficiency
            var proficSkill = document.querySelector("[data-char-skill-prof='" + counter + "']")
            proficSkill.innerHTML = "<strong>Skill Proficiences: </strong>"
            for (var j = 0; j < classDetails.proficiency_choices.length; j++) {
              for (var k = 0; k < classDetails.proficiency_choices[j].choose; k++) {
                var randomProf = classDetails.proficiency_choices[j].from[Math.floor(Math.random() * classDetails.proficiency_choices[j].from.length)].name;
                var profEl = document.createElement('p');
                profEl.classList = "proficiency"
                profEl.textContent = randomProf + " ";
                proficSkill.appendChild(profEl);
              }
            }
            //calls weapon & armor proficiences
            var wepAndArmor = document.querySelector("[data-char-class-prof='" + counter + "']")
            wepAndArmor.innerHTML = "<strong>Weapon & Armor Proficiences: </strong>"
            for (var j = 0; j < classDetails.proficiencies.length; j++) {
              var wepArmEl = classDetails.proficiencies[j].name
              var wepEl = document.createElement('p');
              wepEl.classList = "proficiency"
              wepEl.textContent = wepArmEl + " ";
              wepAndArmor.appendChild(wepEl);
              console.log(wepArmEl)
              console.log(wepAndArmor)
            }
            counter++
          })
      })
  }
}



// when the generate character button is clicked it generates random information
generateBtn.addEventListener("click", function (e) {
  e.preventDefault()
  charList.classList.remove("hide");
  generateCharacter();
})
