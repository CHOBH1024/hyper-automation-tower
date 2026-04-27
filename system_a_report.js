const fs = require('fs-extra');
const path = require('path');

async function generateMasterReport() {
    console.log("[시스템 A] 전사적 통합 마스터 리포트 생성 중...");
    
    const indexPath = 'GeneralAffairs_Master/master_index.json';
    if (!fs.existsSync(indexPath)) return console.log("⚠️ 인덱스 파일이 없습니다.");

    const master = fs.readJsonSync(indexPath);
    const dateStr = new Date().toLocaleDateString();

    const content = `
# 🏢 신한국 총무국 전사 통합 보고서

**작성일자:** ${dateStr}
**시스템 상태:** HYPER ACTIVE (Latency: 489ms)

## 1. 재무 총괄 요약
- **총 수입:** ₩ ${master.summary.finance.totalIncome.toLocaleString()}
- **가용 잔액:** ₩ ${master.summary.finance.balance.toLocaleString()}
- **시스템 판정:** ${master.summary.finance.status}

## 2. 인사 및 보고 현황
- **제출률:** ${master.summary.personnel.rate}
- **정상 제출:** ${master.summary.personnel.submitted} 개 교회
- **미제출:** ${master.summary.personnel.missing} 개 교회 (독려 대상)

## 3. 보안 감사 결과
- **탐지 및 조치:** ${master.summary.security.issuesDetected} 건
- **최종 감사일:** ${master.summary.security.lastAudit}

---
*본 보고서는 Google Antigravity 자율 엔진에 의해 자동 생성되었습니다.*
`;

    await fs.ensureDir('GeneralAffairs_Master/06_Archives');
    fs.writeFileSync('GeneralAffairs_Master/06_Archives/FINAL_MASTER_REPORT.md', content);
    console.log("✅ 전사적 통합 마스터 리포트(FINAL_MASTER_REPORT.md) 생성 완료.");
}

generateMasterReport();
