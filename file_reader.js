const fs = require("fs").promises;

const readFileData = (fileName) => {
  return fs.readFile(fileName, "utf-8");
};

const formatHobbies = (data) => {
  return new Promise((resolve, reject) => {
    const hobbiesArray = JSON.parse(data);
    const hobbiesString =
      hobbiesArray.length > 1
        ? hobbiesArray.slice(0, -1).join(", ") + " and " + hobbiesArray.slice(-1)
        : hobbiesArray[0];
    resolve(hobbiesString);
  });
};

// THEN-CATCH SOLUTION BELOW THIS LINE
let firstname, lastname, age;

readFileData("firstname.txt")
  .then((firstnameRes) => {
    firstname = firstnameRes;
    return readFileData("lastname.txt");
  })
  .then((lastnameRes) => {
    lastname = lastnameRes;
    return readFileData("age.txt");
  })
  .then((ageRes) => {
    age = ageRes;
    return readFileData("hobbies.txt");
  })
  .then((hobbiesRes) => {
    return formatHobbies(hobbiesRes);
  })
  .then((hobbies) => {
    console.log(`${firstname} ${lastname} is ${age} years old and his hobbies are ${hobbies}`);
  })
  .catch((err) => {
    console.error(err);
  });

// ASYNC/AWAIT SOLUTION BELOW THIS LINE

const result = async () => {
  try {
    const firstname = await readFileData("firstname.txt");
    const lastname = await readFileData("lastname.txt");
    const age = await readFileData("age.txt");
    const hobbiesArray = await readFileData("hobbies.txt");
    const hobbiesString = await formatHobbies(hobbiesArray);

    console.log(`${firstname} ${lastname} is ${age} years old and his hobbies are ${hobbiesString}`);
  } catch (err) {
    console.error(err);
  }
};
result();
