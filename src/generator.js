import math from 'mathsteps';

const variables = {
  x: {
    min: 1,
    max: 10
  },
  y: {
    min: 1,
    max: 10
  },
  "": {
    min: -8,
    max: 8
  }
}

function gcf(f, s) {
  return f ? gcf(s % f, f) : s
}
function randomInRange(min, max) {
  return Math.floor(Math.random()*(max+1-min)) + min
}
function random(json) {
  let max = json["max"]
  let min = json["min"]
  return Math.floor(Math.random()*(max+1-min)) + min
}
function restrictedRandom(json, used) {
  var rand = random(json)
  if (rand === 0 || gcf(rand, used[0]) !== 1) {
    rand = restrictedRandom(json, used)
  }
  return rand
}

function simplify(str) {
  var steps = math.simplifyExpression(str)
  if (steps[steps.length - 1] === undefined)
    return formatEx(str)
  // steps.forEach(step => {
  //   console.log(step.newNode.toString())
  // })
  return formatEx(steps[steps.length - 1].newNode.toString())
}

function formatEx(str) {
  //console.log("before format: " + str)
  //             / /x ^ 2 -> x^2               // 5 * x * y -> 5xy                                          // y * -4 -> -4y                                // 8 x -> 8x
  var ret = str.replaceAll(/\s+(\^)\s+/g, '^').replaceAll(/(\w)\s*\*\s*(?=(?:\w\s*\*\s*)*[a-zA-Z])/g, '$1').replaceAll(/([a-zA-Z])\s*\*\s*(-*\d+)/g, '$2$1').replaceAll(/(\w\s+)+\w/g, match => {
    return match.replaceAll(/\s+/g, '')
  }).replaceAll(/[a-zA-Z]{2,}/g, match => { // yx -> xy
    let letters = match.split('');
    letters.sort();
    return letters.join('');
    // + - -> -                       // 1 -x -> 1 - x                              // 1x -> x                       // w+w -> w + w                                     // +4 -> 4                         // double spaces
  }).replaceAll(/\+(\s*-\s*)/g, '$1').replaceAll(/(\w)\s*(-)\s*(\w)/g, '$1 $2 $3').replaceAll(/(?<!\w)1(\w)/g, '$1').replaceAll(/(\w)\s*([+-])\s*(?=\w)/g, '$1 $2 ').replaceAll(/(^\+)|(\()\+/g, '$2').replaceAll(/\s\s/g, ' ')
  //console.log("after: " + ret)
  return ret
}
function forceSimplify(str, depth) {
  for (let i = 0; i < depth; i++) {
    str = simplify(str)
  }
  return str
}
function polynomial(terms, arr, forceConstant) {
  var keys = Object.keys(variables)
  var output = ""
  let length = keys.length
  var used = [1];
  for (let i = 0; i < terms; i++) {
    let str = polynomialLoop(keys, i, length, used, arr, (forceConstant && i === terms-1))
    arr.push(str)
    output+=str
    if (i !== terms-1) {
      output+="+"
    }
  }
  return output
}
function polynomialLoop(keys, i, length, used, arr, forceConstant) {
  var key = keys[i % length]
  if (forceConstant === true) key = keys[length-1]
  let rand = restrictedRandom(variables[`${key}`], used)
  let str = `${rand}${key}`
  if (arr.includes(str)) return polynomialLoop(keys, i, length, used, arr, forceConstant)
  used[0] = rand
  return str
}
function generalFactoring(terms, forceConstant) {
  var saved = []

  var first = polynomial(terms, saved, forceConstant)
  var second = polynomial(terms, saved, forceConstant)

  return `(${first})(${second})`
}
function mirrors(terms, forceConstant) {
  var saved = []

  var poly = formatEx(polynomial(terms, saved, forceConstant))
  var poly2 = poly

  let rand = randomInRange(1, terms-1)
  for (let i = 0; i < rand; i++) {
    let regex = new RegExp(`((?:[^+-]*[+-]){${i}}[^+-]*)([+-])`)
    poly2 = poly2.replace(regex, (match, g1, g2) => {
      var rep = g2 === "+" ? "-" : "+"
      return `${g1}${rep}`
    })
  }

  return `(${poly})(${poly2})`
}
function group2x2() {
  var saved = []

  var first = polynomial(2, saved, false)
  var second = polynomial(2, saved, true)

  return `(${first})(${second})`
}

// mirrors(2, true) -> DOS
// mirrors(3, false) -> 3x1 grouping
// group2x2() -> 2x2 grouping
// generalFactoring(2, true) -> random

export default simplify;
export { mirrors };
export { group2x2 };
export { generalFactoring };
export { forceSimplify };
export { formatEx };
export { randomInRange };