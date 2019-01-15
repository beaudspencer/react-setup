const inquirer = require('inquirer')
const chalk = require('chalk')
const figlet = require('figlet')

function figletStart() {
  console.log(chalk.green(
    figlet.textSync('React Setup', {
      font: 'Big',
      horizontalLayout: 'default',
      verticalLayout: 'default'
    })
  ))
}

function projectSetup() {
  const prompts = [
    {
      name: 'github',
      type: 'list',
      message: 'Is this project going to be using github source control? Setup will create and configure linters for you if you are',
      choices: ['yes', 'no']
    },
    {
      name: 'express',
      type: 'list',
      message: 'Are you setting up an Express server for this project',
      choices: ['yes', 'no']
    },
    {
      name: 'mongodb',
      type: 'list',
      message: 'Are you setting up a MongoDB database with this project?',
      choices: ['yes', 'no']
    },
    {
      name: 'material',
      type: 'list',
      message: 'Are you using Material-UI on the front end?',
      choices: ['yes', 'no']
    },
    {
      name: 'icons',
      type: 'list',
      message: 'Material Icons?',
      choices: ['yes', 'no']
    }
  ]
  return inquirer.prompt(prompts)
}

function review(answers) {
  for (const key in answers) {
    console.log(`${key}: ${answers[key]}`)
  }
  const confirm = [{
    name: 'correct',
    type: 'list',
    message: 'Does this look right?',
    choices: ['yes', 'no']
  }]
  return inquirer.prompt(confirm)
}

async function runApp() {
  figletStart()
  let config
  let correct = 'no'
  do {
    config = await projectSetup()
    const confirm = await review(config)
    correct = confirm.correct
  } while (correct === 'no')
}

runApp()
