class Profile {
  constructor(profile_name, profile_job, profile_description, profile_color) {
    this.profile_name = profile_name;
    this.profile_job = profile_job;
    this.profile_description = profile_description;
    this.profile_color = profile_color;
    this.image = document.querySelector("#avatar").innerHTML;
  }

  create() {
    let profile_block = document.createElement("div");
    profile_block.setAttribute("class", "profile-card");

    let profile_card_image = document.createElement("div");
    profile_card_image.setAttribute("class", "profile-card-image");
    profile_card_image.innerHTML = this.image;
    profile_card_image.style.backgroundColor = this.profile_color;

    let profile_card_desc = document.createElement("div");
    profile_card_desc.setAttribute("class", "profile-card-description");

    let profile_card_elements = document.createElement("div");
    profile_card_elements.setAttribute("class", "profile-card-description-elements");

    let profileTitle = document.createElement("h2");
    profileTitle.innerHTML = this.profile_name;
    let profileJob = document.createElement("label");
    profileJob.innerHTML = this.profile_job;
    let profileDesc = document.createElement("p");
    profileDesc.innerHTML = this.profile_description;

    profile_card_elements.appendChild(profileTitle);
    profile_card_elements.appendChild(profileJob);
    profile_card_elements.appendChild(document.createElement("hr"));
    profile_card_elements.appendChild(profileDesc);

    profile_card_desc.appendChild(profile_card_elements);

    profile_block.appendChild(profile_card_image);
    profile_block.appendChild(profile_card_desc);

    this.addElementToMain(profile_block);
  }

  addElementToMain(element) {
    document.querySelector("#hover").appendChild(element);
  }

  getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

var p1 = new Profile(
  "John Smedley",
  "UX Designer",
  "John réalise les maquettes du projet depuis 1887, date de sa naissance.<br/><br/>Il aime les chips et le coca.",
  "var(--main-white-color)"
);
p1.create();

var p2 = new Profile(
  "John Smedley",
  "UX Designer",
  "John réalise les maquettes du projet depuis 1887, date de sa naissance.<br/><br/>Il aime les chips et le coca.",
  "var(--main-white-color)"
);
p2.create();

var p3 = new Profile(
  "John Smedley",
  "UX Designer",
  "John réalise les maquettes du projet depuis 1887, date de sa naissance.<br/><br/>Il aime les chips et le coca.",
  "var(--main-white-color)"
);
p3.create();