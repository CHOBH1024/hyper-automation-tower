const fs = require('fs-extra');
const path = require('path');

async function runAnomalyPredictor() {
    console.log("📈 [SYSTEM AK] 이상 징후 예측 엔진 가동... (통계적 아웃라이어 분석)");
    
    const archivePath = 'GeneralAffairs_Master/master_archive.json';
    if (!fs.existsSync(archivePath)) return;

    const archiveData = fs.readJsonSync(archivePath);
    
    // [Step 661] 아카이브 데이터 기반 통계적 이상 징후 포착 시뮬레이션
    const metrics = archiveData.map(entry => entry.intelligence_grade_score || 0);
    const avg = metrics.reduce((a, b) => a + b, 0) / metrics.length;
    const stdDev = Math.sqrt(metrics.map(x => Math.pow(x - avg, 2)).reduce((a, b) => a + b, 0) / metrics.length);
    
    const outliers = archiveData.filter(entry => {
        const score = entry.intelligence_grade_score || 0;
        return Math.abs(score - avg) > stdDev * 2; // 2표준편차 이상 벗어난 경우
    });

    const anomalyReport = {
        timestamp: new Date().toISOString(),
        status: outliers.length > 0 ? "ANOMALIES_DETECTED" : "NORMAL",
        anomalyCount: outliers.length,
        details: outliers.map(o => ({
            id: o.session_id,
            score: o.intelligence_grade_score,
            deviation: ((o.intelligence_grade_score - avg) / stdDev).toFixed(2) + " sigma"
        })),
        prediction: outliers.length > 0 ? "추세 이탈 징후 포착됨. 행정 공정 정밀 재점검 필요." : "안정적 통계적 평형 유지 중."
    };

    const outputPath = 'GeneralAffairs_Master/anomaly_prediction_report.json';
    fs.writeJsonSync(outputPath, anomalyReport, { spaces: 2 });
    
    console.log(`✅ 분석 완료: 이상 징후 상태 [${anomalyReport.status}] 도출 및 보고서 산출 완료.`);
}

runAnomalyPredictor();
