const fs = require('fs');
const { PinataSDK } = require("pinata");
const { Blob } = require("buffer");

require("dotenv").config();

const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: process.env.PINATA_GATEWAY_URL
});

const GROUP_ID = process.env.GROUP_ID

const loadDir = async () => {
    try {
        const dir = fs.readdirSync("./scripts/upload");
        console.log(dir);
        return dir;
    } catch (error) {
        console.error("Error reading directory:", error);
        throw error;
    }
};

const processFile = async (file) => {
    try {
        if (file.includes(".md") || file.includes(".txt")) {
            const blob = new Blob([fs.readFileSync(`./scripts/upload/${file}`)]);
            const fileData = new File([blob], file, { type: "text/plain" });
            await pinata.upload.file(fileData).group(GROUP_ID).vectorize();
            console.log("Vectorized file name:", file);
            fs.unlinkSync(`./scripts/upload/${file}`)
        }
    } catch (error) {
        console.error(`Error processing file ${file}:`, error);
        process.exit(1)
    }
};

(async () => {
    try {
        const pLimit = await import('p-limit').then(mod => mod.default);
        const files = await loadDir();
        const limit = pLimit(20);
        const fileProcessingPromises = files.map((file) => limit(() => processFile(file))); 
        await Promise.all(fileProcessingPromises);
        console.log("All files processed successfully.");
    } catch (error) {
        console.error("Error in main process:", error);
        process.exit(1);
    }
})();
