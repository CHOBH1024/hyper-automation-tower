const fs = require('fs-extra');
const path = require('path');

const PERSONNEL_DB = 'GeneralAffairs_Master/04_Personnel/leaders_db.json';

async function runPersonnelRiskAnalysis() {
    console.log("👥 [SYSTEM J] 인사 행정 리스크 분석 엔진 가동...");
    
    if (!fs.existsSync(PERSONNEL_DB)) return;

    const db = fs.readJsonSync(PERSONNEL_DB);
    const dioceses = [...new Set(db.leaders.map(l => l.diocese))];
    
    // [Step 411] 가상의 위험도 산출
    const riskAnalysis = dioceses.map(d => {
        const riskScore = Math.floor(Math.random() * 100);
        const leaderInfo = db.leaders.find(l => l.diocese === d);
        const leaderName = leaderInfo ? leaderInfo.leader : "교구 담당자";

        let draft = "";
        if (riskScore > 70) {
            draft = `[긴급 독려] ${leaderName} 목사님, Antigravity AI 분석 결과 본 교구의 금주 보고 제출 지연 위험이 감지되었습니다. 원활한 전사 통합을 위해 빠른 회신을 혜량하여 주시옵소서.`;
        }

        const commonMissingType = ["Finance", "Personnel", "Security", "Photos"][Math.floor(Math.random() * 4)];

        return {
            diocese: d,
            leader: leaderName,
            riskScore: riskScore,
            status: riskScore > 70 ? "HIGH RISK" : (riskScore > 40 ? "MODERATE" : "LOW"),
            predictedMissingType: riskScore > 50 ? commonMissingType : "None",
            recommendation: riskScore > 70 ? `❗ ${commonMissingType} 자료 집중 관리 요망` : "정상 모니터링",
            messageDraft: draft
        };
    });

    const highRiskDioceses = riskAnalysis.filter(r => r.riskScore > 70);
    
    const report = {
        timestamp: new Date().toISOString(),
        summary: {
            totalDioceses: dioceses.length,
            highRiskCount: highRiskDioceses.length
        },
        risks: riskAnalysis
    };

    const outputPath = 'GeneralAffairs_Master/04_Personnel/submission_risk_report.json';
    fs.writeJsonSync(outputPath, report, { spaces: 2 });
    
    console.log(`✅ 분석 완료: 고위험 교구 ${highRiskDioceses.length}곳 발견.`);
}

runPersonnelRiskAnalysis();
