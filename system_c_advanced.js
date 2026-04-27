const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');

class AutoOrganizer {
    constructor(watchDir, outputDir) {
        this.watchDir = watchDir;
        this.outputDir = outputDir;
        fs.ensureDirSync(watchDir);
        fs.ensureDirSync(outputDir);
    }

    async analyzeAndOrganize() {
        console.log("[시스템 C] 자율 정리 및 이미지 최적화 엔진 가동...");
        const files = fs.readdirSync(this.watchDir);
        const map = fs.readJsonSync('GeneralAffairs_Master/church_diocese_map.json');
        
        for (const file of files) {
            const filePath = path.join(this.watchDir, file);
            if (fs.lstatSync(filePath).isDirectory()) continue;

            let targetDiocese = "Other";
            for (const [diocese, churches] of Object.entries(map)) {
                if (churches.some(c => file.includes(c))) {
                    targetDiocese = diocese;
                    break;
                }
            }

            const ext = path.extname(file).toLowerCase();
            const isImage = ['.jpg', '.jpeg', '.png'].includes(ext);
            const destDir = path.join(this.outputDir, targetDiocese, isImage ? "2026_Photos" : "2026_Reports");
            await fs.ensureDir(destDir);

            if (isImage) {
                const webpName = path.basename(file, ext) + ".webp";
                await sharp(filePath)
                    .resize(1280)
                    .webp({ quality: 80 })
                    .toFile(path.join(destDir, webpName));
                await fs.remove(filePath);
                console.log(`📸 [이미지] '${file}' -> '${webpName}' 최적화 및 분류 완료.`);
            } else {
                await fs.move(filePath, path.join(destDir, file), { overwrite: true });
                console.log(`📄 [문서] '${file}' 분류 완료.`);
            }
        }
        console.log("✅ 자율 정리 및 최적화 완료.");
    }
}

const organizer = new AutoOrganizer("input_zone", "GeneralAffairs_Master/01_Dioceses");
organizer.analyzeAndOrganize();
