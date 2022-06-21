# dcr.js v1
A Wrapper for the DCR API, DB & Cache.  

## Installation
| Service | Command                  |
|---------|--------------------------|
| NPM     | `npm install dcr.js` |
| YARN    | `yarn add dcr.js`    |

## Changelog
### v1.0.3
* Added support for revives (`<Client>.revives#get()`)
* Removed `getAll` from all `get`s
* Changed `get(all, options)` to `get(id, options)`