const fs = require('fs-extra');
const path = require('path');

async function runSelfCorrection() {
    console.log("🛠️ [SYSTEM T] 자율 자가 교정 엔진 가동...");
    
    const financePath = 'GeneralAffairs_Master/03_Finance/finance_summary.json';
    if (!fs.existsSync(financePath)) return;

    const financeData = fs.readJsonSync(financePath);
    
    // [Step 491] 가상의 중복 데이터 삽입 및 교정 시뮬레이션
    let correctedCount = 0;
    const seen = new Set();
    const cleanDetails = financeData.details.filter(item => {
        const key = `${item.diocese}-${item.amount}`;
        if (seen.has(key)) {
            correctedCount++;
            return false;
        }
        seen.add(key);
        return true;
    });

    if (correctedCount > 0) {
        financeData.details = cleanDetails;
        financeData.lastCorrection = {
            timestamp: new Date().toISOString(),
            fixedIssues: correctedCount,
            type: "DUPLICATE_REMOVAL"
        };
        fs.writeJsonSync(financePath, financeData, { spaces: 2 });
    }

    const logPath = 'GeneralAffairs_Master/self_correction_log.json';
    fs.writeJsonSync(logPath, { lastRun: new Date().toISOString(), correctedCount }, { spaces: 2 });
    
    console.log(`✅ 교정 완료: ${correctedCount}건의 데이터 무결성 이슈가 자율 수정되었습니다.`);
}

runSelfCorrection();
