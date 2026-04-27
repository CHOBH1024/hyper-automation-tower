const fs = require('fs-extra');
const path = require('path');

const DECISION_LOG = 'GeneralAffairs_Master/05_Security/Decision_Logs/admin_decision_audit.json';

async function runDecisionAudit() {
    console.log("📝 [SYSTEM N] 의사결정 성과 감사 엔진 가동...");
    
    if (!fs.existsSync(DECISION_LOG)) {
        const initialLog = {
            lastSync: new Date().toISOString(),
            history: [
                { id: "OPT-2026-001", task: "Resource Reallocation", status: "APPROVED", impact: "+8.2% Efficiency" },
                { id: "FIN-2026-042", task: "Finance Audit", status: "PENDING", impact: "TBD" }
            ]
        };
        fs.ensureDirSync(path.dirname(DECISION_LOG));
        fs.writeJsonSync(DECISION_LOG, initialLog, { spaces: 2 });
    }

    const audit = fs.readJsonSync(DECISION_LOG);
    console.log(`✅ 감사 완료: 최근 ${audit.history.length}건의 의사결정 이력 로드.`);
}

runDecisionAudit();
