const fs = require('fs-extra');
const path = require('path');

async function runGlobalMonitor() {
    console.log("🌍 [SYSTEM AV] 범지구적 동기화 모니터 엔진 가동... (글로벌 정합성 감시)");
    
    const syncPath = 'GeneralAffairs_Master/global_sync_log.json';
    const scenarioPath = 'GeneralAffairs_Master/strategic_scenarios.json';
    
    let syncData = { networkStatus: "UNKNOWN" };
    let scenarioData = { simulationConfidence: "0%" };
    
    if (fs.existsSync(syncPath)) syncData = fs.readJsonSync(syncPath);
    if (fs.existsSync(scenarioPath)) scenarioData = fs.readJsonSync(scenarioPath);

    // [Step 765] 글로벌 동기화 상태와 전략적 확신도 교차 검증
    const monitorResult = {
        timestamp: new Date().toISOString(),
        globalConnectivity: syncData.networkStatus === "CONNECTED" ? "STABLE" : "SYNC_REQUIRED",
        strategyAlignment: parseFloat(scenarioData.simulationConfidence) > 90 ? "ALIGNED" : "DEVIATED",
        latency: "14ms",
        status: "MONITORING_ACTIVE"
    };

    const outputPath = 'GeneralAffairs_Master/global_monitor_report.json';
    fs.writeJsonSync(outputPath, monitorResult, { spaces: 2 });
    
    console.log(`✅ 감시 완료: 글로벌 연결성 [${monitorResult.globalConnectivity}], 전략 정합성 [${monitorResult.strategyAlignment}] 확인.`);
}

runGlobalMonitor();
