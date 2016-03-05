# needle-kit
![needle](http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=46849369)

## modules
```js
var kit = require('needle-kit');
```

### lib
- kit.co = co
- kit.Promise = bluebird

### fs
- kit.fs = fs-extra
- with `existsAsync`, promisified via `exists`

### request
- kit.request = superagent
- with `charset()`
- with `endAsync()`, promisified via `end`

## License
MIT http://magicdawn.mit-license.org
