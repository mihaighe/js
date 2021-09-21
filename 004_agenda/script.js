var data = [
  {
    name: 'Cleo Matthews',
    phone: '1-462-621-7538',
    email: 'eros.non@dolorfuscemi.co.uk',
    country: 'Brazil',
    region: 'Leningrad Oblast',
  },
  {
    name: 'Ali Wheeler',
    phone: '1-174-214-6952',
    email: 'tincidunt@vitaediam.org',
    country: 'Chile',
    region: 'Tyrol',
  },
  {
    name: 'Zenaida Guy',
    phone: '1-324-243-1833',
    email: 'sit@necmetus.com',
    country: 'France',
    region: 'Piura',
  },
  {
    name: 'Danielle Britt',
    phone: '(910) 525-4063',
    email: 'diam.duis@acurnaut.org',
    country: 'Nigeria',
    region: 'Loreto',
  },
  {
    name: 'Bert Mckenzie',
    phone: '1-880-352-7178',
    email: 'facilisis@risusquis.net',
    country: 'United Kingdom',
    region: 'Noord Brabant',
  },
  {
    name: 'Amela Woods',
    phone: '(218) 103-2264',
    email: 'curae@lectusa.net',
    country: 'Indonesia',
    region: 'Jharkhand',
  },
  {
    name: 'Honorato Holden',
    phone: '1-549-252-9495',
    email: 'accumsan.laoreet@duisgravida.org',
    country: 'India',
    region: 'Namen',
  },
  {
    name: 'Flavia Love',
    phone: '1-682-353-3507',
    email: 'nostra.per.inceptos@tempusnon.org',
    country: 'Poland',
    region: 'Abruzzo',
  },
  {
    name: 'Kadeem Lee',
    phone: '1-662-244-4121',
    email: 'leo@arcuetpede.co.uk',
    country: 'Poland',
    region: 'Lazio',
  },
  {
    name: 'Madaline Sutton',
    phone: '1-912-600-3013',
    email: 'nullam.lobortis.quam@idmagna.co.uk',
    country: 'Mexico',
    region: 'Coahuila',
  },
  {
    name: 'Amela Woods',
    phone: '(218) 103-2264',
    email: 'curae@lectusa.net',
    country: 'Indonesia',
    region: 'Jharkhand',
  },
  {
    name: 'Honorato Holden',
    phone: '1-549-252-9495',
    email: 'accumsan.laoreet@duisgravida.org',
    country: 'India',
    region: 'Namen',
  },
  {
    name: 'Flavia Love',
    phone: '1-682-353-3507',
    email: 'nostra.per.inceptos@tempusnon.org',
    country: 'Poland',
    region: 'Abruzzo',
  },
  {
    name: 'Kadeem Lee',
    phone: '1-662-244-4121',
    email: 'leo@arcuetpede.co.uk',
    country: 'Poland',
    region: 'Lazio',
  },
  {
    name: 'Madaline Sutton',
    phone: '1-912-600-3013',
    email: 'nullam.lobortis.quam@idmagna.co.uk',
    country: 'Mexico',
    region: 'Coahuila',
  },
];

const summaryPane = document.getElementById('summary-pane');
const adjentPane = document.getElementById('adjent-pane');

data.forEach((person, index) => {
  const summaryPaneItem = document.createElement('div');
  summaryPaneItem.setAttribute('class', 'unselected');
  summaryPaneItem.innerText = person.name;
  summaryPane.appendChild(summaryPaneItem);

  const adjentPaneItem = document.createElement('ul');
  adjentPaneItem.setAttribute('id', person.name);

  for (const [key, value] of Object.entries(person)) {
    adjentPaneItemField = document.createElement('li');
    adjentPaneItemField.innerText = `${value}`;
    adjentPaneItem.appendChild(adjentPaneItemField);
  }

  adjentPane.appendChild(adjentPaneItem);

  if (index == 0) {
    summaryPaneItem.setAttribute('class', 'selected');
  }

  summaryPaneItem.addEventListener('click', () => {
    const selectedElement = document.querySelector('.selected');
    selectedElement.setAttribute('class', 'unselected');

    summaryPaneItem.setAttribute('class', 'selected');

    for (let ul of ulCollection) {
      ul.style.display = 'none';
    }

    const test = document.getElementById(summaryPaneItem.innerHTML);
    test.style.display = 'inline';
  });
});

const ulCollection = document.getElementsByTagName('ul');
ulCollection[0].style.display = 'inline';
