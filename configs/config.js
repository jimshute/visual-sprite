var cfg = {
  resourcePath: '',
  cssDist: './cssDist',
  imgDist: './imgDist'
};
module.exports = function() {
  return (function() {
    return cfg || (cfg = this);
  })();
};
