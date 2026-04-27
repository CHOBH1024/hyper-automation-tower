const fs = require('fs-extra');
const path = require('path');

async function runDecisionSupport() {
    console.log("🧠 [SYSTEM L] 의사결정 지원 엔진 가동...");
    
    const financePath = 'GeneralAffairs_Master/03_Finance/prediction_report.json';
    const personnelPath = 'GeneralAffairs_Master/04_Personnel/submission_risk_report.json';
    const securityPath = 'GeneralAffairs_Master/05_Security/threat_prediction.json';
    const optPath = 'GeneralAffairs_Master/optimization_plan.json';

    const recommendations = [];

    // 1. 재무 권고
    if (fs.existsSync(financePath)) {
        const data = fs.readJsonSync(financePath);
        if (data.status === "⚠️ CAUTION") {
            recommendations.push({ priority: "HIGH", task: "재무 이상 징후 정밀 감사", reason: data.insight });
        }
    }

    // 2. 인사 권고
    if (fs.existsSync(personnelPath)) {
        const data = fs.readJsonSync(personnelPath);
        const highRisks = data.risks.filter(r => r.status === "HIGH RISK");
        if (highRisks.length > 0) {
            recommendations.push({ priority: "MEDIUM", task: `고위험 교구(${highRisks.length}곳) 집중 독려`, reason: "제출 지연 가능성 매우 높음" });
        }
    }

    // 3. 보안 권고
    if (fs.existsSync(securityPath)) {
        const data = fs.readJsonSync(securityPath);
        if (data.threatLevel === "CRITICAL") {
            recommendations.push({ priority: "CRITICAL", task: "비정상 접근 IP 차단 및 보안 강화", reason: data.actionRequired });
        }
    }

    // [Step 441] 4. 자원 최적화 권고 통합
    if (fs.existsSync(optPath)) {
        const data = fs.readJsonSync(optPath);
        recommendations.push({ 
            priority: "HIGH", 
            task: "예측 기반 자원 재배정 집행", 
            reason: `${data.reallocationPlan.budget} 예산 및 ${data.reallocationPlan.personnel} 전략`
        });
    }

    const report = {
        timestamp: new Date().toISOString(),
        topPriorities: recommendations.sort((a, b) => {
            const p = { "CRITICAL": 3, "HIGH": 2, "MEDIUM": 1 };
            return p[b.priority] - p[a.priority];
        }),
        summary: "예측 엔진 종합 분석 결과, 위 3가지 항목에 대한 즉각적인 의사결정이 필요합니다."
    };

    const outputPath = 'GeneralAffairs_Master/master_decisions.json';
    fs.writeJsonSync(outputPath, report, { spaces: 2 });
    
    console.log(`✅ 분석 완료: ${report.topPriorities.length}개의 핵심 의사결정 과제 식별.`);
}

runDecisionSupport();
