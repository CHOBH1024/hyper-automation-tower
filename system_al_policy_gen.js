const fs = require('fs-extra');
const path = require('path');

async function runPolicyGenerator() {
    console.log("📜 [SYSTEM AL] 정책 생성 엔진 가동... (갈등 패턴 기반 규칙 설계)");
    
    const auditPath = 'GeneralAffairs_Master/policy_audit_report.json';
    const knowledgePath = 'GeneralAffairs_Master/master_knowledge.json';
    
    if (!fs.existsSync(auditPath) || !fs.existsSync(knowledgePath)) return;

    const auditData = fs.readJsonSync(auditPath);
    const knowledgeData = fs.readJsonSync(knowledgePath);
    
    // [Step 671] 갈등 패턴 분석 및 신규 정책 제안 시뮬레이션
    let newPolicyProposed = false;
    let proposedRule = null;

    if (auditData.conflictCount > 0 || auditData.status === "WARNING") {
        newPolicyProposed = true;
        proposedRule = {
            id: `RULE-AL-${Date.now()}`,
            title: "데이터 정합성 우선 순위 원칙",
            description: "인사 데이터와 재무 데이터 간의 갈등 발생 시, 마스터 인덱서의 최종 승인 데이터를 최상위 권위로 인정함.",
            origin: "System AL Autonomous Generation"
        };
    }

    const policyReport = {
        timestamp: new Date().toISOString(),
        status: newPolicyProposed ? "POLICY_PROPOSED" : "STABLE",
        newRule: proposedRule,
        reason: newPolicyProposed ? "지속적인 데이터 정합성 갈등 패턴 해결을 위한 신규 거버넌스 규칙 도출." : "현재 정책 체계 내 갈등 요인 미검출."
    };

    const outputPath = 'GeneralAffairs_Master/policy_generation_log.json';
    fs.writeJsonSync(outputPath, policyReport, { spaces: 2 });
    
    console.log(`✅ 설계 완료: 신규 정책 제안 상태 [${policyReport.status}] 도출 완료.`);
}

runPolicyGenerator();
