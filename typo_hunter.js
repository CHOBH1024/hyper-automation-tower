const fs = require('fs-extra');

async function huntTypos() {
    console.log("🏹 데이터 오타 사냥(Typo Hunter)을 시작합니다...");
    const map = fs.readJsonSync('GeneralAffairs_Master/church_diocese_map.json');
    const validDioceses = ["Seoul", "Incheon", "Gyeonggi_North", "Gyeonggi_South", "Gangwon", "Chungbuk", "Chungnam", "Jeonbuk", "Jeonnam", "Gyeongbuk", "Gyeongnam", "Jeju", "Daegu", "Busan"];
    
    let issueCount = 0;

    Object.entries(map).forEach(([diocese, churches]) => {
        // 1. 교구명 검증
        if (!validDioceses.includes(diocese)) {
            console.warn(`🚨 알 수 없는 교구명 감지: ${diocese}`);
            issueCount++;
        }

        // 2. 교회명 규칙 검증
        churches.forEach(church => {
            if (!church.startsWith(diocese)) {
                console.warn(`🚨 교구-교회 불일치 감지: ${diocese} 산하에 ${church}가 있음.`);
                issueCount++;
            }
            if (!church.includes('_Church_')) {
                console.warn(`🚨 규칙 위반 명칭 감지: ${church}`);
                issueCount++;
            }
        });
    });

    if (issueCount === 0) {
        console.log("✅ 모든 데이터 명칭이 표준 규칙을 준수하고 있습니다.");
    } else {
        console.log(`⚠️ 총 ${issueCount}건의 데이터 정합성 이슈가 발견되었습니다.`);
    }
}

huntTypos();
