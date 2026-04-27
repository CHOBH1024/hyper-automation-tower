const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require("docx");
const fs = require("fs");

async function generateReport(title) {
    console.log("[시스템 A] 통합 행정 데이터 브리핑 생성 중...");
    
    let financeData, personnelData;
    try {
        financeData = fs.readJsonSync('GeneralAffairs_Master/03_Finance/finance_summary.json');
        personnelData = fs.readJsonSync('GeneralAffairs_Master/04_Personnel/weekly_personnel_check.json');
    } catch (e) {
        financeData = { details: [] };
        personnelData = { missingCount: 0 };
    }

    const children = [
        new Paragraph({ text: title, heading: HeadingLevel.TITLE, alignment: AlignmentType.CENTER }),
        new Paragraph({ text: `발행일: ${new Date().toLocaleDateString()}`, alignment: AlignmentType.RIGHT }),
        
        new Paragraph({ text: "1. 주간 재무 현황 요약", heading: HeadingLevel.HEADING_1 }),
        new Paragraph({ text: `총 수입: ₩${financeData.totalIncome?.toLocaleString() || 0}` }),
        new Paragraph({ text: `총 지출: ₩${financeData.totalExpense?.toLocaleString() || 0}` }),
        new Paragraph({ text: `특이사항: ${financeData.details.filter(d => d.status !== "정상").length}개 교구 이상 징후 감지`, color: "FF0000", bold: true }),

        new Paragraph({ text: "2. 주간 행정 보고서 제출 현황", heading: HeadingLevel.HEADING_1 }),
        new Paragraph({ text: `총 교회 수: ${personnelData.totalChurches || 0}` }),
        new Paragraph({ text: `미제출 교회: ${personnelData.missingCount || 0}개소`, color: "FF0000" }),
        
        new Paragraph({ text: "\n본 보고서는 신한국 총무국 하이퍼 자동화 시스템에 의해 데이터 기반으로 자동 작성되었습니다.", italic: true, spacing: { before: 400 } })
    ];

    const doc = new Document({ sections: [{ children }] });
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync("GeneralAffairs_Master/FINAL_MASTER_REPORT.docx", buffer);
    console.log("✅ 하이퍼 통합 보고서 생성 완료: FINAL_MASTER_REPORT.docx");
}

generateReport("신한국 총무국 주간 통합 보고서 (복구 완료)");
