var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function createCommonjsModule(fn, basedir, module) {
  return module = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire(path, base === void 0 || base === null ? module.path : base);
    }
  }, fn(module, module.exports), module.exports;
}
function commonjsRequire() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var matter = createCommonjsModule(function(module, exports) {
  /*!
   * matter-js 0.18.0 by @liabru
   * http://brm.io/matter-js/
   * License MIT
   * 
   * The MIT License (MIT)
   * 
   * Copyright (c) Liam Brummitt and contributors.
   * 
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   * 
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   * 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  (function webpackUniversalModuleDefinition(root, factory) {
    module.exports = factory();
  })(commonjsGlobal, function() {
    return function(modules) {
      var installedModules = {};
      function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
          return installedModules[moduleId].exports;
        }
        var module2 = installedModules[moduleId] = {
          i: moduleId,
          l: false,
          exports: {}
        };
        modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
        module2.l = true;
        return module2.exports;
      }
      __webpack_require__.m = modules;
      __webpack_require__.c = installedModules;
      __webpack_require__.d = function(exports2, name, getter) {
        if (!__webpack_require__.o(exports2, name)) {
          Object.defineProperty(exports2, name, {enumerable: true, get: getter});
        }
      };
      __webpack_require__.r = function(exports2) {
        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
          Object.defineProperty(exports2, Symbol.toStringTag, {value: "Module"});
        }
        Object.defineProperty(exports2, "__esModule", {value: true});
      };
      __webpack_require__.t = function(value, mode) {
        if (mode & 1)
          value = __webpack_require__(value);
        if (mode & 8)
          return value;
        if (mode & 4 && typeof value === "object" && value && value.__esModule)
          return value;
        var ns = Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, "default", {enumerable: true, value});
        if (mode & 2 && typeof value != "string")
          for (var key in value)
            __webpack_require__.d(ns, key, function(key2) {
              return value[key2];
            }.bind(null, key));
        return ns;
      };
      __webpack_require__.n = function(module2) {
        var getter = module2 && module2.__esModule ? function getDefault() {
          return module2["default"];
        } : function getModuleExports() {
          return module2;
        };
        __webpack_require__.d(getter, "a", getter);
        return getter;
      };
      __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      __webpack_require__.p = "";
      return __webpack_require__(__webpack_require__.s = 21);
    }([
      function(module2, exports2) {
        var Common = {};
        module2.exports = Common;
        (function() {
          Common._nextId = 0;
          Common._seed = 0;
          Common._nowStartTime = +new Date();
          Common._warnedOnce = {};
          Common._decomp = null;
          Common.extend = function(obj, deep) {
            var argsStart, deepClone;
            if (typeof deep === "boolean") {
              argsStart = 2;
              deepClone = deep;
            } else {
              argsStart = 1;
              deepClone = true;
            }
            for (var i = argsStart; i < arguments.length; i++) {
              var source = arguments[i];
              if (source) {
                for (var prop in source) {
                  if (deepClone && source[prop] && source[prop].constructor === Object) {
                    if (!obj[prop] || obj[prop].constructor === Object) {
                      obj[prop] = obj[prop] || {};
                      Common.extend(obj[prop], deepClone, source[prop]);
                    } else {
                      obj[prop] = source[prop];
                    }
                  } else {
                    obj[prop] = source[prop];
                  }
                }
              }
            }
            return obj;
          };
          Common.clone = function(obj, deep) {
            return Common.extend({}, deep, obj);
          };
          Common.keys = function(obj) {
            if (Object.keys)
              return Object.keys(obj);
            var keys = [];
            for (var key in obj)
              keys.push(key);
            return keys;
          };
          Common.values = function(obj) {
            var values = [];
            if (Object.keys) {
              var keys = Object.keys(obj);
              for (var i = 0; i < keys.length; i++) {
                values.push(obj[keys[i]]);
              }
              return values;
            }
            for (var key in obj)
              values.push(obj[key]);
            return values;
          };
          Common.get = function(obj, path, begin, end) {
            path = path.split(".").slice(begin, end);
            for (var i = 0; i < path.length; i += 1) {
              obj = obj[path[i]];
            }
            return obj;
          };
          Common.set = function(obj, path, val, begin, end) {
            var parts = path.split(".").slice(begin, end);
            Common.get(obj, path, 0, -1)[parts[parts.length - 1]] = val;
            return val;
          };
          Common.shuffle = function(array) {
            for (var i = array.length - 1; i > 0; i--) {
              var j = Math.floor(Common.random() * (i + 1));
              var temp = array[i];
              array[i] = array[j];
              array[j] = temp;
            }
            return array;
          };
          Common.choose = function(choices) {
            return choices[Math.floor(Common.random() * choices.length)];
          };
          Common.isElement = function(obj) {
            if (typeof HTMLElement !== "undefined") {
              return obj instanceof HTMLElement;
            }
            return !!(obj && obj.nodeType && obj.nodeName);
          };
          Common.isArray = function(obj) {
            return Object.prototype.toString.call(obj) === "[object Array]";
          };
          Common.isFunction = function(obj) {
            return typeof obj === "function";
          };
          Common.isPlainObject = function(obj) {
            return typeof obj === "object" && obj.constructor === Object;
          };
          Common.isString = function(obj) {
            return toString.call(obj) === "[object String]";
          };
          Common.clamp = function(value, min, max) {
            if (value < min)
              return min;
            if (value > max)
              return max;
            return value;
          };
          Common.sign = function(value) {
            return value < 0 ? -1 : 1;
          };
          Common.now = function() {
            if (typeof window !== "undefined" && window.performance) {
              if (window.performance.now) {
                return window.performance.now();
              } else if (window.performance.webkitNow) {
                return window.performance.webkitNow();
              }
            }
            if (Date.now) {
              return Date.now();
            }
            return new Date() - Common._nowStartTime;
          };
          Common.random = function(min, max) {
            min = typeof min !== "undefined" ? min : 0;
            max = typeof max !== "undefined" ? max : 1;
            return min + _seededRandom() * (max - min);
          };
          var _seededRandom = function() {
            Common._seed = (Common._seed * 9301 + 49297) % 233280;
            return Common._seed / 233280;
          };
          Common.colorToNumber = function(colorString) {
            colorString = colorString.replace("#", "");
            if (colorString.length == 3) {
              colorString = colorString.charAt(0) + colorString.charAt(0) + colorString.charAt(1) + colorString.charAt(1) + colorString.charAt(2) + colorString.charAt(2);
            }
            return parseInt(colorString, 16);
          };
          Common.logLevel = 1;
          Common.log = function() {
            if (console && Common.logLevel > 0 && Common.logLevel <= 3) {
              console.log.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)));
            }
          };
          Common.info = function() {
            if (console && Common.logLevel > 0 && Common.logLevel <= 2) {
              console.info.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)));
            }
          };
          Common.warn = function() {
            if (console && Common.logLevel > 0 && Common.logLevel <= 3) {
              console.warn.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)));
            }
          };
          Common.warnOnce = function() {
            var message = Array.prototype.slice.call(arguments).join(" ");
            if (!Common._warnedOnce[message]) {
              Common.warn(message);
              Common._warnedOnce[message] = true;
            }
          };
          Common.deprecated = function(obj, prop, warning) {
            obj[prop] = Common.chain(function() {
              Common.warnOnce("\u{1F505} deprecated \u{1F505}", warning);
            }, obj[prop]);
          };
          Common.nextId = function() {
            return Common._nextId++;
          };
          Common.indexOf = function(haystack, needle) {
            if (haystack.indexOf)
              return haystack.indexOf(needle);
            for (var i = 0; i < haystack.length; i++) {
              if (haystack[i] === needle)
                return i;
            }
            return -1;
          };
          Common.map = function(list, func) {
            if (list.map) {
              return list.map(func);
            }
            var mapped = [];
            for (var i = 0; i < list.length; i += 1) {
              mapped.push(func(list[i]));
            }
            return mapped;
          };
          Common.topologicalSort = function(graph) {
            var result = [], visited = [], temp = [];
            for (var node in graph) {
              if (!visited[node] && !temp[node]) {
                Common._topologicalSort(node, visited, temp, graph, result);
              }
            }
            return result;
          };
          Common._topologicalSort = function(node, visited, temp, graph, result) {
            var neighbors = graph[node] || [];
            temp[node] = true;
            for (var i = 0; i < neighbors.length; i += 1) {
              var neighbor = neighbors[i];
              if (temp[neighbor]) {
                continue;
              }
              if (!visited[neighbor]) {
                Common._topologicalSort(neighbor, visited, temp, graph, result);
              }
            }
            temp[node] = false;
            visited[node] = true;
            result.push(node);
          };
          Common.chain = function() {
            var funcs = [];
            for (var i = 0; i < arguments.length; i += 1) {
              var func = arguments[i];
              if (func._chained) {
                funcs.push.apply(funcs, func._chained);
              } else {
                funcs.push(func);
              }
            }
            var chain = function() {
              var lastResult, args = new Array(arguments.length);
              for (var i2 = 0, l = arguments.length; i2 < l; i2++) {
                args[i2] = arguments[i2];
              }
              for (i2 = 0; i2 < funcs.length; i2 += 1) {
                var result = funcs[i2].apply(lastResult, args);
                if (typeof result !== "undefined") {
                  lastResult = result;
                }
              }
              return lastResult;
            };
            chain._chained = funcs;
            return chain;
          };
          Common.chainPathBefore = function(base, path, func) {
            return Common.set(base, path, Common.chain(func, Common.get(base, path)));
          };
          Common.chainPathAfter = function(base, path, func) {
            return Common.set(base, path, Common.chain(Common.get(base, path), func));
          };
          Common.setDecomp = function(decomp) {
            Common._decomp = decomp;
          };
          Common.getDecomp = function() {
            var decomp = Common._decomp;
            try {
              if (!decomp && typeof window !== "undefined") {
                decomp = window.decomp;
              }
              if (!decomp && typeof commonjsGlobal !== "undefined") {
                decomp = commonjsGlobal.decomp;
              }
            } catch (e) {
              decomp = null;
            }
            return decomp;
          };
        })();
      },
      function(module2, exports2) {
        var Bounds = {};
        module2.exports = Bounds;
        (function() {
          Bounds.create = function(vertices) {
            var bounds = {
              min: {x: 0, y: 0},
              max: {x: 0, y: 0}
            };
            if (vertices)
              Bounds.update(bounds, vertices);
            return bounds;
          };
          Bounds.update = function(bounds, vertices, velocity) {
            bounds.min.x = Infinity;
            bounds.max.x = -Infinity;
            bounds.min.y = Infinity;
            bounds.max.y = -Infinity;
            for (var i = 0; i < vertices.length; i++) {
              var vertex = vertices[i];
              if (vertex.x > bounds.max.x)
                bounds.max.x = vertex.x;
              if (vertex.x < bounds.min.x)
                bounds.min.x = vertex.x;
              if (vertex.y > bounds.max.y)
                bounds.max.y = vertex.y;
              if (vertex.y < bounds.min.y)
                bounds.min.y = vertex.y;
            }
            if (velocity) {
              if (velocity.x > 0) {
                bounds.max.x += velocity.x;
              } else {
                bounds.min.x += velocity.x;
              }
              if (velocity.y > 0) {
                bounds.max.y += velocity.y;
              } else {
                bounds.min.y += velocity.y;
              }
            }
          };
          Bounds.contains = function(bounds, point) {
            return point.x >= bounds.min.x && point.x <= bounds.max.x && point.y >= bounds.min.y && point.y <= bounds.max.y;
          };
          Bounds.overlaps = function(boundsA, boundsB) {
            return boundsA.min.x <= boundsB.max.x && boundsA.max.x >= boundsB.min.x && boundsA.max.y >= boundsB.min.y && boundsA.min.y <= boundsB.max.y;
          };
          Bounds.translate = function(bounds, vector) {
            bounds.min.x += vector.x;
            bounds.max.x += vector.x;
            bounds.min.y += vector.y;
            bounds.max.y += vector.y;
          };
          Bounds.shift = function(bounds, position) {
            var deltaX = bounds.max.x - bounds.min.x, deltaY = bounds.max.y - bounds.min.y;
            bounds.min.x = position.x;
            bounds.max.x = position.x + deltaX;
            bounds.min.y = position.y;
            bounds.max.y = position.y + deltaY;
          };
        })();
      },
      function(module2, exports2) {
        var Vector = {};
        module2.exports = Vector;
        (function() {
          Vector.create = function(x, y) {
            return {x: x || 0, y: y || 0};
          };
          Vector.clone = function(vector) {
            return {x: vector.x, y: vector.y};
          };
          Vector.magnitude = function(vector) {
            return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
          };
          Vector.magnitudeSquared = function(vector) {
            return vector.x * vector.x + vector.y * vector.y;
          };
          Vector.rotate = function(vector, angle, output) {
            var cos = Math.cos(angle), sin = Math.sin(angle);
            if (!output)
              output = {};
            var x = vector.x * cos - vector.y * sin;
            output.y = vector.x * sin + vector.y * cos;
            output.x = x;
            return output;
          };
          Vector.rotateAbout = function(vector, angle, point, output) {
            var cos = Math.cos(angle), sin = Math.sin(angle);
            if (!output)
              output = {};
            var x = point.x + ((vector.x - point.x) * cos - (vector.y - point.y) * sin);
            output.y = point.y + ((vector.x - point.x) * sin + (vector.y - point.y) * cos);
            output.x = x;
            return output;
          };
          Vector.normalise = function(vector) {
            var magnitude = Vector.magnitude(vector);
            if (magnitude === 0)
              return {x: 0, y: 0};
            return {x: vector.x / magnitude, y: vector.y / magnitude};
          };
          Vector.dot = function(vectorA, vectorB) {
            return vectorA.x * vectorB.x + vectorA.y * vectorB.y;
          };
          Vector.cross = function(vectorA, vectorB) {
            return vectorA.x * vectorB.y - vectorA.y * vectorB.x;
          };
          Vector.cross3 = function(vectorA, vectorB, vectorC) {
            return (vectorB.x - vectorA.x) * (vectorC.y - vectorA.y) - (vectorB.y - vectorA.y) * (vectorC.x - vectorA.x);
          };
          Vector.add = function(vectorA, vectorB, output) {
            if (!output)
              output = {};
            output.x = vectorA.x + vectorB.x;
            output.y = vectorA.y + vectorB.y;
            return output;
          };
          Vector.sub = function(vectorA, vectorB, output) {
            if (!output)
              output = {};
            output.x = vectorA.x - vectorB.x;
            output.y = vectorA.y - vectorB.y;
            return output;
          };
          Vector.mult = function(vector, scalar) {
            return {x: vector.x * scalar, y: vector.y * scalar};
          };
          Vector.div = function(vector, scalar) {
            return {x: vector.x / scalar, y: vector.y / scalar};
          };
          Vector.perp = function(vector, negate) {
            negate = negate === true ? -1 : 1;
            return {x: negate * -vector.y, y: negate * vector.x};
          };
          Vector.neg = function(vector) {
            return {x: -vector.x, y: -vector.y};
          };
          Vector.angle = function(vectorA, vectorB) {
            return Math.atan2(vectorB.y - vectorA.y, vectorB.x - vectorA.x);
          };
          Vector._temp = [
            Vector.create(),
            Vector.create(),
            Vector.create(),
            Vector.create(),
            Vector.create(),
            Vector.create()
          ];
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Vertices = {};
        module2.exports = Vertices;
        var Vector = __webpack_require__(2);
        var Common = __webpack_require__(0);
        (function() {
          Vertices.create = function(points, body) {
            var vertices = [];
            for (var i = 0; i < points.length; i++) {
              var point = points[i], vertex = {
                x: point.x,
                y: point.y,
                index: i,
                body,
                isInternal: false
              };
              vertices.push(vertex);
            }
            return vertices;
          };
          Vertices.fromPath = function(path, body) {
            var pathPattern = /L?\s*([-\d.e]+)[\s,]*([-\d.e]+)*/ig, points = [];
            path.replace(pathPattern, function(match, x, y) {
              points.push({x: parseFloat(x), y: parseFloat(y)});
            });
            return Vertices.create(points, body);
          };
          Vertices.centre = function(vertices) {
            var area = Vertices.area(vertices, true), centre = {x: 0, y: 0}, cross, temp, j;
            for (var i = 0; i < vertices.length; i++) {
              j = (i + 1) % vertices.length;
              cross = Vector.cross(vertices[i], vertices[j]);
              temp = Vector.mult(Vector.add(vertices[i], vertices[j]), cross);
              centre = Vector.add(centre, temp);
            }
            return Vector.div(centre, 6 * area);
          };
          Vertices.mean = function(vertices) {
            var average = {x: 0, y: 0};
            for (var i = 0; i < vertices.length; i++) {
              average.x += vertices[i].x;
              average.y += vertices[i].y;
            }
            return Vector.div(average, vertices.length);
          };
          Vertices.area = function(vertices, signed) {
            var area = 0, j = vertices.length - 1;
            for (var i = 0; i < vertices.length; i++) {
              area += (vertices[j].x - vertices[i].x) * (vertices[j].y + vertices[i].y);
              j = i;
            }
            if (signed)
              return area / 2;
            return Math.abs(area) / 2;
          };
          Vertices.inertia = function(vertices, mass) {
            var numerator = 0, denominator = 0, v = vertices, cross, j;
            for (var n = 0; n < v.length; n++) {
              j = (n + 1) % v.length;
              cross = Math.abs(Vector.cross(v[j], v[n]));
              numerator += cross * (Vector.dot(v[j], v[j]) + Vector.dot(v[j], v[n]) + Vector.dot(v[n], v[n]));
              denominator += cross;
            }
            return mass / 6 * (numerator / denominator);
          };
          Vertices.translate = function(vertices, vector, scalar) {
            scalar = typeof scalar !== "undefined" ? scalar : 1;
            var verticesLength = vertices.length, translateX = vector.x * scalar, translateY = vector.y * scalar, i;
            for (i = 0; i < verticesLength; i++) {
              vertices[i].x += translateX;
              vertices[i].y += translateY;
            }
            return vertices;
          };
          Vertices.rotate = function(vertices, angle, point) {
            if (angle === 0)
              return;
            var cos = Math.cos(angle), sin = Math.sin(angle), pointX = point.x, pointY = point.y, verticesLength = vertices.length, vertex, dx, dy, i;
            for (i = 0; i < verticesLength; i++) {
              vertex = vertices[i];
              dx = vertex.x - pointX;
              dy = vertex.y - pointY;
              vertex.x = pointX + (dx * cos - dy * sin);
              vertex.y = pointY + (dx * sin + dy * cos);
            }
            return vertices;
          };
          Vertices.contains = function(vertices, point) {
            var pointX = point.x, pointY = point.y, verticesLength = vertices.length, vertex = vertices[verticesLength - 1], nextVertex;
            for (var i = 0; i < verticesLength; i++) {
              nextVertex = vertices[i];
              if ((pointX - vertex.x) * (nextVertex.y - vertex.y) + (pointY - vertex.y) * (vertex.x - nextVertex.x) > 0) {
                return false;
              }
              vertex = nextVertex;
            }
            return true;
          };
          Vertices.scale = function(vertices, scaleX, scaleY, point) {
            if (scaleX === 1 && scaleY === 1)
              return vertices;
            point = point || Vertices.centre(vertices);
            var vertex, delta;
            for (var i = 0; i < vertices.length; i++) {
              vertex = vertices[i];
              delta = Vector.sub(vertex, point);
              vertices[i].x = point.x + delta.x * scaleX;
              vertices[i].y = point.y + delta.y * scaleY;
            }
            return vertices;
          };
          Vertices.chamfer = function(vertices, radius, quality, qualityMin, qualityMax) {
            if (typeof radius === "number") {
              radius = [radius];
            } else {
              radius = radius || [8];
            }
            quality = typeof quality !== "undefined" ? quality : -1;
            qualityMin = qualityMin || 2;
            qualityMax = qualityMax || 14;
            var newVertices = [];
            for (var i = 0; i < vertices.length; i++) {
              var prevVertex = vertices[i - 1 >= 0 ? i - 1 : vertices.length - 1], vertex = vertices[i], nextVertex = vertices[(i + 1) % vertices.length], currentRadius = radius[i < radius.length ? i : radius.length - 1];
              if (currentRadius === 0) {
                newVertices.push(vertex);
                continue;
              }
              var prevNormal = Vector.normalise({
                x: vertex.y - prevVertex.y,
                y: prevVertex.x - vertex.x
              });
              var nextNormal = Vector.normalise({
                x: nextVertex.y - vertex.y,
                y: vertex.x - nextVertex.x
              });
              var diagonalRadius = Math.sqrt(2 * Math.pow(currentRadius, 2)), radiusVector = Vector.mult(Common.clone(prevNormal), currentRadius), midNormal = Vector.normalise(Vector.mult(Vector.add(prevNormal, nextNormal), 0.5)), scaledVertex = Vector.sub(vertex, Vector.mult(midNormal, diagonalRadius));
              var precision = quality;
              if (quality === -1) {
                precision = Math.pow(currentRadius, 0.32) * 1.75;
              }
              precision = Common.clamp(precision, qualityMin, qualityMax);
              if (precision % 2 === 1)
                precision += 1;
              var alpha = Math.acos(Vector.dot(prevNormal, nextNormal)), theta = alpha / precision;
              for (var j = 0; j < precision; j++) {
                newVertices.push(Vector.add(Vector.rotate(radiusVector, theta * j), scaledVertex));
              }
            }
            return newVertices;
          };
          Vertices.clockwiseSort = function(vertices) {
            var centre = Vertices.mean(vertices);
            vertices.sort(function(vertexA, vertexB) {
              return Vector.angle(centre, vertexA) - Vector.angle(centre, vertexB);
            });
            return vertices;
          };
          Vertices.isConvex = function(vertices) {
            var flag = 0, n = vertices.length, i, j, k, z;
            if (n < 3)
              return null;
            for (i = 0; i < n; i++) {
              j = (i + 1) % n;
              k = (i + 2) % n;
              z = (vertices[j].x - vertices[i].x) * (vertices[k].y - vertices[j].y);
              z -= (vertices[j].y - vertices[i].y) * (vertices[k].x - vertices[j].x);
              if (z < 0) {
                flag |= 1;
              } else if (z > 0) {
                flag |= 2;
              }
              if (flag === 3) {
                return false;
              }
            }
            if (flag !== 0) {
              return true;
            } else {
              return null;
            }
          };
          Vertices.hull = function(vertices) {
            var upper = [], lower = [], vertex, i;
            vertices = vertices.slice(0);
            vertices.sort(function(vertexA, vertexB) {
              var dx = vertexA.x - vertexB.x;
              return dx !== 0 ? dx : vertexA.y - vertexB.y;
            });
            for (i = 0; i < vertices.length; i += 1) {
              vertex = vertices[i];
              while (lower.length >= 2 && Vector.cross3(lower[lower.length - 2], lower[lower.length - 1], vertex) <= 0) {
                lower.pop();
              }
              lower.push(vertex);
            }
            for (i = vertices.length - 1; i >= 0; i -= 1) {
              vertex = vertices[i];
              while (upper.length >= 2 && Vector.cross3(upper[upper.length - 2], upper[upper.length - 1], vertex) <= 0) {
                upper.pop();
              }
              upper.push(vertex);
            }
            upper.pop();
            lower.pop();
            return upper.concat(lower);
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Events = {};
        module2.exports = Events;
        var Common = __webpack_require__(0);
        (function() {
          Events.on = function(object, eventNames, callback) {
            var names = eventNames.split(" "), name;
            for (var i = 0; i < names.length; i++) {
              name = names[i];
              object.events = object.events || {};
              object.events[name] = object.events[name] || [];
              object.events[name].push(callback);
            }
            return callback;
          };
          Events.off = function(object, eventNames, callback) {
            if (!eventNames) {
              object.events = {};
              return;
            }
            if (typeof eventNames === "function") {
              callback = eventNames;
              eventNames = Common.keys(object.events).join(" ");
            }
            var names = eventNames.split(" ");
            for (var i = 0; i < names.length; i++) {
              var callbacks = object.events[names[i]], newCallbacks = [];
              if (callback && callbacks) {
                for (var j = 0; j < callbacks.length; j++) {
                  if (callbacks[j] !== callback)
                    newCallbacks.push(callbacks[j]);
                }
              }
              object.events[names[i]] = newCallbacks;
            }
          };
          Events.trigger = function(object, eventNames, event) {
            var names, name, callbacks, eventClone;
            var events = object.events;
            if (events && Common.keys(events).length > 0) {
              if (!event)
                event = {};
              names = eventNames.split(" ");
              for (var i = 0; i < names.length; i++) {
                name = names[i];
                callbacks = events[name];
                if (callbacks) {
                  eventClone = Common.clone(event, false);
                  eventClone.name = name;
                  eventClone.source = object;
                  for (var j = 0; j < callbacks.length; j++) {
                    callbacks[j].apply(object, [eventClone]);
                  }
                }
              }
            }
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Composite = {};
        module2.exports = Composite;
        var Events = __webpack_require__(4);
        var Common = __webpack_require__(0);
        var Bounds = __webpack_require__(1);
        var Body = __webpack_require__(6);
        (function() {
          Composite.create = function(options) {
            return Common.extend({
              id: Common.nextId(),
              type: "composite",
              parent: null,
              isModified: false,
              bodies: [],
              constraints: [],
              composites: [],
              label: "Composite",
              plugin: {},
              cache: {
                allBodies: null,
                allConstraints: null,
                allComposites: null
              }
            }, options);
          };
          Composite.setModified = function(composite, isModified, updateParents, updateChildren) {
            composite.isModified = isModified;
            if (isModified && composite.cache) {
              composite.cache.allBodies = null;
              composite.cache.allConstraints = null;
              composite.cache.allComposites = null;
            }
            if (updateParents && composite.parent) {
              Composite.setModified(composite.parent, isModified, updateParents, updateChildren);
            }
            if (updateChildren) {
              for (var i = 0; i < composite.composites.length; i++) {
                var childComposite = composite.composites[i];
                Composite.setModified(childComposite, isModified, updateParents, updateChildren);
              }
            }
          };
          Composite.add = function(composite, object) {
            var objects = [].concat(object);
            Events.trigger(composite, "beforeAdd", {object});
            for (var i = 0; i < objects.length; i++) {
              var obj = objects[i];
              switch (obj.type) {
                case "body":
                  if (obj.parent !== obj) {
                    Common.warn("Composite.add: skipped adding a compound body part (you must add its parent instead)");
                    break;
                  }
                  Composite.addBody(composite, obj);
                  break;
                case "constraint":
                  Composite.addConstraint(composite, obj);
                  break;
                case "composite":
                  Composite.addComposite(composite, obj);
                  break;
                case "mouseConstraint":
                  Composite.addConstraint(composite, obj.constraint);
                  break;
              }
            }
            Events.trigger(composite, "afterAdd", {object});
            return composite;
          };
          Composite.remove = function(composite, object, deep) {
            var objects = [].concat(object);
            Events.trigger(composite, "beforeRemove", {object});
            for (var i = 0; i < objects.length; i++) {
              var obj = objects[i];
              switch (obj.type) {
                case "body":
                  Composite.removeBody(composite, obj, deep);
                  break;
                case "constraint":
                  Composite.removeConstraint(composite, obj, deep);
                  break;
                case "composite":
                  Composite.removeComposite(composite, obj, deep);
                  break;
                case "mouseConstraint":
                  Composite.removeConstraint(composite, obj.constraint);
                  break;
              }
            }
            Events.trigger(composite, "afterRemove", {object});
            return composite;
          };
          Composite.addComposite = function(compositeA, compositeB) {
            compositeA.composites.push(compositeB);
            compositeB.parent = compositeA;
            Composite.setModified(compositeA, true, true, false);
            return compositeA;
          };
          Composite.removeComposite = function(compositeA, compositeB, deep) {
            var position = Common.indexOf(compositeA.composites, compositeB);
            if (position !== -1) {
              Composite.removeCompositeAt(compositeA, position);
            }
            if (deep) {
              for (var i = 0; i < compositeA.composites.length; i++) {
                Composite.removeComposite(compositeA.composites[i], compositeB, true);
              }
            }
            return compositeA;
          };
          Composite.removeCompositeAt = function(composite, position) {
            composite.composites.splice(position, 1);
            Composite.setModified(composite, true, true, false);
            return composite;
          };
          Composite.addBody = function(composite, body) {
            composite.bodies.push(body);
            Composite.setModified(composite, true, true, false);
            return composite;
          };
          Composite.removeBody = function(composite, body, deep) {
            var position = Common.indexOf(composite.bodies, body);
            if (position !== -1) {
              Composite.removeBodyAt(composite, position);
            }
            if (deep) {
              for (var i = 0; i < composite.composites.length; i++) {
                Composite.removeBody(composite.composites[i], body, true);
              }
            }
            return composite;
          };
          Composite.removeBodyAt = function(composite, position) {
            composite.bodies.splice(position, 1);
            Composite.setModified(composite, true, true, false);
            return composite;
          };
          Composite.addConstraint = function(composite, constraint) {
            composite.constraints.push(constraint);
            Composite.setModified(composite, true, true, false);
            return composite;
          };
          Composite.removeConstraint = function(composite, constraint, deep) {
            var position = Common.indexOf(composite.constraints, constraint);
            if (position !== -1) {
              Composite.removeConstraintAt(composite, position);
            }
            if (deep) {
              for (var i = 0; i < composite.composites.length; i++) {
                Composite.removeConstraint(composite.composites[i], constraint, true);
              }
            }
            return composite;
          };
          Composite.removeConstraintAt = function(composite, position) {
            composite.constraints.splice(position, 1);
            Composite.setModified(composite, true, true, false);
            return composite;
          };
          Composite.clear = function(composite, keepStatic, deep) {
            if (deep) {
              for (var i = 0; i < composite.composites.length; i++) {
                Composite.clear(composite.composites[i], keepStatic, true);
              }
            }
            if (keepStatic) {
              composite.bodies = composite.bodies.filter(function(body) {
                return body.isStatic;
              });
            } else {
              composite.bodies.length = 0;
            }
            composite.constraints.length = 0;
            composite.composites.length = 0;
            Composite.setModified(composite, true, true, false);
            return composite;
          };
          Composite.allBodies = function(composite) {
            if (composite.cache && composite.cache.allBodies) {
              return composite.cache.allBodies;
            }
            var bodies = [].concat(composite.bodies);
            for (var i = 0; i < composite.composites.length; i++)
              bodies = bodies.concat(Composite.allBodies(composite.composites[i]));
            if (composite.cache) {
              composite.cache.allBodies = bodies;
            }
            return bodies;
          };
          Composite.allConstraints = function(composite) {
            if (composite.cache && composite.cache.allConstraints) {
              return composite.cache.allConstraints;
            }
            var constraints = [].concat(composite.constraints);
            for (var i = 0; i < composite.composites.length; i++)
              constraints = constraints.concat(Composite.allConstraints(composite.composites[i]));
            if (composite.cache) {
              composite.cache.allConstraints = constraints;
            }
            return constraints;
          };
          Composite.allComposites = function(composite) {
            if (composite.cache && composite.cache.allComposites) {
              return composite.cache.allComposites;
            }
            var composites = [].concat(composite.composites);
            for (var i = 0; i < composite.composites.length; i++)
              composites = composites.concat(Composite.allComposites(composite.composites[i]));
            if (composite.cache) {
              composite.cache.allComposites = composites;
            }
            return composites;
          };
          Composite.get = function(composite, id, type) {
            var objects, object;
            switch (type) {
              case "body":
                objects = Composite.allBodies(composite);
                break;
              case "constraint":
                objects = Composite.allConstraints(composite);
                break;
              case "composite":
                objects = Composite.allComposites(composite).concat(composite);
                break;
            }
            if (!objects)
              return null;
            object = objects.filter(function(object2) {
              return object2.id.toString() === id.toString();
            });
            return object.length === 0 ? null : object[0];
          };
          Composite.move = function(compositeA, objects, compositeB) {
            Composite.remove(compositeA, objects);
            Composite.add(compositeB, objects);
            return compositeA;
          };
          Composite.rebase = function(composite) {
            var objects = Composite.allBodies(composite).concat(Composite.allConstraints(composite)).concat(Composite.allComposites(composite));
            for (var i = 0; i < objects.length; i++) {
              objects[i].id = Common.nextId();
            }
            return composite;
          };
          Composite.translate = function(composite, translation, recursive) {
            var bodies = recursive ? Composite.allBodies(composite) : composite.bodies;
            for (var i = 0; i < bodies.length; i++) {
              Body.translate(bodies[i], translation);
            }
            return composite;
          };
          Composite.rotate = function(composite, rotation, point, recursive) {
            var cos = Math.cos(rotation), sin = Math.sin(rotation), bodies = recursive ? Composite.allBodies(composite) : composite.bodies;
            for (var i = 0; i < bodies.length; i++) {
              var body = bodies[i], dx = body.position.x - point.x, dy = body.position.y - point.y;
              Body.setPosition(body, {
                x: point.x + (dx * cos - dy * sin),
                y: point.y + (dx * sin + dy * cos)
              });
              Body.rotate(body, rotation);
            }
            return composite;
          };
          Composite.scale = function(composite, scaleX, scaleY, point, recursive) {
            var bodies = recursive ? Composite.allBodies(composite) : composite.bodies;
            for (var i = 0; i < bodies.length; i++) {
              var body = bodies[i], dx = body.position.x - point.x, dy = body.position.y - point.y;
              Body.setPosition(body, {
                x: point.x + dx * scaleX,
                y: point.y + dy * scaleY
              });
              Body.scale(body, scaleX, scaleY);
            }
            return composite;
          };
          Composite.bounds = function(composite) {
            var bodies = Composite.allBodies(composite), vertices = [];
            for (var i = 0; i < bodies.length; i += 1) {
              var body = bodies[i];
              vertices.push(body.bounds.min, body.bounds.max);
            }
            return Bounds.create(vertices);
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Body = {};
        module2.exports = Body;
        var Vertices = __webpack_require__(3);
        var Vector = __webpack_require__(2);
        var Sleeping = __webpack_require__(7);
        var Render = __webpack_require__(16);
        var Common = __webpack_require__(0);
        var Bounds = __webpack_require__(1);
        var Axes = __webpack_require__(11);
        (function() {
          Body._inertiaScale = 4;
          Body._nextCollidingGroupId = 1;
          Body._nextNonCollidingGroupId = -1;
          Body._nextCategory = 1;
          Body.create = function(options) {
            var defaults = {
              id: Common.nextId(),
              type: "body",
              label: "Body",
              parts: [],
              plugin: {},
              angle: 0,
              vertices: Vertices.fromPath("L 0 0 L 40 0 L 40 40 L 0 40"),
              position: {x: 0, y: 0},
              force: {x: 0, y: 0},
              torque: 0,
              positionImpulse: {x: 0, y: 0},
              constraintImpulse: {x: 0, y: 0, angle: 0},
              totalContacts: 0,
              speed: 0,
              angularSpeed: 0,
              velocity: {x: 0, y: 0},
              angularVelocity: 0,
              isSensor: false,
              isStatic: false,
              isSleeping: false,
              motion: 0,
              sleepThreshold: 60,
              density: 1e-3,
              restitution: 0,
              friction: 0.1,
              frictionStatic: 0.5,
              frictionAir: 0.01,
              collisionFilter: {
                category: 1,
                mask: 4294967295,
                group: 0
              },
              slop: 0.05,
              timeScale: 1,
              render: {
                visible: true,
                opacity: 1,
                strokeStyle: null,
                fillStyle: null,
                lineWidth: null,
                sprite: {
                  xScale: 1,
                  yScale: 1,
                  xOffset: 0,
                  yOffset: 0
                }
              },
              events: null,
              bounds: null,
              chamfer: null,
              circleRadius: 0,
              positionPrev: null,
              anglePrev: 0,
              parent: null,
              axes: null,
              area: 0,
              mass: 0,
              inertia: 0,
              _original: null
            };
            var body = Common.extend(defaults, options);
            _initProperties(body, options);
            return body;
          };
          Body.nextGroup = function(isNonColliding) {
            if (isNonColliding)
              return Body._nextNonCollidingGroupId--;
            return Body._nextCollidingGroupId++;
          };
          Body.nextCategory = function() {
            Body._nextCategory = Body._nextCategory << 1;
            return Body._nextCategory;
          };
          var _initProperties = function(body, options) {
            options = options || {};
            Body.set(body, {
              bounds: body.bounds || Bounds.create(body.vertices),
              positionPrev: body.positionPrev || Vector.clone(body.position),
              anglePrev: body.anglePrev || body.angle,
              vertices: body.vertices,
              parts: body.parts || [body],
              isStatic: body.isStatic,
              isSleeping: body.isSleeping,
              parent: body.parent || body
            });
            Vertices.rotate(body.vertices, body.angle, body.position);
            Axes.rotate(body.axes, body.angle);
            Bounds.update(body.bounds, body.vertices, body.velocity);
            Body.set(body, {
              axes: options.axes || body.axes,
              area: options.area || body.area,
              mass: options.mass || body.mass,
              inertia: options.inertia || body.inertia
            });
            var defaultFillStyle = body.isStatic ? "#14151f" : Common.choose(["#f19648", "#f5d259", "#f55a3c", "#063e7b", "#ececd1"]), defaultStrokeStyle = body.isStatic ? "#555" : "#ccc", defaultLineWidth = body.isStatic && body.render.fillStyle === null ? 1 : 0;
            body.render.fillStyle = body.render.fillStyle || defaultFillStyle;
            body.render.strokeStyle = body.render.strokeStyle || defaultStrokeStyle;
            body.render.lineWidth = body.render.lineWidth || defaultLineWidth;
            body.render.sprite.xOffset += -(body.bounds.min.x - body.position.x) / (body.bounds.max.x - body.bounds.min.x);
            body.render.sprite.yOffset += -(body.bounds.min.y - body.position.y) / (body.bounds.max.y - body.bounds.min.y);
          };
          Body.set = function(body, settings, value) {
            var property;
            if (typeof settings === "string") {
              property = settings;
              settings = {};
              settings[property] = value;
            }
            for (property in settings) {
              if (!Object.prototype.hasOwnProperty.call(settings, property))
                continue;
              value = settings[property];
              switch (property) {
                case "isStatic":
                  Body.setStatic(body, value);
                  break;
                case "isSleeping":
                  Sleeping.set(body, value);
                  break;
                case "mass":
                  Body.setMass(body, value);
                  break;
                case "density":
                  Body.setDensity(body, value);
                  break;
                case "inertia":
                  Body.setInertia(body, value);
                  break;
                case "vertices":
                  Body.setVertices(body, value);
                  break;
                case "position":
                  Body.setPosition(body, value);
                  break;
                case "angle":
                  Body.setAngle(body, value);
                  break;
                case "velocity":
                  Body.setVelocity(body, value);
                  break;
                case "angularVelocity":
                  Body.setAngularVelocity(body, value);
                  break;
                case "parts":
                  Body.setParts(body, value);
                  break;
                case "centre":
                  Body.setCentre(body, value);
                  break;
                default:
                  body[property] = value;
              }
            }
          };
          Body.setStatic = function(body, isStatic) {
            for (var i = 0; i < body.parts.length; i++) {
              var part = body.parts[i];
              part.isStatic = isStatic;
              if (isStatic) {
                part._original = {
                  restitution: part.restitution,
                  friction: part.friction,
                  mass: part.mass,
                  inertia: part.inertia,
                  density: part.density,
                  inverseMass: part.inverseMass,
                  inverseInertia: part.inverseInertia
                };
                part.restitution = 0;
                part.friction = 1;
                part.mass = part.inertia = part.density = Infinity;
                part.inverseMass = part.inverseInertia = 0;
                part.positionPrev.x = part.position.x;
                part.positionPrev.y = part.position.y;
                part.anglePrev = part.angle;
                part.angularVelocity = 0;
                part.speed = 0;
                part.angularSpeed = 0;
                part.motion = 0;
              } else if (part._original) {
                part.restitution = part._original.restitution;
                part.friction = part._original.friction;
                part.mass = part._original.mass;
                part.inertia = part._original.inertia;
                part.density = part._original.density;
                part.inverseMass = part._original.inverseMass;
                part.inverseInertia = part._original.inverseInertia;
                part._original = null;
              }
            }
          };
          Body.setMass = function(body, mass) {
            var moment = body.inertia / (body.mass / 6);
            body.inertia = moment * (mass / 6);
            body.inverseInertia = 1 / body.inertia;
            body.mass = mass;
            body.inverseMass = 1 / body.mass;
            body.density = body.mass / body.area;
          };
          Body.setDensity = function(body, density) {
            Body.setMass(body, density * body.area);
            body.density = density;
          };
          Body.setInertia = function(body, inertia) {
            body.inertia = inertia;
            body.inverseInertia = 1 / body.inertia;
          };
          Body.setVertices = function(body, vertices) {
            if (vertices[0].body === body) {
              body.vertices = vertices;
            } else {
              body.vertices = Vertices.create(vertices, body);
            }
            body.axes = Axes.fromVertices(body.vertices);
            body.area = Vertices.area(body.vertices);
            Body.setMass(body, body.density * body.area);
            var centre = Vertices.centre(body.vertices);
            Vertices.translate(body.vertices, centre, -1);
            Body.setInertia(body, Body._inertiaScale * Vertices.inertia(body.vertices, body.mass));
            Vertices.translate(body.vertices, body.position);
            Bounds.update(body.bounds, body.vertices, body.velocity);
          };
          Body.setParts = function(body, parts, autoHull) {
            var i;
            parts = parts.slice(0);
            body.parts.length = 0;
            body.parts.push(body);
            body.parent = body;
            for (i = 0; i < parts.length; i++) {
              var part = parts[i];
              if (part !== body) {
                part.parent = body;
                body.parts.push(part);
              }
            }
            if (body.parts.length === 1)
              return;
            autoHull = typeof autoHull !== "undefined" ? autoHull : true;
            if (autoHull) {
              var vertices = [];
              for (i = 0; i < parts.length; i++) {
                vertices = vertices.concat(parts[i].vertices);
              }
              Vertices.clockwiseSort(vertices);
              var hull = Vertices.hull(vertices), hullCentre = Vertices.centre(hull);
              Body.setVertices(body, hull);
              Vertices.translate(body.vertices, hullCentre);
            }
            var total = Body._totalProperties(body);
            body.area = total.area;
            body.parent = body;
            body.position.x = total.centre.x;
            body.position.y = total.centre.y;
            body.positionPrev.x = total.centre.x;
            body.positionPrev.y = total.centre.y;
            Body.setMass(body, total.mass);
            Body.setInertia(body, total.inertia);
            Body.setPosition(body, total.centre);
          };
          Body.setCentre = function(body, centre, relative) {
            if (!relative) {
              body.positionPrev.x = centre.x - (body.position.x - body.positionPrev.x);
              body.positionPrev.y = centre.y - (body.position.y - body.positionPrev.y);
              body.position.x = centre.x;
              body.position.y = centre.y;
            } else {
              body.positionPrev.x += centre.x;
              body.positionPrev.y += centre.y;
              body.position.x += centre.x;
              body.position.y += centre.y;
            }
          };
          Body.setPosition = function(body, position) {
            var delta = Vector.sub(position, body.position);
            body.positionPrev.x += delta.x;
            body.positionPrev.y += delta.y;
            for (var i = 0; i < body.parts.length; i++) {
              var part = body.parts[i];
              part.position.x += delta.x;
              part.position.y += delta.y;
              Vertices.translate(part.vertices, delta);
              Bounds.update(part.bounds, part.vertices, body.velocity);
            }
          };
          Body.setAngle = function(body, angle) {
            var delta = angle - body.angle;
            body.anglePrev += delta;
            for (var i = 0; i < body.parts.length; i++) {
              var part = body.parts[i];
              part.angle += delta;
              Vertices.rotate(part.vertices, delta, body.position);
              Axes.rotate(part.axes, delta);
              Bounds.update(part.bounds, part.vertices, body.velocity);
              if (i > 0) {
                Vector.rotateAbout(part.position, delta, body.position, part.position);
              }
            }
          };
          Body.setVelocity = function(body, velocity) {
            body.positionPrev.x = body.position.x - velocity.x;
            body.positionPrev.y = body.position.y - velocity.y;
            body.velocity.x = velocity.x;
            body.velocity.y = velocity.y;
            body.speed = Vector.magnitude(body.velocity);
          };
          Body.setAngularVelocity = function(body, velocity) {
            body.anglePrev = body.angle - velocity;
            body.angularVelocity = velocity;
            body.angularSpeed = Math.abs(body.angularVelocity);
          };
          Body.translate = function(body, translation) {
            Body.setPosition(body, Vector.add(body.position, translation));
          };
          Body.rotate = function(body, rotation, point) {
            if (!point) {
              Body.setAngle(body, body.angle + rotation);
            } else {
              var cos = Math.cos(rotation), sin = Math.sin(rotation), dx = body.position.x - point.x, dy = body.position.y - point.y;
              Body.setPosition(body, {
                x: point.x + (dx * cos - dy * sin),
                y: point.y + (dx * sin + dy * cos)
              });
              Body.setAngle(body, body.angle + rotation);
            }
          };
          Body.scale = function(body, scaleX, scaleY, point) {
            var totalArea = 0, totalInertia = 0;
            point = point || body.position;
            for (var i = 0; i < body.parts.length; i++) {
              var part = body.parts[i];
              Vertices.scale(part.vertices, scaleX, scaleY, point);
              part.axes = Axes.fromVertices(part.vertices);
              part.area = Vertices.area(part.vertices);
              Body.setMass(part, body.density * part.area);
              Vertices.translate(part.vertices, {x: -part.position.x, y: -part.position.y});
              Body.setInertia(part, Body._inertiaScale * Vertices.inertia(part.vertices, part.mass));
              Vertices.translate(part.vertices, {x: part.position.x, y: part.position.y});
              if (i > 0) {
                totalArea += part.area;
                totalInertia += part.inertia;
              }
              part.position.x = point.x + (part.position.x - point.x) * scaleX;
              part.position.y = point.y + (part.position.y - point.y) * scaleY;
              Bounds.update(part.bounds, part.vertices, body.velocity);
            }
            if (body.parts.length > 1) {
              body.area = totalArea;
              if (!body.isStatic) {
                Body.setMass(body, body.density * totalArea);
                Body.setInertia(body, totalInertia);
              }
            }
            if (body.circleRadius) {
              if (scaleX === scaleY) {
                body.circleRadius *= scaleX;
              } else {
                body.circleRadius = null;
              }
            }
          };
          Body.update = function(body, deltaTime, timeScale, correction) {
            var deltaTimeSquared = Math.pow(deltaTime * timeScale * body.timeScale, 2);
            var frictionAir = 1 - body.frictionAir * timeScale * body.timeScale, velocityPrevX = body.position.x - body.positionPrev.x, velocityPrevY = body.position.y - body.positionPrev.y;
            body.velocity.x = velocityPrevX * frictionAir * correction + body.force.x / body.mass * deltaTimeSquared;
            body.velocity.y = velocityPrevY * frictionAir * correction + body.force.y / body.mass * deltaTimeSquared;
            body.positionPrev.x = body.position.x;
            body.positionPrev.y = body.position.y;
            body.position.x += body.velocity.x;
            body.position.y += body.velocity.y;
            body.angularVelocity = (body.angle - body.anglePrev) * frictionAir * correction + body.torque / body.inertia * deltaTimeSquared;
            body.anglePrev = body.angle;
            body.angle += body.angularVelocity;
            body.speed = Vector.magnitude(body.velocity);
            body.angularSpeed = Math.abs(body.angularVelocity);
            for (var i = 0; i < body.parts.length; i++) {
              var part = body.parts[i];
              Vertices.translate(part.vertices, body.velocity);
              if (i > 0) {
                part.position.x += body.velocity.x;
                part.position.y += body.velocity.y;
              }
              if (body.angularVelocity !== 0) {
                Vertices.rotate(part.vertices, body.angularVelocity, body.position);
                Axes.rotate(part.axes, body.angularVelocity);
                if (i > 0) {
                  Vector.rotateAbout(part.position, body.angularVelocity, body.position, part.position);
                }
              }
              Bounds.update(part.bounds, part.vertices, body.velocity);
            }
          };
          Body.applyForce = function(body, position, force) {
            body.force.x += force.x;
            body.force.y += force.y;
            var offset = {x: position.x - body.position.x, y: position.y - body.position.y};
            body.torque += offset.x * force.y - offset.y * force.x;
          };
          Body._totalProperties = function(body) {
            var properties = {
              mass: 0,
              area: 0,
              inertia: 0,
              centre: {x: 0, y: 0}
            };
            for (var i = body.parts.length === 1 ? 0 : 1; i < body.parts.length; i++) {
              var part = body.parts[i], mass = part.mass !== Infinity ? part.mass : 1;
              properties.mass += mass;
              properties.area += part.area;
              properties.inertia += part.inertia;
              properties.centre = Vector.add(properties.centre, Vector.mult(part.position, mass));
            }
            properties.centre = Vector.div(properties.centre, properties.mass);
            return properties;
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Sleeping = {};
        module2.exports = Sleeping;
        var Events = __webpack_require__(4);
        (function() {
          Sleeping._motionWakeThreshold = 0.18;
          Sleeping._motionSleepThreshold = 0.08;
          Sleeping._minBias = 0.9;
          Sleeping.update = function(bodies, timeScale) {
            var timeFactor = timeScale * timeScale * timeScale;
            for (var i = 0; i < bodies.length; i++) {
              var body = bodies[i], motion = body.speed * body.speed + body.angularSpeed * body.angularSpeed;
              if (body.force.x !== 0 || body.force.y !== 0) {
                Sleeping.set(body, false);
                continue;
              }
              var minMotion = Math.min(body.motion, motion), maxMotion = Math.max(body.motion, motion);
              body.motion = Sleeping._minBias * minMotion + (1 - Sleeping._minBias) * maxMotion;
              if (body.sleepThreshold > 0 && body.motion < Sleeping._motionSleepThreshold * timeFactor) {
                body.sleepCounter += 1;
                if (body.sleepCounter >= body.sleepThreshold)
                  Sleeping.set(body, true);
              } else if (body.sleepCounter > 0) {
                body.sleepCounter -= 1;
              }
            }
          };
          Sleeping.afterCollisions = function(pairs, timeScale) {
            var timeFactor = timeScale * timeScale * timeScale;
            for (var i = 0; i < pairs.length; i++) {
              var pair = pairs[i];
              if (!pair.isActive)
                continue;
              var collision = pair.collision, bodyA = collision.bodyA.parent, bodyB = collision.bodyB.parent;
              if (bodyA.isSleeping && bodyB.isSleeping || bodyA.isStatic || bodyB.isStatic)
                continue;
              if (bodyA.isSleeping || bodyB.isSleeping) {
                var sleepingBody = bodyA.isSleeping && !bodyA.isStatic ? bodyA : bodyB, movingBody = sleepingBody === bodyA ? bodyB : bodyA;
                if (!sleepingBody.isStatic && movingBody.motion > Sleeping._motionWakeThreshold * timeFactor) {
                  Sleeping.set(sleepingBody, false);
                }
              }
            }
          };
          Sleeping.set = function(body, isSleeping) {
            var wasSleeping = body.isSleeping;
            if (isSleeping) {
              body.isSleeping = true;
              body.sleepCounter = body.sleepThreshold;
              body.positionImpulse.x = 0;
              body.positionImpulse.y = 0;
              body.positionPrev.x = body.position.x;
              body.positionPrev.y = body.position.y;
              body.anglePrev = body.angle;
              body.speed = 0;
              body.angularSpeed = 0;
              body.motion = 0;
              if (!wasSleeping) {
                Events.trigger(body, "sleepStart");
              }
            } else {
              body.isSleeping = false;
              body.sleepCounter = 0;
              if (wasSleeping) {
                Events.trigger(body, "sleepEnd");
              }
            }
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Collision = {};
        module2.exports = Collision;
        var Vertices = __webpack_require__(3);
        var Pair = __webpack_require__(9);
        (function() {
          var _supports = [];
          var _overlapAB = {
            overlap: 0,
            axis: null
          };
          var _overlapBA = {
            overlap: 0,
            axis: null
          };
          Collision.create = function(bodyA, bodyB) {
            return {
              pair: null,
              collided: false,
              bodyA,
              bodyB,
              parentA: bodyA.parent,
              parentB: bodyB.parent,
              depth: 0,
              normal: {x: 0, y: 0},
              tangent: {x: 0, y: 0},
              penetration: {x: 0, y: 0},
              supports: []
            };
          };
          Collision.collides = function(bodyA, bodyB, pairs) {
            Collision._overlapAxes(_overlapAB, bodyA.vertices, bodyB.vertices, bodyA.axes);
            if (_overlapAB.overlap <= 0) {
              return null;
            }
            Collision._overlapAxes(_overlapBA, bodyB.vertices, bodyA.vertices, bodyB.axes);
            if (_overlapBA.overlap <= 0) {
              return null;
            }
            var pair = pairs && pairs.table[Pair.id(bodyA, bodyB)], collision;
            if (!pair) {
              collision = Collision.create(bodyA, bodyB);
              collision.collided = true;
              collision.bodyA = bodyA.id < bodyB.id ? bodyA : bodyB;
              collision.bodyB = bodyA.id < bodyB.id ? bodyB : bodyA;
              collision.parentA = collision.bodyA.parent;
              collision.parentB = collision.bodyB.parent;
            } else {
              collision = pair.collision;
            }
            bodyA = collision.bodyA;
            bodyB = collision.bodyB;
            var minOverlap;
            if (_overlapAB.overlap < _overlapBA.overlap) {
              minOverlap = _overlapAB;
            } else {
              minOverlap = _overlapBA;
            }
            var normal = collision.normal, supports = collision.supports, minAxis = minOverlap.axis, minAxisX = minAxis.x, minAxisY = minAxis.y;
            if (minAxisX * (bodyB.position.x - bodyA.position.x) + minAxisY * (bodyB.position.y - bodyA.position.y) < 0) {
              normal.x = minAxisX;
              normal.y = minAxisY;
            } else {
              normal.x = -minAxisX;
              normal.y = -minAxisY;
            }
            collision.tangent.x = -normal.y;
            collision.tangent.y = normal.x;
            collision.depth = minOverlap.overlap;
            collision.penetration.x = normal.x * collision.depth;
            collision.penetration.y = normal.y * collision.depth;
            var supportsB = Collision._findSupports(bodyA, bodyB, normal, 1), supportCount = 0;
            if (Vertices.contains(bodyA.vertices, supportsB[0])) {
              supports[supportCount++] = supportsB[0];
            }
            if (Vertices.contains(bodyA.vertices, supportsB[1])) {
              supports[supportCount++] = supportsB[1];
            }
            if (supportCount < 2) {
              var supportsA = Collision._findSupports(bodyB, bodyA, normal, -1);
              if (Vertices.contains(bodyB.vertices, supportsA[0])) {
                supports[supportCount++] = supportsA[0];
              }
              if (supportCount < 2 && Vertices.contains(bodyB.vertices, supportsA[1])) {
                supports[supportCount++] = supportsA[1];
              }
            }
            if (supportCount === 0) {
              supports[supportCount++] = supportsB[0];
            }
            supports.length = supportCount;
            return collision;
          };
          Collision._overlapAxes = function(result, verticesA, verticesB, axes) {
            var verticesALength = verticesA.length, verticesBLength = verticesB.length, verticesAX = verticesA[0].x, verticesAY = verticesA[0].y, verticesBX = verticesB[0].x, verticesBY = verticesB[0].y, axesLength = axes.length, overlapMin = Number.MAX_VALUE, overlapAxisNumber = 0, overlap, overlapAB, overlapBA, dot, i, j;
            for (i = 0; i < axesLength; i++) {
              var axis = axes[i], axisX = axis.x, axisY = axis.y, minA = verticesAX * axisX + verticesAY * axisY, minB = verticesBX * axisX + verticesBY * axisY, maxA = minA, maxB = minB;
              for (j = 1; j < verticesALength; j += 1) {
                dot = verticesA[j].x * axisX + verticesA[j].y * axisY;
                if (dot > maxA) {
                  maxA = dot;
                } else if (dot < minA) {
                  minA = dot;
                }
              }
              for (j = 1; j < verticesBLength; j += 1) {
                dot = verticesB[j].x * axisX + verticesB[j].y * axisY;
                if (dot > maxB) {
                  maxB = dot;
                } else if (dot < minB) {
                  minB = dot;
                }
              }
              overlapAB = maxA - minB;
              overlapBA = maxB - minA;
              overlap = overlapAB < overlapBA ? overlapAB : overlapBA;
              if (overlap < overlapMin) {
                overlapMin = overlap;
                overlapAxisNumber = i;
                if (overlap <= 0) {
                  break;
                }
              }
            }
            result.axis = axes[overlapAxisNumber];
            result.overlap = overlapMin;
          };
          Collision._projectToAxis = function(projection, vertices, axis) {
            var min = vertices[0].x * axis.x + vertices[0].y * axis.y, max = min;
            for (var i = 1; i < vertices.length; i += 1) {
              var dot = vertices[i].x * axis.x + vertices[i].y * axis.y;
              if (dot > max) {
                max = dot;
              } else if (dot < min) {
                min = dot;
              }
            }
            projection.min = min;
            projection.max = max;
          };
          Collision._findSupports = function(bodyA, bodyB, normal, direction) {
            var vertices = bodyB.vertices, verticesLength = vertices.length, bodyAPositionX = bodyA.position.x, bodyAPositionY = bodyA.position.y, normalX = normal.x * direction, normalY = normal.y * direction, nearestDistance = Number.MAX_VALUE, vertexA, vertexB, vertexC, distance, j;
            for (j = 0; j < verticesLength; j += 1) {
              vertexB = vertices[j];
              distance = normalX * (bodyAPositionX - vertexB.x) + normalY * (bodyAPositionY - vertexB.y);
              if (distance < nearestDistance) {
                nearestDistance = distance;
                vertexA = vertexB;
              }
            }
            vertexC = vertices[(verticesLength + vertexA.index - 1) % verticesLength];
            nearestDistance = normalX * (bodyAPositionX - vertexC.x) + normalY * (bodyAPositionY - vertexC.y);
            vertexB = vertices[(vertexA.index + 1) % verticesLength];
            if (normalX * (bodyAPositionX - vertexB.x) + normalY * (bodyAPositionY - vertexB.y) < nearestDistance) {
              _supports[0] = vertexA;
              _supports[1] = vertexB;
              return _supports;
            }
            _supports[0] = vertexA;
            _supports[1] = vertexC;
            return _supports;
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Pair = {};
        module2.exports = Pair;
        var Contact = __webpack_require__(17);
        (function() {
          Pair.create = function(collision, timestamp) {
            var bodyA = collision.bodyA, bodyB = collision.bodyB;
            var pair = {
              id: Pair.id(bodyA, bodyB),
              bodyA,
              bodyB,
              collision,
              contacts: [],
              activeContacts: [],
              separation: 0,
              isActive: true,
              confirmedActive: true,
              isSensor: bodyA.isSensor || bodyB.isSensor,
              timeCreated: timestamp,
              timeUpdated: timestamp,
              inverseMass: 0,
              friction: 0,
              frictionStatic: 0,
              restitution: 0,
              slop: 0
            };
            Pair.update(pair, collision, timestamp);
            return pair;
          };
          Pair.update = function(pair, collision, timestamp) {
            var contacts = pair.contacts, supports = collision.supports, activeContacts = pair.activeContacts, parentA = collision.parentA, parentB = collision.parentB, parentAVerticesLength = parentA.vertices.length;
            pair.isActive = true;
            pair.timeUpdated = timestamp;
            pair.collision = collision;
            pair.separation = collision.depth;
            pair.inverseMass = parentA.inverseMass + parentB.inverseMass;
            pair.friction = parentA.friction < parentB.friction ? parentA.friction : parentB.friction;
            pair.frictionStatic = parentA.frictionStatic > parentB.frictionStatic ? parentA.frictionStatic : parentB.frictionStatic;
            pair.restitution = parentA.restitution > parentB.restitution ? parentA.restitution : parentB.restitution;
            pair.slop = parentA.slop > parentB.slop ? parentA.slop : parentB.slop;
            collision.pair = pair;
            activeContacts.length = 0;
            for (var i = 0; i < supports.length; i++) {
              var support = supports[i], contactId = support.body === parentA ? support.index : parentAVerticesLength + support.index, contact = contacts[contactId];
              if (contact) {
                activeContacts.push(contact);
              } else {
                activeContacts.push(contacts[contactId] = Contact.create(support));
              }
            }
          };
          Pair.setActive = function(pair, isActive, timestamp) {
            if (isActive) {
              pair.isActive = true;
              pair.timeUpdated = timestamp;
            } else {
              pair.isActive = false;
              pair.activeContacts.length = 0;
            }
          };
          Pair.id = function(bodyA, bodyB) {
            if (bodyA.id < bodyB.id) {
              return "A" + bodyA.id + "B" + bodyB.id;
            } else {
              return "A" + bodyB.id + "B" + bodyA.id;
            }
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Constraint = {};
        module2.exports = Constraint;
        var Vertices = __webpack_require__(3);
        var Vector = __webpack_require__(2);
        var Sleeping = __webpack_require__(7);
        var Bounds = __webpack_require__(1);
        var Axes = __webpack_require__(11);
        var Common = __webpack_require__(0);
        (function() {
          Constraint._warming = 0.4;
          Constraint._torqueDampen = 1;
          Constraint._minLength = 1e-6;
          Constraint.create = function(options) {
            var constraint = options;
            if (constraint.bodyA && !constraint.pointA)
              constraint.pointA = {x: 0, y: 0};
            if (constraint.bodyB && !constraint.pointB)
              constraint.pointB = {x: 0, y: 0};
            var initialPointA = constraint.bodyA ? Vector.add(constraint.bodyA.position, constraint.pointA) : constraint.pointA, initialPointB = constraint.bodyB ? Vector.add(constraint.bodyB.position, constraint.pointB) : constraint.pointB, length = Vector.magnitude(Vector.sub(initialPointA, initialPointB));
            constraint.length = typeof constraint.length !== "undefined" ? constraint.length : length;
            constraint.id = constraint.id || Common.nextId();
            constraint.label = constraint.label || "Constraint";
            constraint.type = "constraint";
            constraint.stiffness = constraint.stiffness || (constraint.length > 0 ? 1 : 0.7);
            constraint.damping = constraint.damping || 0;
            constraint.angularStiffness = constraint.angularStiffness || 0;
            constraint.angleA = constraint.bodyA ? constraint.bodyA.angle : constraint.angleA;
            constraint.angleB = constraint.bodyB ? constraint.bodyB.angle : constraint.angleB;
            constraint.plugin = {};
            var render = {
              visible: true,
              lineWidth: 2,
              strokeStyle: "#ffffff",
              type: "line",
              anchors: true
            };
            if (constraint.length === 0 && constraint.stiffness > 0.1) {
              render.type = "pin";
              render.anchors = false;
            } else if (constraint.stiffness < 0.9) {
              render.type = "spring";
            }
            constraint.render = Common.extend(render, constraint.render);
            return constraint;
          };
          Constraint.preSolveAll = function(bodies) {
            for (var i = 0; i < bodies.length; i += 1) {
              var body = bodies[i], impulse = body.constraintImpulse;
              if (body.isStatic || impulse.x === 0 && impulse.y === 0 && impulse.angle === 0) {
                continue;
              }
              body.position.x += impulse.x;
              body.position.y += impulse.y;
              body.angle += impulse.angle;
            }
          };
          Constraint.solveAll = function(constraints, timeScale) {
            for (var i = 0; i < constraints.length; i += 1) {
              var constraint = constraints[i], fixedA = !constraint.bodyA || constraint.bodyA && constraint.bodyA.isStatic, fixedB = !constraint.bodyB || constraint.bodyB && constraint.bodyB.isStatic;
              if (fixedA || fixedB) {
                Constraint.solve(constraints[i], timeScale);
              }
            }
            for (i = 0; i < constraints.length; i += 1) {
              constraint = constraints[i];
              fixedA = !constraint.bodyA || constraint.bodyA && constraint.bodyA.isStatic;
              fixedB = !constraint.bodyB || constraint.bodyB && constraint.bodyB.isStatic;
              if (!fixedA && !fixedB) {
                Constraint.solve(constraints[i], timeScale);
              }
            }
          };
          Constraint.solve = function(constraint, timeScale) {
            var bodyA = constraint.bodyA, bodyB = constraint.bodyB, pointA = constraint.pointA, pointB = constraint.pointB;
            if (!bodyA && !bodyB)
              return;
            if (bodyA && !bodyA.isStatic) {
              Vector.rotate(pointA, bodyA.angle - constraint.angleA, pointA);
              constraint.angleA = bodyA.angle;
            }
            if (bodyB && !bodyB.isStatic) {
              Vector.rotate(pointB, bodyB.angle - constraint.angleB, pointB);
              constraint.angleB = bodyB.angle;
            }
            var pointAWorld = pointA, pointBWorld = pointB;
            if (bodyA)
              pointAWorld = Vector.add(bodyA.position, pointA);
            if (bodyB)
              pointBWorld = Vector.add(bodyB.position, pointB);
            if (!pointAWorld || !pointBWorld)
              return;
            var delta = Vector.sub(pointAWorld, pointBWorld), currentLength = Vector.magnitude(delta);
            if (currentLength < Constraint._minLength) {
              currentLength = Constraint._minLength;
            }
            var difference = (currentLength - constraint.length) / currentLength, stiffness = constraint.stiffness < 1 ? constraint.stiffness * timeScale : constraint.stiffness, force = Vector.mult(delta, difference * stiffness), massTotal = (bodyA ? bodyA.inverseMass : 0) + (bodyB ? bodyB.inverseMass : 0), inertiaTotal = (bodyA ? bodyA.inverseInertia : 0) + (bodyB ? bodyB.inverseInertia : 0), resistanceTotal = massTotal + inertiaTotal, torque, share, normal, normalVelocity, relativeVelocity;
            if (constraint.damping) {
              var zero = Vector.create();
              normal = Vector.div(delta, currentLength);
              relativeVelocity = Vector.sub(bodyB && Vector.sub(bodyB.position, bodyB.positionPrev) || zero, bodyA && Vector.sub(bodyA.position, bodyA.positionPrev) || zero);
              normalVelocity = Vector.dot(normal, relativeVelocity);
            }
            if (bodyA && !bodyA.isStatic) {
              share = bodyA.inverseMass / massTotal;
              bodyA.constraintImpulse.x -= force.x * share;
              bodyA.constraintImpulse.y -= force.y * share;
              bodyA.position.x -= force.x * share;
              bodyA.position.y -= force.y * share;
              if (constraint.damping) {
                bodyA.positionPrev.x -= constraint.damping * normal.x * normalVelocity * share;
                bodyA.positionPrev.y -= constraint.damping * normal.y * normalVelocity * share;
              }
              torque = Vector.cross(pointA, force) / resistanceTotal * Constraint._torqueDampen * bodyA.inverseInertia * (1 - constraint.angularStiffness);
              bodyA.constraintImpulse.angle -= torque;
              bodyA.angle -= torque;
            }
            if (bodyB && !bodyB.isStatic) {
              share = bodyB.inverseMass / massTotal;
              bodyB.constraintImpulse.x += force.x * share;
              bodyB.constraintImpulse.y += force.y * share;
              bodyB.position.x += force.x * share;
              bodyB.position.y += force.y * share;
              if (constraint.damping) {
                bodyB.positionPrev.x += constraint.damping * normal.x * normalVelocity * share;
                bodyB.positionPrev.y += constraint.damping * normal.y * normalVelocity * share;
              }
              torque = Vector.cross(pointB, force) / resistanceTotal * Constraint._torqueDampen * bodyB.inverseInertia * (1 - constraint.angularStiffness);
              bodyB.constraintImpulse.angle += torque;
              bodyB.angle += torque;
            }
          };
          Constraint.postSolveAll = function(bodies) {
            for (var i = 0; i < bodies.length; i++) {
              var body = bodies[i], impulse = body.constraintImpulse;
              if (body.isStatic || impulse.x === 0 && impulse.y === 0 && impulse.angle === 0) {
                continue;
              }
              Sleeping.set(body, false);
              for (var j = 0; j < body.parts.length; j++) {
                var part = body.parts[j];
                Vertices.translate(part.vertices, impulse);
                if (j > 0) {
                  part.position.x += impulse.x;
                  part.position.y += impulse.y;
                }
                if (impulse.angle !== 0) {
                  Vertices.rotate(part.vertices, impulse.angle, body.position);
                  Axes.rotate(part.axes, impulse.angle);
                  if (j > 0) {
                    Vector.rotateAbout(part.position, impulse.angle, body.position, part.position);
                  }
                }
                Bounds.update(part.bounds, part.vertices, body.velocity);
              }
              impulse.angle *= Constraint._warming;
              impulse.x *= Constraint._warming;
              impulse.y *= Constraint._warming;
            }
          };
          Constraint.pointAWorld = function(constraint) {
            return {
              x: (constraint.bodyA ? constraint.bodyA.position.x : 0) + constraint.pointA.x,
              y: (constraint.bodyA ? constraint.bodyA.position.y : 0) + constraint.pointA.y
            };
          };
          Constraint.pointBWorld = function(constraint) {
            return {
              x: (constraint.bodyB ? constraint.bodyB.position.x : 0) + constraint.pointB.x,
              y: (constraint.bodyB ? constraint.bodyB.position.y : 0) + constraint.pointB.y
            };
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Axes = {};
        module2.exports = Axes;
        var Vector = __webpack_require__(2);
        var Common = __webpack_require__(0);
        (function() {
          Axes.fromVertices = function(vertices) {
            var axes = {};
            for (var i = 0; i < vertices.length; i++) {
              var j = (i + 1) % vertices.length, normal = Vector.normalise({
                x: vertices[j].y - vertices[i].y,
                y: vertices[i].x - vertices[j].x
              }), gradient = normal.y === 0 ? Infinity : normal.x / normal.y;
              gradient = gradient.toFixed(3).toString();
              axes[gradient] = normal;
            }
            return Common.values(axes);
          };
          Axes.rotate = function(axes, angle) {
            if (angle === 0)
              return;
            var cos = Math.cos(angle), sin = Math.sin(angle);
            for (var i = 0; i < axes.length; i++) {
              var axis = axes[i], xx;
              xx = axis.x * cos - axis.y * sin;
              axis.y = axis.x * sin + axis.y * cos;
              axis.x = xx;
            }
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Bodies = {};
        module2.exports = Bodies;
        var Vertices = __webpack_require__(3);
        var Common = __webpack_require__(0);
        var Body = __webpack_require__(6);
        var Bounds = __webpack_require__(1);
        var Vector = __webpack_require__(2);
        (function() {
          Bodies.rectangle = function(x, y, width, height, options) {
            options = options || {};
            var rectangle = {
              label: "Rectangle Body",
              position: {x, y},
              vertices: Vertices.fromPath("L 0 0 L " + width + " 0 L " + width + " " + height + " L 0 " + height)
            };
            if (options.chamfer) {
              var chamfer = options.chamfer;
              rectangle.vertices = Vertices.chamfer(rectangle.vertices, chamfer.radius, chamfer.quality, chamfer.qualityMin, chamfer.qualityMax);
              delete options.chamfer;
            }
            return Body.create(Common.extend({}, rectangle, options));
          };
          Bodies.trapezoid = function(x, y, width, height, slope, options) {
            options = options || {};
            slope *= 0.5;
            var roof = (1 - slope * 2) * width;
            var x1 = width * slope, x2 = x1 + roof, x3 = x2 + x1, verticesPath;
            if (slope < 0.5) {
              verticesPath = "L 0 0 L " + x1 + " " + -height + " L " + x2 + " " + -height + " L " + x3 + " 0";
            } else {
              verticesPath = "L 0 0 L " + x2 + " " + -height + " L " + x3 + " 0";
            }
            var trapezoid = {
              label: "Trapezoid Body",
              position: {x, y},
              vertices: Vertices.fromPath(verticesPath)
            };
            if (options.chamfer) {
              var chamfer = options.chamfer;
              trapezoid.vertices = Vertices.chamfer(trapezoid.vertices, chamfer.radius, chamfer.quality, chamfer.qualityMin, chamfer.qualityMax);
              delete options.chamfer;
            }
            return Body.create(Common.extend({}, trapezoid, options));
          };
          Bodies.circle = function(x, y, radius, options, maxSides) {
            options = options || {};
            var circle = {
              label: "Circle Body",
              circleRadius: radius
            };
            maxSides = maxSides || 25;
            var sides = Math.ceil(Math.max(10, Math.min(maxSides, radius)));
            if (sides % 2 === 1)
              sides += 1;
            return Bodies.polygon(x, y, sides, radius, Common.extend({}, circle, options));
          };
          Bodies.polygon = function(x, y, sides, radius, options) {
            options = options || {};
            if (sides < 3)
              return Bodies.circle(x, y, radius, options);
            var theta = 2 * Math.PI / sides, path = "", offset = theta * 0.5;
            for (var i = 0; i < sides; i += 1) {
              var angle = offset + i * theta, xx = Math.cos(angle) * radius, yy = Math.sin(angle) * radius;
              path += "L " + xx.toFixed(3) + " " + yy.toFixed(3) + " ";
            }
            var polygon = {
              label: "Polygon Body",
              position: {x, y},
              vertices: Vertices.fromPath(path)
            };
            if (options.chamfer) {
              var chamfer = options.chamfer;
              polygon.vertices = Vertices.chamfer(polygon.vertices, chamfer.radius, chamfer.quality, chamfer.qualityMin, chamfer.qualityMax);
              delete options.chamfer;
            }
            return Body.create(Common.extend({}, polygon, options));
          };
          Bodies.fromVertices = function(x, y, vertexSets, options, flagInternal, removeCollinear, minimumArea, removeDuplicatePoints) {
            var decomp = Common.getDecomp(), canDecomp, body, parts, isConvex, isConcave, vertices, i, j, k, v, z;
            canDecomp = Boolean(decomp && decomp.quickDecomp);
            options = options || {};
            parts = [];
            flagInternal = typeof flagInternal !== "undefined" ? flagInternal : false;
            removeCollinear = typeof removeCollinear !== "undefined" ? removeCollinear : 0.01;
            minimumArea = typeof minimumArea !== "undefined" ? minimumArea : 10;
            removeDuplicatePoints = typeof removeDuplicatePoints !== "undefined" ? removeDuplicatePoints : 0.01;
            if (!Common.isArray(vertexSets[0])) {
              vertexSets = [vertexSets];
            }
            for (v = 0; v < vertexSets.length; v += 1) {
              vertices = vertexSets[v];
              isConvex = Vertices.isConvex(vertices);
              isConcave = !isConvex;
              if (isConcave && !canDecomp) {
                Common.warnOnce("Bodies.fromVertices: Install the 'poly-decomp' library and use Common.setDecomp or provide 'decomp' as a global to decompose concave vertices.");
              }
              if (isConvex || !canDecomp) {
                if (isConvex) {
                  vertices = Vertices.clockwiseSort(vertices);
                } else {
                  vertices = Vertices.hull(vertices);
                }
                parts.push({
                  position: {x, y},
                  vertices
                });
              } else {
                var concave = vertices.map(function(vertex) {
                  return [vertex.x, vertex.y];
                });
                decomp.makeCCW(concave);
                if (removeCollinear !== false)
                  decomp.removeCollinearPoints(concave, removeCollinear);
                if (removeDuplicatePoints !== false && decomp.removeDuplicatePoints)
                  decomp.removeDuplicatePoints(concave, removeDuplicatePoints);
                var decomposed = decomp.quickDecomp(concave);
                for (i = 0; i < decomposed.length; i++) {
                  var chunk = decomposed[i];
                  var chunkVertices = chunk.map(function(vertices2) {
                    return {
                      x: vertices2[0],
                      y: vertices2[1]
                    };
                  });
                  if (minimumArea > 0 && Vertices.area(chunkVertices) < minimumArea)
                    continue;
                  parts.push({
                    position: Vertices.centre(chunkVertices),
                    vertices: chunkVertices
                  });
                }
              }
            }
            for (i = 0; i < parts.length; i++) {
              parts[i] = Body.create(Common.extend(parts[i], options));
            }
            if (flagInternal) {
              var coincident_max_dist = 5;
              for (i = 0; i < parts.length; i++) {
                var partA = parts[i];
                for (j = i + 1; j < parts.length; j++) {
                  var partB = parts[j];
                  if (Bounds.overlaps(partA.bounds, partB.bounds)) {
                    var pav = partA.vertices, pbv = partB.vertices;
                    for (k = 0; k < partA.vertices.length; k++) {
                      for (z = 0; z < partB.vertices.length; z++) {
                        var da = Vector.magnitudeSquared(Vector.sub(pav[(k + 1) % pav.length], pbv[z])), db = Vector.magnitudeSquared(Vector.sub(pav[k], pbv[(z + 1) % pbv.length]));
                        if (da < coincident_max_dist && db < coincident_max_dist) {
                          pav[k].isInternal = true;
                          pbv[z].isInternal = true;
                        }
                      }
                    }
                  }
                }
              }
            }
            if (parts.length > 1) {
              body = Body.create(Common.extend({parts: parts.slice(0)}, options));
              Body.setPosition(body, {x, y});
              return body;
            } else {
              return parts[0];
            }
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Mouse = {};
        module2.exports = Mouse;
        var Common = __webpack_require__(0);
        (function() {
          Mouse.create = function(element) {
            var mouse = {};
            if (!element) {
              Common.log("Mouse.create: element was undefined, defaulting to document.body", "warn");
            }
            mouse.element = element || document.body;
            mouse.absolute = {x: 0, y: 0};
            mouse.position = {x: 0, y: 0};
            mouse.mousedownPosition = {x: 0, y: 0};
            mouse.mouseupPosition = {x: 0, y: 0};
            mouse.offset = {x: 0, y: 0};
            mouse.scale = {x: 1, y: 1};
            mouse.wheelDelta = 0;
            mouse.button = -1;
            mouse.pixelRatio = parseInt(mouse.element.getAttribute("data-pixel-ratio"), 10) || 1;
            mouse.sourceEvents = {
              mousemove: null,
              mousedown: null,
              mouseup: null,
              mousewheel: null
            };
            mouse.mousemove = function(event) {
              var position = Mouse._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio), touches = event.changedTouches;
              if (touches) {
                mouse.button = 0;
                event.preventDefault();
              }
              mouse.absolute.x = position.x;
              mouse.absolute.y = position.y;
              mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
              mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
              mouse.sourceEvents.mousemove = event;
            };
            mouse.mousedown = function(event) {
              var position = Mouse._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio), touches = event.changedTouches;
              if (touches) {
                mouse.button = 0;
                event.preventDefault();
              } else {
                mouse.button = event.button;
              }
              mouse.absolute.x = position.x;
              mouse.absolute.y = position.y;
              mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
              mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
              mouse.mousedownPosition.x = mouse.position.x;
              mouse.mousedownPosition.y = mouse.position.y;
              mouse.sourceEvents.mousedown = event;
            };
            mouse.mouseup = function(event) {
              var position = Mouse._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio), touches = event.changedTouches;
              if (touches) {
                event.preventDefault();
              }
              mouse.button = -1;
              mouse.absolute.x = position.x;
              mouse.absolute.y = position.y;
              mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
              mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
              mouse.mouseupPosition.x = mouse.position.x;
              mouse.mouseupPosition.y = mouse.position.y;
              mouse.sourceEvents.mouseup = event;
            };
            mouse.mousewheel = function(event) {
              mouse.wheelDelta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
              event.preventDefault();
            };
            Mouse.setElement(mouse, mouse.element);
            return mouse;
          };
          Mouse.setElement = function(mouse, element) {
            mouse.element = element;
            element.addEventListener("mousemove", mouse.mousemove);
            element.addEventListener("mousedown", mouse.mousedown);
            element.addEventListener("mouseup", mouse.mouseup);
            element.addEventListener("mousewheel", mouse.mousewheel);
            element.addEventListener("DOMMouseScroll", mouse.mousewheel);
            element.addEventListener("touchmove", mouse.mousemove);
            element.addEventListener("touchstart", mouse.mousedown);
            element.addEventListener("touchend", mouse.mouseup);
          };
          Mouse.clearSourceEvents = function(mouse) {
            mouse.sourceEvents.mousemove = null;
            mouse.sourceEvents.mousedown = null;
            mouse.sourceEvents.mouseup = null;
            mouse.sourceEvents.mousewheel = null;
            mouse.wheelDelta = 0;
          };
          Mouse.setOffset = function(mouse, offset) {
            mouse.offset.x = offset.x;
            mouse.offset.y = offset.y;
            mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
            mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
          };
          Mouse.setScale = function(mouse, scale) {
            mouse.scale.x = scale.x;
            mouse.scale.y = scale.y;
            mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
            mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
          };
          Mouse._getRelativeMousePosition = function(event, element, pixelRatio) {
            var elementBounds = element.getBoundingClientRect(), rootNode = document.documentElement || document.body.parentNode || document.body, scrollX = window.pageXOffset !== void 0 ? window.pageXOffset : rootNode.scrollLeft, scrollY = window.pageYOffset !== void 0 ? window.pageYOffset : rootNode.scrollTop, touches = event.changedTouches, x, y;
            if (touches) {
              x = touches[0].pageX - elementBounds.left - scrollX;
              y = touches[0].pageY - elementBounds.top - scrollY;
            } else {
              x = event.pageX - elementBounds.left - scrollX;
              y = event.pageY - elementBounds.top - scrollY;
            }
            return {
              x: x / (element.clientWidth / (element.width || element.clientWidth) * pixelRatio),
              y: y / (element.clientHeight / (element.height || element.clientHeight) * pixelRatio)
            };
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Detector = {};
        module2.exports = Detector;
        var Common = __webpack_require__(0);
        var Collision = __webpack_require__(8);
        (function() {
          Detector.create = function(options) {
            var defaults = {
              bodies: [],
              pairs: null
            };
            return Common.extend(defaults, options);
          };
          Detector.setBodies = function(detector, bodies) {
            detector.bodies = bodies.slice(0);
          };
          Detector.clear = function(detector) {
            detector.bodies = [];
          };
          Detector.collisions = function(detector) {
            var collisions = [], pairs = detector.pairs, bodies = detector.bodies, bodiesLength = bodies.length, canCollide = Detector.canCollide, collides = Collision.collides, i, j;
            bodies.sort(Detector._compareBoundsX);
            for (i = 0; i < bodiesLength; i++) {
              var bodyA = bodies[i], boundsA = bodyA.bounds, boundXMax = bodyA.bounds.max.x, boundYMax = bodyA.bounds.max.y, boundYMin = bodyA.bounds.min.y, bodyAStatic = bodyA.isStatic || bodyA.isSleeping, partsALength = bodyA.parts.length, partsASingle = partsALength === 1;
              for (j = i + 1; j < bodiesLength; j++) {
                var bodyB = bodies[j], boundsB = bodyB.bounds;
                if (boundsB.min.x > boundXMax) {
                  break;
                }
                if (boundYMax < boundsB.min.y || boundYMin > boundsB.max.y) {
                  continue;
                }
                if (bodyAStatic && (bodyB.isStatic || bodyB.isSleeping)) {
                  continue;
                }
                if (!canCollide(bodyA.collisionFilter, bodyB.collisionFilter)) {
                  continue;
                }
                var partsBLength = bodyB.parts.length;
                if (partsASingle && partsBLength === 1) {
                  var collision = collides(bodyA, bodyB, pairs);
                  if (collision) {
                    collisions.push(collision);
                  }
                } else {
                  var partsAStart = partsALength > 1 ? 1 : 0, partsBStart = partsBLength > 1 ? 1 : 0;
                  for (var k = partsAStart; k < partsALength; k++) {
                    var partA = bodyA.parts[k], boundsA = partA.bounds;
                    for (var z = partsBStart; z < partsBLength; z++) {
                      var partB = bodyB.parts[z], boundsB = partB.bounds;
                      if (boundsA.min.x > boundsB.max.x || boundsA.max.x < boundsB.min.x || boundsA.max.y < boundsB.min.y || boundsA.min.y > boundsB.max.y) {
                        continue;
                      }
                      var collision = collides(partA, partB, pairs);
                      if (collision) {
                        collisions.push(collision);
                      }
                    }
                  }
                }
              }
            }
            return collisions;
          };
          Detector.canCollide = function(filterA, filterB) {
            if (filterA.group === filterB.group && filterA.group !== 0)
              return filterA.group > 0;
            return (filterA.mask & filterB.category) !== 0 && (filterB.mask & filterA.category) !== 0;
          };
          Detector._compareBoundsX = function(bodyA, bodyB) {
            return bodyA.bounds.min.x - bodyB.bounds.min.x;
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Plugin = {};
        module2.exports = Plugin;
        var Common = __webpack_require__(0);
        (function() {
          Plugin._registry = {};
          Plugin.register = function(plugin) {
            if (!Plugin.isPlugin(plugin)) {
              Common.warn("Plugin.register:", Plugin.toString(plugin), "does not implement all required fields.");
            }
            if (plugin.name in Plugin._registry) {
              var registered = Plugin._registry[plugin.name], pluginVersion = Plugin.versionParse(plugin.version).number, registeredVersion = Plugin.versionParse(registered.version).number;
              if (pluginVersion > registeredVersion) {
                Common.warn("Plugin.register:", Plugin.toString(registered), "was upgraded to", Plugin.toString(plugin));
                Plugin._registry[plugin.name] = plugin;
              } else if (pluginVersion < registeredVersion) {
                Common.warn("Plugin.register:", Plugin.toString(registered), "can not be downgraded to", Plugin.toString(plugin));
              } else if (plugin !== registered) {
                Common.warn("Plugin.register:", Plugin.toString(plugin), "is already registered to different plugin object");
              }
            } else {
              Plugin._registry[plugin.name] = plugin;
            }
            return plugin;
          };
          Plugin.resolve = function(dependency) {
            return Plugin._registry[Plugin.dependencyParse(dependency).name];
          };
          Plugin.toString = function(plugin) {
            return typeof plugin === "string" ? plugin : (plugin.name || "anonymous") + "@" + (plugin.version || plugin.range || "0.0.0");
          };
          Plugin.isPlugin = function(obj) {
            return obj && obj.name && obj.version && obj.install;
          };
          Plugin.isUsed = function(module3, name) {
            return module3.used.indexOf(name) > -1;
          };
          Plugin.isFor = function(plugin, module3) {
            var parsed = plugin.for && Plugin.dependencyParse(plugin.for);
            return !plugin.for || module3.name === parsed.name && Plugin.versionSatisfies(module3.version, parsed.range);
          };
          Plugin.use = function(module3, plugins) {
            module3.uses = (module3.uses || []).concat(plugins || []);
            if (module3.uses.length === 0) {
              Common.warn("Plugin.use:", Plugin.toString(module3), "does not specify any dependencies to install.");
              return;
            }
            var dependencies = Plugin.dependencies(module3), sortedDependencies = Common.topologicalSort(dependencies), status = [];
            for (var i = 0; i < sortedDependencies.length; i += 1) {
              if (sortedDependencies[i] === module3.name) {
                continue;
              }
              var plugin = Plugin.resolve(sortedDependencies[i]);
              if (!plugin) {
                status.push("\u274C " + sortedDependencies[i]);
                continue;
              }
              if (Plugin.isUsed(module3, plugin.name)) {
                continue;
              }
              if (!Plugin.isFor(plugin, module3)) {
                Common.warn("Plugin.use:", Plugin.toString(plugin), "is for", plugin.for, "but installed on", Plugin.toString(module3) + ".");
                plugin._warned = true;
              }
              if (plugin.install) {
                plugin.install(module3);
              } else {
                Common.warn("Plugin.use:", Plugin.toString(plugin), "does not specify an install function.");
                plugin._warned = true;
              }
              if (plugin._warned) {
                status.push("\u{1F536} " + Plugin.toString(plugin));
                delete plugin._warned;
              } else {
                status.push("\u2705 " + Plugin.toString(plugin));
              }
              module3.used.push(plugin.name);
            }
            if (status.length > 0) {
              Common.info(status.join("  "));
            }
          };
          Plugin.dependencies = function(module3, tracked) {
            var parsedBase = Plugin.dependencyParse(module3), name = parsedBase.name;
            tracked = tracked || {};
            if (name in tracked) {
              return;
            }
            module3 = Plugin.resolve(module3) || module3;
            tracked[name] = Common.map(module3.uses || [], function(dependency) {
              if (Plugin.isPlugin(dependency)) {
                Plugin.register(dependency);
              }
              var parsed = Plugin.dependencyParse(dependency), resolved = Plugin.resolve(dependency);
              if (resolved && !Plugin.versionSatisfies(resolved.version, parsed.range)) {
                Common.warn("Plugin.dependencies:", Plugin.toString(resolved), "does not satisfy", Plugin.toString(parsed), "used by", Plugin.toString(parsedBase) + ".");
                resolved._warned = true;
                module3._warned = true;
              } else if (!resolved) {
                Common.warn("Plugin.dependencies:", Plugin.toString(dependency), "used by", Plugin.toString(parsedBase), "could not be resolved.");
                module3._warned = true;
              }
              return parsed.name;
            });
            for (var i = 0; i < tracked[name].length; i += 1) {
              Plugin.dependencies(tracked[name][i], tracked);
            }
            return tracked;
          };
          Plugin.dependencyParse = function(dependency) {
            if (Common.isString(dependency)) {
              var pattern = /^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-+]+)?))?$/;
              if (!pattern.test(dependency)) {
                Common.warn("Plugin.dependencyParse:", dependency, "is not a valid dependency string.");
              }
              return {
                name: dependency.split("@")[0],
                range: dependency.split("@")[1] || "*"
              };
            }
            return {
              name: dependency.name,
              range: dependency.range || dependency.version
            };
          };
          Plugin.versionParse = function(range) {
            var pattern = /^(\*)|(\^|~|>=|>)?\s*((\d+)\.(\d+)\.(\d+))(-[0-9A-Za-z-+]+)?$/;
            if (!pattern.test(range)) {
              Common.warn("Plugin.versionParse:", range, "is not a valid version or range.");
            }
            var parts = pattern.exec(range);
            var major = Number(parts[4]);
            var minor = Number(parts[5]);
            var patch = Number(parts[6]);
            return {
              isRange: Boolean(parts[1] || parts[2]),
              version: parts[3],
              range,
              operator: parts[1] || parts[2] || "",
              major,
              minor,
              patch,
              parts: [major, minor, patch],
              prerelease: parts[7],
              number: major * 1e8 + minor * 1e4 + patch
            };
          };
          Plugin.versionSatisfies = function(version, range) {
            range = range || "*";
            var r = Plugin.versionParse(range), v = Plugin.versionParse(version);
            if (r.isRange) {
              if (r.operator === "*" || version === "*") {
                return true;
              }
              if (r.operator === ">") {
                return v.number > r.number;
              }
              if (r.operator === ">=") {
                return v.number >= r.number;
              }
              if (r.operator === "~") {
                return v.major === r.major && v.minor === r.minor && v.patch >= r.patch;
              }
              if (r.operator === "^") {
                if (r.major > 0) {
                  return v.major === r.major && v.number >= r.number;
                }
                if (r.minor > 0) {
                  return v.minor === r.minor && v.patch >= r.patch;
                }
                return v.patch === r.patch;
              }
            }
            return version === range || version === "*";
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Render = {};
        module2.exports = Render;
        var Common = __webpack_require__(0);
        var Composite = __webpack_require__(5);
        var Bounds = __webpack_require__(1);
        var Events = __webpack_require__(4);
        var Vector = __webpack_require__(2);
        var Mouse = __webpack_require__(13);
        (function() {
          var _requestAnimationFrame, _cancelAnimationFrame;
          if (typeof window !== "undefined") {
            _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
              window.setTimeout(function() {
                callback(Common.now());
              }, 1e3 / 60);
            };
            _cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
          }
          Render._goodFps = 30;
          Render._goodDelta = 1e3 / 60;
          Render.create = function(options) {
            var defaults = {
              controller: Render,
              engine: null,
              element: null,
              canvas: null,
              mouse: null,
              frameRequestId: null,
              timing: {
                historySize: 60,
                delta: 0,
                deltaHistory: [],
                lastTime: 0,
                lastTimestamp: 0,
                lastElapsed: 0,
                timestampElapsed: 0,
                timestampElapsedHistory: [],
                engineDeltaHistory: [],
                engineElapsedHistory: [],
                elapsedHistory: []
              },
              options: {
                width: 800,
                height: 600,
                pixelRatio: 1,
                background: "#14151f",
                wireframeBackground: "#14151f",
                hasBounds: !!options.bounds,
                enabled: true,
                wireframes: true,
                showSleeping: true,
                showDebug: false,
                showStats: false,
                showPerformance: false,
                showBounds: false,
                showVelocity: false,
                showCollisions: false,
                showSeparations: false,
                showAxes: false,
                showPositions: false,
                showAngleIndicator: false,
                showIds: false,
                showVertexNumbers: false,
                showConvexHulls: false,
                showInternalEdges: false,
                showMousePosition: false
              }
            };
            var render = Common.extend(defaults, options);
            if (render.canvas) {
              render.canvas.width = render.options.width || render.canvas.width;
              render.canvas.height = render.options.height || render.canvas.height;
            }
            render.mouse = options.mouse;
            render.engine = options.engine;
            render.canvas = render.canvas || _createCanvas(render.options.width, render.options.height);
            render.context = render.canvas.getContext("2d");
            render.textures = {};
            render.bounds = render.bounds || {
              min: {
                x: 0,
                y: 0
              },
              max: {
                x: render.canvas.width,
                y: render.canvas.height
              }
            };
            render.options.showBroadphase = false;
            if (render.options.pixelRatio !== 1) {
              Render.setPixelRatio(render, render.options.pixelRatio);
            }
            if (Common.isElement(render.element)) {
              render.element.appendChild(render.canvas);
            } else if (!render.canvas.parentNode) {
              Common.log("Render.create: options.element was undefined, render.canvas was created but not appended", "warn");
            }
            return render;
          };
          Render.run = function(render) {
            (function loop(time) {
              render.frameRequestId = _requestAnimationFrame(loop);
              _updateTiming(render, time);
              Render.world(render, time);
              if (render.options.showStats || render.options.showDebug) {
                Render.stats(render, render.context, time);
              }
              if (render.options.showPerformance || render.options.showDebug) {
                Render.performance(render, render.context, time);
              }
            })();
          };
          Render.stop = function(render) {
            _cancelAnimationFrame(render.frameRequestId);
          };
          Render.setPixelRatio = function(render, pixelRatio) {
            var options = render.options, canvas = render.canvas;
            if (pixelRatio === "auto") {
              pixelRatio = _getPixelRatio(canvas);
            }
            options.pixelRatio = pixelRatio;
            canvas.setAttribute("data-pixel-ratio", pixelRatio);
            canvas.width = options.width * pixelRatio;
            canvas.height = options.height * pixelRatio;
            canvas.style.width = options.width + "px";
            canvas.style.height = options.height + "px";
          };
          Render.lookAt = function(render, objects, padding, center) {
            center = typeof center !== "undefined" ? center : true;
            objects = Common.isArray(objects) ? objects : [objects];
            padding = padding || {
              x: 0,
              y: 0
            };
            var bounds = {
              min: {x: Infinity, y: Infinity},
              max: {x: -Infinity, y: -Infinity}
            };
            for (var i = 0; i < objects.length; i += 1) {
              var object = objects[i], min = object.bounds ? object.bounds.min : object.min || object.position || object, max = object.bounds ? object.bounds.max : object.max || object.position || object;
              if (min && max) {
                if (min.x < bounds.min.x)
                  bounds.min.x = min.x;
                if (max.x > bounds.max.x)
                  bounds.max.x = max.x;
                if (min.y < bounds.min.y)
                  bounds.min.y = min.y;
                if (max.y > bounds.max.y)
                  bounds.max.y = max.y;
              }
            }
            var width = bounds.max.x - bounds.min.x + 2 * padding.x, height = bounds.max.y - bounds.min.y + 2 * padding.y, viewHeight = render.canvas.height, viewWidth = render.canvas.width, outerRatio = viewWidth / viewHeight, innerRatio = width / height, scaleX = 1, scaleY = 1;
            if (innerRatio > outerRatio) {
              scaleY = innerRatio / outerRatio;
            } else {
              scaleX = outerRatio / innerRatio;
            }
            render.options.hasBounds = true;
            render.bounds.min.x = bounds.min.x;
            render.bounds.max.x = bounds.min.x + width * scaleX;
            render.bounds.min.y = bounds.min.y;
            render.bounds.max.y = bounds.min.y + height * scaleY;
            if (center) {
              render.bounds.min.x += width * 0.5 - width * scaleX * 0.5;
              render.bounds.max.x += width * 0.5 - width * scaleX * 0.5;
              render.bounds.min.y += height * 0.5 - height * scaleY * 0.5;
              render.bounds.max.y += height * 0.5 - height * scaleY * 0.5;
            }
            render.bounds.min.x -= padding.x;
            render.bounds.max.x -= padding.x;
            render.bounds.min.y -= padding.y;
            render.bounds.max.y -= padding.y;
            if (render.mouse) {
              Mouse.setScale(render.mouse, {
                x: (render.bounds.max.x - render.bounds.min.x) / render.canvas.width,
                y: (render.bounds.max.y - render.bounds.min.y) / render.canvas.height
              });
              Mouse.setOffset(render.mouse, render.bounds.min);
            }
          };
          Render.startViewTransform = function(render) {
            var boundsWidth = render.bounds.max.x - render.bounds.min.x, boundsHeight = render.bounds.max.y - render.bounds.min.y, boundsScaleX = boundsWidth / render.options.width, boundsScaleY = boundsHeight / render.options.height;
            render.context.setTransform(render.options.pixelRatio / boundsScaleX, 0, 0, render.options.pixelRatio / boundsScaleY, 0, 0);
            render.context.translate(-render.bounds.min.x, -render.bounds.min.y);
          };
          Render.endViewTransform = function(render) {
            render.context.setTransform(render.options.pixelRatio, 0, 0, render.options.pixelRatio, 0, 0);
          };
          Render.world = function(render, time) {
            var startTime = Common.now(), engine = render.engine, world = engine.world, canvas = render.canvas, context = render.context, options = render.options, timing = render.timing;
            var allBodies = Composite.allBodies(world), allConstraints = Composite.allConstraints(world), background = options.wireframes ? options.wireframeBackground : options.background, bodies = [], constraints = [], i;
            var event = {
              timestamp: engine.timing.timestamp
            };
            Events.trigger(render, "beforeRender", event);
            if (render.currentBackground !== background)
              _applyBackground(render, background);
            context.globalCompositeOperation = "source-in";
            context.fillStyle = "transparent";
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.globalCompositeOperation = "source-over";
            /* JG edit start*/
            Events.trigger(render, "beginRender", event);
            /* JG edit end */
            if (options.hasBounds) {
              for (i = 0; i < allBodies.length; i++) {
                var body = allBodies[i];
                if (Bounds.overlaps(body.bounds, render.bounds))
                  bodies.push(body);
              }
              for (i = 0; i < allConstraints.length; i++) {
                var constraint = allConstraints[i], bodyA = constraint.bodyA, bodyB = constraint.bodyB, pointAWorld = constraint.pointA, pointBWorld = constraint.pointB;
                if (bodyA)
                  pointAWorld = Vector.add(bodyA.position, constraint.pointA);
                if (bodyB)
                  pointBWorld = Vector.add(bodyB.position, constraint.pointB);
                if (!pointAWorld || !pointBWorld)
                  continue;
                if (Bounds.contains(render.bounds, pointAWorld) || Bounds.contains(render.bounds, pointBWorld))
                  constraints.push(constraint);
              }
              Render.startViewTransform(render);
              if (render.mouse) {
                Mouse.setScale(render.mouse, {
                  x: (render.bounds.max.x - render.bounds.min.x) / render.options.width,
                  y: (render.bounds.max.y - render.bounds.min.y) / render.options.height
                });
                Mouse.setOffset(render.mouse, render.bounds.min);
              }
            } else {
              constraints = allConstraints;
              bodies = allBodies;
              if (render.options.pixelRatio !== 1) {
                render.context.setTransform(render.options.pixelRatio, 0, 0, render.options.pixelRatio, 0, 0);
              }
            }
            if (!options.wireframes || engine.enableSleeping && options.showSleeping) {
              Render.bodies(render, bodies, context);
            } else {
              if (options.showConvexHulls)
                Render.bodyConvexHulls(render, bodies, context);
              Render.bodyWireframes(render, bodies, context);
            }
            if (options.showBounds)
              Render.bodyBounds(render, bodies, context);
            if (options.showAxes || options.showAngleIndicator)
              Render.bodyAxes(render, bodies, context);
            if (options.showPositions)
              Render.bodyPositions(render, bodies, context);
            if (options.showVelocity)
              Render.bodyVelocity(render, bodies, context);
            if (options.showIds)
              Render.bodyIds(render, bodies, context);
            if (options.showSeparations)
              Render.separations(render, engine.pairs.list, context);
            if (options.showCollisions)
              Render.collisions(render, engine.pairs.list, context);
            if (options.showVertexNumbers)
              Render.vertexNumbers(render, bodies, context);
            if (options.showMousePosition)
              Render.mousePosition(render, render.mouse, context);
            Render.constraints(constraints, context);
            if (options.hasBounds) {
              Render.endViewTransform(render);
            }
            Events.trigger(render, "afterRender", event);
            timing.lastElapsed = Common.now() - startTime;
          };
          Render.stats = function(render, context, time) {
            var engine = render.engine, world = engine.world, bodies = Composite.allBodies(world), parts = 0, width = 55, height = 44, x = 0, y = 0;
            for (var i = 0; i < bodies.length; i += 1) {
              parts += bodies[i].parts.length;
            }
            var sections = {
              Part: parts,
              Body: bodies.length,
              Cons: Composite.allConstraints(world).length,
              Comp: Composite.allComposites(world).length,
              Pair: engine.pairs.list.length
            };
            context.fillStyle = "#0e0f19";
            context.fillRect(x, y, width * 5.5, height);
            context.font = "12px Arial";
            context.textBaseline = "top";
            context.textAlign = "right";
            for (var key in sections) {
              var section = sections[key];
              context.fillStyle = "#aaa";
              context.fillText(key, x + width, y + 8);
              context.fillStyle = "#eee";
              context.fillText(section, x + width, y + 26);
              x += width;
            }
          };
          Render.performance = function(render, context) {
            var engine = render.engine, timing = render.timing, deltaHistory = timing.deltaHistory, elapsedHistory = timing.elapsedHistory, timestampElapsedHistory = timing.timestampElapsedHistory, engineDeltaHistory = timing.engineDeltaHistory, engineElapsedHistory = timing.engineElapsedHistory, lastEngineDelta = engine.timing.lastDelta;
            var deltaMean = _mean(deltaHistory), elapsedMean = _mean(elapsedHistory), engineDeltaMean = _mean(engineDeltaHistory), engineElapsedMean = _mean(engineElapsedHistory), timestampElapsedMean = _mean(timestampElapsedHistory), rateMean = timestampElapsedMean / deltaMean || 0, fps = 1e3 / deltaMean || 0;
            var graphHeight = 4, gap = 12, width = 60, height = 34, x = 10, y = 69;
            context.fillStyle = "#0e0f19";
            context.fillRect(0, 50, gap * 4 + width * 5 + 22, height);
            Render.status(context, x, y, width, graphHeight, deltaHistory.length, Math.round(fps) + " fps", fps / Render._goodFps, function(i) {
              return deltaHistory[i] / deltaMean - 1;
            });
            Render.status(context, x + gap + width, y, width, graphHeight, engineDeltaHistory.length, lastEngineDelta.toFixed(2) + " dt", Render._goodDelta / lastEngineDelta, function(i) {
              return engineDeltaHistory[i] / engineDeltaMean - 1;
            });
            Render.status(context, x + (gap + width) * 2, y, width, graphHeight, engineElapsedHistory.length, engineElapsedMean.toFixed(2) + " ut", 1 - engineElapsedMean / Render._goodFps, function(i) {
              return engineElapsedHistory[i] / engineElapsedMean - 1;
            });
            Render.status(context, x + (gap + width) * 3, y, width, graphHeight, elapsedHistory.length, elapsedMean.toFixed(2) + " rt", 1 - elapsedMean / Render._goodFps, function(i) {
              return elapsedHistory[i] / elapsedMean - 1;
            });
            Render.status(context, x + (gap + width) * 4, y, width, graphHeight, timestampElapsedHistory.length, rateMean.toFixed(2) + " x", rateMean * rateMean * rateMean, function(i) {
              return (timestampElapsedHistory[i] / deltaHistory[i] / rateMean || 0) - 1;
            });
          };
          Render.status = function(context, x, y, width, height, count, label, indicator, plotY) {
            context.strokeStyle = "#888";
            context.fillStyle = "#444";
            context.lineWidth = 1;
            context.fillRect(x, y + 7, width, 1);
            context.beginPath();
            context.moveTo(x, y + 7 - height * Common.clamp(0.4 * plotY(0), -2, 2));
            for (var i = 0; i < width; i += 1) {
              context.lineTo(x + i, y + 7 - (i < count ? height * Common.clamp(0.4 * plotY(i), -2, 2) : 0));
            }
            context.stroke();
            context.fillStyle = "hsl(" + Common.clamp(25 + 95 * indicator, 0, 120) + ",100%,60%)";
            context.fillRect(x, y - 7, 4, 4);
            context.font = "12px Arial";
            context.textBaseline = "middle";
            context.textAlign = "right";
            context.fillStyle = "#eee";
            context.fillText(label, x + width, y - 5);
          };
          Render.constraints = function(constraints, context) {
            var c = context;
            for (var i = 0; i < constraints.length; i++) {
              var constraint = constraints[i];
              if (!constraint.render.visible || !constraint.pointA || !constraint.pointB)
                continue;
              var bodyA = constraint.bodyA, bodyB = constraint.bodyB, start, end;
              if (bodyA) {
                start = Vector.add(bodyA.position, constraint.pointA);
              } else {
                start = constraint.pointA;
              }
              if (constraint.render.type === "pin") {
                c.beginPath();
                c.arc(start.x, start.y, 3, 0, 2 * Math.PI);
                c.closePath();
              } else {
                if (bodyB) {
                  end = Vector.add(bodyB.position, constraint.pointB);
                } else {
                  end = constraint.pointB;
                }
                c.beginPath();
                c.moveTo(start.x, start.y);
                if (constraint.render.type === "spring") {
                  var delta = Vector.sub(end, start), normal = Vector.perp(Vector.normalise(delta)), coils = Math.ceil(Common.clamp(constraint.length / 5, 12, 20)), offset;
                  for (var j = 1; j < coils; j += 1) {
                    offset = j % 2 === 0 ? 1 : -1;
                    c.lineTo(start.x + delta.x * (j / coils) + normal.x * offset * 4, start.y + delta.y * (j / coils) + normal.y * offset * 4);
                  }
                }
                c.lineTo(end.x, end.y);
              }
              if (constraint.render.lineWidth) {
                c.lineWidth = constraint.render.lineWidth;
                c.strokeStyle = constraint.render.strokeStyle;
                c.stroke();
              }
              if (constraint.render.anchors) {
                c.fillStyle = constraint.render.strokeStyle;
                c.beginPath();
                c.arc(start.x, start.y, 3, 0, 2 * Math.PI);
                c.arc(end.x, end.y, 3, 0, 2 * Math.PI);
                c.closePath();
                c.fill();
              }
            }
          };
          Render.bodies = function(render, bodies, context) {
            var c = context, engine = render.engine, options = render.options, showInternalEdges = options.showInternalEdges || !options.wireframes, body, part, i, k;
            for (i = 0; i < bodies.length; i++) {
              body = bodies[i];
              if (!body.render.visible)
                continue;
              for (k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
                part = body.parts[k];
                if (!part.render.visible)
                  continue;
                if (options.showSleeping && body.isSleeping) {
                  c.globalAlpha = 0.5 * part.render.opacity;
                } else if (part.render.opacity !== 1) {
                  c.globalAlpha = part.render.opacity;
                }
                if (part.render.sprite && part.render.sprite.texture && !options.wireframes) {
                  var sprite = part.render.sprite, texture = _getTexture(render, sprite.texture);
                  c.translate(part.position.x, part.position.y);
                  c.rotate(part.angle);
                  c.drawImage(texture, texture.width * -sprite.xOffset * sprite.xScale, texture.height * -sprite.yOffset * sprite.yScale, texture.width * sprite.xScale, texture.height * sprite.yScale);
                  c.rotate(-part.angle);
                  c.translate(-part.position.x, -part.position.y);
                } else {
                  if (part.circleRadius) {
                    c.beginPath();
                    c.arc(part.position.x, part.position.y, part.circleRadius, 0, 2 * Math.PI);
                  } else {
                    c.beginPath();
                    c.moveTo(part.vertices[0].x, part.vertices[0].y);
                    for (var j = 1; j < part.vertices.length; j++) {
                      if (!part.vertices[j - 1].isInternal || showInternalEdges) {
                        c.lineTo(part.vertices[j].x, part.vertices[j].y);
                      } else {
                        c.moveTo(part.vertices[j].x, part.vertices[j].y);
                      }
                      if (part.vertices[j].isInternal && !showInternalEdges) {
                        c.moveTo(part.vertices[(j + 1) % part.vertices.length].x, part.vertices[(j + 1) % part.vertices.length].y);
                      }
                    }
                    c.lineTo(part.vertices[0].x, part.vertices[0].y);
                    c.closePath();
                  }
                  if (!options.wireframes) {
                    c.fillStyle = part.render.fillStyle;
                    if (part.render.lineWidth) {
                      c.lineWidth = part.render.lineWidth;
                      c.strokeStyle = part.render.strokeStyle;
                      c.stroke();
                    }
                    c.fill();
                  } else {
                    c.lineWidth = 1;
                    c.strokeStyle = "#bbb";
                    c.stroke();
                  }
                }
                c.globalAlpha = 1;
              }
            }
          };
          Render.bodyWireframes = function(render, bodies, context) {
            var c = context, showInternalEdges = render.options.showInternalEdges, body, part, i, j, k;
            c.beginPath();
            for (i = 0; i < bodies.length; i++) {
              body = bodies[i];
              if (!body.render.visible)
                continue;
              for (k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
                part = body.parts[k];
                c.moveTo(part.vertices[0].x, part.vertices[0].y);
                for (j = 1; j < part.vertices.length; j++) {
                  if (!part.vertices[j - 1].isInternal || showInternalEdges) {
                    c.lineTo(part.vertices[j].x, part.vertices[j].y);
                  } else {
                    c.moveTo(part.vertices[j].x, part.vertices[j].y);
                  }
                  if (part.vertices[j].isInternal && !showInternalEdges) {
                    c.moveTo(part.vertices[(j + 1) % part.vertices.length].x, part.vertices[(j + 1) % part.vertices.length].y);
                  }
                }
                c.lineTo(part.vertices[0].x, part.vertices[0].y);
              }
            }
            c.lineWidth = 1;
            c.strokeStyle = "#bbb";
            c.stroke();
          };
          Render.bodyConvexHulls = function(render, bodies, context) {
            var c = context, body, i, j;
            c.beginPath();
            for (i = 0; i < bodies.length; i++) {
              body = bodies[i];
              if (!body.render.visible || body.parts.length === 1)
                continue;
              c.moveTo(body.vertices[0].x, body.vertices[0].y);
              for (j = 1; j < body.vertices.length; j++) {
                c.lineTo(body.vertices[j].x, body.vertices[j].y);
              }
              c.lineTo(body.vertices[0].x, body.vertices[0].y);
            }
            c.lineWidth = 1;
            c.strokeStyle = "rgba(255,255,255,0.2)";
            c.stroke();
          };
          Render.vertexNumbers = function(render, bodies, context) {
            var c = context, i, j, k;
            for (i = 0; i < bodies.length; i++) {
              var parts = bodies[i].parts;
              for (k = parts.length > 1 ? 1 : 0; k < parts.length; k++) {
                var part = parts[k];
                for (j = 0; j < part.vertices.length; j++) {
                  c.fillStyle = "rgba(255,255,255,0.2)";
                  c.fillText(i + "_" + j, part.position.x + (part.vertices[j].x - part.position.x) * 0.8, part.position.y + (part.vertices[j].y - part.position.y) * 0.8);
                }
              }
            }
          };
          Render.mousePosition = function(render, mouse, context) {
            var c = context;
            c.fillStyle = "rgba(255,255,255,0.8)";
            c.fillText(mouse.position.x + "  " + mouse.position.y, mouse.position.x + 5, mouse.position.y - 5);
          };
          Render.bodyBounds = function(render, bodies, context) {
            var c = context, engine = render.engine, options = render.options;
            c.beginPath();
            for (var i = 0; i < bodies.length; i++) {
              var body = bodies[i];
              if (body.render.visible) {
                var parts = bodies[i].parts;
                for (var j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                  var part = parts[j];
                  c.rect(part.bounds.min.x, part.bounds.min.y, part.bounds.max.x - part.bounds.min.x, part.bounds.max.y - part.bounds.min.y);
                }
              }
            }
            if (options.wireframes) {
              c.strokeStyle = "rgba(255,255,255,0.08)";
            } else {
              c.strokeStyle = "rgba(0,0,0,0.1)";
            }
            c.lineWidth = 1;
            c.stroke();
          };
          Render.bodyAxes = function(render, bodies, context) {
            var c = context, engine = render.engine, options = render.options, part, i, j, k;
            c.beginPath();
            for (i = 0; i < bodies.length; i++) {
              var body = bodies[i], parts = body.parts;
              if (!body.render.visible)
                continue;
              if (options.showAxes) {
                for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                  part = parts[j];
                  for (k = 0; k < part.axes.length; k++) {
                    var axis = part.axes[k];
                    c.moveTo(part.position.x, part.position.y);
                    c.lineTo(part.position.x + axis.x * 20, part.position.y + axis.y * 20);
                  }
                }
              } else {
                for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                  part = parts[j];
                  for (k = 0; k < part.axes.length; k++) {
                    c.moveTo(part.position.x, part.position.y);
                    c.lineTo((part.vertices[0].x + part.vertices[part.vertices.length - 1].x) / 2, (part.vertices[0].y + part.vertices[part.vertices.length - 1].y) / 2);
                  }
                }
              }
            }
            if (options.wireframes) {
              c.strokeStyle = "indianred";
              c.lineWidth = 1;
            } else {
              c.strokeStyle = "rgba(255, 255, 255, 0.4)";
              c.globalCompositeOperation = "overlay";
              c.lineWidth = 2;
            }
            c.stroke();
            c.globalCompositeOperation = "source-over";
          };
          Render.bodyPositions = function(render, bodies, context) {
            var c = context, engine = render.engine, options = render.options, body, part, i, k;
            c.beginPath();
            for (i = 0; i < bodies.length; i++) {
              body = bodies[i];
              if (!body.render.visible)
                continue;
              for (k = 0; k < body.parts.length; k++) {
                part = body.parts[k];
                c.arc(part.position.x, part.position.y, 3, 0, 2 * Math.PI, false);
                c.closePath();
              }
            }
            if (options.wireframes) {
              c.fillStyle = "indianred";
            } else {
              c.fillStyle = "rgba(0,0,0,0.5)";
            }
            c.fill();
            c.beginPath();
            for (i = 0; i < bodies.length; i++) {
              body = bodies[i];
              if (body.render.visible) {
                c.arc(body.positionPrev.x, body.positionPrev.y, 2, 0, 2 * Math.PI, false);
                c.closePath();
              }
            }
            c.fillStyle = "rgba(255,165,0,0.8)";
            c.fill();
          };
          Render.bodyVelocity = function(render, bodies, context) {
            var c = context;
            c.beginPath();
            for (var i = 0; i < bodies.length; i++) {
              var body = bodies[i];
              if (!body.render.visible)
                continue;
              c.moveTo(body.position.x, body.position.y);
              c.lineTo(body.position.x + (body.position.x - body.positionPrev.x) * 2, body.position.y + (body.position.y - body.positionPrev.y) * 2);
            }
            c.lineWidth = 3;
            c.strokeStyle = "cornflowerblue";
            c.stroke();
          };
          Render.bodyIds = function(render, bodies, context) {
            var c = context, i, j;
            for (i = 0; i < bodies.length; i++) {
              if (!bodies[i].render.visible)
                continue;
              var parts = bodies[i].parts;
              for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                var part = parts[j];
                c.font = "12px Arial";
                c.fillStyle = "rgba(255,255,255,0.5)";
                c.fillText(part.id, part.position.x + 10, part.position.y - 10);
              }
            }
          };
          Render.collisions = function(render, pairs, context) {
            var c = context, options = render.options, pair, collision, i, j;
            c.beginPath();
            for (i = 0; i < pairs.length; i++) {
              pair = pairs[i];
              if (!pair.isActive)
                continue;
              collision = pair.collision;
              for (j = 0; j < pair.activeContacts.length; j++) {
                var contact = pair.activeContacts[j], vertex = contact.vertex;
                c.rect(vertex.x - 1.5, vertex.y - 1.5, 3.5, 3.5);
              }
            }
            if (options.wireframes) {
              c.fillStyle = "rgba(255,255,255,0.7)";
            } else {
              c.fillStyle = "orange";
            }
            c.fill();
            c.beginPath();
            for (i = 0; i < pairs.length; i++) {
              pair = pairs[i];
              if (!pair.isActive)
                continue;
              collision = pair.collision;
              if (pair.activeContacts.length > 0) {
                var normalPosX = pair.activeContacts[0].vertex.x, normalPosY = pair.activeContacts[0].vertex.y;
                if (pair.activeContacts.length === 2) {
                  normalPosX = (pair.activeContacts[0].vertex.x + pair.activeContacts[1].vertex.x) / 2;
                  normalPosY = (pair.activeContacts[0].vertex.y + pair.activeContacts[1].vertex.y) / 2;
                }
                if (collision.bodyB === collision.supports[0].body || collision.bodyA.isStatic === true) {
                  c.moveTo(normalPosX - collision.normal.x * 8, normalPosY - collision.normal.y * 8);
                } else {
                  c.moveTo(normalPosX + collision.normal.x * 8, normalPosY + collision.normal.y * 8);
                }
                c.lineTo(normalPosX, normalPosY);
              }
            }
            if (options.wireframes) {
              c.strokeStyle = "rgba(255,165,0,0.7)";
            } else {
              c.strokeStyle = "orange";
            }
            c.lineWidth = 1;
            c.stroke();
          };
          Render.separations = function(render, pairs, context) {
            var c = context, options = render.options, pair, collision, bodyA, bodyB, i;
            c.beginPath();
            for (i = 0; i < pairs.length; i++) {
              pair = pairs[i];
              if (!pair.isActive)
                continue;
              collision = pair.collision;
              bodyA = collision.bodyA;
              bodyB = collision.bodyB;
              var k = 1;
              if (!bodyB.isStatic && !bodyA.isStatic)
                k = 0.5;
              if (bodyB.isStatic)
                k = 0;
              c.moveTo(bodyB.position.x, bodyB.position.y);
              c.lineTo(bodyB.position.x - collision.penetration.x * k, bodyB.position.y - collision.penetration.y * k);
              k = 1;
              if (!bodyB.isStatic && !bodyA.isStatic)
                k = 0.5;
              if (bodyA.isStatic)
                k = 0;
              c.moveTo(bodyA.position.x, bodyA.position.y);
              c.lineTo(bodyA.position.x + collision.penetration.x * k, bodyA.position.y + collision.penetration.y * k);
            }
            if (options.wireframes) {
              c.strokeStyle = "rgba(255,165,0,0.5)";
            } else {
              c.strokeStyle = "orange";
            }
            c.stroke();
          };
          Render.inspector = function(inspector, context) {
            var engine = inspector.engine, selected = inspector.selected, render = inspector.render, options = render.options, bounds;
            if (options.hasBounds) {
              var boundsWidth = render.bounds.max.x - render.bounds.min.x, boundsHeight = render.bounds.max.y - render.bounds.min.y, boundsScaleX = boundsWidth / render.options.width, boundsScaleY = boundsHeight / render.options.height;
              context.scale(1 / boundsScaleX, 1 / boundsScaleY);
              context.translate(-render.bounds.min.x, -render.bounds.min.y);
            }
            for (var i = 0; i < selected.length; i++) {
              var item = selected[i].data;
              context.translate(0.5, 0.5);
              context.lineWidth = 1;
              context.strokeStyle = "rgba(255,165,0,0.9)";
              context.setLineDash([1, 2]);
              switch (item.type) {
                case "body":
                  bounds = item.bounds;
                  context.beginPath();
                  context.rect(Math.floor(bounds.min.x - 3), Math.floor(bounds.min.y - 3), Math.floor(bounds.max.x - bounds.min.x + 6), Math.floor(bounds.max.y - bounds.min.y + 6));
                  context.closePath();
                  context.stroke();
                  break;
                case "constraint":
                  var point = item.pointA;
                  if (item.bodyA)
                    point = item.pointB;
                  context.beginPath();
                  context.arc(point.x, point.y, 10, 0, 2 * Math.PI);
                  context.closePath();
                  context.stroke();
                  break;
              }
              context.setLineDash([]);
              context.translate(-0.5, -0.5);
            }
            if (inspector.selectStart !== null) {
              context.translate(0.5, 0.5);
              context.lineWidth = 1;
              context.strokeStyle = "rgba(255,165,0,0.6)";
              context.fillStyle = "rgba(255,165,0,0.1)";
              bounds = inspector.selectBounds;
              context.beginPath();
              context.rect(Math.floor(bounds.min.x), Math.floor(bounds.min.y), Math.floor(bounds.max.x - bounds.min.x), Math.floor(bounds.max.y - bounds.min.y));
              context.closePath();
              context.stroke();
              context.fill();
              context.translate(-0.5, -0.5);
            }
            if (options.hasBounds)
              context.setTransform(1, 0, 0, 1, 0, 0);
          };
          var _updateTiming = function(render, time) {
            var engine = render.engine, timing = render.timing, historySize = timing.historySize, timestamp = engine.timing.timestamp;
            timing.delta = time - timing.lastTime || Render._goodDelta;
            timing.lastTime = time;
            timing.timestampElapsed = timestamp - timing.lastTimestamp || 0;
            timing.lastTimestamp = timestamp;
            timing.deltaHistory.unshift(timing.delta);
            timing.deltaHistory.length = Math.min(timing.deltaHistory.length, historySize);
            timing.engineDeltaHistory.unshift(engine.timing.lastDelta);
            timing.engineDeltaHistory.length = Math.min(timing.engineDeltaHistory.length, historySize);
            timing.timestampElapsedHistory.unshift(timing.timestampElapsed);
            timing.timestampElapsedHistory.length = Math.min(timing.timestampElapsedHistory.length, historySize);
            timing.engineElapsedHistory.unshift(engine.timing.lastElapsed);
            timing.engineElapsedHistory.length = Math.min(timing.engineElapsedHistory.length, historySize);
            timing.elapsedHistory.unshift(timing.lastElapsed);
            timing.elapsedHistory.length = Math.min(timing.elapsedHistory.length, historySize);
          };
          var _mean = function(values) {
            var result = 0;
            for (var i = 0; i < values.length; i += 1) {
              result += values[i];
            }
            return result / values.length || 0;
          };
          var _createCanvas = function(width, height) {
            var canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            canvas.oncontextmenu = function() {
              return false;
            };
            canvas.onselectstart = function() {
              return false;
            };
            return canvas;
          };
          var _getPixelRatio = function(canvas) {
            var context = canvas.getContext("2d"), devicePixelRatio = window.devicePixelRatio || 1, backingStorePixelRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
            return devicePixelRatio / backingStorePixelRatio;
          };
          var _getTexture = function(render, imagePath) {
            var image = render.textures[imagePath];
            if (image)
              return image;
            image = render.textures[imagePath] = new Image();
            image.src = imagePath;
            return image;
          };
          var _applyBackground = function(render, background) {
            var cssBackground = background;
            if (/(jpg|gif|png)$/.test(background))
              cssBackground = "url(" + background + ")";
            render.canvas.style.background = cssBackground;
            render.canvas.style.backgroundSize = "contain";
            render.currentBackground = background;
          };
        })();
      },
      function(module2, exports2) {
        var Contact = {};
        module2.exports = Contact;
        (function() {
          Contact.create = function(vertex) {
            return {
              vertex,
              normalImpulse: 0,
              tangentImpulse: 0
            };
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Engine = {};
        module2.exports = Engine;
        var Sleeping = __webpack_require__(7);
        var Resolver = __webpack_require__(19);
        var Detector = __webpack_require__(14);
        var Pairs = __webpack_require__(20);
        var Events = __webpack_require__(4);
        var Composite = __webpack_require__(5);
        var Constraint = __webpack_require__(10);
        var Common = __webpack_require__(0);
        var Body = __webpack_require__(6);
        (function() {
          Engine.create = function(options) {
            options = options || {};
            var defaults = {
              positionIterations: 6,
              velocityIterations: 4,
              constraintIterations: 2,
              enableSleeping: false,
              events: [],
              plugin: {},
              gravity: {
                x: 0,
                y: 1,
                scale: 1e-3
              },
              timing: {
                timestamp: 0,
                timeScale: 1,
                lastDelta: 0,
                lastElapsed: 0
              }
            };
            var engine = Common.extend(defaults, options);
            engine.world = options.world || Composite.create({label: "World"});
            engine.pairs = options.pairs || Pairs.create();
            engine.detector = options.detector || Detector.create();
            engine.grid = {buckets: []};
            engine.world.gravity = engine.gravity;
            engine.broadphase = engine.grid;
            engine.metrics = {};
            return engine;
          };
          Engine.update = function(engine, delta, correction) {
            var startTime = Common.now();
            delta = delta || 1e3 / 60;
            correction = correction || 1;
            var world = engine.world, detector = engine.detector, pairs = engine.pairs, timing = engine.timing, timestamp = timing.timestamp, i;
            timing.timestamp += delta * timing.timeScale;
            timing.lastDelta = delta * timing.timeScale;
            var event = {
              timestamp: timing.timestamp
            };
            Events.trigger(engine, "beforeUpdate", event);
            var allBodies = Composite.allBodies(world), allConstraints = Composite.allConstraints(world);
            if (world.isModified) {
              Detector.setBodies(detector, allBodies);
            }
            if (world.isModified) {
              Composite.setModified(world, false, false, true);
            }
            if (engine.enableSleeping)
              Sleeping.update(allBodies, timing.timeScale);
            Engine._bodiesApplyGravity(allBodies, engine.gravity);
            Engine._bodiesUpdate(allBodies, delta, timing.timeScale, correction, world.bounds);
            Constraint.preSolveAll(allBodies);
            for (i = 0; i < engine.constraintIterations; i++) {
              Constraint.solveAll(allConstraints, timing.timeScale);
            }
            Constraint.postSolveAll(allBodies);
            detector.pairs = engine.pairs;
            var collisions = Detector.collisions(detector);
            Pairs.update(pairs, collisions, timestamp);
            if (engine.enableSleeping)
              Sleeping.afterCollisions(pairs.list, timing.timeScale);
            if (pairs.collisionStart.length > 0)
              Events.trigger(engine, "collisionStart", {pairs: pairs.collisionStart});
            Resolver.preSolvePosition(pairs.list);
            for (i = 0; i < engine.positionIterations; i++) {
              Resolver.solvePosition(pairs.list, timing.timeScale);
            }
            Resolver.postSolvePosition(allBodies);
            Constraint.preSolveAll(allBodies);
            for (i = 0; i < engine.constraintIterations; i++) {
              Constraint.solveAll(allConstraints, timing.timeScale);
            }
            Constraint.postSolveAll(allBodies);
            Resolver.preSolveVelocity(pairs.list);
            for (i = 0; i < engine.velocityIterations; i++) {
              Resolver.solveVelocity(pairs.list, timing.timeScale);
            }
            if (pairs.collisionActive.length > 0)
              Events.trigger(engine, "collisionActive", {pairs: pairs.collisionActive});
            if (pairs.collisionEnd.length > 0)
              Events.trigger(engine, "collisionEnd", {pairs: pairs.collisionEnd});
            Engine._bodiesClearForces(allBodies);
            Events.trigger(engine, "afterUpdate", event);
            engine.timing.lastElapsed = Common.now() - startTime;
            return engine;
          };
          Engine.merge = function(engineA, engineB) {
            Common.extend(engineA, engineB);
            if (engineB.world) {
              engineA.world = engineB.world;
              Engine.clear(engineA);
              var bodies = Composite.allBodies(engineA.world);
              for (var i = 0; i < bodies.length; i++) {
                var body = bodies[i];
                Sleeping.set(body, false);
                body.id = Common.nextId();
              }
            }
          };
          Engine.clear = function(engine) {
            Pairs.clear(engine.pairs);
            Detector.clear(engine.detector);
          };
          Engine._bodiesClearForces = function(bodies) {
            for (var i = 0; i < bodies.length; i++) {
              var body = bodies[i];
              body.force.x = 0;
              body.force.y = 0;
              body.torque = 0;
            }
          };
          Engine._bodiesApplyGravity = function(bodies, gravity) {
            var gravityScale = typeof gravity.scale !== "undefined" ? gravity.scale : 1e-3;
            if (gravity.x === 0 && gravity.y === 0 || gravityScale === 0) {
              return;
            }
            for (var i = 0; i < bodies.length; i++) {
              var body = bodies[i];
              if (body.isStatic || body.isSleeping)
                continue;
              body.force.y += body.mass * gravity.y * gravityScale;
              body.force.x += body.mass * gravity.x * gravityScale;
            }
          };
          Engine._bodiesUpdate = function(bodies, deltaTime, timeScale, correction, worldBounds) {
            for (var i = 0; i < bodies.length; i++) {
              var body = bodies[i];
              if (body.isStatic || body.isSleeping)
                continue;
              Body.update(body, deltaTime, timeScale, correction);
            }
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Resolver = {};
        module2.exports = Resolver;
        var Vertices = __webpack_require__(3);
        var Bounds = __webpack_require__(1);
        (function() {
          Resolver._restingThresh = 4;
          Resolver._restingThreshTangent = 6;
          Resolver._positionDampen = 0.9;
          Resolver._positionWarming = 0.8;
          Resolver._frictionNormalMultiplier = 5;
          Resolver.preSolvePosition = function(pairs) {
            var i, pair, activeCount, pairsLength = pairs.length;
            for (i = 0; i < pairsLength; i++) {
              pair = pairs[i];
              if (!pair.isActive)
                continue;
              activeCount = pair.activeContacts.length;
              pair.collision.parentA.totalContacts += activeCount;
              pair.collision.parentB.totalContacts += activeCount;
            }
          };
          Resolver.solvePosition = function(pairs, timeScale) {
            var i, pair, collision, bodyA, bodyB, normal, contactShare, positionImpulse, positionDampen = Resolver._positionDampen, pairsLength = pairs.length;
            for (i = 0; i < pairsLength; i++) {
              pair = pairs[i];
              if (!pair.isActive || pair.isSensor)
                continue;
              collision = pair.collision;
              bodyA = collision.parentA;
              bodyB = collision.parentB;
              normal = collision.normal;
              pair.separation = normal.x * (bodyB.positionImpulse.x + collision.penetration.x - bodyA.positionImpulse.x) + normal.y * (bodyB.positionImpulse.y + collision.penetration.y - bodyA.positionImpulse.y);
            }
            for (i = 0; i < pairsLength; i++) {
              pair = pairs[i];
              if (!pair.isActive || pair.isSensor)
                continue;
              collision = pair.collision;
              bodyA = collision.parentA;
              bodyB = collision.parentB;
              normal = collision.normal;
              positionImpulse = (pair.separation - pair.slop) * timeScale;
              if (bodyA.isStatic || bodyB.isStatic)
                positionImpulse *= 2;
              if (!(bodyA.isStatic || bodyA.isSleeping)) {
                contactShare = positionDampen / bodyA.totalContacts;
                bodyA.positionImpulse.x += normal.x * positionImpulse * contactShare;
                bodyA.positionImpulse.y += normal.y * positionImpulse * contactShare;
              }
              if (!(bodyB.isStatic || bodyB.isSleeping)) {
                contactShare = positionDampen / bodyB.totalContacts;
                bodyB.positionImpulse.x -= normal.x * positionImpulse * contactShare;
                bodyB.positionImpulse.y -= normal.y * positionImpulse * contactShare;
              }
            }
          };
          Resolver.postSolvePosition = function(bodies) {
            var positionWarming = Resolver._positionWarming, bodiesLength = bodies.length, verticesTranslate = Vertices.translate, boundsUpdate = Bounds.update;
            for (var i = 0; i < bodiesLength; i++) {
              var body = bodies[i], positionImpulse = body.positionImpulse, positionImpulseX = positionImpulse.x, positionImpulseY = positionImpulse.y, velocity = body.velocity;
              body.totalContacts = 0;
              if (positionImpulseX !== 0 || positionImpulseY !== 0) {
                for (var j = 0; j < body.parts.length; j++) {
                  var part = body.parts[j];
                  verticesTranslate(part.vertices, positionImpulse);
                  boundsUpdate(part.bounds, part.vertices, velocity);
                  part.position.x += positionImpulseX;
                  part.position.y += positionImpulseY;
                }
                body.positionPrev.x += positionImpulseX;
                body.positionPrev.y += positionImpulseY;
                if (positionImpulseX * velocity.x + positionImpulseY * velocity.y < 0) {
                  positionImpulse.x = 0;
                  positionImpulse.y = 0;
                } else {
                  positionImpulse.x *= positionWarming;
                  positionImpulse.y *= positionWarming;
                }
              }
            }
          };
          Resolver.preSolveVelocity = function(pairs) {
            var pairsLength = pairs.length, i, j;
            for (i = 0; i < pairsLength; i++) {
              var pair = pairs[i];
              if (!pair.isActive || pair.isSensor)
                continue;
              var contacts = pair.activeContacts, contactsLength = contacts.length, collision = pair.collision, bodyA = collision.parentA, bodyB = collision.parentB, normal = collision.normal, tangent = collision.tangent;
              for (j = 0; j < contactsLength; j++) {
                var contact = contacts[j], contactVertex = contact.vertex, normalImpulse = contact.normalImpulse, tangentImpulse = contact.tangentImpulse;
                if (normalImpulse !== 0 || tangentImpulse !== 0) {
                  var impulseX = normal.x * normalImpulse + tangent.x * tangentImpulse, impulseY = normal.y * normalImpulse + tangent.y * tangentImpulse;
                  if (!(bodyA.isStatic || bodyA.isSleeping)) {
                    bodyA.positionPrev.x += impulseX * bodyA.inverseMass;
                    bodyA.positionPrev.y += impulseY * bodyA.inverseMass;
                    bodyA.anglePrev += bodyA.inverseInertia * ((contactVertex.x - bodyA.position.x) * impulseY - (contactVertex.y - bodyA.position.y) * impulseX);
                  }
                  if (!(bodyB.isStatic || bodyB.isSleeping)) {
                    bodyB.positionPrev.x -= impulseX * bodyB.inverseMass;
                    bodyB.positionPrev.y -= impulseY * bodyB.inverseMass;
                    bodyB.anglePrev -= bodyB.inverseInertia * ((contactVertex.x - bodyB.position.x) * impulseY - (contactVertex.y - bodyB.position.y) * impulseX);
                  }
                }
              }
            }
          };
          Resolver.solveVelocity = function(pairs, timeScale) {
            var timeScaleSquared = timeScale * timeScale, restingThresh = Resolver._restingThresh * timeScaleSquared, frictionNormalMultiplier = Resolver._frictionNormalMultiplier, restingThreshTangent = Resolver._restingThreshTangent * timeScaleSquared, NumberMaxValue = Number.MAX_VALUE, pairsLength = pairs.length, tangentImpulse, maxFriction, i, j;
            for (i = 0; i < pairsLength; i++) {
              var pair = pairs[i];
              if (!pair.isActive || pair.isSensor)
                continue;
              var collision = pair.collision, bodyA = collision.parentA, bodyB = collision.parentB, bodyAVelocity = bodyA.velocity, bodyBVelocity = bodyB.velocity, normalX = collision.normal.x, normalY = collision.normal.y, tangentX = collision.tangent.x, tangentY = collision.tangent.y, contacts = pair.activeContacts, contactsLength = contacts.length, contactShare = 1 / contactsLength, inverseMassTotal = bodyA.inverseMass + bodyB.inverseMass, friction = pair.friction * pair.frictionStatic * frictionNormalMultiplier * timeScaleSquared;
              bodyAVelocity.x = bodyA.position.x - bodyA.positionPrev.x;
              bodyAVelocity.y = bodyA.position.y - bodyA.positionPrev.y;
              bodyBVelocity.x = bodyB.position.x - bodyB.positionPrev.x;
              bodyBVelocity.y = bodyB.position.y - bodyB.positionPrev.y;
              bodyA.angularVelocity = bodyA.angle - bodyA.anglePrev;
              bodyB.angularVelocity = bodyB.angle - bodyB.anglePrev;
              for (j = 0; j < contactsLength; j++) {
                var contact = contacts[j], contactVertex = contact.vertex;
                var offsetAX = contactVertex.x - bodyA.position.x, offsetAY = contactVertex.y - bodyA.position.y, offsetBX = contactVertex.x - bodyB.position.x, offsetBY = contactVertex.y - bodyB.position.y;
                var velocityPointAX = bodyAVelocity.x - offsetAY * bodyA.angularVelocity, velocityPointAY = bodyAVelocity.y + offsetAX * bodyA.angularVelocity, velocityPointBX = bodyBVelocity.x - offsetBY * bodyB.angularVelocity, velocityPointBY = bodyBVelocity.y + offsetBX * bodyB.angularVelocity;
                var relativeVelocityX = velocityPointAX - velocityPointBX, relativeVelocityY = velocityPointAY - velocityPointBY;
                var normalVelocity = normalX * relativeVelocityX + normalY * relativeVelocityY, tangentVelocity = tangentX * relativeVelocityX + tangentY * relativeVelocityY;
                var normalOverlap = pair.separation + normalVelocity;
                var normalForce = Math.min(normalOverlap, 1);
                normalForce = normalOverlap < 0 ? 0 : normalForce;
                var frictionLimit = normalForce * friction;
                if (tangentVelocity > frictionLimit || -tangentVelocity > frictionLimit) {
                  maxFriction = tangentVelocity > 0 ? tangentVelocity : -tangentVelocity;
                  tangentImpulse = pair.friction * (tangentVelocity > 0 ? 1 : -1) * timeScaleSquared;
                  if (tangentImpulse < -maxFriction) {
                    tangentImpulse = -maxFriction;
                  } else if (tangentImpulse > maxFriction) {
                    tangentImpulse = maxFriction;
                  }
                } else {
                  tangentImpulse = tangentVelocity;
                  maxFriction = NumberMaxValue;
                }
                var oAcN = offsetAX * normalY - offsetAY * normalX, oBcN = offsetBX * normalY - offsetBY * normalX, share = contactShare / (inverseMassTotal + bodyA.inverseInertia * oAcN * oAcN + bodyB.inverseInertia * oBcN * oBcN);
                var normalImpulse = (1 + pair.restitution) * normalVelocity * share;
                tangentImpulse *= share;
                if (normalVelocity * normalVelocity > restingThresh && normalVelocity < 0) {
                  contact.normalImpulse = 0;
                } else {
                  var contactNormalImpulse = contact.normalImpulse;
                  contact.normalImpulse += normalImpulse;
                  contact.normalImpulse = Math.min(contact.normalImpulse, 0);
                  normalImpulse = contact.normalImpulse - contactNormalImpulse;
                }
                if (tangentVelocity * tangentVelocity > restingThreshTangent) {
                  contact.tangentImpulse = 0;
                } else {
                  var contactTangentImpulse = contact.tangentImpulse;
                  contact.tangentImpulse += tangentImpulse;
                  if (contact.tangentImpulse < -maxFriction)
                    contact.tangentImpulse = -maxFriction;
                  if (contact.tangentImpulse > maxFriction)
                    contact.tangentImpulse = maxFriction;
                  tangentImpulse = contact.tangentImpulse - contactTangentImpulse;
                }
                var impulseX = normalX * normalImpulse + tangentX * tangentImpulse, impulseY = normalY * normalImpulse + tangentY * tangentImpulse;
                if (!(bodyA.isStatic || bodyA.isSleeping)) {
                  bodyA.positionPrev.x += impulseX * bodyA.inverseMass;
                  bodyA.positionPrev.y += impulseY * bodyA.inverseMass;
                  bodyA.anglePrev += (offsetAX * impulseY - offsetAY * impulseX) * bodyA.inverseInertia;
                }
                if (!(bodyB.isStatic || bodyB.isSleeping)) {
                  bodyB.positionPrev.x -= impulseX * bodyB.inverseMass;
                  bodyB.positionPrev.y -= impulseY * bodyB.inverseMass;
                  bodyB.anglePrev -= (offsetBX * impulseY - offsetBY * impulseX) * bodyB.inverseInertia;
                }
              }
            }
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Pairs = {};
        module2.exports = Pairs;
        var Pair = __webpack_require__(9);
        var Common = __webpack_require__(0);
        (function() {
          Pairs.create = function(options) {
            return Common.extend({
              table: {},
              list: [],
              collisionStart: [],
              collisionActive: [],
              collisionEnd: []
            }, options);
          };
          Pairs.update = function(pairs, collisions, timestamp) {
            var pairsList = pairs.list, pairsListLength = pairsList.length, pairsTable = pairs.table, collisionsLength = collisions.length, collisionStart = pairs.collisionStart, collisionEnd = pairs.collisionEnd, collisionActive = pairs.collisionActive, collision, pairIndex, pair, i;
            collisionStart.length = 0;
            collisionEnd.length = 0;
            collisionActive.length = 0;
            for (i = 0; i < pairsListLength; i++) {
              pairsList[i].confirmedActive = false;
            }
            for (i = 0; i < collisionsLength; i++) {
              collision = collisions[i];
              pair = collision.pair;
              if (pair) {
                if (pair.isActive) {
                  collisionActive.push(pair);
                } else {
                  collisionStart.push(pair);
                }
                Pair.update(pair, collision, timestamp);
                pair.confirmedActive = true;
              } else {
                pair = Pair.create(collision, timestamp);
                pairsTable[pair.id] = pair;
                collisionStart.push(pair);
                pairsList.push(pair);
              }
            }
            var removePairIndex = [];
            pairsListLength = pairsList.length;
            for (i = 0; i < pairsListLength; i++) {
              pair = pairsList[i];
              if (!pair.confirmedActive) {
                Pair.setActive(pair, false, timestamp);
                collisionEnd.push(pair);
                if (!pair.collision.bodyA.isSleeping && !pair.collision.bodyB.isSleeping) {
                  removePairIndex.push(i);
                }
              }
            }
            for (i = 0; i < removePairIndex.length; i++) {
              pairIndex = removePairIndex[i] - i;
              pair = pairsList[pairIndex];
              pairsList.splice(pairIndex, 1);
              delete pairsTable[pair.id];
            }
          };
          Pairs.clear = function(pairs) {
            pairs.table = {};
            pairs.list.length = 0;
            pairs.collisionStart.length = 0;
            pairs.collisionActive.length = 0;
            pairs.collisionEnd.length = 0;
            return pairs;
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Matter2 = module2.exports = __webpack_require__(22);
        Matter2.Axes = __webpack_require__(11);
        Matter2.Bodies = __webpack_require__(12);
        Matter2.Body = __webpack_require__(6);
        Matter2.Bounds = __webpack_require__(1);
        Matter2.Collision = __webpack_require__(8);
        Matter2.Common = __webpack_require__(0);
        Matter2.Composite = __webpack_require__(5);
        Matter2.Composites = __webpack_require__(23);
        Matter2.Constraint = __webpack_require__(10);
        Matter2.Contact = __webpack_require__(17);
        Matter2.Detector = __webpack_require__(14);
        Matter2.Engine = __webpack_require__(18);
        Matter2.Events = __webpack_require__(4);
        Matter2.Grid = __webpack_require__(24);
        Matter2.Mouse = __webpack_require__(13);
        Matter2.MouseConstraint = __webpack_require__(25);
        Matter2.Pair = __webpack_require__(9);
        Matter2.Pairs = __webpack_require__(20);
        Matter2.Plugin = __webpack_require__(15);
        Matter2.Query = __webpack_require__(26);
        Matter2.Render = __webpack_require__(16);
        Matter2.Resolver = __webpack_require__(19);
        Matter2.Runner = __webpack_require__(27);
        Matter2.SAT = __webpack_require__(28);
        Matter2.Sleeping = __webpack_require__(7);
        Matter2.Svg = __webpack_require__(29);
        Matter2.Vector = __webpack_require__(2);
        Matter2.Vertices = __webpack_require__(3);
        Matter2.World = __webpack_require__(30);
        Matter2.Engine.run = Matter2.Runner.run;
        Matter2.Common.deprecated(Matter2.Engine, "run", "Engine.run \u27A4 use Matter.Runner.run(engine) instead");
      },
      function(module2, exports2, __webpack_require__) {
        var Matter2 = {};
        module2.exports = Matter2;
        var Plugin = __webpack_require__(15);
        var Common = __webpack_require__(0);
        (function() {
          Matter2.name = "matter-js";
          Matter2.version = "0.18.0";
          Matter2.uses = [];
          Matter2.used = [];
          Matter2.use = function() {
            Plugin.use(Matter2, Array.prototype.slice.call(arguments));
          };
          Matter2.before = function(path, func) {
            path = path.replace(/^Matter./, "");
            return Common.chainPathBefore(Matter2, path, func);
          };
          Matter2.after = function(path, func) {
            path = path.replace(/^Matter./, "");
            return Common.chainPathAfter(Matter2, path, func);
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Composites = {};
        module2.exports = Composites;
        var Composite = __webpack_require__(5);
        var Constraint = __webpack_require__(10);
        var Common = __webpack_require__(0);
        var Body = __webpack_require__(6);
        var Bodies = __webpack_require__(12);
        var deprecated = Common.deprecated;
        (function() {
          Composites.stack = function(xx, yy, columns, rows, columnGap, rowGap, callback) {
            var stack = Composite.create({label: "Stack"}), x = xx, y = yy, lastBody, i = 0;
            for (var row = 0; row < rows; row++) {
              var maxHeight = 0;
              for (var column = 0; column < columns; column++) {
                var body = callback(x, y, column, row, lastBody, i);
                if (body) {
                  var bodyHeight = body.bounds.max.y - body.bounds.min.y, bodyWidth = body.bounds.max.x - body.bounds.min.x;
                  if (bodyHeight > maxHeight)
                    maxHeight = bodyHeight;
                  Body.translate(body, {x: bodyWidth * 0.5, y: bodyHeight * 0.5});
                  x = body.bounds.max.x + columnGap;
                  Composite.addBody(stack, body);
                  lastBody = body;
                  i += 1;
                } else {
                  x += columnGap;
                }
              }
              y += maxHeight + rowGap;
              x = xx;
            }
            return stack;
          };
          Composites.chain = function(composite, xOffsetA, yOffsetA, xOffsetB, yOffsetB, options) {
            var bodies = composite.bodies;
            for (var i = 1; i < bodies.length; i++) {
              var bodyA = bodies[i - 1], bodyB = bodies[i], bodyAHeight = bodyA.bounds.max.y - bodyA.bounds.min.y, bodyAWidth = bodyA.bounds.max.x - bodyA.bounds.min.x, bodyBHeight = bodyB.bounds.max.y - bodyB.bounds.min.y, bodyBWidth = bodyB.bounds.max.x - bodyB.bounds.min.x;
              var defaults = {
                bodyA,
                pointA: {x: bodyAWidth * xOffsetA, y: bodyAHeight * yOffsetA},
                bodyB,
                pointB: {x: bodyBWidth * xOffsetB, y: bodyBHeight * yOffsetB}
              };
              var constraint = Common.extend(defaults, options);
              Composite.addConstraint(composite, Constraint.create(constraint));
            }
            composite.label += " Chain";
            return composite;
          };
          Composites.mesh = function(composite, columns, rows, crossBrace, options) {
            var bodies = composite.bodies, row, col, bodyA, bodyB, bodyC;
            for (row = 0; row < rows; row++) {
              for (col = 1; col < columns; col++) {
                bodyA = bodies[col - 1 + row * columns];
                bodyB = bodies[col + row * columns];
                Composite.addConstraint(composite, Constraint.create(Common.extend({bodyA, bodyB}, options)));
              }
              if (row > 0) {
                for (col = 0; col < columns; col++) {
                  bodyA = bodies[col + (row - 1) * columns];
                  bodyB = bodies[col + row * columns];
                  Composite.addConstraint(composite, Constraint.create(Common.extend({bodyA, bodyB}, options)));
                  if (crossBrace && col > 0) {
                    bodyC = bodies[col - 1 + (row - 1) * columns];
                    Composite.addConstraint(composite, Constraint.create(Common.extend({bodyA: bodyC, bodyB}, options)));
                  }
                  if (crossBrace && col < columns - 1) {
                    bodyC = bodies[col + 1 + (row - 1) * columns];
                    Composite.addConstraint(composite, Constraint.create(Common.extend({bodyA: bodyC, bodyB}, options)));
                  }
                }
              }
            }
            composite.label += " Mesh";
            return composite;
          };
          Composites.pyramid = function(xx, yy, columns, rows, columnGap, rowGap, callback) {
            return Composites.stack(xx, yy, columns, rows, columnGap, rowGap, function(x, y, column, row, lastBody, i) {
              var actualRows = Math.min(rows, Math.ceil(columns / 2)), lastBodyWidth = lastBody ? lastBody.bounds.max.x - lastBody.bounds.min.x : 0;
              if (row > actualRows)
                return;
              row = actualRows - row;
              var start = row, end = columns - 1 - row;
              if (column < start || column > end)
                return;
              if (i === 1) {
                Body.translate(lastBody, {x: (column + (columns % 2 === 1 ? 1 : -1)) * lastBodyWidth, y: 0});
              }
              var xOffset = lastBody ? column * lastBodyWidth : 0;
              return callback(xx + xOffset + column * columnGap, y, column, row, lastBody, i);
            });
          };
          Composites.newtonsCradle = function(xx, yy, number, size, length) {
            var newtonsCradle = Composite.create({label: "Newtons Cradle"});
            for (var i = 0; i < number; i++) {
              var separation = 1.9, circle = Bodies.circle(xx + i * (size * separation), yy + length, size, {inertia: Infinity, restitution: 1, friction: 0, frictionAir: 1e-4, slop: 1}), constraint = Constraint.create({pointA: {x: xx + i * (size * separation), y: yy}, bodyB: circle});
              Composite.addBody(newtonsCradle, circle);
              Composite.addConstraint(newtonsCradle, constraint);
            }
            return newtonsCradle;
          };
          deprecated(Composites, "newtonsCradle", "Composites.newtonsCradle \u27A4 moved to newtonsCradle example");
          Composites.car = function(xx, yy, width, height, wheelSize) {
            var group = Body.nextGroup(true), wheelBase = 20, wheelAOffset = -width * 0.5 + wheelBase, wheelBOffset = width * 0.5 - wheelBase, wheelYOffset = 0;
            var car = Composite.create({label: "Car"}), body = Bodies.rectangle(xx, yy, width, height, {
              collisionFilter: {
                group
              },
              chamfer: {
                radius: height * 0.5
              },
              density: 2e-4
            });
            var wheelA = Bodies.circle(xx + wheelAOffset, yy + wheelYOffset, wheelSize, {
              collisionFilter: {
                group
              },
              friction: 0.8
            });
            var wheelB = Bodies.circle(xx + wheelBOffset, yy + wheelYOffset, wheelSize, {
              collisionFilter: {
                group
              },
              friction: 0.8
            });
            var axelA = Constraint.create({
              bodyB: body,
              pointB: {x: wheelAOffset, y: wheelYOffset},
              bodyA: wheelA,
              stiffness: 1,
              length: 0
            });
            var axelB = Constraint.create({
              bodyB: body,
              pointB: {x: wheelBOffset, y: wheelYOffset},
              bodyA: wheelB,
              stiffness: 1,
              length: 0
            });
            Composite.addBody(car, body);
            Composite.addBody(car, wheelA);
            Composite.addBody(car, wheelB);
            Composite.addConstraint(car, axelA);
            Composite.addConstraint(car, axelB);
            return car;
          };
          deprecated(Composites, "car", "Composites.car \u27A4 moved to car example");
          Composites.softBody = function(xx, yy, columns, rows, columnGap, rowGap, crossBrace, particleRadius, particleOptions, constraintOptions) {
            particleOptions = Common.extend({inertia: Infinity}, particleOptions);
            constraintOptions = Common.extend({stiffness: 0.2, render: {type: "line", anchors: false}}, constraintOptions);
            var softBody = Composites.stack(xx, yy, columns, rows, columnGap, rowGap, function(x, y) {
              return Bodies.circle(x, y, particleRadius, particleOptions);
            });
            Composites.mesh(softBody, columns, rows, crossBrace, constraintOptions);
            softBody.label = "Soft Body";
            return softBody;
          };
          deprecated(Composites, "softBody", "Composites.softBody \u27A4 moved to softBody and cloth examples");
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Grid = {};
        module2.exports = Grid;
        var Pair = __webpack_require__(9);
        var Common = __webpack_require__(0);
        var deprecated = Common.deprecated;
        (function() {
          Grid.create = function(options) {
            var defaults = {
              buckets: {},
              pairs: {},
              pairsList: [],
              bucketWidth: 48,
              bucketHeight: 48
            };
            return Common.extend(defaults, options);
          };
          Grid.update = function(grid, bodies, engine, forceUpdate) {
            var i, col, row, world = engine.world, buckets = grid.buckets, bucket, bucketId, gridChanged = false;
            for (i = 0; i < bodies.length; i++) {
              var body = bodies[i];
              if (body.isSleeping && !forceUpdate)
                continue;
              if (world.bounds && (body.bounds.max.x < world.bounds.min.x || body.bounds.min.x > world.bounds.max.x || body.bounds.max.y < world.bounds.min.y || body.bounds.min.y > world.bounds.max.y))
                continue;
              var newRegion = Grid._getRegion(grid, body);
              if (!body.region || newRegion.id !== body.region.id || forceUpdate) {
                if (!body.region || forceUpdate)
                  body.region = newRegion;
                var union = Grid._regionUnion(newRegion, body.region);
                for (col = union.startCol; col <= union.endCol; col++) {
                  for (row = union.startRow; row <= union.endRow; row++) {
                    bucketId = Grid._getBucketId(col, row);
                    bucket = buckets[bucketId];
                    var isInsideNewRegion = col >= newRegion.startCol && col <= newRegion.endCol && row >= newRegion.startRow && row <= newRegion.endRow;
                    var isInsideOldRegion = col >= body.region.startCol && col <= body.region.endCol && row >= body.region.startRow && row <= body.region.endRow;
                    if (!isInsideNewRegion && isInsideOldRegion) {
                      if (isInsideOldRegion) {
                        if (bucket)
                          Grid._bucketRemoveBody(grid, bucket, body);
                      }
                    }
                    if (body.region === newRegion || isInsideNewRegion && !isInsideOldRegion || forceUpdate) {
                      if (!bucket)
                        bucket = Grid._createBucket(buckets, bucketId);
                      Grid._bucketAddBody(grid, bucket, body);
                    }
                  }
                }
                body.region = newRegion;
                gridChanged = true;
              }
            }
            if (gridChanged)
              grid.pairsList = Grid._createActivePairsList(grid);
          };
          deprecated(Grid, "update", "Grid.update \u27A4 replaced by Matter.Detector");
          Grid.clear = function(grid) {
            grid.buckets = {};
            grid.pairs = {};
            grid.pairsList = [];
          };
          deprecated(Grid, "clear", "Grid.clear \u27A4 replaced by Matter.Detector");
          Grid._regionUnion = function(regionA, regionB) {
            var startCol = Math.min(regionA.startCol, regionB.startCol), endCol = Math.max(regionA.endCol, regionB.endCol), startRow = Math.min(regionA.startRow, regionB.startRow), endRow = Math.max(regionA.endRow, regionB.endRow);
            return Grid._createRegion(startCol, endCol, startRow, endRow);
          };
          Grid._getRegion = function(grid, body) {
            var bounds = body.bounds, startCol = Math.floor(bounds.min.x / grid.bucketWidth), endCol = Math.floor(bounds.max.x / grid.bucketWidth), startRow = Math.floor(bounds.min.y / grid.bucketHeight), endRow = Math.floor(bounds.max.y / grid.bucketHeight);
            return Grid._createRegion(startCol, endCol, startRow, endRow);
          };
          Grid._createRegion = function(startCol, endCol, startRow, endRow) {
            return {
              id: startCol + "," + endCol + "," + startRow + "," + endRow,
              startCol,
              endCol,
              startRow,
              endRow
            };
          };
          Grid._getBucketId = function(column, row) {
            return "C" + column + "R" + row;
          };
          Grid._createBucket = function(buckets, bucketId) {
            var bucket = buckets[bucketId] = [];
            return bucket;
          };
          Grid._bucketAddBody = function(grid, bucket, body) {
            var gridPairs = grid.pairs, pairId = Pair.id, bucketLength = bucket.length, i;
            for (i = 0; i < bucketLength; i++) {
              var bodyB = bucket[i];
              if (body.id === bodyB.id || body.isStatic && bodyB.isStatic)
                continue;
              var id = pairId(body, bodyB), pair = gridPairs[id];
              if (pair) {
                pair[2] += 1;
              } else {
                gridPairs[id] = [body, bodyB, 1];
              }
            }
            bucket.push(body);
          };
          Grid._bucketRemoveBody = function(grid, bucket, body) {
            var gridPairs = grid.pairs, pairId = Pair.id, i;
            bucket.splice(Common.indexOf(bucket, body), 1);
            var bucketLength = bucket.length;
            for (i = 0; i < bucketLength; i++) {
              var pair = gridPairs[pairId(body, bucket[i])];
              if (pair)
                pair[2] -= 1;
            }
          };
          Grid._createActivePairsList = function(grid) {
            var pair, gridPairs = grid.pairs, pairKeys = Common.keys(gridPairs), pairKeysLength = pairKeys.length, pairs = [], k;
            for (k = 0; k < pairKeysLength; k++) {
              pair = gridPairs[pairKeys[k]];
              if (pair[2] > 0) {
                pairs.push(pair);
              } else {
                delete gridPairs[pairKeys[k]];
              }
            }
            return pairs;
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var MouseConstraint = {};
        module2.exports = MouseConstraint;
        var Vertices = __webpack_require__(3);
        var Sleeping = __webpack_require__(7);
        var Mouse = __webpack_require__(13);
        var Events = __webpack_require__(4);
        var Detector = __webpack_require__(14);
        var Constraint = __webpack_require__(10);
        var Composite = __webpack_require__(5);
        var Common = __webpack_require__(0);
        var Bounds = __webpack_require__(1);
        (function() {
          MouseConstraint.create = function(engine, options) {
            var mouse = (engine ? engine.mouse : null) || (options ? options.mouse : null);
            if (!mouse) {
              if (engine && engine.render && engine.render.canvas) {
                mouse = Mouse.create(engine.render.canvas);
              } else if (options && options.element) {
                mouse = Mouse.create(options.element);
              } else {
                mouse = Mouse.create();
                Common.warn("MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected");
              }
            }
            var constraint = Constraint.create({
              label: "Mouse Constraint",
              pointA: mouse.position,
              pointB: {x: 0, y: 0},
              length: 0.01,
              stiffness: 0.1,
              angularStiffness: 1,
              render: {
                strokeStyle: "#90EE90",
                lineWidth: 3
              }
            });
            var defaults = {
              type: "mouseConstraint",
              mouse,
              element: null,
              body: null,
              constraint,
              collisionFilter: {
                category: 1,
                mask: 4294967295,
                group: 0
              }
            };
            var mouseConstraint = Common.extend(defaults, options);
            Events.on(engine, "beforeUpdate", function() {
              var allBodies = Composite.allBodies(engine.world);
              MouseConstraint.update(mouseConstraint, allBodies);
              MouseConstraint._triggerEvents(mouseConstraint);
            });
            return mouseConstraint;
          };
          MouseConstraint.update = function(mouseConstraint, bodies) {
            var mouse = mouseConstraint.mouse, constraint = mouseConstraint.constraint, body = mouseConstraint.body;
            if (mouse.button === 0) {
              if (!constraint.bodyB) {
                for (var i = 0; i < bodies.length; i++) {
                  body = bodies[i];
                  if (Bounds.contains(body.bounds, mouse.position) && Detector.canCollide(body.collisionFilter, mouseConstraint.collisionFilter)) {
                    for (var j = body.parts.length > 1 ? 1 : 0; j < body.parts.length; j++) {
                      var part = body.parts[j];
                      if (Vertices.contains(part.vertices, mouse.position)) {
                        constraint.pointA = mouse.position;
                        constraint.bodyB = mouseConstraint.body = body;
                        constraint.pointB = {x: mouse.position.x - body.position.x, y: mouse.position.y - body.position.y};
                        constraint.angleB = body.angle;
                        Sleeping.set(body, false);
                        Events.trigger(mouseConstraint, "startdrag", {mouse, body});
                        break;
                      }
                    }
                  }
                }
              } else {
                Sleeping.set(constraint.bodyB, false);
                constraint.pointA = mouse.position;
              }
            } else {
              constraint.bodyB = mouseConstraint.body = null;
              constraint.pointB = null;
              if (body)
                Events.trigger(mouseConstraint, "enddrag", {mouse, body});
            }
          };
          MouseConstraint._triggerEvents = function(mouseConstraint) {
            var mouse = mouseConstraint.mouse, mouseEvents = mouse.sourceEvents;
            if (mouseEvents.mousemove)
              Events.trigger(mouseConstraint, "mousemove", {mouse});
            if (mouseEvents.mousedown)
              Events.trigger(mouseConstraint, "mousedown", {mouse});
            if (mouseEvents.mouseup)
              Events.trigger(mouseConstraint, "mouseup", {mouse});
            Mouse.clearSourceEvents(mouse);
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Query = {};
        module2.exports = Query;
        var Vector = __webpack_require__(2);
        var Collision = __webpack_require__(8);
        var Bounds = __webpack_require__(1);
        var Bodies = __webpack_require__(12);
        var Vertices = __webpack_require__(3);
        (function() {
          Query.collides = function(body, bodies) {
            var collisions = [], bodiesLength = bodies.length, bounds = body.bounds, collides = Collision.collides, overlaps = Bounds.overlaps;
            for (var i = 0; i < bodiesLength; i++) {
              var bodyA = bodies[i], partsALength = bodyA.parts.length, partsAStart = partsALength === 1 ? 0 : 1;
              if (overlaps(bodyA.bounds, bounds)) {
                for (var j = partsAStart; j < partsALength; j++) {
                  var part = bodyA.parts[j];
                  if (overlaps(part.bounds, bounds)) {
                    var collision = collides(part, body);
                    if (collision) {
                      collisions.push(collision);
                      break;
                    }
                  }
                }
              }
            }
            return collisions;
          };
          Query.ray = function(bodies, startPoint, endPoint, rayWidth) {
            rayWidth = rayWidth || 1e-100;
            var rayAngle = Vector.angle(startPoint, endPoint), rayLength = Vector.magnitude(Vector.sub(startPoint, endPoint)), rayX = (endPoint.x + startPoint.x) * 0.5, rayY = (endPoint.y + startPoint.y) * 0.5, ray = Bodies.rectangle(rayX, rayY, rayLength, rayWidth, {angle: rayAngle}), collisions = Query.collides(ray, bodies);
            for (var i = 0; i < collisions.length; i += 1) {
              var collision = collisions[i];
              collision.body = collision.bodyB = collision.bodyA;
            }
            return collisions;
          };
          Query.region = function(bodies, bounds, outside) {
            var result = [];
            for (var i = 0; i < bodies.length; i++) {
              var body = bodies[i], overlaps = Bounds.overlaps(body.bounds, bounds);
              if (overlaps && !outside || !overlaps && outside)
                result.push(body);
            }
            return result;
          };
          Query.point = function(bodies, point) {
            var result = [];
            for (var i = 0; i < bodies.length; i++) {
              var body = bodies[i];
              if (Bounds.contains(body.bounds, point)) {
                for (var j = body.parts.length === 1 ? 0 : 1; j < body.parts.length; j++) {
                  var part = body.parts[j];
                  if (Bounds.contains(part.bounds, point) && Vertices.contains(part.vertices, point)) {
                    result.push(body);
                    break;
                  }
                }
              }
            }
            return result;
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Runner = {};
        module2.exports = Runner;
        var Events = __webpack_require__(4);
        var Engine = __webpack_require__(18);
        var Common = __webpack_require__(0);
        (function() {
          var _requestAnimationFrame, _cancelAnimationFrame;
          if (typeof window !== "undefined") {
            _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
            _cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
          }
          if (!_requestAnimationFrame) {
            var _frameTimeout;
            _requestAnimationFrame = function(callback) {
              _frameTimeout = setTimeout(function() {
                callback(Common.now());
              }, 1e3 / 60);
            };
            _cancelAnimationFrame = function() {
              clearTimeout(_frameTimeout);
            };
          }
          Runner.create = function(options) {
            var defaults = {
              fps: 60,
              correction: 1,
              deltaSampleSize: 60,
              counterTimestamp: 0,
              frameCounter: 0,
              deltaHistory: [],
              timePrev: null,
              timeScalePrev: 1,
              frameRequestId: null,
              isFixed: false,
              enabled: true
            };
            var runner = Common.extend(defaults, options);
            runner.delta = runner.delta || 1e3 / runner.fps;
            runner.deltaMin = runner.deltaMin || 1e3 / runner.fps;
            runner.deltaMax = runner.deltaMax || 1e3 / (runner.fps * 0.5);
            runner.fps = 1e3 / runner.delta;
            return runner;
          };
          Runner.run = function(runner, engine) {
            if (typeof runner.positionIterations !== "undefined") {
              engine = runner;
              runner = Runner.create();
            }
            (function render(time) {
              runner.frameRequestId = _requestAnimationFrame(render);
              if (time && runner.enabled) {
                Runner.tick(runner, engine, time);
              }
            })();
            return runner;
          };
          Runner.tick = function(runner, engine, time) {
            var timing = engine.timing, correction = 1, delta;
            var event = {
              timestamp: timing.timestamp
            };
            Events.trigger(runner, "beforeTick", event);
            if (runner.isFixed) {
              delta = runner.delta;
            } else {
              delta = time - runner.timePrev || runner.delta;
              runner.timePrev = time;
              runner.deltaHistory.push(delta);
              runner.deltaHistory = runner.deltaHistory.slice(-runner.deltaSampleSize);
              delta = Math.min.apply(null, runner.deltaHistory);
              delta = delta < runner.deltaMin ? runner.deltaMin : delta;
              delta = delta > runner.deltaMax ? runner.deltaMax : delta;
              correction = delta / runner.delta;
              runner.delta = delta;
            }
            if (runner.timeScalePrev !== 0)
              correction *= timing.timeScale / runner.timeScalePrev;
            if (timing.timeScale === 0)
              correction = 0;
            runner.timeScalePrev = timing.timeScale;
            runner.correction = correction;
            runner.frameCounter += 1;
            if (time - runner.counterTimestamp >= 1e3) {
              runner.fps = runner.frameCounter * ((time - runner.counterTimestamp) / 1e3);
              runner.counterTimestamp = time;
              runner.frameCounter = 0;
            }
            Events.trigger(runner, "tick", event);
            Events.trigger(runner, "beforeUpdate", event);
            Engine.update(engine, delta, correction);
            Events.trigger(runner, "afterUpdate", event);
            Events.trigger(runner, "afterTick", event);
          };
          Runner.stop = function(runner) {
            _cancelAnimationFrame(runner.frameRequestId);
          };
          Runner.start = function(runner, engine) {
            Runner.run(runner, engine);
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var SAT = {};
        module2.exports = SAT;
        var Collision = __webpack_require__(8);
        var Common = __webpack_require__(0);
        var deprecated = Common.deprecated;
        (function() {
          SAT.collides = function(bodyA, bodyB) {
            return Collision.collides(bodyA, bodyB);
          };
          deprecated(SAT, "collides", "SAT.collides \u27A4 replaced by Collision.collides");
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var Svg = {};
        module2.exports = Svg;
        var Bounds = __webpack_require__(1);
        var Common = __webpack_require__(0);
        (function() {
          Svg.pathToVertices = function(path, sampleLength) {
            if (typeof window !== "undefined" && !("SVGPathSeg" in window)) {
              Common.warn("Svg.pathToVertices: SVGPathSeg not defined, a polyfill is required.");
            }
            var i, il, total, point, segment, segments, segmentsQueue, lastSegment, lastPoint, segmentIndex, points = [], lx, ly, length = 0, x = 0, y = 0;
            sampleLength = sampleLength || 15;
            var addPoint = function(px, py, pathSegType) {
              var isRelative = pathSegType % 2 === 1 && pathSegType > 1;
              if (!lastPoint || px != lastPoint.x || py != lastPoint.y) {
                if (lastPoint && isRelative) {
                  lx = lastPoint.x;
                  ly = lastPoint.y;
                } else {
                  lx = 0;
                  ly = 0;
                }
                var point2 = {
                  x: lx + px,
                  y: ly + py
                };
                if (isRelative || !lastPoint) {
                  lastPoint = point2;
                }
                points.push(point2);
                x = lx + px;
                y = ly + py;
              }
            };
            var addSegmentPoint = function(segment2) {
              var segType = segment2.pathSegTypeAsLetter.toUpperCase();
              if (segType === "Z")
                return;
              switch (segType) {
                case "M":
                case "L":
                case "T":
                case "C":
                case "S":
                case "Q":
                  x = segment2.x;
                  y = segment2.y;
                  break;
                case "H":
                  x = segment2.x;
                  break;
                case "V":
                  y = segment2.y;
                  break;
              }
              addPoint(x, y, segment2.pathSegType);
            };
            Svg._svgPathToAbsolute(path);
            total = path.getTotalLength();
            segments = [];
            for (i = 0; i < path.pathSegList.numberOfItems; i += 1)
              segments.push(path.pathSegList.getItem(i));
            segmentsQueue = segments.concat();
            while (length < total) {
              segmentIndex = path.getPathSegAtLength(length);
              segment = segments[segmentIndex];
              if (segment != lastSegment) {
                while (segmentsQueue.length && segmentsQueue[0] != segment)
                  addSegmentPoint(segmentsQueue.shift());
                lastSegment = segment;
              }
              switch (segment.pathSegTypeAsLetter.toUpperCase()) {
                case "C":
                case "T":
                case "S":
                case "Q":
                case "A":
                  point = path.getPointAtLength(length);
                  addPoint(point.x, point.y, 0);
                  break;
              }
              length += sampleLength;
            }
            for (i = 0, il = segmentsQueue.length; i < il; ++i)
              addSegmentPoint(segmentsQueue[i]);
            return points;
          };
          Svg._svgPathToAbsolute = function(path) {
            var x0, y0, x1, y1, x2, y2, segs = path.pathSegList, x = 0, y = 0, len = segs.numberOfItems;
            for (var i = 0; i < len; ++i) {
              var seg = segs.getItem(i), segType = seg.pathSegTypeAsLetter;
              if (/[MLHVCSQTA]/.test(segType)) {
                if ("x" in seg)
                  x = seg.x;
                if ("y" in seg)
                  y = seg.y;
              } else {
                if ("x1" in seg)
                  x1 = x + seg.x1;
                if ("x2" in seg)
                  x2 = x + seg.x2;
                if ("y1" in seg)
                  y1 = y + seg.y1;
                if ("y2" in seg)
                  y2 = y + seg.y2;
                if ("x" in seg)
                  x += seg.x;
                if ("y" in seg)
                  y += seg.y;
                switch (segType) {
                  case "m":
                    segs.replaceItem(path.createSVGPathSegMovetoAbs(x, y), i);
                    break;
                  case "l":
                    segs.replaceItem(path.createSVGPathSegLinetoAbs(x, y), i);
                    break;
                  case "h":
                    segs.replaceItem(path.createSVGPathSegLinetoHorizontalAbs(x), i);
                    break;
                  case "v":
                    segs.replaceItem(path.createSVGPathSegLinetoVerticalAbs(y), i);
                    break;
                  case "c":
                    segs.replaceItem(path.createSVGPathSegCurvetoCubicAbs(x, y, x1, y1, x2, y2), i);
                    break;
                  case "s":
                    segs.replaceItem(path.createSVGPathSegCurvetoCubicSmoothAbs(x, y, x2, y2), i);
                    break;
                  case "q":
                    segs.replaceItem(path.createSVGPathSegCurvetoQuadraticAbs(x, y, x1, y1), i);
                    break;
                  case "t":
                    segs.replaceItem(path.createSVGPathSegCurvetoQuadraticSmoothAbs(x, y), i);
                    break;
                  case "a":
                    segs.replaceItem(path.createSVGPathSegArcAbs(x, y, seg.r1, seg.r2, seg.angle, seg.largeArcFlag, seg.sweepFlag), i);
                    break;
                  case "z":
                  case "Z":
                    x = x0;
                    y = y0;
                    break;
                }
              }
              if (segType == "M" || segType == "m") {
                x0 = x;
                y0 = y;
              }
            }
          };
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var World = {};
        module2.exports = World;
        var Composite = __webpack_require__(5);
        var Common = __webpack_require__(0);
        (function() {
          World.create = Composite.create;
          World.add = Composite.add;
          World.remove = Composite.remove;
          World.clear = Composite.clear;
          World.addComposite = Composite.addComposite;
          World.addBody = Composite.addBody;
          World.addConstraint = Composite.addConstraint;
        })();
      }
    ]);
  });
});
var __pika_web_default_export_for_treeshaking__ = /* @__PURE__ */ getDefaultExportFromCjs(matter);
var Matter = matter.Matter;
export default __pika_web_default_export_for_treeshaking__;
export {Matter, matter as __moduleExports};
