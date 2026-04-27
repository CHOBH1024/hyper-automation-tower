const fs = require('fs-extra');
const dioceses = ["Seoul", "Incheon", "Gyeonggi_North", "Gyeonggi_South", "Gangwon", "Chungbuk", "Chungnam", "Jeonbuk", "Jeonnam", "Gyeongbuk", "Gyeongnam", "Jeju", "Daegu", "Busan"];

let total = 0;
let missing = [];

dioceses.forEach(d => {
    const p = `GeneralAffairs_Master/01_Dioceses/${d}`;
    if (fs.existsSync(p)) {
        const sub = fs.readdirSync(p);
        total += sub.length;
    } else {
        missing.push(d);
    }
});

console.log(`[전수 조사 결과]`);
console.log(`- 발견된 하위 폴더 총계: ${total}개 (목표: 42개)`);
if (missing.length > 0) {
    console.warn(`- 누락된 교구: ${missing.join(', ')}`);
} else if (total === 42) {
    console.log("✅ 모든 교구의 3단 아카이브 구조가 완벽하게 확보되었습니다.");
} else {
    console.warn("⚠️ 폴더 숫자가 일치하지 않습니다. 추가 점검이 필요합니다.");
}
