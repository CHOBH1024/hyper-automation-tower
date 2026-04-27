const fs = require('fs-extra');
const dioceses = ["Seoul", "Incheon", "Gyeonggi_North", "Gyeonggi_South", "Gangwon", "Chungbuk", "Chungnam", "Jeonbuk", "Jeonnam", "Gyeongbuk", "Gyeongnam", "Jeju", "Daegu", "Busan"];

function generate() {
    let csv = "교구,수입,지출,목표\n";
    dioceses.forEach(d => {
        const income = Math.floor(20000000 + Math.random() * 30000000);
        const expense = Math.floor(10000000 + Math.random() * income);
        const goal = Math.floor(expense * (0.8 + Math.random() * 0.5)); // 다양한 집행률 유도
        csv += `${d},${income},${expense},${goal}\n`;
    });
    fs.writeFileSync('input_zone/national_finance_220_churches.csv', csv);
    console.log("📊 전국 14개 교구 가상 재무 데이터 생성 완료.");
}

generate();
