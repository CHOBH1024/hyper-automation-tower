const fs = require('fs-extra');
const path = require('path');

async function draftAnnouncement() {
    console.log("[시스템 F] 재무 데이터 기반 지능형 공지 생성 중...");
    
    let financeData, securityData;
    try {
        financeData = fs.readJsonSync('GeneralAffairs_Master/03_Finance/finance_summary.json');
        securityData = fs.readJsonSync('GeneralAffairs_Master/05_Security/Access_Logs/security_audit_log.json');
    } catch (e) {
        financeData = financeData || { details: [] };
        securityData = securityData || { issuesFound: 0 };
    }

    // [Step 313] 현장 사진 현황 파악
    let photoCount = 0;
    const photoBase = 'GeneralAffairs_Master/01_Dioceses';
    if (fs.existsSync(photoBase)) {
        const dioceses = fs.readdirSync(photoBase);
        dioceses.forEach(d => {
            const photoDir = path.join(photoBase, d, 'Photos');
            if (fs.existsSync(photoDir)) {
                photoCount += fs.readdirSync(photoDir).length;
            }
        });
    }

    const anomalies = financeData.details.filter(d => d.status && d.status !== "정상");
    let anomalyText = anomalies.map(d => `- ${d.diocese}: ${d.status} (${d.executionRate}%)`).join('\n');
    if (!anomalyText) anomalyText = "- 특이사항 없음 (모든 교구 정상 집행)";

    else seasonalGreeting = "하얀 눈처럼 깨끗하고 경건한 마음으로 겨울의 평화 인사를 드립니다.";

    // [Step 317] 영성 강화를 위한 주간 성구 선정
    const quotes = [
        "네 시작은 미약하였으나 네 나중은 심히 창대하리라.",
        "항상 기뻐하라, 쉬지 말고 기도하라, 범사에 감사하라.",
        "진리를 알지니 진리가 너희를 자유롭게 하리라.",
        "믿음은 바라는 것들의 실상이요 보이지 않는 것들의 증거니라."
    ];
    const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];

    let trendText = "";
    if (financeData.trend && financeData.trend !== "신규 데이터") {
        const incomeDiff = financeData.trend.incomeDiff;
        trendText = `이번 주 총 수입은 지난주 대비 **₩${incomeDiff.toLocaleString()}** ${incomeDiff >= 0 ? "증가하여 고무적인 성과" : "감소하여 주의가 필요"}를 보이고 있습니다.`;
    }

    let securityText = `이번 주 보안 감사 결과, 총 **${securityData.issuesFound}건**의 개인정보 노출 위험이 사전에 차단 및 마스킹되었습니다.`;

    const template = `
# 📢 [공지] 신한국 총무국 주간 행정 업무 안내의 건

${seasonalGreeting} 총무국 자동화 관리 시스템 Antigravity에서 금주 행정 분석 결과를 보고드립니다.

## 1. 금주 재무 및 보안 종합 보고
- **재무 동향:** ${trendText}
- **보안 감사:** ${securityText}
- **현장 활동:** 전국의 교구에서 총 **${photoCount}장**의 생생한 현장 사진이 공유되었습니다.

## 2. 재무 집행 세부 이상 징후
전국의 모든 교구장님과 실무자님들의 노고에 감사드리며, 아래 교구의 집행 수치에 대해 정밀 확인을 부탁드리오니 혜량하여 주시기 바랍니다.

${anomalyText}

## 3. 행정 요청 사항
- 위 해당 교구의 실무자께서는 집행 사유서를 작성하시어 금일 17시까지 제출해 주시면 감사하겠습니다.
- 항상 마스터 아카이브의 'Safe_Reports' 폴더를 참조하시어 개인정보 보호에 만전을 기해 주시길 부탁드립니다.

모든 가정에 평화가 가득하시길 기원합니다.

---
**오늘의 성구:** *"${selectedQuote}"*

발행일: ${new Date().toLocaleDateString()}
총무국 AI 행정 지원팀 드림
    `;

    await fs.ensureDir('organized_result');
    await fs.writeFile('organized_result/weekly_announcement.md', template);

    // [Step 319] 영문 버전 생성
    const templateEn = `
# 📢 [Official] Weekly Administrative Briefing

Peace be with you. We report the analysis results from the Antigravity system.

## 1. Summary
- **Financial Trend:** ${trendText.includes('증가') ? 'Income increased' : 'Income decreased'}
- **Security Audit:** ${securityData.issuesFound} incidents blocked.
- **Photos:** ${photoCount} field activity photos archived.

## 2. Issues
${anomalyText}

Date: ${new Date().toLocaleDateString()}
AI Administration Support Team
    `;
    await fs.writeFile('organized_result/weekly_announcement_en.md', templateEn);
    
    console.log("✅ 지능형 주간 공지 초안(국문/영문) 생성 완료.");
}

draftAnnouncement();
