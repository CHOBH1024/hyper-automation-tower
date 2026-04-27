const fs = require('fs-extra');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const pdf = require('pdf-parse');

async function aggregatePresentations(inputDir, outputDir) {
    console.log("[시스템 D] PDF 프레젠테이션 수집 및 통합 분석 중...");
    
    const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.pdf'));
    if (files.length === 0) {
        console.log("ℹ️ 통합할 PDF 파일이 없습니다.");
        return;
    }

    const mergedPdf = await PDFDocument.create();
    const order = ["GeneralAffairs", "Seoul", "Incheon", "Busan"]; // 예시 발표 순서

    // 파일 정렬 (발표 순서 기반)
    const sortedFiles = files.sort((a, b) => {
        const orderA = order.findIndex(o => a.includes(o));
        const orderB = order.findIndex(o => b.includes(o));
        return (orderA === -1 ? 99 : orderA) - (orderB === -1 ? 99 : orderB);
    });

    for (const file of sortedFiles) {
        const filePath = path.join(inputDir, file);
        const dataBuffer = fs.readFileSync(filePath);
        
        try {
            const pdfData = await new pdf.PDFParse(dataBuffer);
            console.log(`📑 [분석] '${file}' - ${pdfData.numpages}페이지 감지.`);
        } catch (e) {
            console.warn(`⚠️ '${file}' 텍스트 추출 실패 (병합은 계속 진행):`, e.message);
        }

        const donorPdf = await PDFDocument.load(dataBuffer);
        const pages = await mergedPdf.copyPages(donorPdf, donorPdf.getPageIndices());
        pages.forEach(p => mergedPdf.addPage(p));
    }

    const mergedPdfBuffer = await mergedPdf.save();
    await fs.ensureDir(outputDir);
    fs.writeFileSync(path.join(outputDir, 'Weekly_Presentation_Master.pdf'), mergedPdfBuffer);
    console.log("✅ PDF 통합 완료: Weekly_Presentation_Master.pdf");
}

aggregatePresentations('input_zone', 'GeneralAffairs_Master/06_Archives');
