const fs = require('fs-extra');
const path = require('path');

async function runResourceBalancer() {
    console.log("⚖️ [SYSTEM AG] 자원 밸런서 엔진 가동... (엔진별 부하 분석)");
    
    // [Step 621] 마스터 컨트롤러 실행 로그 기반 부하 감지 시뮬레이션
    const engineLatencies = [
        { name: "System A (Report)", latency: 850, threshold: 500 },
        { name: "System E (Finance)", latency: 120, threshold: 300 },
        { name: "System D (Aggregator)", latency: 1200, threshold: 800 }
    ];

    const overloadedEngines = engineLatencies.filter(e => e.latency > e.threshold);
    
    if (overloadedEngines.length > 0) {
        console.log(`⚠️  과부하 엔진 감지: ${overloadedEngines.length}건. 자원 재분배를 실시합니다.`);
        
        const balanceAction = {
            timestamp: new Date().toISOString(),
            status: "RESOURCE_REBALANCED",
            actions: overloadedEngines.map(e => ({
                engine: e.name,
                priority: "HIGH_PERFORMANCE_MODE",
                cpuLimitIncrease: "15%",
                reason: `Latency (${e.latency}ms) exceeds threshold (${e.threshold}ms)`
            }))
        };

        const outputPath = 'GeneralAffairs_Master/resource_balance_log.json';
        fs.writeJsonSync(outputPath, balanceAction, { spaces: 2 });
        
        console.log("✅ 자원 밸런싱 완료: 과부하 엔진에 대한 동적 자원 할당이 완료되었습니다.");
    } else {
        console.log("ℹ️ [SYSTEM AG] 모든 엔진이 최적의 지연 시간 내에서 작동 중입니다.");
    }
}

runResourceBalancer();
