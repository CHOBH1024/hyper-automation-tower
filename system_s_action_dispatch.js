const fs = require('fs-extra');
const path = require('path');

async function runActionDispatch() {
    console.log("🚀 [SYSTEM S] 지능형 액션 파견 엔진 가동...");
    
    const riskPath = 'GeneralAffairs_Master/04_Personnel/submission_risk_report.json';
    if (!fs.existsSync(riskPath)) return;

    const riskData = fs.readJsonSync(riskPath);
    const highRisks = riskData.risks.filter(r => r.status === "HIGH RISK");

    const dispatchResults = highRisks.map(r => {
        return {
            id: `DISPATCH-${Date.now()}-${r.diocese}`,
            target: r.leader,
            diocese: r.diocese,
            message: r.messageDraft,
            status: "SENT_SUCCESS",
            timestamp: new Date().toISOString()
        };
    });

    const outputPath = 'GeneralAffairs_Master/dispatch_log.json';
    fs.writeJsonSync(outputPath, { lastDispatch: new Date().toISOString(), results: dispatchResults }, { spaces: 2 });
    
    console.log(`✅ 파견 완료: ${dispatchResults.length}건의 긴급 독려 메시지가 가상 송출되었습니다.`);
}

runActionDispatch();
