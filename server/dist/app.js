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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_route_1 = __importDefault(require("./src/routes/index.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
const PORT = 3000;
app.get("/", (req, res) => {
    res.send("<h1>Welcome To Task Management Application </h1>");
});
app.use("/api/v1", index_route_1.default);
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`🗄️  Server Fire on http://localhost:${PORT}`);
    try {
        yield mongoose_1.default.connect(process.env.DATABASE_URL);
        console.log("🛢️  Connected To Database");
    }
    catch (error) {
        console.log("⚠️ Error to connect Database");
    }
}));
