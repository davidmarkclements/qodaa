# qodaa 

Quick and Dirty Async/Await for Node 6

## Usage

Preload `qodaa` via Node's `-r` flag:

```sh
node -r qodaa my-app.js
```

Async/await functions will now execute in Node 6.

## How

Node's module system internals are overloaded, code is
transpiled on the fly in a very light weight way (no babel here).

## Should I use this in production?

No. Definitely not. Don't do it. 
This is written purely for async/await support in tests. 
In general, transpiling server side code is not recommended.

## Node 8+

`qodaa` is safe to use with Node 8+, it will simply return early.

## License

MIT

## Acknowledgements

Sponsored by nearForm
