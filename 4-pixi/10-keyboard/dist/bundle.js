/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../2-pixi-lib/dist/KeyboardInputV1.js":
/*!*********************************************!*\
  !*** ../2-pixi-lib/dist/KeyboardInputV1.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KeyboardInputV1 = void 0;
class KeyboardInputV1 {
    constructor(debugMode = false) {
        this.keys = new Set();
        this.debugMode = debugMode;
        this.initListeners();
    }
    initListeners() {
        const keydownListener = (event) => {
            this.keys.add(event.key);
            if (!this.debugMode)
                return;
            console.log('Key Pressed:', event.key);
        };
        const keyupListener = (event) => {
            this.keys.delete(event.key);
        };
        window.addEventListener('keydown', keydownListener);
        window.addEventListener('keyup', keyupListener);
        window.addEventListener('beforeunload', () => {
            window.removeEventListener('keydown', keydownListener);
            window.removeEventListener('keyup', keyupListener);
        });
    }
    isKeyDown(key) {
        return this.keys.has(key);
    }
}
exports.KeyboardInputV1 = KeyboardInputV1;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const KeyboardInputV1_js_1 = __webpack_require__(/*! ./../../2-pixi-lib/dist/KeyboardInputV1.js */ "../2-pixi-lib/dist/KeyboardInputV1.js");
new KeyboardInputV1_js_1.KeyboardInputV1(true);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7Ozs7Ozs7VUM5QnZCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsNkJBQTZCLG1CQUFPLENBQUMseUZBQTRDO0FBQ2pGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vMTAta2V5Ym9hcmQvLi4vMi1waXhpLWxpYi9kaXN0L0tleWJvYXJkSW5wdXRWMS5qcyIsIndlYnBhY2s6Ly8xMC1rZXlib2FyZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8xMC1rZXlib2FyZC8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuS2V5Ym9hcmRJbnB1dFYxID0gdm9pZCAwO1xuY2xhc3MgS2V5Ym9hcmRJbnB1dFYxIHtcbiAgICBjb25zdHJ1Y3RvcihkZWJ1Z01vZGUgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLmtleXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuZGVidWdNb2RlID0gZGVidWdNb2RlO1xuICAgICAgICB0aGlzLmluaXRMaXN0ZW5lcnMoKTtcbiAgICB9XG4gICAgaW5pdExpc3RlbmVycygpIHtcbiAgICAgICAgY29uc3Qga2V5ZG93bkxpc3RlbmVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmtleXMuYWRkKGV2ZW50LmtleSk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGVidWdNb2RlKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdLZXkgUHJlc3NlZDonLCBldmVudC5rZXkpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBrZXl1cExpc3RlbmVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmtleXMuZGVsZXRlKGV2ZW50LmtleSk7XG4gICAgICAgIH07XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5ZG93bkxpc3RlbmVyKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywga2V5dXBMaXN0ZW5lcik7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWRvd25MaXN0ZW5lcik7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBrZXl1cExpc3RlbmVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlzS2V5RG93bihrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5cy5oYXMoa2V5KTtcbiAgICB9XG59XG5leHBvcnRzLktleWJvYXJkSW5wdXRWMSA9IEtleWJvYXJkSW5wdXRWMTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEtleWJvYXJkSW5wdXRWMV9qc18xID0gcmVxdWlyZShcIi4vLi4vLi4vMi1waXhpLWxpYi9kaXN0L0tleWJvYXJkSW5wdXRWMS5qc1wiKTtcbm5ldyBLZXlib2FyZElucHV0VjFfanNfMS5LZXlib2FyZElucHV0VjEodHJ1ZSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=