const fs = require('fs-extra');
const path = require('path');

async function simulate() {
    const dbPath = 'GeneralAffairs_Master/04_Personnel/leaders_db.json';
    if (!fs.existsSync(dbPath)) return console.log("⚠️ DB가 없습니다.");

    const dbWrapper = fs.readJsonSync(dbPath);
    const leaders = dbWrapper.leaders || [];
    console.log(`📑 ${leaders.length}개 중 100개 교회의 가상 보고서를 생성합니다...`);

    for (let i = 0; i < 100; i++) {
        const item = leaders[i];
        if (!item) break;
        const fileName = `${item.church}_Weekly_Report.txt`;
        fs.writeFileSync(path.join('input_zone', fileName), `작성자: ${item.leader}\n내용: 주간 업무 보고 완료.`);
    }
    console.log("✅ 100개 보고서 생성 완료.");
}

simulate();
