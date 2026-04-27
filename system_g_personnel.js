const fs = require('fs-extra');
const path = require('path');

async function managePersonnel(inputZone, masterMapPath) {
    console.log("[시스템 G] 인사 관리 엔진 정밀 분석 가동...");
    
    let masterMap, dbWrapper;
    try {
        masterMap = fs.readJsonSync(masterMapPath);
        dbWrapper = fs.readJsonSync('GeneralAffairs_Master/04_Personnel/leaders_db.json');
    } catch (e) {
        console.error("⚠️ 데이터 로드 실패:", e.message);
        return;
    }

    const leadersDB = dbWrapper.leaders || [];
    const submittedFiles = fs.readdirSync(inputZone);
    const missingChurches = leadersDB.filter(item => 
        !submittedFiles.some(file => file.includes(item.church))
    );

    const report = {
        timestamp: new Date().toISOString(),
        totalChurches: leadersDB.length,
        submittedCount: leadersDB.length - missingChurches.length,
        missingCount: missingChurches.length,
        missingDetails: missingChurches.slice(0, 20)
    };

    const outputPath = 'GeneralAffairs_Master/04_Personnel/weekly_personnel_check.json';
    await fs.ensureDir(path.dirname(outputPath));
    await fs.writeJson(outputPath, report, { spaces: 2 });
    console.log(`✅ 인사 분석 완료. 미제출: ${missingChurches.length}개 교회.`);
}

async function findLeader(query) {
    if (!query) return console.log("⚠️ 검색어를 입력하세요.");
    const dbWrapper = await fs.readJson('GeneralAffairs_Master/04_Personnel/leaders_db.json');
    const leadersDB = dbWrapper.leaders || [];
    const results = leadersDB.filter(item => 
        item.church.toLowerCase().includes(query.toLowerCase()) || 
        item.leader.toLowerCase().includes(query.toLowerCase())
    );
    console.log(`🔍 [검색 결과] '${query}' 검색 시 ${results.length}건 발견:`);
    results.forEach(r => console.log(`- ${r.church} (${r.leader}): ${r.contact}`));
}

if (process.argv[2] === '--search') {
    findLeader(process.argv[3]);
} else {
    managePersonnel('input_zone', 'GeneralAffairs_Master/church_diocese_map.json');
}