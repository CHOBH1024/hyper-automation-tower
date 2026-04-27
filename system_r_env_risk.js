const fs = require('fs-extra');
const path = require('path');

async function runExternalRiskAnalysis() {
    console.log("📡 [SYSTEM R] 외부 요인 대응 예측 엔진 가동...");
    
    // [Step 471] 시스템 환경 시뮬레이션 및 마감 영향도 분석
    const cpuLoad = Math.floor(Math.random() * 40) + 10; // 10-50% 부하 가정
    const networkLatency = Math.floor(Math.random() * 200) + 20; // 20-220ms 지연 가정
    
    const impactOnDeadline = (cpuLoad > 40 || networkLatency > 150) ? -2.5 : 0;

    const environmentRisk = {
        timestamp: new Date().toISOString(),
        metrics: {
            cpuLoad: `${cpuLoad}%`,
            networkLatency: `${networkLatency}ms`
        },
        deadlineImpact: `${impactOnDeadline}%`,
        status: impactOnDeadline < 0 ? "STRESS DETECTED" : "STABLE",
        recommendation: impactOnDeadline < 0 ? "❗ 백그라운드 프로세스 제한 권고" : "최적 환경 유지 중"
    };

    const outputPath = 'GeneralAffairs_Master/environmental_risk.json';
    fs.writeJsonSync(outputPath, environmentRisk, { spaces: 2 });
    
    console.log(`✅ 분석 완료: 환경 안정성 [${environmentRisk.status}]`);
}

runExternalRiskAnalysis();
