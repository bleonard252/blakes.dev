"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var plugin_1 = require("@parcel/plugin");
var yaml_1 = require("yaml");
var ajv_1 = __importDefault(require("ajv"));
var theme_schema_json_1 = __importDefault(require("./theme-schema.json"));
var color_1 = __importDefault(require("color"));
var path_1 = __importDefault(require("path"));
var Validator = new ajv_1["default"]({ allowUnionTypes: true }).compile(theme_schema_json_1["default"]);
var DEFAULT_THEME = "nimbus-auto";
exports["default"] = new plugin_1.Transformer({
    transform: function (_a) {
        var asset = _a.asset, logger = _a.logger;
        return __awaiter(this, void 0, void 0, function () {
            var themes, code, files, _i, files_1, file, _code, _theme, theme, rgb, light, dark, auto, themeId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // logger.warn({
                        //   message: `Type: ${asset.type}; Path: ${asset.filePath}`,
                        // });
                        if (!asset.filePath.endsWith("styles/themes.txt"))
                            return [2 /*return*/, [asset]];
                        themes = {};
                        code = "";
                        return [4 /*yield*/, asset.fs.readdir(path_1["default"].join(asset.filePath, "../theme/"))];
                    case 1:
                        files = _b.sent();
                        _i = 0, files_1 = files;
                        _b.label = 2;
                    case 2:
                        if (!(_i < files_1.length)) return [3 /*break*/, 6];
                        file = files_1[_i];
                        if (!file || !file.endsWith(".yaml"))
                            return [3 /*break*/, 5];
                        return [4 /*yield*/, asset.fs.readFile(path_1["default"].join(asset.filePath, "../theme/", file))];
                    case 3: return [4 /*yield*/, (_b.sent()).toString("utf8")];
                    case 4:
                        _code = _b.sent();
                        _theme = (0, yaml_1.parseDocument)(_code).toJSON();
                        if (!Validator(_theme)) {
                            throw Validator.errors[0];
                        }
                        theme = _theme;
                        rgb = function (color) { return (0, color_1["default"])(color).rgb().array(); };
                        light = "& {\n        --scheme-1: ".concat(rgb(theme.scheme_light["1"]).join(" "), ";\n        --scheme-2: ").concat(rgb(theme.scheme_light["2"]).join(" "), ";\n        --scheme-3: ").concat(rgb(theme.scheme_light["3"]).join(" "), ";\n        --scheme-4: ").concat(rgb(theme.scheme_light["4"]).join(" "), ";\n        --scheme-5: ").concat(rgb(theme.scheme_light["5"]).join(" "), ";\n        --primary-1: ").concat(rgb(theme.primary["1"]).join(" "), ";\n        --primary-2: ").concat(rgb(theme.primary["2"]).join(" "), ";\n        --primary-3: ").concat(rgb(theme.primary["3"]).join(" "), ";\n        --primary-4: ").concat(rgb(theme.primary["4"]).join(" "), ";\n        --primary-5: ").concat(rgb(theme.primary["5"]).join(" "), ";\n        --onprimary-1: ").concat(rgb(theme.onprimary["1"]).join(" "), ";\n        --onprimary-2: ").concat(rgb(theme.onprimary["2"]).join(" "), ";\n        --onprimary-3: ").concat(rgb(theme.onprimary["3"]).join(" "), ";\n        --onprimary-4: ").concat(rgb(theme.onprimary["4"]).join(" "), ";\n        --onprimary-5: ").concat(rgb(theme.onprimary["5"]).join(" "), ";\n        --onscheme-1: ").concat(rgb(theme.onscheme_light["1"]).join(" "), ";\n        --onscheme-2: ").concat(rgb(theme.onscheme_light["2"]).join(" "), ";\n        --onscheme-3: ").concat(rgb(theme.onscheme_light["3"]).join(" "), ";\n        --onscheme-4: ").concat(rgb(theme.onscheme_light["4"]).join(" "), ";\n        --onscheme-5: ").concat(rgb(theme.onscheme_light["5"]).join(" "), ";\n      }\n\n      ").concat(theme.extra_postcss || "", "\n      ").concat(theme.extra_postcss_light || "", "\n      .X-Hide-Dark {\n        @apply inline h-4 w-4;\n      }");
                        dark = theme.onscheme_dark
                            ? "& {\n        --scheme-1: ".concat(rgb(theme.scheme_dark["1"]).join(" "), ";\n        --scheme-2: ").concat(rgb(theme.scheme_dark["2"]).join(" "), ";\n        --scheme-3: ").concat(rgb(theme.scheme_dark["3"]).join(" "), ";\n        --scheme-4: ").concat(rgb(theme.scheme_dark["4"]).join(" "), ";\n        --scheme-5: ").concat(rgb(theme.scheme_dark["5"]).join(" "), ";\n        --primary-1: ").concat(rgb(theme.primary["1"]).join(" "), ";\n        --primary-2: ").concat(rgb(theme.primary["2"]).join(" "), ";\n        --primary-3: ").concat(rgb(theme.primary["3"]).join(" "), ";\n        --primary-4: ").concat(rgb(theme.primary["4"]).join(" "), ";\n        --primary-5: ").concat(rgb(theme.primary["5"]).join(" "), ";\n        --onprimary-1: ").concat(rgb(theme.onprimary["1"]).join(" "), ";\n        --onprimary-2: ").concat(rgb(theme.onprimary["2"]).join(" "), ";\n        --onprimary-3: ").concat(rgb(theme.onprimary["3"]).join(" "), ";\n        --onprimary-4: ").concat(rgb(theme.onprimary["4"]).join(" "), ";\n        --onprimary-5: ").concat(rgb(theme.onprimary["5"]).join(" "), ";\n        --onscheme-1: ").concat(rgb(theme.onscheme_dark["1"]).join(" "), ";\n        --onscheme-2: ").concat(rgb(theme.onscheme_dark["2"]).join(" "), ";\n        --onscheme-3: ").concat(rgb(theme.onscheme_dark["3"]).join(" "), ";\n        --onscheme-4: ").concat(rgb(theme.onscheme_dark["4"]).join(" "), ";\n        --onscheme-5: ").concat(rgb(theme.onscheme_dark["5"]).join(" "), ";\n      }\n\n      ").concat(theme.extra_postcss || "", "\n      ").concat(theme.extra_postcss_dark || "", "\n      .X-Hide-Light {\n        @apply inline h-4 w-4;\n      }")
                            : light;
                        auto = theme.onscheme_dark
                            ? "@media (prefers-color-scheme: dark) {\n        ".concat(dark, "\n      }\n      @media not (prefers-color-scheme: dark) {\n        ").concat(light, "\n      }")
                            : light;
                        themes[/^(.+)[.].+?$/.exec(file)[1]] = {
                            auto: auto,
                            light: light,
                            dark: dark
                        };
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 2];
                    case 6:
                        code += "\n";
                        for (themeId in themes) {
                            code += "\n      [data-theme=\"".concat(themeId, "-light\"] {\n        ").concat(themes[themeId].light, "\n      }\n      [data-theme=\"").concat(themeId, "-dark\"] {\n        ").concat(themes[themeId].dark, "\n      }\n      [data-theme=\"").concat(themeId, "-auto\"] {\n        ").concat(themes[themeId].auto, "\n      }");
                        }
                        asset.setCode(code);
                        asset.type = "pcss";
                        return [2 /*return*/, [asset]];
                }
            });
        });
    }
});
//# sourceMappingURL=index.js.map