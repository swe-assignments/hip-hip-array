const TestSequencer = require('@jest/test-sequencer').default;
const figlet = require('figlet')
const chalk = require('chalk')

const files = [
  'levelUp',
  'copyPaste',
  'cleanUp',
  'bigWords',
  'targetPractice',
  'rotate',
  'unduplicate',
  'arraySameOrdered',
  'arraySameUnordered',
  'stepCount'
]

const sleep = s => new Promise(resolve => setTimeout(resolve, s*1000))

const startUp = async (files, font) => {

  console.log('\n')
  console.log(chalk.blueBright(figlet.textSync('Hip Hip Array!', { font })))
  console.log(chalk.greenBright('\nDon\'t go c[]zy!\n'))
  await sleep(0.8)
  for (let line of files.map((x,i) => `${i+1}. ${x}`)) {
    await sleep(0.1)
    console.log(chalk.underline.bold.blueBright(line))
  }
  console.log('\n')
  await sleep(1)

  class CustomSequencer extends TestSequencer {

    async sort (tests) {
  
      const order = files.map(x => `${x}.test.js`)
  
      return tests
        .map(A => ({ ...A, fileName: A.path.split('/').at(-1) }))
        .filter(A => order.includes(A.fileName))
        .sort((A, B) => {
          const i = order.indexOf(A.fileName)
          const j = order.indexOf(B.fileName)
          return i > j ? 1 : i < j ? -1 : 0
        })
  
    }
  }

  return CustomSequencer

}

module.exports = startUp(files, 'Puffy')
