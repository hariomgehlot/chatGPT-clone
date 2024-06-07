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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const app = (0, express_1.default)();
console.log(process.env._API_KEY);
app.use(express_1.default.json());
app.post('/api/chat', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const { message } = req.body;
    const groq = new groq_sdk_1.default({ apiKey: process.env.GROQ_API_KEY });
    console.log('message:-', message);
    const stream = yield groq.chat.completions.create({
        messages: [
            {
                role: 'user',
                content: message,
            },
            {
                role: 'system',
                content: 'you are an helpful assistant.',
            },
        ],
        stream: true,
        model: 'llama3-8b-8192',
    });
    try {
        for (var _d = true, stream_1 = __asyncValues(stream), stream_1_1; stream_1_1 = yield stream_1.next(), _a = stream_1_1.done, !_a; _d = true) {
            _c = stream_1_1.value;
            _d = false;
            const part = _c;
            const reason = part.choices[0].finish_reason;
            if (reason === 'stop') {
                break;
            }
            const chunk = part.choices[0].delta.content;
            res.write(chunk); //Write each chunk to the open stream
            console.log('chunk->', chunk);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = stream_1.return)) yield _b.call(stream_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    res.end(); //Close the connection once the streaming is done
}));
app.listen(5000, () => {
    console.log('Server is listening on port 5000');
});
