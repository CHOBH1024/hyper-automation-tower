const fs = require('fs-extra');
const path = require('path');

/**
 * 시스템 E: 지능형 재무 정산 엔진 (v2.5)
 * [Step 171] 집행률 이상 징후 감지 및 지능형 경보 시스템 탑재
 */
async function processFinancials(inputFolder, outputFolder) {
    console.log("[시스템 E] 재무 데이터 정밀 분석 및 주간 추세 추적 시작...");
    
    // 역사 데이터 로드 (Step 238)
    let history;
    try {
        const historyFiles = fs.readdirSync('GeneralAffairs_Master/06_Archives/Historical_Data').sort().reverse();
        if (historyFiles.length > 0) {
            history = fs.readJsonSync(path.join('GeneralAffairs_Master/06_Archives/Historical_Data', historyFiles[0]));
        }
    } catch (e) { console.log("ℹ️ 비교할 이전 데이터가 없습니다."); }
    
    let totalIncome = 0;
    let totalExpense = 0;
    const details = [];

    if (fs.existsSync(inputFolder)) {
        const files = fs.readdirSync(inputFolder).filter(f => f.endsWith('.csv'));
        files.forEach(file => {
            const content = fs.readFileSync(path.join(inputFolder, file), 'utf8');
            const lines = content.split('\n');
            lines.forEach((line, idx) => {
                if (idx === 0 || !line.trim()) return;
                const [diocese, income, expense, goal] = line.split(',');
                
                const nIncome = parseInt(income) || 0;
                const nExpense = parseInt(expense) || 0;
                const nGoal = parseInt(goal) || 1;
                const executionRateRaw = (nExpense / nGoal) * 100;
                const executionRate = executionRateRaw.toFixed(1);
                
                console.log(`[수식 검증] ${diocese}: (${nExpense} / ${nGoal}) * 100 = ${executionRateRaw} -> ${executionRate}%`);
                
                // [Step 171] 지능형 경보 로직
                let status = "정상";
                if (executionRate > 95) status = "⚠️ 집행 과다";
                if (executionRate < 30) status = "❗ 집행 부진";

                totalIncome += nIncome;
                totalExpense += nExpense;
                
                details.push({
                    diocese: diocese.trim(),
                    income: nIncome,
                    expense: nExpense,
                    goal: nGoal,
                    executionRate,
                    status
                });
            });
        });
    }

    const report = {
        timestamp: new Date().toISOString(),
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense,
        trend: history ? {
            incomeDiff: totalIncome - history.totalIncome,
            expenseDiff: totalExpense - history.totalExpense
        } : "신규 데이터",
        details: details.length > 0 ? details : [{ diocese: "데이터 없음", status: "N/A" }]
    };

    await fs.ensureDir(outputFolder);
    await fs.writeJson(path.join(outputFolder, 'finance_summary.json'), report, { spaces: 2 });
    console.log(`✅ 재무 분석 완료. 분석 대상: ${details.length}개소.`);
    
    return report;
}

processFinancials('input_zone', 'GeneralAffairs_Master/03_Finance');
