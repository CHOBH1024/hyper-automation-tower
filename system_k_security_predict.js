const fs = require('fs-extra');
const path = require('path');

const SECURITY_LOG = 'GeneralAffairs_Master/05_Security/Access_Logs/security_audit_log.json';

async function runSecurityPrediction() {
    console.log("🛡️ [SYSTEM K] 보안 위협 예측 엔진 가동...");
    
    if (!fs.existsSync(SECURITY_LOG)) return;

    const logs = fs.readJsonSync(SECURITY_LOG);
    
    // [Step 421] 접근 빈도 분석 기반 위험도 추론
    const accessCount = (logs.details && Array.isArray(logs.details)) ? logs.details.length : 0;
    const abnormalFrequency = accessCount > 50; // 기준값 50회 초과 시 주의

    const threatAnalysis = {
        timestamp: new Date().toISOString(),
        threatLevel: abnormalFrequency ? "CRITICAL" : "NORMAL",
        riskFactor: abnormalFrequency ? "Abnormal Access Frequency Detected" : "None",
        predictedTarget: "Personnel Database",
        actionRequired: abnormalFrequency ? "❗ 2단계 인증 강제 및 IP 차단 검토" : "정기 모니터링 유지"
    };

    const outputPath = 'GeneralAffairs_Master/05_Security/threat_prediction.json';
    fs.writeJsonSync(outputPath, threatAnalysis, { spaces: 2 });
    
    console.log(`✅ 보안 분석 완료: 위협 수준 [${threatAnalysis.threatLevel}]`);
}

runSecurityPrediction();
