var cfg = {
  resourcePath: '',
  dist: './cssDist',
  imgSrc: './imgDist'
};
module.exports = function() {
  return (function() {
    return cfg || (cfg = this);
  })();
};
