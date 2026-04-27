const { execSync } = require('child_process');
const fs = require('fs-extra');

async function measure() {
    console.log("⏱️ 시스템 엔진별 성능 측정 시작...");
    const engines = [
        { name: "System C", cmd: "node system_c_advanced.js" },
        { name: "System E", cmd: "node system_e_financial.js" },
        { name: "System G", cmd: "node system_g_personnel.js" },
        { name: "System H", cmd: "node system_h_security.js" },
        { name: "System F", cmd: "node system_f_drafter.js" }
    ];

    const metrics = {
        date: new Date().toISOString(),
        results: []
    };

    engines.forEach(engine => {
        const start = Date.now();
        try {
            execSync(engine.cmd, { stdio: 'ignore' });
            const duration = Date.now() - start;
            console.log(`- ${engine.name}: ${duration}ms`);
            metrics.results.push({ name: engine.name, durationMs: duration, status: "Success" });
        } catch (e) {
            metrics.results.push({ name: engine.name, status: "Failed", error: e.message });
        }
    });

    fs.writeJsonSync('GeneralAffairs_Master/06_Archives/performance_metrics.json', metrics, { spaces: 2 });
    console.log("✅ 성능 측정 완료 및 아카이브 저장.");
}

measure();
