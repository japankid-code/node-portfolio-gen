const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('./src/page-template');

// const pageHTML = generatePage(name, github);

// fs.writeFile('index.html', pageHTML, err => {
//     if (err) throw err;

//     console.log('file written to index.html')
// })

const promptUser = () => {
    return inquirer.prompt([
        {
        type: 'input',
        name: 'name',
        message: 'What is your name?'
        },
        {
        type: 'input',
        name: 'github',
        message: 'What is your github username?'
        },
        {
        type: 'input',
        name: 'about',
        message: 'provide info about u self'
        }
    ]);
}

const promptProject = portfolioData => {
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(`
    ===============
    add new project
    ===============
    `)
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'what is the name of the project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'provide description of the project'
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'what did you build this project with?',
            choices: ['javascript', 'HTML', 'CSS', 'ES6', 'jquery', 'tailwind', 'node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'github link to project?'
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'would you like to add another project?',
            default: false
        }
    ])
        .then(projectData => {
            portfolioData.projects.push(projectData)
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            } else {
                return portfolioData;
            }
        })
}
    
promptUser()
    .then(promptProject)
    .then(portfolioData => console.log(portfolioData))