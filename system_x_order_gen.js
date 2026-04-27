const fs = require('fs-extra');
const path = require('path');

async function runOrderGeneration() {
    console.log("📜 [SYSTEM X] 행정 명령 생성 엔진 가동...");
    
    const riskPath = 'GeneralAffairs_Master/04_Personnel/submission_risk_report.json';
    if (!fs.existsSync(riskPath)) return;

    const riskData = fs.readJsonSync(riskPath);
    const criticalRisks = riskData.risks.filter(r => r.riskScore > 85);

    if (criticalRisks.length === 0) {
        console.log("ℹ️ [SYSTEM X] 현재 행정 명령 발령 수준의 임계 리스크가 존재하지 않습니다.");
        return;
    }

    const orderResults = criticalRisks.map(r => {
        const orderId = `ORDER-${Date.now()}-${r.diocese}`;
        const content = `
[신한국 총무국 행정 명령 제 2026-${Math.floor(Math.random()*1000)}호]
수신: ${r.diocese} 교구장 ${r.leader}
제목: 행정 지표 미달에 따른 긴급 정상화 명령

Antigravity AI 분석 결과, 귀 교구의 행정 지표(점수: ${r.riskScore})가 심각한 위기 수준으로 감지되었습니다.
이에 총무국은 본 명령을 통해 24시간 이내에 미비된 행정 보고를 완결할 것을 명합니다.
미이행 시 차주 자원 배정에서 후순위로 조정될 수 있음을 고지합니다.

발령 일시: ${new Date().toLocaleString()}
신한국 총무국 하이퍼 자동화 시스템 (Antigravity)
        `;
        
        const orderPath = `GeneralAffairs_Master/06_Orders/${orderId}.txt`;
        fs.ensureDirSync('GeneralAffairs_Master/06_Orders');
        fs.writeFileSync(orderPath, content);
        
        return { orderId, target: r.leader, diocese: r.diocese, path: orderPath };
    });

    const logPath = 'GeneralAffairs_Master/administrative_orders_log.json';
    fs.writeJsonSync(logPath, { lastRun: new Date().toISOString(), orders: orderResults }, { spaces: 2 });
    
    console.log(`✅ 명령 발령 완료: ${orderResults.length}건의 행정 명령서가 자율 생성되었습니다.`);
}

runOrderGeneration();
