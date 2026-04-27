const fs = require('fs-extra');
const path = require('path');

async function runSessionOptimizer() {
    console.log("🧠 [SYSTEM AM] 세션 최적화 엔진 가동... (장기 기억 재구성)");
    
    const memoryPath = 'GeneralAffairs_Master/long_term_memory.json';
    if (!fs.existsSync(memoryPath)) return;

    const memoryData = fs.readJsonSync(memoryPath);
    
    // [Step 681] history 배열 기반 최적화
    if (memoryData.history && Array.isArray(memoryData.history)) {
        memoryData.history = memoryData.history.map(session => {
            // 각 세션 내의 insights 중요도 산출 및 정렬
            session.insights = session.insights.map(insight => {
                let weight = 0;
                if (insight.priority === "MASTER") weight += 50;
                if (insight.priority === "CRITICAL") weight += 30;
                if (insight.priority === "HIGH") weight += 10;
                return { ...insight, weight };
            }).sort((a, b) => b.weight - a.weight);
            return session;
        });

        const optimizationReport = {
            timestamp: new Date().toISOString(),
            status: "MEMORY_HIERARCHY_OPTIMIZED",
            totalSessions: memoryData.history.length,
            message: "중요 우선순위(MASTER, CRITICAL) 지식의 인출 경로 최적화 완료."
        };

        const outputPath = 'GeneralAffairs_Master/memory_optimization_log.json';
        fs.writeJsonSync(outputPath, optimizationReport, { spaces: 2 });
        fs.writeJsonSync(memoryPath, memoryData, { spaces: 2 });
        
        console.log(`✅ 최적화 완료: 기억 계층 구조 [${optimizationReport.status}] 도출 완료.`);
    }
}

runSessionOptimizer();
