export const timings = {
  'linear': function(k) {
    return k;
  }, 
  'ease-in': function(k) {
    return Math.pow(k, 1.675);
  }, 
  'ease-out': function(k) {
    return 1 - Math.pow(1 - k, 1.675);
  }, 
  'ease-in-out': function(k) {
    return .5*(Math.sin((k - .5)*Math.PI) + 1);
  },
  'in-expo': function(n){
    return 0 == n ? 0 : Math.pow(1024, n - 1);
  },
  'out-expo': function(n){
    return 1 == n ? n : 1 - Math.pow(2, -10 * n);
  },
  'in-out-expo': function(n){
    if (0 == n) return 0;
    if (1 == n) return 1;
    if ((n *= 2) < 1) return .5 * Math.pow(1024, n - 1);
    return .5 * (-Math.pow(2, -10 * (n - 1)) + 2);
  }, 
  'bounce-ease-out': function(t) {
    function bounce(t) {
      for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
        if (t >= (7 - 4 * a) / 11) {
          return -Math.pow((11 - 6 * a - 11 * t) / 4, 2) + Math.pow(b, 2)
        }
      }
    }
    return 1 - bounce(1 - t);
  }
}