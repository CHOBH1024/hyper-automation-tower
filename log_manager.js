const fs = require('fs-extra');
const path = require('path');

/**
 * [Step 142] 안전한 로그 관리 엔진 (Safe Mode)
 * 소스 코드를 보호하기 위해 전용 logs/ 폴더만 처리합니다.
 */
async function safeLogCleanup(maxFiles = 10) {
    const logDir = path.join(__dirname, 'logs');
    await fs.ensureDir(logDir);
    
    console.log(`[안전 로그 관리] '${logDir}' 내부만 정리를 수행합니다.`);
    
    const files = fs.readdirSync(logDir)
        .map(file => ({
            name: file,
            time: fs.statSync(path.join(logDir, file)).mtime.getTime()
        }))
        .sort((a, b) => b.time - a.time);

    if (files.length > maxFiles) {
        const toDelete = files.slice(maxFiles);
        toDelete.forEach(f => {
            fs.removeSync(path.join(logDir, f.name));
            console.log(`- 로그 폐기 완료: ${f.name}`);
        });
    }
    console.log("✅ 안전 모드 로그 최적화 완료.");
}

safeLogCleanup();
