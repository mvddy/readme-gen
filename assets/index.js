const fs = require('fs');
const util = require('util');
const inquirer = require("inquirer");
const writeFileAsync = util.promisify(fs.writeFile);

function generateREADME(answers) {
  return `
# ${answers.title}

## Description
${answers.description}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Tests](#tests)
* [License](#license)
* [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## License
${answers.license}

## Questions
Contact me for questions at ${answers.email}. You can also find more of my work on my GitHub profile: https://github.com/${answers.username}.
`;
}

inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Project title',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of your project:',
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Provide installation instructions:',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Provide usage instructions:',
    },
    {
      type: 'input',
      name: 'contributing',
      message: 'Provide contribution guidelines:',
    },
    {
      type: 'input',
      name: 'tests',
      message: 'Provide testing instructions:',
    },
    {
      type: 'list',
      name: 'license',
      message: 'Choose a license for your project:',
      choices: [
        'MIT',
        'Apache',
        'GPLv3',
        'BSD 3-Clause',
        'Unlicense',
      ],
    },
    {
      type: 'input',
      name: 'username',
      message: 'Enter your GitHub username:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email address:',
    },
  ])
  .then((answers) => {
    const readme = generateREADME(answers);
    return writeFileAsync('README.md', readme);
  })
  .then(() => console.log('README.md generated successfully!'))
  .catch((err) => console.error(err));