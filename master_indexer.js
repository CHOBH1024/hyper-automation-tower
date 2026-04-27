const fs = require('fs-extra');
const path = require('path');

async function createMasterIndex() {
    console.log("🔗 전사적 데이터 통합 인덱싱 시작...");
    
    const paths = {
        finance: 'GeneralAffairs_Master/03_Finance/finance_summary.json',
        personnel: 'GeneralAffairs_Master/04_Personnel/weekly_personnel_check.json',
        security: 'GeneralAffairs_Master/05_Security/Access_Logs/security_audit_log.json'
    };

    const masterData = {
        timestamp: new Date().toISOString(),
        summary: {}
    };

    try {
        if (fs.existsSync(paths.finance)) {
            const f = fs.readJsonSync(paths.finance);
            masterData.summary.finance = { totalIncome: f.totalIncome, balance: f.balance, status: "Active" };
        }
        if (fs.existsSync(paths.personnel)) {
            const p = fs.readJsonSync(paths.personnel);
            masterData.summary.personnel = { submitted: p.submittedCount, missing: p.missingCount, rate: ((p.submittedCount/p.totalChurches)*100).toFixed(1) + "%" };
        }
        if (fs.existsSync(paths.security)) {
            const s = fs.readJsonSync(paths.security);
            masterData.summary.security = { issuesDetected: s.issuesFound, lastAudit: s.auditDate };
        }

        fs.writeJsonSync('GeneralAffairs_Master/master_index.json', masterData, { spaces: 2 });
        console.log("✅ 전사적 통합 인덱스(master_index.json) 생성 완료.");
    } catch (e) {
        console.error("🚨 인덱싱 실패:", e.message);
    }
}

createMasterIndex();
