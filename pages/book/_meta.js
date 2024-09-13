export default {
  index: 'Overview',
  cs: 'Cheatsheets',
  '-- 1': {
    type: 'separator',
    title: 'Fundamentals of Tact',
  },
  types: 'Type system overview',
  integers: 'Integers',
  cells: 'Cells, Builders and Slices',
  maps: 'Maps',
  'structs-and-messages': 'Structs and Messages',
  optionals: 'Optionals',
  contracts: 'Contracts',
  'exit-codes': 'Exit codes',
  '-- 2': {
    type: 'separator',
    title: 'Expressiveness',
  },
  operators: 'Operators',
  expressions: 'Expressions',
  statements: 'Statements',
  constants: 'Constants',
  functions: 'Functions',
  '-- 3': {
    type: 'separator',
    title: 'Communication',
  },
  // <- NOTE
  //    potential place for a rather short overview page describing asynchronous & actor-model nature
  //    of TON Blockchain with respect to Tact and exchanging messages with it
  receive: 'Receive messages',
  bounced: 'Bounced messages',
  external: 'External messages',
  lifecycle: 'Message lifecycle',
  send: 'Sending messages',
  'message-mode': 'Message mode',
  '-- 4': {
    type: 'separator',
    title: 'Going places',
  },
  deploy: 'Deployment',
  debug: 'Debugging',
  upgrades: 'Contract upgrades',
  import: 'Importing code',
  config: 'Configuration',
  masterchain: 'Masterchain',
  func: 'Compatibility with FunC',
  programmatic: 'Programmatic API',
  '-- Community': {
    type: 'separator',
  },
  'telegram-link': {
    title: '✈️ Telegram',
    href: 'https://t.me/tactlang',
    newWindow: true
  },
  'xtwitter-link': {
    title: '🐦 X/Twitter',
    href: 'https://twitter.com/tact_language',
    newWindow: true
  },
}
