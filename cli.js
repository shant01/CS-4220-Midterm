const yargs = require('yargs/yargs');
const app = require('./app.js');

yargs(process.argv.slice(2))
  .usage('$0 Usage: <command> [options]')
  .command(
    'search [keyword]',
    'Search for sports teams by keyword',
    (yargs) => {
        return(
            yargs
                .positional('keyword', {
                    describe: 'Keyword to search for',
                    type: 'string',
                    demandOption: true,
          })
          .options('help', {
            alias: 'h',
            type: 'boolean',
            describe: 'Show help',
          })
        );
    },
    (args) => {
      app.search(args.keyword);
    }
  )
  .help().argv;

