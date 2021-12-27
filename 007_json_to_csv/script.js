jsonInput = document.querySelector('.json-input');
csvOutput = document.querySelector('.csv-output');

convertButton = document.querySelector('.fa-arrow-right');

jsonInput.value = `[
  {
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
  },
  {
  "userId": 1,
  "id": 2,
  "title": "quis ut nam facilis et officia qui",
  "completed": false
  },
  {
  "userId": 1,
  "id": 3,
  "title": "fugiat veniam minus",
  "completed": false
  },
  {
  "userId": 1,
  "id": 4,
  "title": "et porro tempora",
  "completed": true
  }
]`;

convertToCsv = () => {
  fileContent = jsonInput.value;
  const jsonParse =
    typeof fileContent != 'object' ? JSON.parse(fileContent) : fileContent;

  var array = Array.isArray(jsonParse) ? jsonParse : [jsonParse];

  // labels on fist line
  var head = array[0];
  var str = '';
  var line = '';

  for (var index in array[0]) {
    line += index + ',';
  }

  line = line.slice(0, -1);

  str += line + '\r\n';

  for (var i = 0; i < array.length; i++) {
    var line = '';

    for (var index in array[i]) {
      console.log(array[i][index]);
      line += array[i][index] + ',';
    }

    line = line.slice(0, -1);
    str += line + '\r\n';
  }

  csvOutput.value = str;
};

convertButton.addEventListener('click', convertToCsv);
