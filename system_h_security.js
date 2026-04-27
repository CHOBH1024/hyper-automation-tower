const fs = require('fs-extra');
const path = require('path');

async function auditAndMask(watchDir) {
    console.log("[시스템 H] 보안 감사 및 지능형 마스킹 엔진 가동...");
    
    if (!fs.existsSync(watchDir)) return;
    const files = fs.readdirSync(watchDir);
    const safeDir = 'GeneralAffairs_Master/05_Security/Safe_Reports';
    const logPath = 'GeneralAffairs_Master/05_Security/Access_Logs/security_audit_log.json';
    await fs.ensureDir(safeDir);
    await fs.ensureDir(path.dirname(logPath));

    const auditResults = [];

    files.forEach(file => {
        const filePath = path.join(watchDir, file);
        if (fs.lstatSync(filePath).isDirectory()) return;

        let content = fs.readFileSync(filePath, 'utf8');
        let isFlagged = false;
        
        // [Step 261/263] 지능형 멀티 패턴 마스킹 및 유형 분류
        const ssnPattern = /(\d{6})[\s-]?([1-4])\d{6}/g;
        const phonePattern = /(01[016789])[\s-]?(\d{3,4})[\s-]?(\d{4})/g;
        let threatTypes = [];

        if (ssnPattern.test(content)) {
            content = content.replace(ssnPattern, "$1-$2******");
            isFlagged = true;
            threatTypes.push("주민번호");
        }
        if (phonePattern.test(content)) {
            content = content.replace(phonePattern, "$1-****-$3");
            isFlagged = true;
            threatTypes.push("전화번호");
        }

        if (isFlagged) {
            fs.writeFileSync(path.join(safeDir, file), content);
            console.log(`🚨 [보안] '${file}' 마스킹 완료 (${threatTypes.join(', ')})`);
            auditResults.push({ file, timestamp: new Date().toISOString(), action: "Masked", types: threatTypes });
        }
    });

    await fs.writeJson(logPath, { auditDate: new Date().toISOString(), issuesFound: auditResults.length, details: auditResults }, { spaces: 2 });
    console.log(`✅ 보안 감사 로그 생성 완료. 감지된 이슈: ${auditResults.length}건.`);
}

auditAndMask('input_zone');