const fs = require('fs-extra');
const path = require('path');

async function runDiagnostics() {
    console.log("🔍 [SYSTEM DIAGNOSTICS] 자가 건강 검진 시작...");
    const results = [];

    const criticalPaths = [
        'GeneralAffairs_Master/master_index.json',
        'GeneralAffairs_Master/03_Finance/finance_summary.json',
        'GeneralAffairs_Master/04_Personnel/leaders_db.json',
        'GeneralAffairs_Master/05_Security/Access_Logs/security_audit_log.json'
    ];

    criticalPaths.forEach(p => {
        const exists = fs.existsSync(p);
        results.push({ path: p, status: exists ? "PASS" : "FAIL" });
        console.log(`${exists ? "✅" : "❌"} ${p}: ${exists ? "Found" : "MISSING"}`);
    });

    const engines = [
        'master_controller.js', 'system_a_report.js', 'system_b_dashboard.html',
        'system_c_advanced.js', 'system_d_pdf_aggregator.js', 'system_e_financial.js',
        'system_f_drafter.js', 'system_g_personnel.js', 'system_h_security.js'
    ];

    engines.forEach(e => {
        const exists = fs.existsSync(e);
        results.push({ engine: e, status: exists ? "PASS" : "FAIL" });
        console.log(`${exists ? "✅" : "❌"} Engine ${e}: ${exists ? "Ready" : "OFFLINE"}`);
    });

    const failCount = results.filter(r => r.status === "FAIL").length;
    console.log(`\n📊 [REPORT] 총 ${results.length}개 항목 검사 완료. (결함: ${failCount}건)`);
    
    if (failCount === 0) {
        console.log("✨ 시스템 상태 최상(OPTIMAL): 즉시 가동 가능합니다.");
    } else {
        console.warn("⚠️ 시스템 결함 감지: 위 항목들을 복구해 주십시오.");
    }
}

runDiagnostics();
