const fs = require("fs");

const cities = [
  "Paris","Rome","London","Tokyo","New York","Barcelona","Dubai","Singapore",
  "Bangkok","Sydney","Amsterdam","Istanbul","Prague","Vienna","Berlin"
];

const landmarks = [
  "Eiffel Tower","Colosseum","Big Ben","Shibuya Crossing","Statue of Liberty",
  "Sagrada Familia","Burj Khalifa","Marina Bay Sands","Grand Palace",
  "Sydney Opera House","Anne Frank House","Hagia Sophia","Charles Bridge",
  "Schönbrunn Palace","Brandenburg Gate"
];

const pickupLocations = [
  "Hotel Lobby",
  "Airport",
  "Central Station",
  "City Center",
  "Tour Office"
];

const dropOffLocations = [
  "Hotel",
  "Airport",
  "City Center",
  "Main Square",
  "Train Station"
];

const durationUnits = ["hours", "days"];

let tours = [];

for (let i = 1; i <= 1000; i++) {
  const city = cities[Math.floor(Math.random() * cities.length)];
  const landmark = landmarks[Math.floor(Math.random() * landmarks.length)];

  tours.push({
    tour_id: i,
    title: `${city} Explorer Tour`,
    description: `Explore the famous ${landmark} and discover the beauty of ${city}.`,
    pick_up: pickupLocations[Math.floor(Math.random() * pickupLocations.length)],
    meeting_point: landmark,
    drop_off: dropOffLocations[Math.floor(Math.random() * dropOffLocations.length)],
    duration: Math.floor(Math.random() * 7) + 1,
    duration_unit: durationUnits[Math.floor(Math.random() * durationUnits.length)]
  });
}

fs.writeFileSync("tours.json", JSON.stringify(tours, null, 2));

console.log("10,000 tour records generated in tours.json");