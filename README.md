# dcr-client v1
A Wrapper for the DCR API, DB & Cache using [node-fetch](https://www.npmjs.com/package/node-fetch), [mysql](https://www.npmjs.com/package/mysql) and [dcr-cache](https://www.npmjs.com/package/dcr-cache).  

## Installation
| Service | Command                  |
|---------|--------------------------|
| NPM     | `npm install dcr-client` |
| YARN    | `yarn add dcr-client`    |

## Changelog
### v1.0.3
* Added support for revives (`<Client>.revives#get()`)
* Removed `getAll` from all `get`s
* Changed `get(all, options)` to `get(id, options)`