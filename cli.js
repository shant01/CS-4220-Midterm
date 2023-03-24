const yargs = require('yargs/yargs');
const app = require('./app.js');

yargs(process.argv.slice(2))
    .usage('$0: Usage <command> [options]')
    .command(
        'search [keyword]',
        'Search for teams by keyword',
        (yargs) => {
            return yargs
                .positional('keyword', {
                    describe: 'Keyword to search for',
                    type: 'string'
                })
                .options('help', {
                    alias: 'h',
                    type: 'boolean',
                    describe: 'Show help'
                });
        },
        (args) => {
            if (args.keyword) {
                app.displayResults(args.keyword);
            } else {
                console.log('Enter a keyword to search for.');
            }
        }
    )
    .help().argv;
