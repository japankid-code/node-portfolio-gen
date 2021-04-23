const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./src/page-template');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: nameInput => {
                if  (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name !!');
                    return false;
                }
        }
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is your github username?',
            validate: githubInput => {
                if  (githubInput) {
                    return true;
                } else {
                    console.log('Please enter your github !!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Are you sure you want to enter info about yourself?',
            default: true,
        },
        {
            type: 'input',
            name: 'about',
            message: 'provide info about u self',
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                  return true;
                } else {
                  return false;
                }
            },
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
            message: 'what is the name of the project?',
            validate: nameInput => {
                if  (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your project name !!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'provide description of the project',
            validate: descriptionInput => {
                if  (descriptionInput) {
                    return true;
                } else {
                    console.log('Please enter your project description !!');
                }
            }
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
            message: 'github link to project?',
            validate: linkInput => {
                if  (linkInput) {
                    return true;
                } else {
                    console.log('Please enter your project link !!');
                }
            }
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
    .then(portfolioData => {
        const pageHTML = generatePage(portfolioData);
        
        fs.writeFile('./dist/index.html', pageHTML, err => {
            if (err) throw err;
        
            console.log('file written to index.html')

            fs.copyFile('src/style.css', './dist/styles.css', err => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("Style sheet successfully copied.")
            })
        })
    })